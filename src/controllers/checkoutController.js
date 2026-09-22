const checkoutService = require("../services/checkoutService");

function checkout(request, response, next) {
  try {
    const result = checkoutService.checkout(request.body);
    response.json({ userId: request.user.id, ...result });
  } catch (error) {
    next(error);
  }
}

module.exports = { checkout };
