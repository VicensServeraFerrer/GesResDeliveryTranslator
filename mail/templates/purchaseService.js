import 'dotenv/config'

export function purchaseService({ accessLink,  gumroad_sale_id }) {
    return `
    <!doctype html>
    <html lang="es">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="x-apple-disable-message-reformatting" />
        <title>Gracias por tu compra</title>
    </head>

    <body style="margin:0;padding:0;background:#f6f7fb;">
        <!-- Preheader (texto que aparece en la vista previa del email) -->
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        ¡Gracias por tu compra! Aquí tienes tu acceso y los siguientes pasos.
        </div>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f7fb;">
        <tr>
            <td align="center" style="padding:24px 12px;">
            <!-- Contenedor -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
                
                <!-- Header / Logo -->
                <tr>
                <td style="padding:22px 24px;border-bottom:1px solid #eef0f4;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="left" style="font-family:Arial,Helvetica,sans-serif;">
                        <div style="font-size:14px;color:#667085;line-height:1.4;">
                            GesRes
                        </div>
                        <div style="font-size:18px;color:#101828;font-weight:700;line-height:1.2;margin-top:4px;">
                            Confirmación de compra
                        </div>
                        </td>
                        <td align="right" style="font-family:Arial,Helvetica,sans-serif;">
                    </tr>
                    </table>
                </td>
                </tr>

                <!-- 1) Agradecimiento -->
                <tr>
                <td style="padding:24px 24px 8px 24px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:22px;line-height:1.25;color:#101828;font-weight:800;margin:0 0 10px 0;">
                    ¡Gracias por tu compra! 🎉
                    </div>
                    <div style="font-size:15px;line-height:1.6;color:#344054;">
                    Hemos recibido tu pedido <strong>#${gumroad_sale_id}</strong> y ya tienes acceso a tu contenido.
                    Abajo encontrarás el enlace directo a la web, la plantilla y los detalles.
                    </div>
                </td>
                </tr>
                
                <!-- 2) Qué está recibiendo -->
                <tr>
                <td style="padding:18px 24px 4px 24px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:16px;color:#101828;font-weight:800;margin:0 0 8px 0;">
                    Lo que estás recibiendo
                    </div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="background:#f8fafc;border:1px solid #eef2f6;border-radius:12px;">
                    <tr>
                        <td style="padding:14px 14px 8px 14px;">
                        <div style="font-size:14px;line-height:1.6;color:#344054;">
                            <ul style="margin:0;padding-left:18px;">
                            <li><strong>Producto:</strong> Gestor de mensajes de pedido</li>
                            <li><strong>Plantilla:</strong> ${process.env.LINK_PLANTILLA_PEDIDOS} </li>
                            <li><strong>Contrasenya acceso web:</strong> ${accessLink}</li>
                            <li><strong>Guia:</strong> {{INCLUYE}} (ej. actualizaciones, guía, ejemplos)</li>
                            </ul>
                        </div>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>

                <!-- Botón principal (Acceso) -->
                <tr>
                <td style="padding:16px 24px 6px 24px;font-family:Arial,Helvetica,sans-serif;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="center" bgcolor="#22ada6" style="border-radius:10px;">
                        <a href="http://app.gesres.es" target="_blank"
                            style="display:inline-block;padding:12px 18px;font-size:15px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;text-decoration:none;font-weight:700;">
                            Acceder ahora
                        </a>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>

                <!-- Separador -->
                <tr>
                <td style="padding:14px 24px;">
                    <div style="height:1px;background:#eef0f4;"></div>
                </td>
                </tr>

                <!-- 3) Upsell -->
                <tr>
                <td style="padding:0 24px 6px 24px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:16px;color:#f97316;font-weight:800;margin:0 0 8px 0;">
                    Mejora tu compra (recomendado)
                    </div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="background:#fff7ed;border:1px solid #ffedd5;border-radius:12px;">
                    <tr>
                        <td style="padding:14px;">
                        <div style="font-size:14px;line-height:1.6;color:#7c2d12;">
                            <strong>Rellenamos tu plantilla por ti</strong><br />
                            Para que el generador de pedidos funcione necesitas tener tu/s plantilla/s rellenada/s con todos los proveedores y referencias. Para ello se requiere de tiempo.

                            Nosotros podemos rellenar tus plantillas por ti, hecha un vistazo a los precios pulsando el botón. 
                        </div>

                        <div style="margin-top:12px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td align="center" bgcolor="#f97316" style="border-radius:10px;">
                                <a href="https://gesres.gumroad.com/l/rellenamos_tu_plantilla" target="_blank"
                                    style="display:inline-block;padding:10px 14px;font-size:14px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;text-decoration:none;font-weight:700;">
                                    RELLENAMOS TU PLANTILLA PRECIOS
                                </a>
                                </td>
                            </tr>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>

                <!-- Despedida -->
                <tr>
                <td style="padding:18px 24px 22px 24px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:14px;line-height:1.7;color:#344054;">
                    Gracias de nuevo por confiar en <strong>GesRes</strong>.<br />
                    Si necesitas ayuda para ponerlo en marcha, contesta a este correo y te echamos una mano.
                    </div>

                    <div style="margin-top:14px;font-size:14px;line-height:1.7;color:#344054;">
                    Un saludo,<br />
                    </div>
                </td>
                </tr>
            </table>

            <!-- Footer legal -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;">
                <tr>
                <td style="padding:14px 8px 0 8px;font-family:Arial,Helvetica,sans-serif;color:#98a2b3;font-size:12px;line-height:1.5;text-align:center;">
                    GesRes<br />
                    Si no has realizado esta compra, contáctanos en <a href="mailto: ${process.env.INFO_MAIL}" style="color:#667085;text-decoration:none;"> ${process.env.INFO_MAIL}</a>.
                </td>
                </tr>
            </table>

            </td>
        </tr>
        </table>
    </body>
    </html>
    `
}