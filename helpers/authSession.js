import 'dotenv/config.js'
import { verifyJwt }  from "./jwt.js";
import { isAppUser } from './verifyUser.js';

export function autAuth(req, res, next) {
  const token = req.cookies?.session;

  if (!token) {
    return res.redirect(`/index.html`);
  }

  try {
    const payload = verifyJwt(token);

    if(!isAppUser(payload.userId)){
      return res.redirect(`/index.html`);
    }

    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: "INVALID_SESSION" });
  }
}

