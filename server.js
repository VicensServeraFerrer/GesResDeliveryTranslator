const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const uploadsDir = path.join(__dirname, "uploads");
const outputsDir = path.join(__dirname, "outputs");

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(outputsDir)) fs.mkdirSync(outputsDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post("/api/pedidos", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se ha recibido ningún archivo" });
  }

  const inputPath = req.file.path;
  const outputFilename = "mensajes_pedidos_" + Date.now() + ".docx";
  const outputPath = path.join(outputsDir, outputFilename);

  const sheetName = "Pedido";
  const headerRow = 6;

  // 👉 Cabecera que viene del formulario (campo "headerText")
  const headerText =
    (req.body && req.body.headerText) ||
    "Hola, os paso el pedido para esta semana:";

  const py = spawn("python3", [
    path.join(__dirname, "pedido_transcriptor.py"),
    "--input",
    inputPath,
    "--output",
    outputPath,
    "--sheet",
    sheetName,
    "--header-row",
    headerRow.toString(),
    "--header-text",
    headerText
  ]);

  let stderr = "";

  py.stderr.on("data", (data) => {
    stderr += data.toString();
    console.error(data.toString());
  });

  py.on("close", (code) => {
    fs.unlink(inputPath, () => {});

    if (code !== 0) {
      console.error("Python salió con código", code, stderr);
      return res.status(500).json({ error: "Error al generar el documento" });
    }

    if (!fs.existsSync(outputPath)) {
      return res.status(500).json({ error: "No se ha generado el archivo de salida" });
    }

    res.download(outputPath, outputFilename, (err) => {
      if (err) {
        console.error("Error al enviar el archivo:", err);
      }
      fs.unlink(outputPath, () => {});
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
