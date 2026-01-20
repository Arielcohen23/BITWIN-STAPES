import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { useLottery } from './LotteryContext';

interface UserTicket {
  id: string;
  type: 'jackpot' | 'megaJackpot';
  purchaseDate: string;
  drawDate: string;
  status: 'active' | 'completed';
  prize: string;
  prizeEur: string;
  ticketNumber: string;
  transactionHash: string;
  lotteryName: string;
  ticketPrice: number;
  result?: 'winner' | 'loser' | 'pending';
}

interface AuthContextType {
  user: User | null;
  userTickets: UserTicket[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, referralCode?: string) => Promise<void>;
  logout: () => void;
  addTickets: (lotteryType: 'jackpot' | 'megaJackpot', count: number, lotteryData: any) => void;
  updateUserTickets: (tickets: UserTicket[]) => void;
  processReferralReward: (referredUserId: string, referrerCode: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Fonction pour notifier le dashboard admin des changements
const notifyAdminDashboard = (action: string, data: any) => {
  const event = new CustomEvent('adminUpdate', {
    detail: { action, data, timestamp: new Date().toISOString() }
  });
  window.dispatchEvent(event);
};

// Fonction pour mettre à jour les statistiques globales
const updateGlobalStats = () => {
  const allUsers = JSON.parse(localStorage.getItem('bitwin-all-users') || '[]');
  const allTickets = JSON.parse(localStorage.getItem('bitwin-all-tickets') || '[]');
  
  const stats = {
    totalUsers: allUsers.length,
    totalTickets: allTickets.length,
    totalRevenue: allTickets.reduce((sum: number, ticket: any) => sum + ticket.ticketPrice, 0),
    activeTickets: allTickets.filter((ticket: any) => ticket.status === 'active').length,
    completedTickets: allTickets.filter((ticket: any) => ticket.status === 'completed').length
  };
  
  localStorage.setItem('bitwin-global-stats', JSON.stringify(stats));
  notifyAdminDashboard('stats_updated', stats);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userTickets, setUserTickets] = useState<UserTicket[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Fonction pour mettre à jour le nombre de tickets dans les loteries
  const updateLotteryTicketCount = (lotteryType: 'jackpot' | 'megaJackpot', count: number) => {
    // Émettre un événement pour mettre à jour les loteries
    const event = new CustomEvent('updateTicketCount', {
      detail: { lotteryType, count }
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    const savedTickets = localStorage.getItem('userTickets');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAdmin(userData.email === 'admin@bitwin.com');
    }
    
    if (savedTickets) {
      setUserTickets(JSON.parse(savedTickets));
    }
  }, []);

  const generateTicketNumber = (type: 'jackpot' | 'megaJackpot'): string => {
    const prefix = type === 'jackpot' ? 'JKP' : 'MJP';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    return `${prefix}-${year}-${randomNum}`;
  };

  const generateTransactionHash = (): string => {
    return Math.random().toString(36).substring(2, 22);
  };

  const addTickets = (lotteryType: 'jackpot' | 'megaJackpot', count: number, lotteryData: any) => {
    const newTickets: UserTicket[] = [];
    const now = new Date().toISOString();
    
    for (let i = 0; i < count; i++) {
      const newTicket: UserTicket = {
        id: Date.now().toString() + i,
        type: lotteryType,
        purchaseDate: now,
        drawDate: lotteryData.nextDrawDate,
        status: 'active',
        prize: lotteryData.prize,
        prizeEur: lotteryData.prizeEur,
        ticketNumber: generateTicketNumber(lotteryType),
        transactionHash: generateTransactionHash(),
        lotteryName: lotteryData.name,
        ticketPrice: lotteryData.ticketPrice
      };
      newTickets.push(newTicket);
    }

    const updatedTickets = [...userTickets, ...newTickets];
    setUserTickets(updatedTickets);
    localStorage.setItem('userTickets', JSON.stringify(updatedTickets));

    // Mettre à jour les tickets globaux pour l'admin avec toutes les informations
    const allTickets = JSON.parse(localStorage.getItem('bitwin-all-tickets') || '[]');
    const newGlobalTickets = newTickets.map(ticket => ({
      ...ticket,
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      purchaseDate: now
    }));
    const updatedAllTickets = [...allTickets, ...newGlobalTickets];
    localStorage.setItem('bitwin-all-tickets', JSON.stringify(updatedAllTickets));

    // Mettre à jour le nombre total de tickets de l'utilisateur
    if (user) {
     // IMPORTANT: Mettre à jour lastTicketPurchase pour le statut actif
      const updatedUser = {
        ...user,
        tickets: user.tickets + count,
       lastActivity: now,
       lastTicketPurchase: now // Nouvelle propriété pour tracker les achats de tickets
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Mettre à jour l'utilisateur dans la liste globale
      const allUsers = JSON.parse(localStorage.getItem('bitwin-all-users') || '[]');
      const updatedAllUsers = allUsers.map((u: any) => 
        u.id === user.id 
         ? { ...u, tickets: u.tickets + count, lastActivity: now, lastTicketPurchase: now }
          : u
      );
      localStorage.setItem('bitwin-all-users', JSON.stringify(updatedAllUsers));

      // Vérifier si c'est le premier achat pour déclencher le parrainage
      const userPurchaseHistory = JSON.parse(localStorage.getItem(`user-${user.id}-purchases`) || '[]');
      const isFirstPurchase = userPurchaseHistory.length === 0;
      
      if (isFirstPurchase) {
        // Enregistrer cet achat
        userPurchaseHistory.push({
          date: now,
          ticketCount: count,
          lotteryType,
          amount: count * lotteryData.ticketPrice
        });
        localStorage.setItem(`user-${user.id}-purchases`, JSON.stringify(userPurchaseHistory));
        
        // Vérifier si l'utilisateur a été parrainé et si la récompense n'a pas encore été donnée
        const userReferralInfo = JSON.parse(localStorage.getItem(`user-${user.id}-referral`) || 'null');
        if (userReferralInfo && userReferralInfo.referrerCode && !userReferralInfo.rewardProcessed) {
          processReferralReward(user.id, userReferralInfo.referrerCode);
          
          // Marquer la récompense comme traitée
          userReferralInfo.rewardProcessed = true;
          userReferralInfo.rewardDate = now;
          localStorage.setItem(`user-${user.id}-referral`, JSON.stringify(userReferralInfo));
        }
      } else {
        // Juste enregistrer l'achat
        userPurchaseHistory.push({
          date: now,
          ticketCount: count,
          lotteryType,
          amount: count * lotteryData.ticketPrice
        });
        localStorage.setItem(`user-${user.id}-purchases`, JSON.stringify(userPurchaseHistory));
      }
    }

    // Notifier le dashboard admin
    notifyAdminDashboard('tickets_purchased', {
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      ticketCount: count,
      lotteryType,
      totalAmount: count * lotteryData.ticketPrice,
      tickets: newTickets
    });

    // Mettre à jour les statistiques globales
    updateGlobalStats();
    
    // Mettre à jour le nombre de tickets dans la loterie
    updateLotteryTicketCount(lotteryType, count);
  };

  const processReferralReward = (referredUserId: string, referrerCode: string) => {
    // Trouver le parrain par son code de parrainage
    const allUsers = JSON.parse(localStorage.getItem('bitwin-all-users') || '[]');
    const referrer = allUsers.find((u: any) => u.referralCode === referrerCode);
    
    if (!referrer) return;
    
    // Créer un ticket gratuit pour le parrain
    const now = new Date().toISOString();
    const nextWeeklyDraw = new Date();
    nextWeeklyDraw.setDate(nextWeeklyDraw.getDate() + 4);
    
    const referralTicket: UserTicket = {
      id: `referral-${Date.now()}`,
      type: 'jackpot',
      purchaseDate: now,
      drawDate: nextWeeklyDraw.toISOString(),
      status: 'active',
      prize: '1 Bitcoin',
      prizeEur: '≈ 95,000€',
      ticketNumber: generateTicketNumber('jackpot'),
      transactionHash: `REFERRAL-${generateTransactionHash()}`,
      lotteryName: 'Jackpot Hebdomadaire (Parrainage)',
      ticketPrice: 0 // Gratuit
    };
    
    // Ajouter le ticket aux tickets globaux
    const allTickets = JSON.parse(localStorage.getItem('bitwin-all-tickets') || '[]');
    allTickets.push({
      ...referralTicket,
      userId: referrer.id,
      userName: referrer.name,
      userEmail: referrer.email
    });
    localStorage.setItem('bitwin-all-tickets', JSON.stringify(allTickets));
    
    // Si le parrain est l'utilisateur connecté, mettre à jour ses tickets
    if (user && user.id === referrer.id) {
      const updatedTickets = [...userTickets, referralTicket];
      setUserTickets(updatedTickets);
      localStorage.setItem('userTickets', JSON.stringify(updatedTickets));
      
      // Mettre à jour le nombre de tickets de l'utilisateur
      const updatedUser = {
        ...user,
        tickets: user.tickets + 1
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } else {
      // Mettre à jour les tickets du parrain dans le localStorage
      const referrerTickets = JSON.parse(localStorage.getItem(`user-${referrer.id}-tickets`) || '[]');
      referrerTickets.push(referralTicket);
      localStorage.setItem(`user-${referrer.id}-tickets`, JSON.stringify(referrerTickets));
    }
    
    // Mettre à jour le nombre de tickets du parrain dans la liste des utilisateurs
    const updatedUsers = allUsers.map((u: any) => 
      u.id === referrer.id ? { ...u, tickets: u.tickets + 1 } : u
    );
    localStorage.setItem('bitwin-all-users', JSON.stringify(updatedUsers));
    
    // Enregistrer la récompense de parrainage
    const referralRewards = JSON.parse(localStorage.getItem('bitwin-referral-rewards') || '[]');
    referralRewards.push({
      id: Date.now().toString(),
      referrerId: referrer.id,
      referrerName: referrer.name,
      referrerEmail: referrer.email,
      referredUserId,
      rewardDate: now,
      ticketId: referralTicket.id,
      ticketNumber: referralTicket.ticketNumber
    });
    localStorage.setItem('bitwin-referral-rewards', JSON.stringify(referralRewards));
    
    // Notifier le dashboard admin
    notifyAdminDashboard('referral_reward', {
      referrer: {
        id: referrer.id,
        name: referrer.name,
        email: referrer.email
      },
      referredUserId,
      rewardTicket: referralTicket
    });
    
    // Mettre à jour les statistiques globales
    updateGlobalStats();
  };
  const updateUserTickets = (tickets: UserTicket[]) => {
    setUserTickets(tickets);
    localStorage.setItem('userTickets', JSON.stringify(tickets));
  };

  const login = async (email: string, password: string) => {
    // Mock authentication
    const isGoogleAuth = password === 'google-auth';
    const displayName = isGoogleAuth ? email.split('@')[0] : email.split('@')[0];
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name: displayName,
      tickets: 0, // Commencer à 0
      totalWinnings: 0,
      referralCode: 'BTC' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString()
    };
    
    setUser(mockUser);
    setIsAdmin(email === 'admin@bitwin.com');
    localStorage.setItem('currentUser', JSON.stringify(mockUser));

    // Si ce n'est pas l'admin, ajouter à la liste des utilisateurs
    if (email !== 'admin@bitwin.com') {
      const allUsers = JSON.parse(localStorage.getItem('bitwin-all-users') || '[]');
      const existingUser = allUsers.find((u: any) => u.email === email);
      
      if (!existingUser) {
        allUsers.push(mockUser);
        localStorage.setItem('bitwin-all-users', JSON.stringify(allUsers));
        
        // Notifier le dashboard admin
        notifyAdminDashboard('user_login', {
          user: mockUser,
          isNewUser: true,
          authMethod: isGoogleAuth ? 'Google' : 'Email'
        });
        
        updateGlobalStats();
      } else {
        // Mettre à jour la dernière activité pour un utilisateur existant
        const updatedUser = { ...existingUser, lastActivity: new Date().toISOString() };
        const updatedAllUsers = allUsers.map((u: any) => 
          u.id === existingUser.id ? updatedUser : u
        );
        localStorage.setItem('bitwin-all-users', JSON.stringify(updatedAllUsers));
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        notifyAdminDashboard('user_login', {
          user: updatedUser,
          isNewUser: false,
          authMethod: isGoogleAuth ? 'Google' : 'Email'
        });
      }
    }
  };

  const register = async (email: string, password: string, name: string, referralCode?: string) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      tickets: 0, // Commencer à 0
      totalWinnings: 0,
      referralCode: 'BTC' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      joinDate: new Date().toISOString().split('T')[0],
     lastActivity: new Date().toISOString(),
     lastTicketPurchase: null // Pas encore d'achat de ticket
    };
    
    setUser(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));

    // Si un code de parrainage est fourni, l'enregistrer pour traitement ultérieur lors du premier achat
    if (referralCode) {
      localStorage.setItem(`user-${mockUser.id}-referral`, JSON.stringify({
        referrerCode: referralCode,
        referralDate: new Date().toISOString(),
        rewardProcessed: false // Indique que la récompense n'a pas encore été donnée
      }));
    }

    // Ajouter à la liste des utilisateurs
    const allUsers = JSON.parse(localStorage.getItem('bitwin-all-users') || '[]');
    allUsers.push(mockUser);
    localStorage.setItem('bitwin-all-users', JSON.stringify(allUsers));

    // Notifier le dashboard admin
    notifyAdminDashboard('user_registered', {
      user: mockUser,
      referralCode: referralCode || null
    });

    updateGlobalStats();
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setUserTickets([]);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userTickets');
  };

  const value = {
    user,
    userTickets,
    isAuthenticated: !!user,
    isAdmin,
    login,
    register,
    logout,
    addTickets,
    updateUserTickets,
    processReferralReward
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};