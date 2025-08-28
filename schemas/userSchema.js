import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    AltimatAdmin: { type: Boolean, default: false },
    profile: {
      country: { type: String, default: '' },
      Number: { type: String, default: '' },
      Street: { type: String, default: '' },
      Bio: { type: String, default: '' }
    },
    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false },
    lastOtpSentAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;