import sgMail from '@sendgrid/mail'
import 'dotenv/config'

sgMail.setApiKey(process.env.API_KEY)
// sgMail.setDataResidency('eu'); 
// uncomment the above line if you are sending mail using a regional EU subuser

const msg = {
  to: 'vserveraferrer@gmail.com', // Change to your recipient
  from: 'shop@msg.gesres.es', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

export function sendMail() {
  sgMail.send(msg)
  .then(() => {
    console.log('Email sent')
    return
  })
  .catch((error) => {
    console.error(error)
  })
}
