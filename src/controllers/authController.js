const authService = require("../services/authService");

async function register(request, response, next) {
  try {
    const user = await authService.register(request.body);
    response.status(201).json({ user });
  } catch (error) {
    next(error);
  }
}

async function login(request, response, next) {
  try {
    const result = await authService.login(request.body);
    response.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { login, register };
