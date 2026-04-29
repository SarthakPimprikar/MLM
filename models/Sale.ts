import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISale extends Document {
  policyId: string;
  seller: mongoose.Types.ObjectId;   // The HCC who sold it
  plan: mongoose.Types.ObjectId;
  customerName: string;
  customerMobile: string;
  amount: number;                    // sale price
  businessVolume: number;            // commissionable amount
  commissionProcessed: boolean;
  cycleMonth: string;                // YYYY-MM
  status: 'pending' | 'completed' | 'confirmed' | 'cancelled';
  saleDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SaleSchema: Schema = new Schema(
  {
    policyId: { type: String, unique: true, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    customerName: { type: String, required: true },
    customerMobile: { type: String, required: true },
    amount: { type: Number, required: true },
    businessVolume: { type: Number, default: 0 },
    commissionProcessed: { type: Boolean, default: false },
    cycleMonth: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'confirmed', 'cancelled'], default: 'completed' },
    saleDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Sale: Model<ISale> = mongoose.models.Sale || mongoose.model<ISale>('Sale', SaleSchema);

export default Sale;
