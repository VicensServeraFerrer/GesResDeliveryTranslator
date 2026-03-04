import sgMail from '@sendgrid/mail'
import 'dotenv/config'
import { purchaseService } from './templates/purchaseService.js'
import { rellenamosEmailTemplate } from './templates/rellenamosEmailTemplate.js'
import { purchaseEmailTemplateYearly } from './templates/purchaseFreeFill.js'

sgMail.setApiKey(process.env.API_KEY)

export function sendMailPurchase({to, token, sale_id}) {
  const msg = {
    to: to, 
    from: process.env.SHOP_MAIL,
    subject: 'Acceso a la web',
    html: purchaseService({accessLink: token, gumroad_sale_id: sale_id}),
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
      to: to, 
      from: process.env.NOREPLY_MAIL, 
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
      to: process.env.INFO_MAIL, 
      from: process.env.NOREPLY_MAIL, 
      subject: 'New customer!!!!',
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


export function sendMailFreeFill({to}) {
  const msg = {
      to: to, 
      from: process.env.NOREPLY_MAIL, 
      subject: 'Información sobre relleno de plantillas GRATIS',
      html: purchaseEmailTemplateYearly(),
    }

    sgMail.send(msg)
    .then(() => {
      return
    })
    .catch((err) => {
      console.error("SENDGRID ERROR:", err?.response?.body?.errors || err);
    })
}
