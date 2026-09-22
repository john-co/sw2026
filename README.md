# E-commerce Checkout API

## Description

A JavaScript and Express REST API for user registration, JWT login, and authenticated checkout. All users and products are kept in memory and reset whenever the server restarts.

The API contract contains four operations. Interactive Swagger documentation is rendered separately at `/api-docs`.

## Installation

Requirements:

- Node.js 18 or newer
- npm

Install dependencies:

```bash
npm install
```

## How to Run

Set a JWT secret and start the API:

```bash
JWT_SECRET=replace-with-a-secret npm start
```

For local development, `npm start` also works with the built-in development secret. The API runs at `http://localhost:3000`, and Swagger UI is available at `http://localhost:3000/api-docs`.

## Rules

- Only `cash` and `credit_card` payment methods are accepted.
- Cash payments receive a 10% discount.
- Checkout requires a valid JWT bearer token.
- Data is stored only in memory; registered users disappear after restart.
- The API operations are `POST /login`, `POST /register`, `POST /checkout`, and `GET /healthcheck`.

## Existent Data

All seeded users use the password `password123`.

| ID  | Name          | Email             |
| --- | ------------- | ----------------- |
| 1   | Alice Johnson | alice@example.com |
| 2   | Bruno Silva   | bruno@example.com |
| 3   | Carla Gomez   | carla@example.com |

| ID  | Product             | Price |
| --- | ------------------- | ----: |
| 1   | Mechanical Keyboard | 89.90 |
| 2   | Wireless Mouse      | 39.50 |
| 3   | USB-C Hub           | 54.00 |

## How to Use the REST API

### Healthcheck

```bash
curl http://localhost:3000/healthcheck
```

### Register

```bash
curl -X POST http://localhost:3000/register \
	-H 'Content-Type: application/json' \
	-d '{"name":"Dana Lee","email":"dana@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/login \
	-H 'Content-Type: application/json' \
	-d '{"email":"alice@example.com","password":"password123"}'
```

Copy the returned `token` value and use it for checkout.

### Checkout

Cash checkout, including the 10% discount:

```bash
curl -X POST http://localhost:3000/checkout \
	-H 'Content-Type: application/json' \
	-H 'Authorization: Bearer YOUR_TOKEN' \
	-d '{"paymentMethod":"cash","items":[{"productId":1,"quantity":2},{"productId":3,"quantity":1}]}'
```

For a credit-card checkout, use `"paymentMethod":"credit_card"`.
