// routes/health.js
import 'dotenv/config.js'
import express from "express"
import { pool } from "../db.js"
const healthRouter = express.Router()

healthRouter.get('/db', async (req, res) => {
  try {
    const r = await pool.query('SELECT 1 AS ok')
    res.json({ ok: true, db: r.rows[0].ok })
  } catch (err) {
    console.error('DB query error full:', err) // <- clave
    res.status(500).json({
      ok: false,
      message: err.message,
      code: err.code,
      errno: err.errno,
      syscall: err.syscall,
      address: err.address,
      port: err.port
    })
  }
})


export default healthRouter
