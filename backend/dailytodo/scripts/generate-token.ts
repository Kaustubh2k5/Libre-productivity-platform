import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({quiet: true,});

const token = jwt.sign(
  {
    userId: "test-user",
    email: "test@test.com",
    clientId: "web"
  },
  process.env.JWT_PUBLIC_KEY!,
  {
    expiresIn: "1h"
  }
);

console.log(token);