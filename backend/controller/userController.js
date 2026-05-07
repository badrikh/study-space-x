const db = require('../models');
const User = db.User;
<<<<<<< Updated upstream
=======
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-jwt-secret-key';
>>>>>>> Stashed changes

// GET ALL USERS
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET USER BY ID
async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
<<<<<<< Updated upstream

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

=======
    if (!user) return res.status(404).json({ message: "User not found" });
>>>>>>> Stashed changes
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// CREATE USER
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE USER
async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
<<<<<<< Updated upstream

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

=======
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.destroy();
>>>>>>> Stashed changes
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

<<<<<<< Updated upstream
=======
// ✅ LOGIN
async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'user' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, role: 'user' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function signupUser(req, res) {
  const { name, email, phoneNumber, password } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phoneNumber, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

>>>>>>> Stashed changes
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
<<<<<<< Updated upstream
  deleteUser
=======
  deleteUser,
  loginUser,   // ✅
  signupUser   // ✅
>>>>>>> Stashed changes
};