document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uploadForm");
    const statusEl = document.getElementById("status");
    const button = form.querySelector("button");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        statusEl.textContent = "";
        statusEl.className = "status";

        const fileInput = document.getElementById("file");
        const headerInput = document.getElementById("headerText");

        if (!fileInput.files.length) {
        statusEl.textContent = "Selecciona un archivo primero.";
        statusEl.classList.add("error");
        return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        formData.append("headerText", headerInput.value || "");

        button.disabled = true;
        button.querySelector("span").textContent = "Generando...";

        try {
        const resp = await fetch("/api/pedidos", {
            method: "POST",
            body: formData
        });

        if (!resp.ok) {
            let msg = "Error al generar el documento.";
            try {
            const data = await resp.json();
            if (data.error) msg = data.error;
            } catch (_) {}
            throw new Error(msg);
        }

        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mensajes_pedidos.docx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        statusEl.textContent = "Documento generado correctamente. Revisa tus descargas.";
        statusEl.classList.add("ok");
        } catch (err) {
        statusEl.textContent = err.message;
        statusEl.classList.add("error");
        } finally {
        button.disabled = false;
        button.querySelector("span").textContent = "Generar mensajes";
        }
    });
});