import { mailer } from "./mailer.js";

export async function sendAccessMail({ to, accessLink, planName }) {
  return await mailer.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Accés activat a la plataforma",
    html: `
      <h2>Gràcies per la teva compra</h2>
      <p>El teu pla <b>${planName}</b> ja està actiu.</p>
      <p>
        👉 <a href="${accessLink}">Accedir a la plataforma</a>
      </p>
      <p>Aquest enllaç és personal i segur.</p>
    `
  });
}
