#!/usr/bin/env node

/**
 * Script de test pour les paiements Stripe
 * Test en mode test et vérification de la configuration
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
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

async function testStripeConfiguration() {
  log('\n🔧 Test de la configuration Stripe...', 'cyan');
  log('='.repeat(60));

  try {
    // Vérifier les variables d'environnement
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const publicUrl = process.env.NEXT_PUBLIC_URL;

    if (!stripeSecretKey) {
      logError('STRIPE_SECRET_KEY manquante');
      return false;
    }

    if (!stripePublishableKey) {
      logError('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY manquante');
      return false;
    }

    if (!publicUrl) {
      logWarning('NEXT_PUBLIC_URL non définie (utilise localhost par défaut)');
    }

    // Vérifier le mode (test/live)
    const isTestMode = stripeSecretKey.startsWith('sk_test_');
    const isLiveMode = stripeSecretKey.startsWith('sk_live_');

    if (isTestMode) {
      logSuccess('Mode TEST activé ✅');
    } else if (isLiveMode) {
      logWarning('Mode LIVE activé ⚠️');
    } else {
      logError('Format de clé Stripe invalide');
      return false;
    }

    // Vérifier la clé publishable
    const isTestPublishable = stripePublishableKey.startsWith('pk_test_');
    const isLivePublishable = stripePublishableKey.startsWith('pk_live_');

    if ((isTestMode && isTestPublishable) || (isLiveMode && isLivePublishable)) {
      logSuccess('Clés publishable cohérentes ✅');
    } else {
      logError('Incohérence entre clés secrète et publishable');
      return false;
    }

    // Test API Stripe
    const Stripe = require('stripe');
    const stripe = new Stripe(stripeSecretKey);

    logInfo('Test de connexion à l\'API Stripe...');
    const account = await stripe.accounts.retrieve();
    logSuccess(`Connexion réussie - Compte: ${account.business_profile?.name || 'Non défini'}`);

    // Test création de produit
    logInfo('Test de création de produit...');
    const product = await stripe.products.create({
      name: 'Test Product - ClientFlash AI',
      description: 'Produit de test pour vérifier la configuration',
      type: 'service',
    });
    logSuccess(`Produit créé: ${product.id}`);

    // Test de prix
    logInfo('Test de création de prix...');
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 29700, // 297€ en centimes
      currency: 'eur',
    });
    logSuccess(`Prix créé: ${price.id}`);

    // Test de session checkout
    logInfo('Test de création de session checkout...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: price.id,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${publicUrl || 'http://localhost:3000'}/success`,
      cancel_url: `${publicUrl || 'http://localhost:3000'}/pricing`,
      customer_email: 'test@clientflash.ai',
    });
    logSuccess(`Session checkout créée: ${session.id}`);
    logInfo(`URL de test: ${session.url}`);

    // Nettoyer les données de test
    await stripe.products.del(product.id);
    logSuccess('Données de test nettoyées');

    return true;

  } catch (error) {
    logError(`Erreur lors du test: ${error.message}`);
    return false;
  }
}

// Cartes de test Stripe
function showTestCards() {
  log('\n💳 Cartes de test Stripe:', 'cyan');
  log('='.repeat(40));
  
  logSuccess('Carte réussie: 4242 4242 4242 4242');
  logWarning('Carte refusée: 4000 0000 0000 0002');
  logInfo('3D Secure: 4000 0025 0000 3155');
  logInfo('Expirée: 4000 0000 0000 0069');
  
  log('\n📋 Dates de test valides:');
  logInfo('N\'importe quelle date future');
  logInfo('CVC: 3 chiffres (sauf carte 3D Secure)');
}

async function main() {
  log('🚀 ClientFlash AI - Test Configuration Stripe', 'bright');
  
  const success = await testStripeConfiguration();
  
  if (success) {
    showTestCards();
    log('\n' + '='.repeat(60));
    logSuccess('🎉 Configuration Stripe vérifiée avec succès !');
    logSuccess('Vous pouvez maintenant tester les paiements en production.');
    log('\n📝 Prochaines étapes:');
    log('   1. Testez avec npm run dev');
    log('   2. Utilisez les cartes de test ci-dessus');
    log('   3. Vérifiez le dashboard Stripe');
  } else {
    log('\n' + '='.repeat(60));
    logError('❌ Échec de la configuration Stripe.');
    log('\n🔧 Solutions possibles:');
    log('   1. Vérifiez vos clés Stripe: npm run check-env');
    log('   2. Assurez-vous que les clés sont valides');
    log('   3. Contactez support@stripe.com si problème persiste');
  }
}

if (require.main === module) {
  main();
}

module.exports = { testStripeConfiguration };
