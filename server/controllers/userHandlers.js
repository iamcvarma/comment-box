import User from "../models/User.js";

export const getPictureURL = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const userData = await User.findOne({ userId: userId });
    if (!userData) {
      return res.status(400).json({ error: "user not found" });
    }
    return res.status(200).json(userData);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, profileURL } = req.body;
    if (!userId || !profileURL) {
      return res.status(400).json({ error: "userId or profileURL is missing" });
    }

    const user = await User.findOneAndUpdate(
      { userId },
      { profileURL },
      { new: true, upsert: true }
    );
    res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
