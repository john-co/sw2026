const { expect } = require("chai");
const request = require("supertest");
const app = require("../../src/app");

describe("API path coverage", function () {
  let token;

  it("covers POST /register", async function () {
    const response = await request(app).post("/register").send({
      name: "Dana Lee",
      email: "dana@example.com",
      password: "password123",
    });

    expect(response.status).to.equal(201);
    expect(response.body.user).to.include({
      name: "Dana Lee",
      email: "dana@example.com",
    });
  });

  it("covers POST /login", async function () {
    const response = await request(app).post("/login").send({
      email: "alice@example.com",
      password: "password123",
    });

    expect(response.status).to.equal(200);
    expect(response.body.token).to.be.a("string").and.not.empty;
    token = response.body.token;
  });

  it("covers POST /checkout", async function () {
    const response = await request(app)
      .post("/checkout")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentMethod: "cash",
        items: [
          { productId: 1, quantity: 2 },
          { productId: 3, quantity: 1 },
        ],
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.include({ userId: 1 });
    expect(response.body.total).to.equal(210.42);
  });

  it("covers GET /healthcheck", async function () {
    const response = await request(app).get("/healthcheck");

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ status: "ok" });
  });
});
