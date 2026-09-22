const products = require("../models/productModel");

const PAYMENT_METHODS = ["cash", "credit_card"];

function createError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function asCurrency(value) {
  return Number(value.toFixed(2));
}

function checkout({ items, paymentMethod } = {}) {
  if (!PAYMENT_METHODS.includes(paymentMethod)) {
    throw createError("Payment method must be cash or credit_card");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw createError("At least one checkout item is required");
  }

  const checkoutItems = items.map(({ productId, quantity }) => {
    const product = products.find(({ id }) => id === productId);
    if (!product) {
      throw createError(`Product ${productId} does not exist`);
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw createError(
        `Quantity for product ${productId} must be a positive integer`,
      );
    }

    return {
      productId: product.id,
      name: product.name,
      quantity,
      unitPrice: product.price,
      subtotal: asCurrency(product.price * quantity),
    };
  });

  const subtotal = asCurrency(
    checkoutItems.reduce((total, item) => total + item.subtotal, 0),
  );
  const discount = paymentMethod === "cash" ? asCurrency(subtotal * 0.1) : 0;

  return {
    items: checkoutItems,
    paymentMethod,
    subtotal,
    discount,
    total: asCurrency(subtotal - discount),
  };
}

module.exports = { checkout };
