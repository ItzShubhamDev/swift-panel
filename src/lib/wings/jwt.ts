"use server";

import jwt from "jsonwebtoken";

const options: jwt.SignOptions = {
  algorithm: "HS256",
  expiresIn: "10m",
  issuer: "http://localhost:3000",
  audience: "http://localhost:8080",
  notBefore: "-5m",
};

const data = {
  server_uuid: "4a7b9654-edde-416c-a3fc-dec58199f203",
  permissions: [
    "*",
    "admin.websocket.errors",
    "admin.websocket.install",
    "admin.websocket.transfer",
  ],
  user_uuid: "a7572e2e-047e-4ce1-b04e-4d1beb4136b4",
  user_id: 1,
  unique_id: "PjibVD6dKCOzHZVX",
};

const secret = process.env.TOKEN;

export async function signToken() {
  if (!secret) {
    throw new Error("Token secret not found");
  }
  const token = jwt.sign(data, secret, options);
  console.log(token);
  return token;
}
