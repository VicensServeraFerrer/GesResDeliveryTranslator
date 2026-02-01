// routes/health.js
import 'dotenv/config.js'
import express from "express"
import { sequelize } from '../models/index.js'
const initDB = express.Router()

initDB.get('/db_test', async (req, res) => {
  try {
    await sequelize.authenticate()
    console.log("✅ DB connected");
  } catch {
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

initDB.get('/init', async (req, res) => {
  try {
    const table = "users"
    const desc = await sequelize.getQueryInterface().describeTable(table);
    res.json(desc)
  } catch {
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



export default initDB
