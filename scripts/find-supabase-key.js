#!/usr/bin/env node

/**
 * Guide pour trouver votre clé Supabase
 * Ce script vous aide à localiser votre clé anonyme dans l'interface Supabase
 */

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

function logStep(step, title) {
  log(`\n📍 Étape ${step}: ${title}`, 'magenta');
  log('─'.repeat(50), 'cyan');
}

function showInstructions() {
  log('\n📋 Instructions détaillées:', 'bright');
  log('\n1. Connectez-vous à votre tableau de bord Supabase:');
  log('   • Allez sur https://supabase.com');
  log('   • Connectez-vous avec votre compte');
  
  log('\n2. Accédez à votre projet:');
  log('   • Cliquez sur votre projet');
  log('   • Allez dans "Settings" (icône d\'engrenage ⚙️)');
  log('   • Cliquez sur "API" dans le menu latéral');
  
  log('\n3. Trouvez vos clés API:');
  log('   • Vous verrez "Project URL" et "anon public key"');
  log('   • Copiez l\'URL complète (https://your-project-ref.supabase.co)');
  log('   • Copiez la clé anonyme (commence par eyJhbGciOi...)');
  
  log('\n4. Configurez votre fichier .env.local:');
  log('   NEXT_PUBLIC_SUPABASE_URL=https://votre-url-complète');
  log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anonyme-complète');
  
  log('\n5. Vérifiez la configuration:');
  log('   npm run check-env');
  
  log('\n6. Démarrez le développement:');
  log('   npm run dev');
  
  log('\n🔍 Astuces de sécurité:');
  log('   • Ne partagez jamais vos clés');
  log('   • Utilisez .env.local uniquement pour le développement');
  log('   • En production, utilisez les variables d\'environnement système');
}

function main() {
  log('🔑 Guide pour trouver votre clé Supabase', 'bright');
  log('='.repeat(60));
  
  logStep(1, 'Connexion à Supabase');
  log('Connectez-vous à votre tableau de bord Supabase pour trouver vos clés API.');
  
  logStep(2, 'Accès aux paramètres API');
  log('Naviguez vers Settings > API dans votre projet.');
  
  logStep(3, 'Récupération des clés');
  log('Copiez l\'URL du projet et la clé anonyme.');
  
  logStep(4, 'Configuration locale');
  log('Ajoutez les clés à votre fichier .env.local.');
  
  logStep(5, 'Vérification et démarrage');
  log('Validez la configuration et lancez le développement.');
  
  log('\n' + '='.repeat(60));
  logSuccess('Guide terminé! Consultez les instructions ci-dessus.');
  logInfo('Pour une aide personnalisée: support@clientflash.ai');
  
  showInstructions();
}

if (require.main === module) {
  main();
}
