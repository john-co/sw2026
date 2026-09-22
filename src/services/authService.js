const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "local-development-secret";

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

async function register({ name, email, password } = {}) {
  if (!name || !email || !password) {
    throw createError("Name, email, and password are required", 400);
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (users.some((user) => user.email === normalizedEmail)) {
    throw createError("Email is already registered", 409);
  }

  const user = {
    id: Math.max(...users.map(({ id }) => id), 0) + 1,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: await bcrypt.hash(password, 10),
  };

  users.push(user);
  return publicUser(user);
}

async function login({ email, password } = {}) {
  if (!email || !password) {
    throw createError("Email and password are required", 400);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((candidate) => candidate.email === normalizedEmail);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw createError("Invalid email or password", 401);
  }

  return {
    token: jwt.sign(publicUser(user), JWT_SECRET, { expiresIn: "1h" }),
  };
}

module.exports = { JWT_SECRET, login, register };
