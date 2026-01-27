-- Recomendado para UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Usuarios de tu app (no necesariamente “clientes Gumroad”)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- “Clientes” (compradores) provenientes de Gumroad
-- Puede coincidir con user, pero lo separamos por claridad (B2B, varios users por customer, etc.)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  gumroad_user_id TEXT,          -- si lo recibes en payload
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Planes/productos que vendes (mapea tus gumroad_product_id o permalink)
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  gumroad_product_id TEXT UNIQUE, -- importante si usas API/verify
  interval TEXT NOT NULL CHECK (interval IN ('one_time','monthly','yearly')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Suscripción / licencia activa por customer
-- Para “mientras pague” se basa en status + current_period_end
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES plans(id),
  status TEXT NOT NULL CHECK (status IN ('active','past_due','canceled','expired')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  gumroad_subscription_id TEXT UNIQUE,  -- si existe en tu payload
  gumroad_sale_id TEXT UNIQUE,          -- si lo recibes por venta
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status_end ON subscriptions(status, current_period_end);

-- Tokens de login (magic links)
-- Guardamos solo hash del token para seguridad
CREATE TABLE IF NOT EXISTS login_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_login_tokens_user ON login_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_login_tokens_expires ON login_tokens(expires_at);

-- Registro de eventos/webhooks Gumroad (auditoría + idempotencia)
CREATE TABLE IF NOT EXISTS gumroad_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  gumroad_event_id TEXT,           -- si viene algún id único (a veces no)
  payload JSONB NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gumroad_events_type_time ON gumroad_events(event_type, received_at);
CREATE INDEX IF NOT EXISTS idx_gumroad_events_payload_gin ON gumroad_events USING GIN (payload);
