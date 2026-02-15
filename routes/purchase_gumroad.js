import 'dotenv/config.js'
import express from "express"
import { AccessToken, Customer, User, Subscription, Plan } from '../models/index.js'
import { requireAuthAPI } from '../helpers/authSession.js';
import { create_token, sha256 } from '../helpers/encrypt.js';
import { getEndDate } from '../helpers/getEndDate.js';
import { sendAccessMail } from '../mail/sendAccesMail.js';

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
      status: 'active',
      customerId: customer.id
    });

    console.log(user)
    
    await Customer.update(
      { userId: user.id },
      {
        where: { id: customer.id }
      }
    );

    const plan = await Plan.findOne({where: {code: payload.recurrence}});

    await Subscription.create({
      customerId: customer.id,
      planId: plan.id,
      paid: true,
      gumroadSaleId: payload.sale_id,
      ammount: payload.price,
      startedAt: new Date(),
      endsAt: getEndDate(plan.code),
    });

    const token = create_token()

    const accesToken = await AccessToken.create({
      tokenHash: sha256(token),
      expiresAt: getEndDate(plan.code),
      user_id: user.id,
    });

    await sendAccessMail({to: payload.email, planName: plan.code, accessLink: token});

    return res.status(200);    
  } catch (err) {
    console.log(err);
  }
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

gumroadRouter.get("/test/send_mail", async (req, res) => {
  await sendAccessMail({to: 'vserveraferrer@gmail.com', planName: 'test', accessLink: 'test'});

  return res.status(200);
});

export default gumroadRouter