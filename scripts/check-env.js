#!/usr/bin/env node

/**
 * Script de vérification des variables d'environnement pour ClientFlash AI
 * Ce script vérifie que toutes les variables nécessaires sont configurées
 */

const { execSync } = require('child_process');

// Couleurs pour les messages
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

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function checkEnvFile() {
  const fs = require('fs');
  const path = require('path');
  
  const envFiles = ['.env.local', '.env', '.env.production'];
  let envFileExists = false;
  
  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      logSuccess(`Fichier d'environnement trouvé: ${file}`);
      envFileExists = true;
      break;
    }
  }
  
  if (!envFileExists) {
    logWarning('Aucun fichier .env trouvé');
    logInfo('Créez un fichier .env.local à partir de env.example');
    return false;
  }
  
  return true;
}

function checkRequiredEnvVars() {
  // Charger les variables d'environnement
  require('dotenv').config({ path: '.env.local' });
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];
  
  let allVarsPresent = true;
  
  log('\n🔍 Vérification des variables d\'environnement requises:', 'cyan');
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    
    if (!value) {
      logError(`${varName}: MANQUANTE`);
      allVarsPresent = false;
    } else if (varName.includes('SUPABASE_URL') && !value.startsWith('https://')) {
      logError(`${varName}: FORMAT INVALIDE (doit commencer par https://)`);
      allVarsPresent = false;
    } else if (varName.includes('SUPABASE_ANON_KEY') && value.length < 100) {
      logError(`${varName}: TROP COURTE (doit faire au moins 100 caractères)`);
      allVarsPresent = false;
    } else {
      logSuccess(`${varName}: CONFIGURÉE`);
    }
  });
  
  return allVarsPresent;
}

function checkSupabaseConnection() {
  log('\n🔗 Test de connexion à Supabase:', 'cyan');
  
  try {
    require('dotenv').config({ path: '.env.local' });
    
    // Importer le client Supabase pour tester la connexion
    const { createClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      logError('Impossible de tester la connexion: variables manquantes');
      return false;
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test simple de connexion
    log('Tentative de connexion à Supabase...');
    
    // Simuler une requête simple pour tester la connexion
    // Note: Ceci peut échouer si la table n'existe pas encore
    supabase
      .from('leads')
      .select('count')
      .limit(1)
      .then(({ data, error }) => {
        if (error) {
          if (error.code === 'PGRST116') {
            logWarning('La table "leads" n\'existe pas encore. C\'est normal pour une nouvelle installation.');
            logInfo('Exécutez le script SQL fourni dans supabase-schema.sql');
          } else {
            logError(`Erreur de connexion: ${error.message}`);
          }
        } else {
          logSuccess('Connexion à Supabase réussie!');
          logInfo(`Total de leads actuels: ${data[0]?.count || 0}`);
        }
      })
      .catch(err => {
        logError(`Erreur de connexion: ${err.message}`);
      });
      
    return true;
  } catch (error) {
    logError(`Erreur lors du test de connexion: ${error.message}`);
    return false;
  }
}

function showNextSteps() {
  log('\n📋 Étapes suivantes recommandées:', 'magenta');
  log('1. Si les variables sont manquantes:', 'white');
  log('   - Copiez env.example vers .env.local');
  log('   - Remplissez avec vos vraies clés Supabase');
  log('   - Redémarrez le serveur de développement');
  
  log('\n2. Si la table n\'existe pas:', 'white');
  log('   - Connectez-vous à https://supabase.com');
  log('   - Allez dans votre projet > SQL Editor');
  log('   - Copiez et exécutez le contenu de supabase-schema.sql');
  
  log('\n3. Pour démarrer le développement:', 'white');
  log('   npm run dev');
  log('   ou');
  log('   yarn dev');
  
  log('\n4. Pour vérifier à tout moment:', 'white');
  log('   node scripts/check-env.js');
}

// Fonction principale
function main() {
  log('🚀 ClientFlash AI - Vérification de l\'environnement', 'bright');
  log('=' .repeat(50));
  
  // Étape 1: Vérifier le fichier .env
  const envFileExists = checkEnvFile();
  
  if (!envFileExists) {
    showNextSteps();
    process.exit(1);
  }
  
  // Étape 2: Vérifier les variables requises
  const allVarsPresent = checkRequiredEnvVars();
  
  if (!allVarsPresent) {
    logError('\n❌ Configuration invalide. Corrigez les erreurs ci-dessus.');
    showNextSteps();
    process.exit(1);
  }
  
  // Étape 3: Tester la connexion Supabase
  const connectionOk = checkSupabaseConnection();
  
  // Résumé final
  log('\n' + '='.repeat(50));
  if (envFileExists && allVarsPresent && connectionOk) {
    logSuccess('🎉 Configuration complète et fonctionnelle!');
    logSuccess('Votre application ClientFlash AI est prête à capturer des leads!');
  } else {
    logError('❌ La configuration a des problèmes. Veuillez les corriger.');
    showNextSteps();
    process.exit(1);
  }
}

// Exécuter la fonction principale
if (require.main === module) {
  main();
}

module.exports = { checkEnvFile, checkRequiredEnvVars, checkSupabaseConnection };
