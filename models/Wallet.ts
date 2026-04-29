import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILedgerEntry {
  amount: number;
  type: 'direct' | 'override' | 'leadership' | 'withdrawal' | 'tds_deduction';
  description: string;
  cycleMonth: string;
  status: 'provisional' | 'final';
  sourceUserId?: mongoose.Types.ObjectId;
  date: Date;
}

export interface IWallet extends Document {
  user: mongoose.Types.ObjectId;
  provisionalBalance: number;
  finalBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  ledger: ILedgerEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    provisionalBalance: { type: Number, default: 0 },
    finalBalance: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },
    totalWithdrawn: { type: Number, default: 0 },
    ledger: [
      {
        amount: { type: Number, required: true },
        type: { 
          type: String, 
          enum: ['direct', 'override', 'leadership', 'withdrawal', 'tds_deduction'], 
          required: true 
        },
        description: { type: String },
        cycleMonth: { type: String },
        status: { type: String, enum: ['provisional', 'final'], default: 'provisional' },
        sourceUserId: { type: Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Wallet: Model<IWallet> = mongoose.models.Wallet || mongoose.model<IWallet>('Wallet', WalletSchema);

export default Wallet;
