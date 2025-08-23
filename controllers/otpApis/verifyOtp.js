// import User from "../../schemas/userSchema.js";
// import { generateOTP, sendMail } from "../../utils/sendEmail.js";

// // VERIFY OTP
// export const verifyOTP = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found, please register first' });

//     if (user.isVerified) return res.status(400).json({ message: 'OTP already verified' });
//     if (user.otp !== otp) return res.status(400).json({ message: 'OTP is incorrect' });
//     if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP has expired, request a new one' });

//     user.otp = undefined;
//     user.otpExpires = undefined;
//     user.isVerified = true;
//     await user.save();

//     res.status(200).json({ message: 'OTP is correct, proceed to login' });

//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// // RESEND OTP
// export const resendOTP = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found, please register first' });

//     if (user.isVerified) return res.status(400).json({ message: 'OTP already verified' });

//     const now = Date.now();
//     if (user.lastOtpSentAt && now - user.lastOtpSentAt < 2 * 60 * 1000) {
//       return res.status(400).json({ message: 'Please wait before resending OTP' });
//     }

//     const { otp, otpExpires } = generateOTP();

//     user.otp = otp;
//     user.otpExpires = otpExpires;
//     user.lastOtpSentAt = now;
//     await user.save();

//     await sendMail({
//       mailFrom: `Ecommm ${process.env.EMAIL_USER}`,
//       mailTo: email,
//       subject: 'Updated OTP',
//       body: `<p>Here is your OTP ${otp}, proceed to verify.</p>`
//     });

//     res.status(200).json({ message: 'OTP has been resent, please check your email' });

//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
