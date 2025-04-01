"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values, type = "password") => {
  try {
    let { email, password, name, image } = values;

    if (type === "google") {
      // Generate a password for Google users
      const generatePassword = (length = 17, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") =>
        Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
      password = generatePassword();
    }

    // Validate inputs
    if (!email || !name || (type === "password" && !password)) {
      return { error: "All fields are required!" };
    }

    await connectDB();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const userFound = await User.findOne({ email: normalizedEmail });
    if (userFound) {
      return { error: "Email already in use!" };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user with default values
    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      profile: image || "default",
      authtype: type || "password"
    });

    await newUser.save();

    return { success: "User registered successfully!" };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};
