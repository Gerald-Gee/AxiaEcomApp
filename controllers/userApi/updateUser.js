import User from '../../schemas/userSchema.js';

// edit user (general info)
export const editUser = async (req, res) => {
  const { id } = req.params;
  const reqId = req.user._id.toString();

  if (id === reqId || req.user.admin) {
    try {
      await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(401).json({ message: "You are not authorized to edit this user" });
  }
};

// edit user profile only
export const editProfile = async (req, res) => {
  const { id } = req.params;
  const reqId = req.user._id.toString();
  const { country, Number, Street, Bio } = req.body;

  if (id === reqId || req.user.admin) {
    try {
      await User.findByIdAndUpdate(id, {
        $set: {
          'profile.country': country,
          'profile.Number': Number,
          'profile.Street': Street,
          'profile.Bio': Bio
        }
      }, { new: true });
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(401).json({ message: "You are not authorized to edit this profile" });
  }
};
