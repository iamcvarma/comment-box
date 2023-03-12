import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await User.findById(id)
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
    const { email,name, picture } = req.body;
    console.log(email,name,picture)
    if (!name || !picture || !email) {
      return res.status(400).json({ error: "name or picture or email field is missing" });
    }

    const userData = await User.findOne({ email: email });
    if (userData){
      return res.status(200).json(userData)
    }
    const newUser = new User({
      email:email,
      name:name,
      profileURL:picture
    })
    await newUser.save()
    console.log('done')
    return res.status(200).json(newUser)
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
