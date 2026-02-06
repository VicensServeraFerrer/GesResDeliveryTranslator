import 'dotenv/config.js'
import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const token = req.cookies?.access;

  if (!token) {
    return res.status(401).json({ ok: false, error: "NO_SESSION" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload;     
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: "INVALID_SESSION" });
  }
}
