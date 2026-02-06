import 'dotenv/config.js'
import jwt from "jsonwebtoken";

export function requireAuthAPI(req, res, next) {
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

export function autAuth(req, res, next) {
  const token = req.cookies?.access;

  if (!token) {
    return res.redirect(`/index.html`);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if(!isAppUser(payload.userId)){
      return res.redirect(`/index.html`);
    }

    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: "INVALID_SESSION" });
  }
}

