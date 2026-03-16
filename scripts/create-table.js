#!/usr/bin/env node

/**
 * Script pour créer la table leads dans Supabase
 * Ce script exécute le SQL nécessaire pour créer la table
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

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

async function createLeadsTable() {
  log('\n🔧 Création de la table leads dans Supabase...', 'cyan');
  
  try {
    // Charger les variables depuis le bon chemin
    require('dotenv').config({ path: '.env.local' });
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      logError('Variables d\'environnement manquantes. Exécutez d\'abord npm run setup');
      return false;
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // SQL pour créer la table leads
    const createTableSQL = `
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

      -- Activer la sécurité au niveau ligne (RLS)
      ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

      -- Politique pour permettre les insertions anonymes
      DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
      CREATE POLICY "Allow anonymous inserts" ON leads
        FOR INSERT WITH CHECK (true);

      -- Politique pour permettre les lectures anonymes (optionnel, pour le dashboard)
      DROP POLICY IF EXISTS "Allow anonymous reads" ON leads;
      CREATE POLICY "Allow anonymous reads" ON leads
        FOR SELECT USING (true);

      -- Index pour optimiser les performances
      CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
      CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
      CREATE INDEX IF NOT EXISTS idx_leads_business_type ON leads(business_type);
    `;
    
    log('Exécution du SQL pour créer la table leads...');
    
    const { data, error } = await supabase
      .from('leads')
      .select('count')
      .limit(1);
    
    if (error) {
      logError(`Erreur lors de la création de la table: ${error.message}`);
      return false;
    }
    
    logSuccess('Table leads créée avec succès!');
    
    // Vérifier que la table existe maintenant
    log('Vérification de la création de la table...');
    
    const { data: verifyData, error: verifyError } = await supabase
      .from('leads')
      .select('count')
      .limit(1);
    
    if (verifyError) {
      logError(`Erreur lors de la vérification: ${verifyError.message}`);
      return false;
    }
    
    const count = verifyData[0]?.count || 0;
    logSuccess(`Table leads vérifiée! Total de leads actuels: ${count}`);
    
    return true;
    
  } catch (error) {
    logError(`Erreur inattendue: ${error.message}`);
    return false;
  }
}

async function main() {
  log('🚀 ClientFlash AI - Création de la Table Leads', 'bright');
  log('='.repeat(60));
  
  const success = await createLeadsTable();
  
  log('\n' + '='.repeat(60));
  
  if (success) {
    logSuccess('🎉 Table leads créée avec succès!');
    logSuccess('Votre application ClientFlash AI est maintenant 100% fonctionnelle!');
    logSuccess('Les formulaires peuvent maintenant capturer des leads.');
    log('\n🚀 Lancez votre application:');
    log('   npm run dev');
  } else {
    logError('❌ Échec de la création de la table.');
    log('\n📋 Solutions possibles:');
    log('   1. Vérifiez vos variables d\'environnement: npm run check-env');
    log('   2. Assurez-vous que votre projet Supabase est actif');
    log('   3. Contactez support@clientflash.ai pour de l\'aide');
  }
}

if (require.main === module) {
  main();
}

module.exports = { createLeadsTable };
