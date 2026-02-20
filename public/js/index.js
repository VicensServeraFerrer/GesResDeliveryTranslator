(function () {
  const input = document.getElementById("tokenInput");
  const button = document.getElementById("loginBtn");

  async function handleLogin() {
    const token = input.value.trim();

    if (!token) {
      alert("Introduce un token válido");
      return;
    }

    try {
      const response = await apiFetch("/validate/magic/exchange", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      if (response && response.ok === true) {
        // Redirige a pedido pasando el token
        location.replace(`/app/order.html?token=${encodeURIComponent(token)}`);
      } else {
        alert("Token incorrecto o expirado");
      }
    } catch (e) {
      console.error(e);
      alert("Error validando el token");
    }
  }

  // Click botón
  button.addEventListener("click", handleLogin);

  // Enter en el input
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleLogin();
    }
  });
})();