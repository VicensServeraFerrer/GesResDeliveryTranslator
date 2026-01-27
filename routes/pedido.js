import express from 'express'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'

const pedidoRouter = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadsDir = path.join(__dirname, '../uploads')
const outputsDir = path.join(__dirname, '../outputs')

fs.mkdirSync(uploadsDir, { recursive: true })
fs.mkdirSync(outputsDir, { recursive: true })

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir)
  },
  filename(req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

pedidoRouter.post("/generar", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("inputPath")
    return res.status(400).json({ error: "No se ha recibido ningún archivo" });
  }

  const inputPath = req.file.path;
  const outputFilename = "mensajes_pedidos_" + Date.now() + ".docx";
  const outputPath = path.join(outputsDir, outputFilename);
  

  const sheetName = "Pedido";
  const headerRow = 7;
  
  // 👉 Cabecera que viene del formulario (campo "headerText")
  const headerText =
    (req.body && req.body.headerText) ||
    "Hola, os paso el pedido para esta semana:";

  const py = spawn("python3", [
    path.join(__dirname, "../python/pedido_transcriptor.py"),
    "--input",
    inputPath,
    "--output",
    outputPath,
    "--sheet",
    sheetName,
    "--header-row",
    headerRow.toString(),
    "--header-text",
    headerText,
  ],);

  let stderr = "";

  py.stderr.on("data", (data) => {
    stderr += data.toString();
    console.error(data.toString());
  });

  py.stdout.on("data", (data) => {
    console.log(data);        // <Buffer 48 6f 6c 61 0a>
    console.log(data.toString()); // "Hola\n"
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

export default pedidoRouter