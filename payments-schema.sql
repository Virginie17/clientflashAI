-- Table pour les paiements Stripe
-- Ajoutez ce SQL à votre business-schema.sql ou exécutez-le séparément

CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT UNIQUE NOT NULL,
  client_email TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer la sécurité au niveau ligne (RLS)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Politiques pour payments
DROP POLICY IF EXISTS "Allow anonymous inserts" ON payments;
CREATE POLICY "Allow anonymous inserts" ON payments
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous reads" ON payments;
CREATE POLICY "Allow anonymous reads" ON payments
  FOR SELECT USING (true);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_payments_stripe_session_id ON payments(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_payments_client_email ON payments(client_email);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE
  ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
