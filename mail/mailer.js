import sgMail from '@sendgrid/mail'
import 'dotenv/config'
import { purchaseEmailTemplate } from './templates/purchaseEmailTemplate.js'
import { rellenamosEmailTemplate } from './templates/rellenamosEmailTemplate.js'

sgMail.setApiKey(process.env.API_KEY)
// sgMail.setDataResidency('eu'); 
// uncomment the above line if you are sending mail using a regional EU subuser

export function sendMailPurchase({to, token, sale_id}) {
  const msg = {
    to: to, // Change to your recipient
    from: process.env.SHOP_MAIL, // Change to your verified sender
    subject: 'Acceso a la web',
    html: purchaseEmailTemplate({accessLink: token, gumroad_sale_id: sale_id}),
  }

  sgMail.send(msg)
  .then(() => {
    return
  })
  .catch((err) => {
    console.error("SENDGRID ERROR:", err?.response?.body?.errors || err);
  })
}

export function sendMailRellenamos({to}) {
  const msg = {
      to: to, // Change to your recipient
      from: process.env.NOREPLY_MAIL, // Change to your verified sender
      subject: 'Información sobre relleno de plantillas',
      html: rellenamosEmailTemplate(),
    }

    sgMail.send(msg)
    .then(() => {
      return
    })
    .catch((err) => {
      console.error("SENDGRID ERROR:", err?.response?.body?.errors || err);
    })
}

export function sendMailAvisoAdmin({customer}) {
  const msg = {
      to: process.env.INFO_MAIL, // Change to your recipient
      from: process.env.NOREPLY_MAIL, // Change to your verified sender
      subject: 'Información sobre relleno de plantillas',
      text: `${customer} vol que li omplis plantilles. Revisa-ho!`,
    }

    sgMail.send(msg)
    .then(() => {
      return
    })
    .catch((err) => {
      console.error("SENDGRID ERROR:", err?.response?.body?.errors || err);
    })
}
