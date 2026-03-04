import 'dotenv/config'

export function purchaseFreeFill() {
    return `
    <!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:20px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<!-- Header -->
<tr>
<td style="padding:28px 32px;background:#000000;">
  <h1 style="margin:0;color:#46c0ba;font-size:26px;">GesRes</h1>
</td>
</tr>

<!-- Saludo -->
<tr>
<td style="padding:32px 32px 16px 32px;">
  <h2 style="margin:0 0 10px 0;font-size:20px;color:#111;">
    Hola,
  </h2>
  <p style="margin:0;font-size:15px;color:#444;line-height:1.6;">
    Gracias por confiar en nosotros comprando el plan anual! Para poder rellenar gratuitamente 2 de tus plantillas
    contesta a este correo con la siguiente información.
  </p>
</td>
</tr>

<!-- Instrucciones -->
<tr>
<td style="padding:20px 32px;">
  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px;">
    
    <h3 style="margin-top:0;color:#000;font-size:16px;">Información mínima necesaria para cada plantilla:</h3>

    <ol style="padding-left:18px;color:#444;font-size:14px;line-height:1.7;">
      <li>Listado de proveedores (Nombre de proveedor, persona de contacto) y el numero de movil al que se envian los pedidos</li>
      <li>Referencias que se piden a cada proveedor (Referencia y unidad de compra (Caja 10uds, Botella...))</li>
    </ol>

    <h3 style="margin-top:0;color:#000;font-size:16px;">Información adicional para funcionamiento completo:</h3>

    <ol style="padding-left:18px;color:#444;font-size:14px;line-height:1.7;">
      <li>Precio/unidad de cada referencia</li>
      <li>Observaciones de cada proveedor/referencia</li>
    </ol>
  </div>
</td>
</tr>

<!-- Información adicional -->
<tr>
<td style="padding:10px 32px 24px 32px;">
  <p style="font-size:14px;color:#555;line-height:1.6;">
    Una vez recibamos la información, le enviaremos las plantillas rellenadas listas para usarse en menos de 48h.
  </p>

  <p style="font-size:14px;color:#555;line-height:1.6;">
    Si tienes cualquier duda escribenos a <strong>${process.env.INFO_MAIL}</strong>.
  </p>
</td>
</tr>

<!-- Recordatorio importante -->
<tr>
<td style="padding:0 32px 24px 32px;">
  <div style="background:#fff3cd;border:1px solid #ffeeba;border-radius:8px;padding:14px;">
    <p style="margin:0;font-size:13px;color:#856404;">
      ⚠️ El servicio no podrá empezar hasta que recibamos la información solicitada.
    </p>
  </div>
</td>
</tr>

<!-- Despedida -->
<tr>
<td style="padding:0 32px 32px 32px;">
  <p style="margin:0;font-size:14px;color:#444;">
    Gracias por tu colaboración.<br><br>
    Un saludo,<br>
    <strong>Equipo GesRes</strong>
  </p>
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