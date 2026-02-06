async function guardAppPage() {
  try {
    // 1) Debe haber sesión
    //const isSessionOk = await apiFetch("/validate/session", { method: "GET", headers: {} });

    // 2) Debe haber suscripción activa
    const sub = await apiFetch("/validate/subscription/status", { method: "GET", headers: {} });

    if (!sub || sub.active !== true) {
      location.replace("/expired.html?reason=sub");
      return;
    }

    location.replace("/app/order.html");
  } catch (e) {
    // Si no hay sesión (401) o algo falla => fuera
    location.replace("/?reason=login");
  }
}
