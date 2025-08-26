import bcrypt from 'bcryptjs';
import User from '../../schemas/userSchema.js';
import { sendMail } from '../../utils/sendEmail.js';

//generateOTP,


export const createUser = async (req, res) => {
  
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // const { otp, otpExpires } = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (email === process.env.ADMIN_EMAIL) {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
        admin: true,
        AltimatAdmin: true,
      });
    } else {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
        admin: false,
    //     otp,
    //     otpExpires,
        AltimatAdmin: false,
        profile: { country: '', Number: '', Street: '', Bio: '' }
      });
    }

    await newUser.save();

    try {
      const mailObj = {
        mailFrom: `Ecomproject ${process.env.EMAIL_USER}`,
        mailTo: email,
        subject: 'AxiaEcomProject',
        body: `
          <h1>WELCOME TO AxiaEcomProject <strong>${username}</strong></h1>
          <p>Here is your OTP  proceed to verify!</p>
          <p>Make a post and have a great experience using Ecommm</p>
        `
      };
      //${otp},

      await sendMail(mailObj);
    } catch (mailError) {
      console.log("Email sending failed:", mailError);
    }

    res.status(201).json({ message: 'New User created successfully' });

  } catch (error) {
    res.status(500).json(error);
  }
};
