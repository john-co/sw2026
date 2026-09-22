function notFound(request, response) {
  response.status(404).json({ error: "Endpoint not found" });
}

function handleError(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  return response.status(error.statusCode || 500).json({
    error: error.statusCode ? error.message : "Internal server error",
  });
}

module.exports = { handleError, notFound };
