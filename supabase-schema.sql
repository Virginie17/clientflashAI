-- Créer la table leads pour capturer les prospects
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_type TEXT NOT NULL,
  city TEXT,
  instagram_or_website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer la sécurité au niveau ligne (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre les insertions anonymes
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre les lectures anonymes (optionnel, pour le dashboard)
CREATE POLICY "Allow anonymous reads" ON leads
  FOR SELECT USING (true);

-- Index pour optimiser les performances
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_business_type ON leads(business_type);

-- Commentaire : Cette table stocke les prospects générés par la landing page ClientFlash AI
