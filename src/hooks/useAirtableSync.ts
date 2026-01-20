import { useEffect } from 'react';
import { airtableService } from '../services/airtableService';

// Hook pour synchroniser automatiquement les données
export const useAirtableSync = () => {
  useEffect(() => {
    // Écouter les événements de mise à jour des données
    const handleUserUpdate = (event: CustomEvent) => {
      const { user, isNewUser } = event.detail;
      if (isNewUser) {
        airtableService.syncUser(user);
      }
    };

    const handleTicketPurchase = (event: CustomEvent) => {
      const { userEmail, tickets, totalAmount, paymentMethod } = event.detail;
      
      // Synchroniser chaque ticket
      tickets.forEach((ticket: any) => {
        airtableService.syncTicket(ticket, userEmail);
      });

      // Synchroniser la transaction
      airtableService.syncTransaction({
        id: Date.now().toString(),
        finalAmount: totalAmount,
        paymentMethod: paymentMethod,
        date: new Date().toISOString()
      }, userEmail);
    };

    const handleReferralReward = (event: CustomEvent) => {
      const { referrer, referredUserId } = event.detail;
      airtableService.syncReferral(referrer.email, referredUserId);
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener('adminUpdate', handleUserUpdate as EventListener);
    window.addEventListener('adminUpdate', handleTicketPurchase as EventListener);
    window.addEventListener('adminUpdate', handleReferralReward as EventListener);

    return () => {
      window.removeEventListener('adminUpdate', handleUserUpdate as EventListener);
      window.removeEventListener('adminUpdate', handleTicketPurchase as EventListener);
      window.removeEventListener('adminUpdate', handleReferralReward as EventListener);
    };
  }, []);

  return {
    syncAllData: () => airtableService.syncAllExistingData(),
    getStats: () => airtableService.getStats(),
    exportData: () => airtableService.exportAllData()
  };
};