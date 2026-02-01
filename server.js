import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') })

import express from 'express'
import cors from 'cors'
import pedidoRouter from './routes/pedido.js'
import healthRouter from './routes/health.js'
import initDB from './routes/health.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/db", initDB);
app.use("/pedidos", pedidoRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
