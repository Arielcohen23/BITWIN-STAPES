import Airtable from 'airtable';

// Configuration Airtable
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

// Initialiser Airtable seulement si les clés sont disponibles
let base: any = null;

if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
  try {
    base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
  } catch (error) {
    console.warn('Airtable initialization failed:', error);
  }
}

// Types pour les données
interface AirtableUser {
  'Nom': string;
  'Email': string;
  'Date d\'inscription': string;
  'Nombre de tickets': number;
  'Gains totaux': number;
  'Code de parrainage': string;
  'Dernière activité': string;
  'Statut': string;
}

interface AirtableTicket {
  'ID Ticket': string;
  'Email utilisateur': string;
  'Type de loterie': string;
  'Date d\'achat': string;
  'Prix payé': number;
  'Numéro de ticket': string;
  'Statut': string;
  'Date de tirage': string;
  'Résultat': string;
}

interface AirtableTransaction {
  'ID Transaction': string;
  'Email utilisateur': string;
  'Type': string;
  'Montant': number;
  'Date': string;
  'Méthode de paiement': string;
  'Statut': string;
}

interface AirtableParrainage {
  'Email parrain': string;
  'Email filleul': string;
  'Date de parrainage': string;
  'Ticket gratuit donné': boolean;
  'Statut': string;
}

class AirtableService {
  private isConfigured(): boolean {
    return base !== null && AIRTABLE_API_KEY && AIRTABLE_BASE_ID;
  }

  // Table des utilisateurs
  private get usersTable() {
    return this.isConfigured() ? base('Utilisateurs') : null;
  }
  
  private get ticketsTable() {
    return this.isConfigured() ? base('Tickets') : null;
  }
  
  private get transactionsTable() {
    return this.isConfigured() ? base('Transactions') : null;
  }
  
  private get parrainageTable() {
    return this.isConfigured() ? base('Parrainages') : null;
  }

  // Synchroniser un utilisateur
  async syncUser(userData: any) {
    if (!this.isConfigured()) {
      console.warn('Airtable not configured - skipping user sync');
      return;
    }
    
    try {
      const airtableUser: AirtableUser = {
        'Nom': userData.name,
        'Email': userData.email,
        'Date d\'inscription': userData.joinDate,
        'Nombre de tickets': userData.tickets || 0,
        'Gains totaux': userData.totalWinnings || 0,
        'Code de parrainage': userData.referralCode,
        'Dernière activité': userData.lastActivity || new Date().toISOString(),
        'Statut': 'Actif'
      };

      // Vérifier si l'utilisateur existe déjà
      const existingUsers = await this.usersTable.select({
        filterByFormula: `{Email} = "${userData.email}"`
      }).firstPage();

      if (existingUsers.length > 0) {
        // Mettre à jour l'utilisateur existant
        await this.usersTable.update(existingUsers[0].id, airtableUser);
        console.log(`Utilisateur mis à jour: ${userData.email}`);
      } else {
        // Créer un nouvel utilisateur
        await this.usersTable.create(airtableUser);
        console.log(`Nouvel utilisateur créé: ${userData.email}`);
      }
    } catch (error) {
      console.error('Erreur lors de la synchronisation utilisateur:', error);
    }
  }

  // Synchroniser un ticket
  async syncTicket(ticketData: any, userEmail: string) {
    if (!this.isConfigured()) {
      console.warn('Airtable not configured - skipping ticket sync');
      return;
    }
    
    try {
      const airtableTicket: AirtableTicket = {
        'ID Ticket': ticketData.id,
        'Email utilisateur': userEmail,
        'Type de loterie': ticketData.type === 'jackpot' ? 'Jackpot Hebdomadaire' : 'Méga Jackpot Mensuel',
        'Date d\'achat': ticketData.purchaseDate,
        'Prix payé': ticketData.ticketPrice,
        'Numéro de ticket': ticketData.ticketNumber,
        'Statut': ticketData.status === 'active' ? 'Actif' : 'Terminé',
        'Date de tirage': ticketData.drawDate,
        'Résultat': ticketData.result || 'En attente'
      };

      await this.ticketsTable.create(airtableTicket);
      console.log(`Ticket synchronisé: ${ticketData.ticketNumber}`);
    } catch (error) {
      console.error('Erreur lors de la synchronisation ticket:', error);
    }
  }

