#!/usr/bin/env node

/**
 * Script de backup automatique des données Supabase
 * Export des tables importantes vers JSON
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

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

class DatabaseBackup {
  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Variables Supabase manquantes');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.backupDir = path.join(process.cwd(), 'backups');
    
    // Créer le dossier backups si non existant
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  async backupTable(tableName) {
    try {
      logInfo(`Backup de la table: ${tableName}`);
      
      const { data, error } = await this.supabase
        .from(tableName)
        .select('*');
      
      if (error) {
        throw new Error(`Erreur backup ${tableName}: ${error.message}`);
      }
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${tableName}_backup_${timestamp}.json`;
      const filepath = path.join(this.backupDir, filename);
      
      const backupData = {
        table: tableName,
        timestamp: new Date().toISOString(),
        recordCount: data.length,
        data: data
      };
      
      fs.writeFileSync(filepath, JSON.stringify(backupData, null, 2));
      
      logSuccess(`${tableName}: ${data.length} enregistrements sauvegardés`);
      return { success: true, count: data.length, filename };
      
    } catch (error) {
      logError(`Backup ${tableName} échoué: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async backupAllTables() {
    const tables = ['clients', 'subscriptions', 'payments', 'leads'];
    const results = [];
    
    log('\n🗄️  Backup de la base de données Supabase...', 'cyan');
    log('='.repeat(60));
    
    for (const table of tables) {
      const result = await this.backupTable(table);
      results.push({ table, ...result });
    }
    
    // Créer un rapport de backup
    const report = {
      timestamp: new Date().toISOString(),
      totalTables: tables.length,
      successfulBackups: results.filter(r => r.success).length,
      failedBackups: results.filter(r => !r.success).length,
      results: results,
      summary: results.map(r => ({
        table: r.table,
        status: r.success ? '✅' : '❌',
        records: r.count || 0,
        filename: r.filename || 'N/A',
        error: r.error || null
      }))
    };
    
    const reportFilename = `backup_report_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const reportPath = path.join(this.backupDir, reportFilename);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  async cleanupOldBackups(daysToKeep = 30) {
    logInfo(`Nettoyage des backups de plus de ${daysToKeep} jours...`);
    
    const files = fs.readdirSync(this.backupDir);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    let deletedCount = 0;
    
    for (const file of files) {
      const filePath = path.join(this.backupDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.mtime < cutoffDate) {
        fs.unlinkSync(filePath);
        deletedCount++;
        logWarning(`Ancien backup supprimé: ${file}`);
      }
    }
    
    if (deletedCount > 0) {
      logSuccess(`${deletedCount} anciens backups supprimés`);
    } else {
      logInfo('Aucun ancien backup à supprimer');
    }
  }

  async getBackupStats() {
    const files = fs.readdirSync(this.backupDir);
    const backupFiles = files.filter(f => f.endsWith('.json'));
    
    const stats = {
      totalBackups: backupFiles.length,
      totalSize: 0,
      oldestBackup: null,
      newestBackup: null,
      tables: {}
    };
    
    for (const file of backupFiles) {
      const filePath = path.join(this.backupDir, file);
      const fileStats = fs.statSync(filePath);
      stats.totalSize += fileStats.size;
      
      if (!stats.oldestBackup || fileStats.mtime < stats.oldestBackup.mtime) {
        stats.oldestBackup = { file, date: fileStats.mtime };
      }
      
      if (!stats.newestBackup || fileStats.mtime > stats.newestBackup.mtime) {
        stats.newestBackup = { file, date: fileStats.mtime };
      }
      
      // Analyser le contenu pour compter par table
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const backup = JSON.parse(content);
        
        if (backup.table) {
          if (!stats.tables[backup.table]) {
            stats.tables[backup.table] = 0;
          }
          stats.tables[backup.table]++;
        }
      } catch (error) {
        // Ignorer les erreurs de lecture
      }
    }
    
    return stats;
  }
}

// Fonction principale
async function main() {
  try {
    const backup = new DatabaseBackup();
    
    // Backup de toutes les tables
    const report = await backup.backupAllTables();
    
    // Nettoyer les anciens backups
    await backup.cleanupOldBackups(30);
    
    // Afficher les statistiques
    const stats = await backup.getBackupStats();
    
    log('\n' + '='.repeat(60));
    logSuccess('🎉 Backup terminé avec succès !');
    
    log('\n📊 Statistiques du backup:');
    log(`   Tables sauvegardées: ${report.successfulBackups}/${report.totalTables}`);
    log(`   Total enregistrements: ${report.results.reduce((sum, r) => sum + (r.count || 0), 0)}`);
    log(`   Fichiers de backup: ${stats.totalBackups}`);
    log(`   Espace utilisé: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    log('\n📁 Dossier de backup: ./backups/');
    log('💡 Configurez une tâche cron pour des backups automatiques');
    
  } catch (error) {
    logError(`Erreur critique: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { DatabaseBackup };
