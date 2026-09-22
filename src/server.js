const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`E-commerce API listening on http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
