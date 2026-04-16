const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { refreshTokens } = require("../data/store");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/generateToken");

/* ─── SIGNUP ─── */
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    id: uuidv4(),
    name: name.trim(),
    email: normalizedEmail,
    password: hashed,
    role: "user",
  });

  const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  refreshTokens.add(refreshToken);

  res.status(201).json({ user: payload, accessToken, refreshToken });
};

/* ─── LOGIN ─── */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  refreshTokens.add(refreshToken);

  res.json({ user: payload, accessToken, refreshToken });
};

/* ─── REFRESH TOKEN ─── */
exports.refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.has(token)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const decoded = verifyRefreshToken(token);
    refreshTokens.delete(token);

    const payload = { id: decoded.id, email: decoded.email, name: decoded.name, role: decoded.role };
    const accessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    refreshTokens.add(newRefreshToken);

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

/* ─── LOGOUT ─── */
exports.logout = (req, res) => {
  const { token } = req.body;
  if (token) refreshTokens.delete(token);
  res.json({ message: "Logged out successfully" });
};
