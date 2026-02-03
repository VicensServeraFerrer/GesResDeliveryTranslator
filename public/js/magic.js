(async function () {
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const statusEl = document.getElementById("status");

  if (!token) {
    location.replace("/expired.html?reason=token");
    return;
  }

  try {
    statusEl.textContent = "Creando sesión…";

    // Backend recomendado: POST /api/auth/magic/exchange { token }
    await apiFetch("/validate/magic/exchange", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    // Validación extra (opcional): comprobar suscripción
    const sub = await apiFetch("/validate/subscription/status", { method: "GET" });
    if (!sub || sub.active !== true) {
      location.replace("/expired.html?reason=sub");
      return;
    }

    location.replace("/app/order.html");
  } catch (e) {
    const code = e?.data?.code;
    if (e.status === 403 && code === "SUBSCRIPTION_EXPIRED") {
      location.replace("/expired.html?reason=sub");
    } else {
      location.replace("/expired.html?reason=token");
    }
  }
})();
