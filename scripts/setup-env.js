#!/usr/bin/env node

/**
 * Script de configuration automatique des variables d'environnement
 * Ce script aide à configurer .env.local de manière sécurisée
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

function askQuestion(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function createEnvFile() {
  log('\n🔧 Création du fichier .env.local...', 'cyan');
  
  const envExamplePath = path.join(__dirname, '..', 'env.example');
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  
  try {
    // Vérifier si env.example existe
    if (!fs.existsSync(envExamplePath)) {
      logError('Le fichier env.example n\'existe pas!');
      logInfo('Assurez-vous d\'être dans le bon répertoire (scripts/).');
      process.exit(1);
    }
    
    // Lire le contenu de l'exemple
    const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');
    
    // Créer .env.local
    fs.writeFileSync(envLocalPath, envExampleContent);
    logSuccess('Fichier .env.local créé avec succès!');
    
    return true;
  } catch (error) {
    logError(`Erreur lors de la création du fichier: ${error.message}`);
    return false;
  }
}

async function configureVariables() {
  log('\n⚙️  Configuration des variables Supabase:', 'magenta');
  log('Veuillez fournir les informations suivantes:\n');
  
  const supabaseUrl = await askQuestion('URL de votre projet Supabase (https://your-project-ref.supabase.co): ');
  const supabaseKey = await askQuestion('Clé anonyme Supabase: ');
  
  if (!supabaseUrl || !supabaseKey) {
    logError('URL et clé Supabase sont requis!');
    process.exit(1);
  }
  
  // Validation basique
  if (!supabaseUrl.startsWith('https://')) {
    logError('L\'URL Supabase doit commencer par https://');
    process.exit(1);
  }
  
  if (supabaseKey.length < 100) {
    logError('La clé Supabase semble trop courte (minimum 100 caractères)');
    process.exit(1);
  }
  
  // Mettre à jour le fichier .env.local
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  let envContent = fs.readFileSync(envLocalPath, 'utf8');
  
  // Remplacer les valeurs par les vraies clés
  envContent = envContent.replace(/NEXT_PUBLIC_SUPABASE_URL=.*/, `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`);
  envContent = envContent.replace(/NEXT_PUBLIC_SUPABASE_ANON_KEY=.*/, `NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}`);
  
  fs.writeFileSync(envLocalPath, envContent);
  
  logSuccess('Variables Supabase configurées avec succès!');
  
  return {
    supabaseUrl,
    supabaseKey
  };
}

async function testConnection(supabaseUrl, supabaseKey) {
  log('\n🔗 Test de connexion à Supabase...', 'cyan');
  
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    log('Tentative de connexion...');
    
    // Test simple de connexion
    const { data, error } = await supabase
      .from('leads')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        logWarning('La table "leads" n\'existe pas encore.');
        logInfo('Exécutez: psql -d postgresql://user:password@localhost:5432/postgres -f supabase-schema.sql');
      } else {
        logError(`Erreur de connexion: ${error.message}`);
      }
      return false;
    } else {
      logSuccess('Connexion à Supabase réussie!');
        logInfo(`Total de leads actuels: ${data[0]?.count || 0}`);
        return true;
      }
  } catch (error) {
    logError(`Erreur lors du test de connexion: ${error.message}`);
    return false;
  }
}

function showNextSteps() {
  log('\n📋 Prochaines étapes:', 'magenta');
  log('1. Démarrer le serveur de développement:');
  log('   npm run dev');
  log('   ou');
  log('   yarn dev');
  log('\n2. Vérifier la configuration à tout moment:');
  log('   npm run check-env');
  log('\n3. Exécuter le script SQL si la table n\'existe pas:');
  log('   psql -d postgresql://user:password@localhost:5432/postgres -f supabase-schema.sql');
}

async function main() {
  log('🚀 ClientFlash AI - Configuration Automatique de l\'Environnement', 'bright');
  log('=' .repeat(60));
  
  // Étape 1: Créer le fichier .env.local
  const envCreated = await createEnvFile();
  
  if (!envCreated) {
    logError('Échec de la création du fichier .env.local');
    process.exit(1);
  }
  
  // Étape 2: Configurer les variables
  const { supabaseUrl, supabaseKey } = await configureVariables();
  
  // Étape 3: Tester la connexion
  const connectionOk = await testConnection(supabaseUrl, supabaseKey);
  
  // Résumé final
  log('\n' + '=' .repeat(60));
  
  if (connectionOk) {
    logSuccess('🎉 Configuration terminée avec succès!');
    logSuccess('Votre application ClientFlash AI est prête à capturer des leads!');
    logSuccess('Fichier .env.local configuré et sécurisé.');
  } else {
    logError('❌ La configuration a échoué.');
    showNextSteps();
    process.exit(1);
  }
}

// Exécuter la fonction principale
if (require.main === module) {
  main();
}

module.exports = { createEnvFile, configureVariables, testConnection };
