const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    passwordHash: bcrypt.hashSync("password123", 10),
  },
  {
    id: 2,
    name: "Bruno Silva",
    email: "bruno@example.com",
    passwordHash: bcrypt.hashSync("password123", 10),
  },
  {
    id: 3,
    name: "Carla Gomez",
    email: "carla@example.com",
    passwordHash: bcrypt.hashSync("password123", 10),
  },
];

module.exports = users;
