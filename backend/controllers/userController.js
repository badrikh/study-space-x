import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const User = db.User;
const SECRET = process.env.JWT_SECRET;

// ================= REGISTER =================
export async function register(req, res) {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
  name,
  email,
  phoneNumber,
  password: hashedPassword,
  role: "user",
});

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Register error:", err); // ← أضفنا هاد
    return res.status(500).json({ message: err.message });
  }
}

// ================= LOGIN =================
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    // تحقق إن JWT_SECRET محمّل
    if (!SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    // ================= ADMIN LOGIN =================
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { id: "admin", email, role: "admin" },
        SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Admin login successful",
        token,
        user: { id: "admin", name: "Admin", email, role: "admin" },
      });
    }

    // ================= USER LOGIN =================
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Login error:", err); // ← أضفنا هاد
    return res.status(500).json({ message: err.message });
  }
}

// ================= GET ALL USERS =================
export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.status(200).json(users);
  } catch (err) {
    console.error("getAllUsers error:", err);
    return res.status(500).json({ message: err.message });
  }
}

// ================= GET USER BY ID =================
export async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("getUserById error:", err);
    return res.status(500).json({ message: err.message });
  }
}

// ================= UPDATE USER =================
export async function updateUser(req, res) {
  try {
    const { name, phoneNumber } = req.body;
    const targetUserId = req.params.id;
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByPk(targetUserId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isOwner = loggedInUser.id == targetUserId;
    const isAdmin = loggedInUser.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden: not allowed" });
    }

    await user.update({
      name: name ?? user.name,
      phoneNumber: phoneNumber ?? user.phoneNumber,
    });

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({ message: err.message });
  }
}
