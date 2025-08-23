import User from '../../schemas/userSchema.js';

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single user
export const getAUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get users by query params
export const getByqueryParams = async (req, res) => {
  const { username, email, country } = req.query;
  const filter = {};

  if (username) filter.username = username;
  if (email) filter.email = email;
  if (country) filter["profile.country"] = country;

  try {
    const users = await User.find(filter).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
