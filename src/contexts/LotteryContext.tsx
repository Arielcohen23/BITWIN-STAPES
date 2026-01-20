import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Lottery {
  id: string;
  name: string;
  type: 'jackpot' | 'megaJackpot';
  prize: string;
  prizeEur: string;
  ticketPrice: number;
  maxParticipants: number;
  currentTickets: number;
  drawDate: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  frequency: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface LotteryContextType {
  lotteries: Lottery[];
  updateLottery: (lottery: Lottery) => void;
  createLottery: (lottery: Omit<Lottery, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteLottery: (id: string) => void;
  incrementTicketCount: (lotteryType: 'jackpot' | 'megaJackpot', count: number) => void;
  getLotteryById: (id: string) => Lottery | undefined;
  getActiveLotteries: () => Lottery[];
  refreshLotteries: () => void;
}

const LotteryContext = createContext<LotteryContextType | undefined>(undefined);

export const useLottery = () => {
  const context = useContext(LotteryContext);
  if (context === undefined) {
    throw new Error('useLottery must be used within a LotteryProvider');
  }
  return context;
};

// Loteries par défaut
const getDefaultLotteries = (): Lottery[] => {
  const nextWeeklyDraw = new Date();
  nextWeeklyDraw.setDate(nextWeeklyDraw.getDate() + 4);
  
  const nextMonthlyDraw = new Date();
  nextMonthlyDraw.setMonth(nextMonthlyDraw.getMonth() + 1);
  nextMonthlyDraw.setDate(1);

  return [
    {
      id: 'jackpot-weekly',
      name: 'Jackpot Hebdomadaire',
      type: 'jackpot',
      prize: '1 Bitcoin',
      prizeEur: '≈ 95,000€',
      ticketPrice: 29.99,
      maxParticipants: 3000,
      currentTickets: 0,
      drawDate: nextWeeklyDraw.toISOString(),
      status: 'active',
      frequency: 'Chaque dimanche à 20h00 UTC',
      description: 'Tirage hebdomadaire avec 1 Bitcoin à gagner',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'mega-jackpot-monthly',
      name: 'Méga Jackpot Mensuel',
      type: 'megaJackpot',
      prize: '3 Bitcoin',
      prizeEur: '≈ 285,000€',
      ticketPrice: 89.99,
      maxParticipants: 5000,
      currentTickets: 0,
      drawDate: nextMonthlyDraw.toISOString(),
      status: 'active',
      frequency: 'Le 1er de chaque mois à 20h00 UTC',
      description: 'Tirage mensuel avec 3 Bitcoin à gagner',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
};

export const LotteryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);

  // Charger les loteries depuis localStorage
  const loadLotteries = () => {
    const savedLotteries = localStorage.getItem('bitwin-lotteries');
    if (savedLotteries) {
      try {
        const parsed = JSON.parse(savedLotteries);
        setLotteries(parsed);
      } catch (error) {
        console.error('Erreur lors du chargement des loteries:', error);
        const defaultLotteries = getDefaultLotteries();
        setLotteries(defaultLotteries);
        localStorage.setItem('bitwin-lotteries', JSON.stringify(defaultLotteries));
      }
    } else {
      const defaultLotteries = getDefaultLotteries();
      setLotteries(defaultLotteries);
      localStorage.setItem('bitwin-lotteries', JSON.stringify(defaultLotteries));
    }
  };

  // Sauvegarder les loteries dans localStorage
  const saveLotteries = (updatedLotteries: Lottery[]) => {
    localStorage.setItem('bitwin-lotteries', JSON.stringify(updatedLotteries));
    setLotteries(updatedLotteries);
    
    // Émettre un événement pour notifier les autres composants
    const event = new CustomEvent('lotteriesUpdated', {
      detail: { lotteries: updatedLotteries }
    });
    window.dispatchEvent(event);
  };

  // Écouter les changements depuis le dashboard admin
  useEffect(() => {
    loadLotteries();

    // Écouter les mises à jour du nombre de tickets
    const handleTicketCountUpdate = (e: CustomEvent) => {
      const { lotteryType, count } = e.detail;
      const updatedLotteries = lotteries.map(lottery => {
        if (lottery.type === lotteryType && lottery.status === 'active') {
          return {
            ...lottery,
            currentTickets: lottery.currentTickets + count,
            updatedAt: new Date().toISOString()
          };
        }
        return lottery;
      });
      saveLotteries(updatedLotteries);
    };
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bitwin-lotteries' && e.newValue) {
        try {
          const updatedLotteries = JSON.parse(e.newValue);
          setLotteries(updatedLotteries);
        } catch (error) {
          console.error('Erreur lors de la synchronisation des loteries:', error);
        }
      }
    };

    const handleLotteryUpdate = (e: CustomEvent) => {
      loadLotteries(); // Recharger depuis localStorage
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('lotteriesUpdated', handleLotteryUpdate as EventListener);
    window.addEventListener('updateTicketCount', handleTicketCountUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('lotteriesUpdated', handleLotteryUpdate as EventListener);
      window.removeEventListener('updateTicketCount', handleTicketCountUpdate as EventListener);
    };
  }, [lotteries]);

  const updateLottery = (updatedLottery: Lottery) => {
    const updatedLotteries = lotteries.map(lottery =>
      lottery.id === updatedLottery.id
        ? { ...updatedLottery, updatedAt: new Date().toISOString() }
        : lottery
    );
    saveLotteries(updatedLotteries);
  };

  const createLottery = (lotteryData: Omit<Lottery, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLottery: Lottery = {
      ...lotteryData,
      id: `lottery-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedLotteries = [...lotteries, newLottery];
    saveLotteries(updatedLotteries);
  };

  const incrementTicketCount = (lotteryType: 'jackpot' | 'megaJackpot', count: number) => {
    const updatedLotteries = lotteries.map(lottery => {
      if (lottery.type === lotteryType && lottery.status === 'active') {
        return {
          ...lottery,
          currentTickets: lottery.currentTickets + count,
          updatedAt: new Date().toISOString()
        };
      }
      return lottery;
    });
    saveLotteries(updatedLotteries);
  };

  const deleteLottery = (id: string) => {
    const updatedLotteries = lotteries.filter(lottery => lottery.id !== id);
    saveLotteries(updatedLotteries);
  };

  const getLotteryById = (id: string) => {
    return lotteries.find(lottery => lottery.id === id);
  };

  const getActiveLotteries = () => {
    return lotteries.filter(lottery => lottery.status === 'active');
  };

  const refreshLotteries = () => {
    loadLotteries();
  };

  const value = {
    lotteries,
    updateLottery,
    createLottery,
    deleteLottery,
    incrementTicketCount,
    getLotteryById,
    getActiveLotteries,
    refreshLotteries
  };

  return <LotteryContext.Provider value={value}>{children}</LotteryContext.Provider>;
};