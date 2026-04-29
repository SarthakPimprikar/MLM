import mongoose from 'mongoose';
import { connectDB } from './db';
import Sale from '../../models/Sale';
import User, { IUser } from '../../models/User';
import Wallet from '../../models/Wallet';

const HCC_DIRECT_RATE = 0.40;   // 40% of businessVolume → HCC
const HCM_OVERRIDE_RATE = 0.40;  // 40% of HCC income → HCM
const HBA_OVERRIDE_RATE = 0.40;  // 40% of HCM income → HBA
const SH_LEADERSHIP_RATE = 0.02; // 2%  of businessVolume → SH

/**
 * Helper: Add a ledger entry and update wallet balance.
 * MUST be called sequentially — never in parallel — to avoid race conditions.
 */
async function creditWallet(
  userId: mongoose.Types.ObjectId,
  amount: number,
  type: 'direct' | 'override' | 'leadership',
  description: string,
  sourceUserId: mongoose.Types.ObjectId,
  cycleMonth: string
): Promise<void> {
  await Wallet.findOneAndUpdate(
    { user: userId },
    {
      $inc: {
        provisionalBalance: amount,
        totalEarned: amount,
      },
      $push: {
        ledger: {
          type,
          amount,
          description,
          sourceUserId,
          status: 'provisional',
          cycleMonth,
          date: new Date(),
        },
      },
    },
    { upsert: true, new: true }
  );
}

/**
 * Process the full 4-level commission cascade for a sale.
 * Steps are intentionally sequential (no Promise.all) to prevent wallet race conditions.
 *
 * Commission flow:
 *   HCC   → 40% of businessVolume (direct)
 *   HCM   → 40% of HCC income (override)  — only if active this month
 *   HBA   → 40% of HCM income (override)  — only if active this month
 *   SH    → 2%  of businessVolume          (leadership)
 *
 * @param saleId - MongoDB ObjectId string of the Sale document
 */
export async function processCommission(saleId: string): Promise<void> {
  await connectDB();

  // 1. Fetch the sale
  const sale = await Sale.findById(saleId).lean();
  if (!sale) throw new Error(`Sale not found: ${saleId}`);
  if (sale.commissionProcessed) {
    console.warn(`Commission already processed for sale: ${saleId}`);
    return;
  }

  const commissionableAmount = sale.businessVolume;
  const sellerId = sale.seller;
  const cycleMonth = sale.cycleMonth;

  // 2. Find HCC who made the sale
  const hcc = await User.findById(sellerId).lean<IUser>();
  if (!hcc) throw new Error(`HCC user not found: ${sellerId.toString()}`);

  // 3. Calculate and credit HCC direct income
  const hccIncome = Math.round(commissionableAmount * HCC_DIRECT_RATE);
  await creditWallet(
    sellerId,
    hccIncome,
    'direct',
    `Direct commission for policy ${sale.policyId}`,
    sellerId,
    cycleMonth
  );

  // 4. Increment HCC personal sales count
  await User.updateOne(
    { _id: sellerId },
    {
      $inc: { personalSalesCount: 1, personalSalesThisMonth: 1 },
      $set: { lastSaleDate: new Date() },
    }
  );

  // 5. Find HCM (HCC's referrer)
  if (!hcc.referrer) {
    await Sale.updateOne({ _id: saleId }, { commissionProcessed: true });
    return;
  }

  const hcm = await User.findById(hcc.referrer).lean<IUser>();
  const hcmIsActive = hcm && hcm.personalSalesThisMonth >= 1;

  let hcmIncome = 0;
  if (hcm && hcmIsActive) {
    hcmIncome = Math.round(hccIncome * HCM_OVERRIDE_RATE);
    await creditWallet(
      hcm._id as mongoose.Types.ObjectId,
      hcmIncome,
      'override',
      `Override from HCC ${hcc.memberId} — policy ${sale.policyId}`,
      sellerId,
      cycleMonth
    );
  }

  // 6. Find HBA (HCM's referrer)
  if (!hcm?.referrer) {
    await Sale.updateOne({ _id: saleId }, { commissionProcessed: true });
    return;
  }

  const hba = await User.findById(hcm.referrer).lean<IUser>();
  const hbaIsActive = hba && hba.personalSalesThisMonth >= 1;

  if (hba && hbaIsActive && hcmIncome > 0) {
    const hbaIncome = Math.round(hcmIncome * HBA_OVERRIDE_RATE);
    await creditWallet(
      hba._id as mongoose.Types.ObjectId,
      hbaIncome,
      'override',
      `Override from HCM ${hcm.memberId} — policy ${sale.policyId}`,
      sellerId,
      cycleMonth
    );
  }

  // 7. Find SH (HBA's referrer) — always gets 2% regardless of activity
  if (hba?.referrer) {
    const sh = await User.findById(hba.referrer).lean<IUser>();
    if (sh) {
      const shIncome = Math.round(commissionableAmount * SH_LEADERSHIP_RATE);
      await creditWallet(
        sh._id as mongoose.Types.ObjectId,
        shIncome,
        'leadership',
        `2% state leadership from policy ${sale.policyId}`,
        sellerId,
        cycleMonth
      );
    }
  }

  // 8. Mark commission as processed
  await Sale.updateOne({ _id: saleId }, { commissionProcessed: true });
}
