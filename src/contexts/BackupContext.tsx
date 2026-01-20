import React, { createContext, useContext, useState, useEffect } from 'react';

interface BackupEntry {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  user: string;
  data: any;
  type: 'lottery' | 'user' | 'payment' | 'settings';
}

interface BackupContextType {
  backupHistory: BackupEntry[];
  addBackupEntry: (action: string, details: string, data: any, type: BackupEntry['type']) => void;
  exportBackup: () => void;
  importBackup: (file: File) => Promise<void>;
  clearHistory: () => void;
}

const BackupContext = createContext<BackupContextType | undefined>(undefined);

export const useBackup = () => {
  const context = useContext(BackupContext);
  if (context === undefined) {
    throw new Error('useBackup must be used within a BackupProvider');
  }
  return context;
};

export const BackupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [backupHistory, setBackupHistory] = useState<BackupEntry[]>([]);

  useEffect(() => {
    // Charger l'historique depuis localStorage
    const savedHistory = localStorage.getItem('bitwin-backup-history');
    if (savedHistory) {
      setBackupHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addBackupEntry = (action: string, details: string, data: any, type: BackupEntry['type']) => {
    const newEntry: BackupEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      details,
      user: 'admin@bitwin.com', // En production, récupérer l'utilisateur connecté
      data,
      type
    };

    const updatedHistory = [newEntry, ...backupHistory].slice(0, 1000); // Garder les 1000 dernières entrées
    setBackupHistory(updatedHistory);
    localStorage.setItem('bitwin-backup-history', JSON.stringify(updatedHistory));
  };

  const exportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      history: backupHistory,
      siteData: {
        lotteries: JSON.parse(localStorage.getItem('bitwin-lotteries') || '[]'),
        users: JSON.parse(localStorage.getItem('bitwin-all-users') || '[]'),
        tickets: JSON.parse(localStorage.getItem('bitwin-all-tickets') || '[]'),
        globalStats: JSON.parse(localStorage.getItem('bitwin-global-stats') || '{}'),
        settings: JSON.parse(localStorage.getItem('bitwin-settings') || '{}'),
        backupHistory: backupHistory
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bitwin-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.download = `bitwin-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addBackupEntry(
      'Export de sauvegarde',
      'Sauvegarde complète du site exportée',
      { entriesCount: backupHistory.length },
      'settings'
    );
  };

  const importBackup = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const backupData = JSON.parse(e.target?.result as string);
          
          if (backupData.history) {
            setBackupHistory(backupData.history);
           localStorage.setItem('bitwin-backup-history', JSON.stringify(backupData.history));
          }

          if (backupData.siteData) {
            if (backupData.siteData.lotteries) {
              localStorage.setItem('bitwin-lotteries', JSON.stringify(backupData.siteData.lotteries));
            }
            if (backupData.siteData.users) {
              localStorage.setItem('bitwin-all-users', JSON.stringify(backupData.siteData.users));
            }
            if (backupData.siteData.tickets) {
              localStorage.setItem('bitwin-all-tickets', JSON.stringify(backupData.siteData.tickets));
            }
            if (backupData.siteData.globalStats) {
              localStorage.setItem('bitwin-global-stats', JSON.stringify(backupData.siteData.globalStats));
            }
            if (backupData.siteData.settings) {
              localStorage.setItem('bitwin-settings', JSON.stringify(backupData.siteData.settings));
            }
            if (backupData.siteData.backupHistory) {
              setBackupHistory(backupData.siteData.backupHistory);
              localStorage.setItem('bitwin-backup-history', JSON.stringify(backupData.siteData.backupHistory));
            }
          }

          addBackupEntry(
            'Import de sauvegarde',
            `Sauvegarde importée depuis ${file.name}`,
            { fileName: file.name, timestamp: backupData.timestamp },
            'settings'
          );

          resolve();
        } catch (error) {
          reject(new Error('Fichier de sauvegarde invalide'));
        }
      };
      reader.readAsText(file);
    });
  };

  const clearHistory = () => {
    setBackupHistory([]);
    localStorage.removeItem('bitwin-backup-history');
    
    addBackupEntry(
      'Nettoyage historique',
      'Historique des sauvegardes effacé',
      {},
      'settings'
    );
  };

  const value = {
    backupHistory,
    addBackupEntry,
    exportBackup,
    importBackup,
    clearHistory
  };

  return <BackupContext.Provider value={value}>{children}</BackupContext.Provider>;
};