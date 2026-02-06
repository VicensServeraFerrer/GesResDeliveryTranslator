import 'dotenv/config.js'
import express from "express"
import { signJwt } from '../helpers/jwt.js'
import { sha256 } from '../helpers/encrypt.js'
import { isSubscriptionActive } from '../helpers/check_subs.js'
import { requireAuthAPI } from '../helpers/authSession.js'
import { AccessToken, User } from '../models/index.js'
import { Op } from 'sequelize'
import { sequelize } from '../models/index.js'

const tokenRouter = express.Router()

tokenRouter.get("/suscription/status", requireAuthAPI, async (req, res) =>{
    const sub = await isSubscriptionActive(req.userId);

    if (!sub) {
        return res.json({active: false})
    }

    return res.json({active: true})
})

tokenRouter.post("/magic/exchange", async (req, res) =>{
    // 1) token viene del frontend
    const token = req.body.token;

    // 2) tokenHash
    const tokenHash = sha256(token);

    // 3) buscar AccessToken válido + user
    const record = await AccessToken.findOne({
    where: { tokenHash, revokedAt: null, expiresAt: { [Op.gt]: new Date() } },
    include: [User],
    });

    if (!record) return res.status(401).json({ code: "TOKEN_INVALID" });

    // 4) comprobar suscripción activa (opcional aquí o después)
    const active = await isSubscriptionActive(record.userId);
    if (!active) return res.status(403).json({ code: "SUBSCRIPTION_EXPIRED" });

    // 5) crear sesión => cookie
    const sessionJwt = signJwt({ userId: record.userId }, { expiresIn: "1h" });
    res.cookie("session", sessionJwt, {
    httpOnly: true,
    sameSite: "lax",
    secure: true, // en https
    path: "/",
    });

    return res.json({ ok: true });
})

export default tokenRouter;