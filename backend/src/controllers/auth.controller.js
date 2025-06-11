import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //Prevent XSS attacks
      sameSite: "strict", //Prevent CSRF attacks
      secure: process.env.NODE_ENV === "production", //Prevent HTTP requests
    });

    res
      .status(201)
      .json({ success: true, user: newUser, message: "New User created!" });
  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({ message: "Internal server error" }, error);
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Enter the fields" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid user credentials" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid user credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //Prevent XSS attacks
      sameSite: "strict", //Prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Logged in successfully!!", user });
  } catch (error) {
    console.log("Error in login controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logOut = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successfull" });
};
