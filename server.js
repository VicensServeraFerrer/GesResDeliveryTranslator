import dotenv from 'dotenv'
import path from 'path'
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') })

import express from 'express'
import cors from 'cors'
import pedidoRouter from './routes/pedido.js'
import initDB from './routes/health.js';
import gumroadRouter from './routes/purchase_gumroad.js';
import tokenRouter from './routes/token.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.use("/db", initDB);
app.use("/pedidos", pedidoRouter);
app.use("/purchase", gumroadRouter);
app.use("/validate", tokenRouter)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
