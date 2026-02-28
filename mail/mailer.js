import sgMail from '@sendgrid/mail'
import 'dotenv/config'
import { purchaseEmailTemplate } from './templates/purchaseEmailTemplate.js'

sgMail.setApiKey(process.env.API_KEY)
// sgMail.setDataResidency('eu'); 
// uncomment the above line if you are sending mail using a regional EU subuser

export function sendMailPurchase({to, token, sale_id}) {
  const msg = {
    to: to, // Change to your recipient
    from: process.env.SHOP_MAIL, // Change to your verified sender
    subject: 'Acceso a la web',
    text: '',
    html: purchaseEmailTemplate({accessLink: token, gumroad_sale_id: sale_id}),
  }
  sgMail.send(msg)
  .then(() => {
    console.log('Email sent')
    return
  })
  .catch((error) => {
    console.error(error)
  })
}
