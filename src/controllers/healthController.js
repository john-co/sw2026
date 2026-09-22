function healthcheck(request, response) {
  response.json({ status: "ok" });
}

module.exports = { healthcheck };
