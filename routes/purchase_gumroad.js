import 'dotenv/config.js'
import express from "express"
import { AccessToken, Customer, User, Subscription } from '../models/index.js'
import { requireAuthAPI } from '../helpers/authSession.js';
import { create_token, sha256 } from '../helpers/encrypt.js';

const gumroadRouter = express.Router()

gumroadRouter.use(express.urlencoded({ extended: false }));

gumroadRouter.post("/ping", async (req, res) => {
  const payload = req.body;

  if(payload.permalink != "traductor") {
    return res.status(200).json({message: "Wrong product"})
  }

  try {
    const customer = await Customer.create({
      gumroadSaleId: payload.sale_id,
      email: payload.email,
      userId: null
    });

    const user = await User.create({
      email: payload.email,
      status: 'avtive',
      customerId: customer.id
    });

    Customer.update(
      { userId: user.userId },
      {
        where: { id: customer.id }
      }
    );


  } catch (err) {
    
  }
  // Ejemplos de campos que suelen venir:
  // payload.email, payload.product_id, payload.sale_id, payload.license_key, payload.url_params, etc.
  // (Depende del tipo de producto/venta)
  console.log("GUMROAD PING:", payload.seller_id);

  // 1) Identifica al usuario interno (idealmente por payload.url_params.user_id)
  // 2) Upsert Customer
  // 3) Crea/actualiza Subscription (activa)
  // 4) Guarda sale_id como idempotency key para no duplicar

  res.status(200).send("ok");
});

gumroadRouter.get("/test/create_token", async (req, res) => {
  const token = create_token()

  const startedAt = new Date();
  const endsAt = new Date(startedAt);
  endsAt.setMonth(endsAt.getMonth() + 1); 

  const createdToken = AccessToken.create({
    userId: process.env.TESTING_USER_ID,
    tokenHash: sha256(token),
    expiresAt: endsAt,
  })

  return res.json(createdToken);
});

export default gumroadRouter