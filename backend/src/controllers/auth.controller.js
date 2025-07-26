import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    if (newUser) {
      return res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create user" });
    }
  } catch (error) {
    console.log("Failed to create user");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Login Successfully",
        userId: user._id,
        email: user.email,
      });
  } catch (error) {
    console.log("Failed to login");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
