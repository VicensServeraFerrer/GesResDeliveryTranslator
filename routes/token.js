import 'dotenv/config.js'
import express from "express"
import { signJwt } from '../helpers/jwt.js'
import { sequelize } from '../models/index.js'

const tokenRouter = express.Router()

tokenRouter.get("/session", async (req, res) =>{

})

tokenRouter.get("/suscription/status", async (req, res) =>{
    
})

tokenRouter.get("/magic/exchange", async (req, res) =>{
    // 1) token viene del frontend
    const { token } = req.body;

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