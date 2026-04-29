const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://harshladukar:harshal@cluster0.d4dxof3.mongodb.net/curebharat';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, sparse: true },
  password: { type: String }, // optional, login is via OTP
  role: { type: String, enum: ['admin', 'sh', 'hba', 'hcm', 'hcc'], default: 'hcc' },
  rank: { type: String, enum: ['HCC', 'HCM', 'HBA', 'SH', 'ADMIN'], default: 'HCC' },
  memberId: { type: String, unique: true, required: true },
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  state: { type: String },
  kycStatus: { type: String, enum: ['pending', 'approved', 'rejected', 'not_submitted'], default: 'not_submitted' },
  status: { type: String, enum: ['active', 'inactive', 'blocked'], default: 'active' },
  personalSalesCount: { type: Number, default: 0 },
  personalSalesThisMonth: { type: Number, default: 0 },
  teamSize: { type: Number, default: 0 },
  lastSaleDate: { type: Date },
  joiningDate: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to DB');

  const users = [
    {
      name: 'Admin User',
      mobile: '9999999990',
      role: 'admin',
      rank: 'ADMIN',
      memberId: 'CB-ADMIN-01',
      state: 'Maharashtra'
    },
    {
      name: 'State Head',
      mobile: '9999999991',
      role: 'sh',
      rank: 'SH',
      memberId: 'CB-SH-01',
      state: 'Maharashtra'
    },
    {
      name: 'HBA User',
      mobile: '9999999992',
      role: 'hba',
      rank: 'HBA',
      memberId: 'CB-HBA-01',
      state: 'Maharashtra'
    },
    {
      name: 'HCM User',
      mobile: '9999999993',
      role: 'hcm',
      rank: 'HCM',
      memberId: 'CB-HCM-01',
      state: 'Maharashtra'
    },
    {
      name: 'HCC User',
      mobile: '9999999994',
      role: 'hcc',
      rank: 'HCC',
      memberId: 'CB-HCC-01',
      state: 'Maharashtra'
    }
  ];

  for (const u of users) {
    await User.findOneAndUpdate({ mobile: u.mobile }, u, { upsert: true, new: true });
    console.log(`Upserted user: ${u.role} with mobile ${u.mobile}`);
  }

  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch(console.error);
