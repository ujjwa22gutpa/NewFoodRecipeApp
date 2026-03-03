const userModel = require("../Models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(403).json({
        message: "User Already existed you can directly login",
        success: false,
      });
    }
    const usermodel = new userModel({ name, email, password });
    usermodel.password = await bcrypt.hash(password, 10);
    await usermodel.save();
    res.status(200).json({
      message: "SignUp Successfully!!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Problem",
      success: false,
    });
  }
};

const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "please enter the correct email or password",
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "please enter the correct email or password",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email,
         _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      message: "Login Successfully!!",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Problem",
      success: false,
    });
  }
};

module.exports = {
  signUp,
  login,
};