  // Synchroniser une transaction
  async syncTransaction(transactionData: any, userEmail: string) {
    if (!this.isConfigured()) {
      console.warn('Airtable not configured - skipping transaction sync');
      return;
    }
    
    try {
      const airtableTransaction: AirtableTransaction = {
        'ID Transaction': transactionData.transactionHash || transactionData.id,
        'Email utilisateur': userEmail,
        'Type': 'Achat de tickets',
        'Montant': transactionData.finalAmount || transactionData.amount,
        'Date': transactionData.date || new Date().toISOString(),
        'Méthode de paiement': transactionData.paymentMethod || 'Carte bancaire',
        'Statut': 'Confirmé'
      };

      await this.transactionsTable.create(airtableTransaction);
      console.log(`Transaction synchronisée: ${transactionData.id}`);
    } catch (error) {
      console.error('Erreur lors de la synchronisation transaction:', error);
    }
  }

  // Synchroniser un parrainage
  async syncReferral(referrerEmail: string, referredEmail: string) {
    if (!this.isConfigured()) {
      console.warn('Airtable not configured - skipping referral sync');
      return;
    }
    
    try {
      const airtableParrainage: AirtableParrainage = {
        'Email parrain': referrerEmail,
        'Email filleul': referredEmail,
        'Date de parrainage': new Date().toISOString(),
        'Ticket gratuit donné': true,
        'Statut': 'Actif'
      };

      await this.parrainageTable.create(airtableParrainage);
      console.log(`Parrainage synchronisé: ${referrerEmail} -> ${referredEmail}`);
    } catch (error) {
      console.error('Erreur lors de la synchronisation parrainage:', error);
    }
  }

  // Synchroniser toutes les données existantes
  async syncAllExistingData() {
    if (!this.isConfigured()) {
      console.warn('Airtable not configured - cannot sync data');
      return;
    }
    
    try {
      console.log('🔄 Début de la synchronisation complète...');

      // Synchroniser tous les utilisateurs
      const allUsers = JSON.parse(localStorage.getItem('bitwin-all-users') || '[]');
      for (const user of allUsers) {
        await this.syncUser(user);
        await new Promise(resolve => setTimeout(resolve, 100)); // Délai pour éviter les limites de taux
      }

      // Synchroniser tous les tickets
      const allTickets = JSON.parse(localStorage.getItem('bitwin-all-tickets') || '[]');
      for (const ticket of allTickets) {
        await this.syncTicket(ticket, ticket.userEmail);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Synchroniser tous les parrainages
      const allReferrals = JSON.parse(localStorage.getItem('bitwin-referral-rewards') || '[]');
      for (const referral of allReferrals) {
        await this.syncReferral(referral.referrerEmail, referral.referredUserId);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      console.log('✅ Synchronisation complète terminée !');
    } catch (error) {
      console.error('❌ Erreur lors de la synchronisation complète:', error);
    }
  }

  // Obtenir des statistiques depuis Airtable
  async getStats() {
    if (!this.isConfigured()) {
      console.warn('Airtable not configured - returning null stats');
      return null;
    }
    
    try {
      const users = await this.usersTable.select().all();
      const tickets = await this.ticketsTable.select().all();
      const transactions = await this.transactionsTable.select().all();

      return {
        totalUsers: users.length,
        totalTickets: tickets.length,
        totalRevenue: transactions.reduce((sum, record) => {
          return sum + (record.fields['Montant'] as number || 0);
        }, 0),
        activeUsers: users.filter(record => record.fields['Statut'] === 'Actif').length
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des stats:', error);
      return null;
    }
  }

  // Exporter toutes les données
  async exportAllData() {
    if (!this.isConfigured()) {
      console.warn('Airtable not configured - cannot export data');
      return null;
    }
    
    try {
      const users = await this.usersTable.select().all();
      const tickets = await this.ticketsTable.select().all();
      const transactions = await this.transactionsTable.select().all();
      const parrainages = await this.parrainageTable.select().all();

      return {
        users: users.map(record => record.fields),
        tickets: tickets.map(record => record.fields),
        transactions: transactions.map(record => record.fields),
        parrainages: parrainages.map(record => record.fields),
        exportDate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      return null;
    }
  }
}

export const airtableService = new AirtableService();