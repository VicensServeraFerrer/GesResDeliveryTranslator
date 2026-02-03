import 'dotenv/config.js'
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // OBLIGATORIO
const JWT_EXPIRES_IN = "2h";

export function signJwt(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token) {
  return jwt.verify(token, JWT_SECRET);
}
