import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEPin extends Document {
  pinCode: string;
  value: number;
  planId: mongoose.Types.ObjectId;
  generatedBy: mongoose.Types.ObjectId;
  currentOwnerId: mongoose.Types.ObjectId;
  status: 'unused' | 'used' | 'transferred' | 'blocked';
  usedBy?: mongoose.Types.ObjectId;
  usedDate?: Date;
  transferHistory: {
    fromUserId: mongoose.Types.ObjectId;
    toUserId: mongoose.Types.ObjectId;
    transferredAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const EPinSchema: Schema = new Schema(
  {
    pinCode: { type: String, unique: true, required: true },
    value: { type: Number, required: true },
    planId: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    generatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    currentOwnerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { 
      type: String, 
      enum: ['unused', 'used', 'transferred', 'blocked'], 
      default: 'unused' 
    },
    usedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    usedDate: { type: Date },
    transferHistory: [
      {
        fromUserId: { type: Schema.Types.ObjectId, ref: 'User' },
        toUserId: { type: Schema.Types.ObjectId, ref: 'User' },
        transferredAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const EPin: Model<IEPin> = mongoose.models.EPin || mongoose.model<IEPin>('EPin', EPinSchema);

export default EPin;
