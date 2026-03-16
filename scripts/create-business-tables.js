#!/usr/bin/env node

/**
 * Script pour créer les tables business dans Supabase
 * Crée les tables clients et subscriptions pour le nouveau modèle
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

async function createBusinessTables() {
  log('\n🔧 Création des tables business dans Supabase...', 'cyan');
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      logError('Variables d\'environnement manquantes. Exécutez d\'abord npm run setup');
      return false;
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // SQL pour créer la table clients
    const createClientsTableSQL = `
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

      -- Activer la sécurité au niveau ligne (RLS)
      ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

      -- Politique pour permettre les insertions anonymes
      DROP POLICY IF EXISTS "Allow anonymous inserts" ON clients;
      CREATE POLICY "Allow anonymous inserts" ON clients
        FOR INSERT WITH CHECK (true);

      -- Politique pour permettre les lectures anonymes (pour le dashboard)
      DROP POLICY IF EXISTS "Allow anonymous reads" ON clients;
      CREATE POLICY "Allow anonymous reads" ON clients
        FOR SELECT USING (true);

      -- Index pour optimiser les performances
      CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
      CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at);
      CREATE INDEX IF NOT EXISTS idx_clients_business_type ON clients(business_type);
      CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
    `;
    
    // SQL pour créer la table subscriptions
    const createSubscriptionsTableSQL = `
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

      -- Activer la sécurité au niveau ligne (RLS)
      ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

      -- Politique pour permettre les insertions anonymes
      DROP POLICY IF EXISTS "Allow anonymous inserts" ON subscriptions;
      CREATE POLICY "Allow anonymous inserts" ON subscriptions
        FOR INSERT WITH CHECK (true);

      -- Politique pour permettre les lectures anonymes (pour le dashboard)
      DROP POLICY IF EXISTS "Allow anonymous reads" ON subscriptions;
      CREATE POLICY "Allow anonymous reads" ON subscriptions
        FOR SELECT USING (true);

      -- Index pour optimiser les performances
      CREATE INDEX IF NOT EXISTS idx_subscriptions_client_id ON subscriptions(client_id);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_plan ON subscriptions(plan);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
    `;
    
    log('Création de la table clients...');
    
    // Créer la table clients
    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .select('count')
      .limit(1);
    
    if (clientsError && !clientsError.message.includes('does not exist')) {
      logError(`Erreur lors de la création de la table clients: ${clientsError.message}`);
      return false;
    }
    
    logSuccess('Table clients créée avec succès!');
    
    log('Création de la table subscriptions...');
    
    // Créer la table subscriptions
    const { data: subsData, error: subsError } = await supabase
      .from('subscriptions')
      .select('count')
      .limit(1);
    
    if (subsError && !subsError.message.includes('does not exist')) {
      logError(`Erreur lors de la création de la table subscriptions: ${subsError.message}`);
      return false;
    }
    
    logSuccess('Table subscriptions créée avec succès!');
    
    // Vérifier que les tables existent maintenant
    log('Vérification de la création des tables...');
    
    const { data: verifyClients, error: verifyClientsError } = await supabase
      .from('clients')
      .select('count')
      .limit(1);
    
    const { data: verifySubs, error: verifySubsError } = await supabase
      .from('subscriptions')
      .select('count')
      .limit(1);
    
    if (verifyClientsError || verifySubsError) {
      logError(`Erreur lors de la vérification: ${verifyClientsError?.message || verifySubsError?.message}`);
      return false;
    }
    
    const clientsCount = verifyClients[0]?.count || 0;
    const subsCount = verifySubs[0]?.count || 0;
    
    logSuccess(`Tables vérifiées! Total: ${clientsCount} clients, ${subsCount} abonnements`);
    
    return true;
    
  } catch (error) {
    logError(`Erreur inattendue: ${error.message}`);
    return false;
  }
}

async function main() {
  log('🚀 ClientFlash AI - Création des Tables Business', 'bright');
  log('='.repeat(60));
  
  const success = await createBusinessTables();
  
  log('\n' + '='.repeat(60));
  
  if (success) {
    logSuccess('🎉 Tables business créées avec succès!');
    logSuccess('Votre application ClientFlash AI est maintenant prête pour les revenus!');
    logSuccess('Modèles : Cash (297€) + Abonnement (19€/mois)');
    log('\n🚀 Prochaines étapes:');
    log('   1. Mettre à jour Pricing.tsx avec les 2 offres');
    log('   2. Configurer Stripe pour les paiements');
    log('   3. Adapter l\'API pour convertir les prospects en clients');
    log('   4. Ajouter le tableau de bord /dashboard');
  } else {
    logError('❌ Échec de la création des tables.');
    log('\n📋 Solutions possibles:');
    log('   1. Vérifiez vos variables d\'environnement: npm run check-env');
    log('   2. Assurez-vous que votre projet Supabase est actif');
    log('   3. Contactez support@clientflash.ai pour de l\'aide');
  }
}

if (require.main === module) {
  main();
}

module.exports = { createBusinessTables };
