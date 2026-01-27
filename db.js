import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') })

import pg from 'pg'

const raw = process.env.DATABASE_URL
console.log('DATABASE_URL raw:', JSON.stringify(raw))

const url = (raw || '').trim()
if (!url) throw new Error('DATABASE_URL no definida (o vacía tras trim)')

export const pool = new pg.Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'app',
  password: 'app',
  database: 'appdb',
})
