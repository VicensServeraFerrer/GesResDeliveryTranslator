import 'dotenv/config.js'
import express from "express"
import { sequelize } from '../models/index.js'

const gumroadRouter = express.Router()

gumroadRouter.use(express.urlencoded({ extended: false }));

gumroadRouter.post("/gumroad", async (req, res) => {
  const payload = req.body;

  // Ejemplos de campos que suelen venir:
  // payload.email, payload.product_id, payload.sale_id, payload.license_key, payload.url_params, etc.
  // (Depende del tipo de producto/venta)
  console.log("GUMROAD PING:", payload);

  // 1) Identifica al usuario interno (idealmente por payload.url_params.user_id)
  // 2) Upsert Customer
  // 3) Crea/actualiza Subscription (activa)
  // 4) Guarda sale_id como idempotency key para no duplicar

  res.status(200).send("ok");
});

export default gumroadRouter