import 'dotenv/config.js'
import express from "express"
import { AccessToken, Customer, User, Subscription, Plan } from '../models/index.js'
import { create_token, sha256 } from '../helpers/encrypt.js';
import { getEndDate } from '../helpers/getEndDate.js';
import { sendMailPurchase, sendMailRellenamos, sendMailAvisoAdmin, sendMailFreeFill } from '../mail/mailer.js';
import { and } from 'sequelize';

const gumroadRouter = express.Router()

gumroadRouter.use(express.urlencoded({ extended: false }));

gumroadRouter.post("/ping", async (req, res) => {
  const payload = req.body;


  if(payload.permalink != "traductor" & payload.permalink != "rellenamos_tu_plantilla") {
    return res.status(200).json({message: "Wrong product"})
  }

  if(payload.permalink == "rellenamos_tu_plantilla") {
    sendMailRellenamos({to: payload.email});
    sendMailAvisoAdmin({customer: payload.email})
    return res.status(200)
  }

  try {
    const isAlredyCustomer = await Customer.findOne({where: {email: payload.email}});

    if(!isAlredyCustomer) {
      const customer = await Customer.create({
      gumroadSaleId: payload.sale_id,
      email: payload.email,
      userId: null
      });

      const user = await User.create({
        email: payload.email,
        status: 'active',
        customerId: customer.dataValues.id
      });

      await Customer.update(
        { userId: user.dataValues.id },
        {
          where: { id: customer.dataValues.id }
        }
      );

      const plan = await Plan.findOne({where: {code: payload.recurrence}});

      await Subscription.create({
        customerId: customer.dataValues.id,
        planId: plan.dataValues.id,
        paid: true,
        gumroadSaleId: payload.sale_id,
        ammount: payload.price,
        startedAt: new Date(),
        endsAt: getEndDate(plan.code),
      });

      const token = create_token()

      await AccessToken.create({
        tokenHash: sha256(token),
        expiresAt: getEndDate(plan.code),
        userId: user.dataValues.id,
      });
      
      sendMailPurchase({to: payload.email, token: token, sale_id: payload.sale_id});

      if(payload.recurrence == "yearly"){
        sendMailFreeFill({to: payload.email})
      }
    } else {
      const customer = await Customer.findOne({where: {email: payload.email}});

      const subscription = await Subscription.findOne({where: {customerId: customer.dataValues.id, status: "active"}});

      await Subscription.update(
          { endsAt: getEndDate(payload.recurrence) },
          {
            where: { id: subscription.dataValues.id }
          }
        );
    }
  
    return res.status(200);    
  } catch (err) {
    console.log(err);
  }
});

gumroadRouter.post("/cancellation", async (req, res) => {
    //gestion de cancelación
    const payload = req.body;

    try {
      const customer = await Customer.findOne({where: {email: payload.user_email}});

      if(!customer) return res.status(403).message("User not in database")

      const subscription = await Subscription.findOne({where: {customerId: customer.dataValues.id, status: "active"}});

      await Subscription.update(
        { status: "canceled" },
        {
          where: { id: subscription.dataValues.id }
        }
      );
    } catch (err) {

    }
    
});


gumroadRouter.get("/test/send_mail", async (req, res) => {
  await sendMailPurchase({to: "vserveraferrer@gmail.com", token: "Contraseña de prueba", sale_id: "1"});

  return res.status(200);
});

export default gumroadRouter