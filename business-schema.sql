-- Schema ClientFlash AI - Tables Business
-- Copiez-collez ce SQL dans votre projet Supabase > SQL Editor

-- Créer la table clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  business_type TEXT NOT NULL,
  city TEXT,
  instagram_or_website TEXT,
  phone TEXT,
  status TEXT DEFAULT 'prospect',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer la sécurité au niveau ligne (RLS) pour clients
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Politiques pour clients
DROP POLICY IF EXISTS "Allow anonymous inserts" ON clients;
CREATE POLICY "Allow anonymous inserts" ON clients
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous reads" ON clients;
CREATE POLICY "Allow anonymous reads" ON clients
  FOR SELECT USING (true);

-- Index pour optimiser les performances de clients
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at);
CREATE INDEX IF NOT EXISTS idx_clients_business_type ON clients(business_type);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);

-- Créer la table subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  price INTEGER NOT NULL,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer la sécurité au niveau ligne (RLS) pour subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Politiques pour subscriptions
DROP POLICY IF EXISTS "Allow anonymous inserts" ON subscriptions;
CREATE POLICY "Allow anonymous inserts" ON subscriptions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous reads" ON subscriptions;
CREATE POLICY "Allow anonymous reads" ON subscriptions
  FOR SELECT USING (true);

-- Index pour optimiser les performances de subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_client_id ON subscriptions(client_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan ON subscriptions(plan);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);

-- Créer la table leads (pour compatibilité avec l'ancien système)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_type TEXT NOT NULL,
  city TEXT,
  instagram_or_website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer la sécurité au niveau ligne (RLS) pour leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Politiques pour leads
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous reads" ON leads;
CREATE POLICY "Allow anonymous reads" ON leads
  FOR SELECT USING (true);

-- Index pour optimiser les performances de leads
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_business_type ON leads(business_type);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Appliquer le trigger aux tables
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE
  ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE
  ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE
  ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
