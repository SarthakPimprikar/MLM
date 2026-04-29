import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOtp extends Document {
  mobile: string;
  otp: string;
  expiresAt: Date;
}

const OtpSchema: Schema = new Schema({
  mobile: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: '5m' } } // Auto delete after 5 minutes
}, { timestamps: true });

const Otp: Model<IOtp> = mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema);

export default Otp;
