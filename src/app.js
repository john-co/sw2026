const path = require("path");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const authRoutes = require("./routes/authRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const healthRoutes = require("./routes/healthRoutes");
const { handleError, notFound } = require("./middleware/errorMiddleware");

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, "..", "swagger.yaml"));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(authRoutes);
app.use(checkoutRoutes);
app.use(healthRoutes);
app.use(notFound);
app.use(handleError);

module.exports = app;
