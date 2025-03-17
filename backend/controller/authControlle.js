const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokenAndSetCookie");
const signUp = async (req, res) => {
  try {
    const { name, userName, password } = req.body;
    if (!name || !userName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All failds are required" });
    }

    const userIsAlreadyExist = await User.findOne({ userName });
    if (userIsAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      userName,
      password: hashedPassword,
    });

    await user.save();

    // jwt
    generateToken(user._id, res);
    res.status(201).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if ((!userName, !password)) {
      return res
        .status(400)
        .json({ success: false, message: "All failds are required" });
    }
    const user = await User.findOne({ userName });

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // jwt
    generateToken(user._id, res);
    res.status(201).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Cookies cleared" });
};

module.exports = {
  signUp,
  login,
  logout,
};
