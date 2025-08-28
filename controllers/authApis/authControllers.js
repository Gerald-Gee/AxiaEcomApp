import User from "../../schemas/userSchema.js";
import bcrypt from 'bcryptjs';
import { generateOTP, sendMail } from '../../utils/sendEmail.js';
import getToken from '../../jwt/genToken.js';

// LOGIN
export const loggingIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found, please register" });

    if (!user.isVerified) return res.status(400).json({ message: "OTP not verified" });

    const compared = await bcrypt.compare(password, user.password);
    if (!compared) return res.status(401).json({ message: "Email or password is incorrect" });

    // Send login success mail
    await sendMail({
      mailFrom: `AxiaEcomProject ${process.env.EMAIL_USER}`,
      mailTo: email,
      subject: 'Login Successful',
      body: `<h1>WELCOME TO ECOMMM</h1>
             <p>You are logged in</p>
             <p>Enjoy shopping with us!</p>`
    });

    const token = getToken(user._id);

    res
      .cookie('token', token, { httpOnly: true, sameSite: 'strict' })
      .status(200)
      .json({ message: "Login Successful" });

  } catch (error) {
    res.status(500).json(error);
  }
};

// PASSWORD RESET REQUEST
export const passwordResetRequest = async (req, res) => {
    res.send("Password Reset request")
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const { token, otpExpires } = generateOTP();
    user.passwordResetToken = token;
    user.passwordResetExpires = otpExpires;
    await user.save();

    await sendMail({
      mailFrom: `Ecommm ${process.env.EMAIL_USER}`,
      mailTo: email,
      subject: 'Reset Password Request',
      body: `<p>Click below to reset your password:</p>
             <a href="https://localhost:5000/password/reset/${token}"> Reset Password </a>`
    });

    res.status(200).json({ message: 'Password reset request sent' });

  } catch (error) {
    res.status(500).json(error);
  }
};

// PASSWORD RESET
export const passwordReset = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Token invalid or expired' });

    user.password = bcrypt.hashSync(newPassword, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json(error);
  }
};
