import jwt from 'jsonwebtoken';
import User from '../schemas/userSchema.js';

const authMiddleware = async (req, res, next) => {
  
  const accessToken = req.cookies.token;
  const jwtSecret = process.env.JWT_SECRET;

  if (!accessToken) {
    return res.status(401).json({ message: "Please login first" });
  }
  
  try {
    const decoded = jwt.verify(accessToken, jwtSecret);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const verifiedUser = await User.findById(decoded.id).select("-password");
    if (!verifiedUser) {
      return res.status(401).json({ message: "Invalid user" });
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default authMiddleware;
