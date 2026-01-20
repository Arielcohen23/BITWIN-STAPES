import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";
import {
  Users,
  Ticket,
  Bitcoin,
  TrendingUp,
  Calendar,
  Trophy,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Search,
  Filter,
  RefreshCw,
  BarChart3,
  Activity,
  Settings,
  Save,
  Upload,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  X,
  Play,
  Pause,
  MoreHorizontal,
  Archive,
  Globe,
  CalendarDays,
  UserPlus
} from 'lucide-react';
import { useBackup } from '../contexts/BackupContext';
import { useLottery } from '../contexts/LotteryContext';
import { useAirtableSync } from '../hooks/useAirtableSync';
import AirtableSync from '../components/AirtableSync';
import NewsManagement from '../components/NewsManagement';

interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  user: string;
  type: 'lottery' | 'user' | 'payment' | 'settings';
}

const AdminDashboard: React.FC = () => {
  // États pour les filtres et la vue
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'lotteries' | 'users' | 'tickets' | 'winners' | 'activity' | 'backup' | 'news'>('overview');
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [userStatusFilter, setUserStatusFilter] = useState<string>('all');
  const [userCountryFilter, setUserCountryFilter] = useState<string>('all');
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['revenue']);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [granularity, setGranularity] = useState<'day' | 'week' | 'month' | 'draw'>('day');

  // États pour les nouveaux filtres de l'onglet overview
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'custom'>('month');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedLottery, setSelectedLottery] = useState<string>('all');
  const [selectedLotteryStatus, setSelectedLotteryStatus] = useState<string>('all');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [chartMetrics, setChartMetrics] = useState({
    revenue: true,
    tickets: true,
    users: true,
    draws: false
  });

  // Configuration des métriques disponibles
  const availableMetrics = [
    { 
      key: 'revenue', 
      label: 'Revenus (€)', 
      color: '#10B981', 
      icon: '💰',
      format: (value: number) => `${value.toLocaleString()}€`
    },
    { 
      key: 'tickets', 
      label: 'Tickets Vendus', 
      color: '#3B82F6', 
      icon: '🎫',
      format: (value: number) => value.toLocaleString()
    },
    { 
      key: 'users', 
      label: 'Nouveaux Utilisateurs', 
      color: '#8B5CF6', 
      icon: '👥',
      format: (value: number) => value.toLocaleString()
    },
    { 
      key: 'draws', 
      label: 'Tirages Effectués', 
      color: '#F59E0B', 
      icon: '🎲',
      format: (value: number) => value.toLocaleString()
    }
  ];

  // États pour la gestion des loteries
  const [lotteryTab, setLotteryTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [showLotteryModal, setShowLotteryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [lotteryToDelete, setLotteryToDelete] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<Partial<any>>({});
  const [addFormData, setAddFormData] = useState({
    name: '',
    type: 'jackpot' as 'jackpot' | 'megaJackpot',
    prize: '',
    prizeEur: '',
    ticketPrice: '',
    maxParticipants: '',
    drawDate: '',
    frequency: '',
    description: ''
  });

  // États pour les données
  const [users, setUsers] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [winners, setWinners] = useState<any[]>([]);
  const [metricsVisibility, setMetricsVisibility] = useState({
    revenus: true,
    tickets: true,
    users: true,
    draws: true
  });
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // États pour les tickets avec filtres
  const [globalStats, setGlobalStats] = useState<any>({});
  const [selectedLotteryFilter, setSelectedLotteryFilter] = useState<string>('');

  // États pour les tickets avec filtres
  const [ticketsDateRange, setTicketsDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // Fonction pour calculer le montant total dépensé par un utilisateur
  const calculateUserTotalSpent = (userId: string) => {
    return allTickets
      .filter(ticket => ticket.userId === userId)
      .reduce((total, ticket) => total + (ticket.ticketPrice || 0), 0);
  };

  // Fonction pour déterminer le statut d'un utilisateur
  const getUserStatus = (user: any) => {
    if (!user.lastActivity) return 'Inactif';
    
    const lastActivity = new Date(user.lastActivity);
    const now = new Date();
    const daysSinceLastActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastActivity <= 7) return 'Actif';
    if (daysSinceLastActivity <= 30) return 'Modérément actif';
    return 'Inactif';
  };

  // Fonction pour obtenir le pays depuis l'email (simulation)
  const getUserCountry = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain?.includes('.fr')) return { name: 'France', flag: '🇫🇷' };
    if (domain?.includes('.com')) return { name: 'International', flag: '🌍' };
    if (domain?.includes('.de')) return { name: 'Allemagne', flag: '🇩🇪' };
    if (domain?.includes('.es')) return { name: 'Espagne', flag: '🇪🇸' };
    if (domain?.includes('.it')) return { name: 'Italie', flag: '🇮🇹' };
    return { name: 'International', flag: '🌍' };
  };

  // Fonction pour générer un numéro de téléphone fictif
  const generatePhoneNumber = (userId: string) => {
    const hash = userId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const phoneNumber = Math.abs(hash % 900000000) + 100000000;
    return `+33 ${phoneNumber.toString().substring(0, 1)} ${phoneNumber.toString().substring(1, 3)} ${phoneNumber.toString().substring(3, 5)} ${phoneNumber.toString().substring(5, 7)} ${phoneNumber.toString().substring(7, 9)}`;
  };

  // Fonction pour filtrer les tickets
  const getFilteredTickets = () => {
    return allTickets.filter(ticket => {
      // Filtre par loterie
      const matchesLottery = selectedLotteryFilter === '' || ticket.lotteryName === selectedLotteryFilter;
      
      // Filtre par date
      let matchesDate = true;
      if (ticketsDateRange.startDate || ticketsDateRange.endDate) {
        const ticketDate = new Date(ticket.purchaseDate);
        const startDate = ticketsDateRange.startDate ? new Date(ticketsDateRange.startDate) : null;
        const endDate = ticketsDateRange.endDate ? new Date(ticketsDateRange.endDate) : null;
        
        if (startDate && ticketDate < startDate) matchesDate = false;
        if (endDate && ticketDate > endDate) matchesDate = false;
      }
      
      return matchesLottery && matchesDate;
    });
  };
  
  // Calculer les tickets filtrés
  const filteredTickets = allTickets.filter(ticket => {
    // Filtre par loterie
    const matchesLottery = selectedLotteryFilter === '' || ticket.lotteryName === selectedLotteryFilter;
    
    // Filtre par date
    let matchesDate = true;
    if (dateRange.startDate || dateRange.endDate) {
      const ticketDate = new Date(ticket.purchaseDate);
      const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;
      
      if (startDate && ticketDate < startDate) matchesDate = false;
      if (endDate && ticketDate > endDate) matchesDate = false;
    }
    
    return matchesLottery && matchesDate;
  });
  
  // Obtenir la liste unique des loteries
  const uniqueLotteries = [...new Set(allTickets.map(ticket => ticket.lotteryName))].filter(Boolean);
  
  // Fonction d'export Excel
  const exportToExcel = () => {
    const dataToExport = filteredTickets.map(ticket => ({
      'Utilisateur': ticket.userName || 'N/A',
      'Email': ticket.userEmail || 'N/A',
      'Loterie': ticket.lotteryName || 'N/A',
      'Prix': `${ticket.ticketPrice || 0}€`,
      'Date d\'achat': new Date(ticket.purchaseDate).toLocaleDateString('fr-FR'),
      'Statut': ticket.status === 'active' ? 'Actif' : 'Terminé'
    }));
    
    // Créer le contenu CSV
    const headers = ['Utilisateur', 'Email', 'Loterie', 'Prix', 'Date d\'achat', 'Statut'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(row => 
        headers.map(header => `"${row[header] || ''}"`).join(',')
      )
    ].join('\n');
    
    // Télécharger le fichier
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const fileName = selectedLotteryFilter 
      ? `tickets-${selectedLotteryFilter.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`
      : `tickets-tous-${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearDateFilter = () => {
    setDateRange({
      startDate: '',
      endDate: ''
    });
  };

  // Fonction pour générer des données de test réalistes
  const generateTestData = () => {
    // Données de test avec des valeurs non nulles pour forcer l'affichage
    const data = [];
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Générer des données réalistes avec variations
      const baseRevenue = 1000 + Math.random() * 2000;
      const baseTickets = 20 + Math.random() * 80;
      const baseUsers = 5 + Math.random() * 25;
      const baseDraws = Math.random() > 0.8 ? 1 : 0; // Tirages occasionnels
      
      data.push({
        date: currentDate.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 2000) + 1000, // Valeurs plus élevées
        tickets: Math.floor(Math.random() * 100) + 50,    // Valeurs plus élevées
        users: Math.floor(Math.random() * 30) + 10,       // Valeurs plus élevées
        draws: Math.floor(Math.random() * 5) + 2          // Valeurs plus élevées
      });
    }
    
    return data;
  };

  // Fonction pour grouper les données selon la granularité
  const groupDataByGranularity = (data: any[], granularity: string) => {
    if (granularity === 'day') return data;
    
    const grouped: { [key: string]: any } = {};
    
    data.forEach(item => {
      const date = new Date(item.date);
      let key = '';
      
      switch (granularity) {
        case 'week':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'month':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'draw':
          // Grouper par semaine pour les tirages
          const drawWeekStart = new Date(date);
          drawWeekStart.setDate(date.getDate() - date.getDay());
          key = drawWeekStart.toISOString().split('T')[0];
          break;
        default:
          key = item.date;
      }
      
      if (!grouped[key]) {
        grouped[key] = {
          date: key,
          revenue: 0,
          tickets: 0,
          users: 0,
          draws: 0,
          count: 0
        };
      }
      
      grouped[key].revenue += item.revenue;
      grouped[key].tickets += item.tickets;
      grouped[key].users += item.users;
      grouped[key].draws += item.draws;
      grouped[key].count += 1;
    });
    
    return Object.values(grouped).sort((a: any, b: any) => a.date.localeCompare(b.date));
  };

  // Fonction pour formater les dates selon la granularité
  const formatDateForDisplay = (dateStr: string, granularity: string) => {
    const date = new Date(dateStr);
    
    switch (granularity) {
      case 'day':
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
      case 'week':
        const weekEnd = new Date(date);
        weekEnd.setDate(date.getDate() + 6);
        return `${date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} - ${weekEnd.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}`;
      case 'month':
        return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      case 'draw':
        return `Sem. ${date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}`;
      default:
        return dateStr;
    }
  };

  // Génération des données du graphique avec mémorisation
  const chartData = useMemo(() => {
    const rawData = generateTestData();
    const groupedData = groupDataByGranularity(rawData, granularity);
    
    return groupedData.map(item => ({
      ...item,
      displayDate: formatDateForDisplay(item.date, granularity)
    }));
  }, [dateRange, granularity]);

  // Fonction pour basculer une métrique
  const toggleMetric = (metricKey: string) => {
    setIsChartLoading(true);
    
    setTimeout(() => {
      setSelectedMetrics(prev => {
        if (prev.includes(metricKey)) {
          return prev.filter(m => m !== metricKey);
        } else {
          return [...prev, metricKey];
        }
      });
      setIsChartLoading(false);
    }, 100);
  };

  // Tooltip personnalisé pour le graphique
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
            const metric = availableMetrics.find(m => m.key === entry.dataKey);
            return (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {metric?.icon} {metric?.label}: {metric?.format(entry.value)}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  // États pour les utilisateurs
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // États pour les gagnants
  const [showAddWinnerModal, setShowAddWinnerModal] = useState(false);
  const [newWinner, setNewWinner] = useState({
    name: '',
    date: '',
    amount: '',
    lotteryType: 'jackpot' as 'jackpot' | 'megaJackpot',
    message: '',
    verified: true
  });

  // Contextes
  const { backupHistory, exportBackup, importBackup, addBackupEntry } = useBackup();
  const { lotteries, updateLottery, deleteLottery, createLottery } = useLottery();
  useAirtableSync(); // Activer la synchronisation automatique

  // Charger les données des tickets

  // Chargement des données
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    try {
      const savedUsers = JSON.parse(localStorage.getItem('bitwin-all-users') || '[]');
      const savedTickets = JSON.parse(localStorage.getItem('bitwin-all-tickets') || '[]');
      const savedWinners = JSON.parse(localStorage.getItem('bitwin-winners') || '[]');
      const savedLogs = JSON.parse(localStorage.getItem('bitwin-activity-logs') || '[]');

      setUsers(savedUsers);
      setAllUsers(savedUsers);
      setTickets(savedTickets);
      setAllTickets(savedTickets);
      setWinners(savedWinners);
      setActivityLogs(savedLogs);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  // Fonction pour obtenir les dates de début et fin selon la période sélectionnée
  const getDateRange = () => {
    const now = new Date();
    let startDate: Date;
    let endDate = now;

    switch (selectedPeriod) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'custom':
        startDate = customStartDate ? new Date(customStartDate) : new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = customEndDate ? new Date(customEndDate) : now;
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    return { startDate, endDate };
  };

  // Fonction pour filtrer les données selon la période et la loterie
  const getFilteredData = () => {
    const { startDate, endDate } = getDateRange();
    
    // Filtrer les tickets selon la période
    let filteredTickets = tickets.filter(ticket => {
      const ticketDate = new Date(ticket.purchaseDate);
      return ticketDate >= startDate && ticketDate <= endDate;
    });

    // Filtrer selon la loterie sélectionnée
    if (selectedLottery !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.type === selectedLottery);
    }

    // Filtrer selon le statut de la loterie
    if (selectedLotteryStatus !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === selectedLotteryStatus);
    }

    // Filtrer les utilisateurs selon la période
    const filteredUsers = users.filter(user => {
      const joinDate = new Date(user.joinDate);
      return joinDate >= startDate && joinDate <= endDate;
    });

    // Calculer les utilisateurs actifs (ayant une activité dans la période)
    const activeUsers = users.filter(user => {
      if (!user.lastActivity) return false;
      const lastActivity = new Date(user.lastActivity);
      return lastActivity >= startDate && lastActivity <= endDate;
    });

    // Calculer les revenus
    const revenue = filteredTickets.reduce((sum, ticket) => sum + (ticket.ticketPrice || 0), 0);

    return {
      revenue,
      ticketsSold: filteredTickets.length,
      newUsers: filteredUsers.length,
      activeUsers: activeUsers.length,
      filteredTickets,
      filteredUsers
    };
  };

  // Fonction pour générer les données du graphique
  const generateChartData = () => {
    const { startDate, endDate } = getDateRange();
    const data = [];
    
    // Générer les points de données selon la période
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const interval = daysDiff <= 7 ? 1 : daysDiff <= 30 ? 1 : Math.ceil(daysDiff / 30);
    
    for (let i = 0; i <= daysDiff; i += interval) {
      const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Filtrer les données pour cette date
      const dayTickets = tickets.filter(ticket => {
        const ticketDate = new Date(ticket.purchaseDate).toISOString().split('T')[0];
        return ticketDate === dateStr && 
               (selectedLottery === 'all' || ticket.type === selectedLottery) &&
               (selectedLotteryStatus === 'all' || ticket.status === selectedLotteryStatus);
      });
      
      const dayUsers = users.filter(user => {
        const joinDate = new Date(user.joinDate).toISOString().split('T')[0];
        return joinDate === dateStr;
      });
      
      const dayRevenue = dayTickets.reduce((sum, ticket) => sum + (ticket.ticketPrice || 0), 0);
      
      data.push({
        date: currentDate.toLocaleDateString('fr-FR', { 
          day: '2-digit', 
          month: '2-digit' 
        }),
        revenue: dayRevenue,
        tickets: dayTickets.length,
        users: dayUsers.length,
        draws: 0 // Placeholder pour les tirages effectués
      });
    }
    
    return data;
  };

  // Calcul des KPI avec mémorisation
  const kpis = useMemo(() => {
    const filteredTickets = tickets.filter(ticket => {
      if (!ticket.purchaseDate) return false;
      const ticketDate = ticket.purchaseDate.split('T')[0];
      return ticketDate >= dateRange.start && ticketDate <= dateRange.end;
    });

    const filteredUsers = users.filter(user => {
      return user.joinDate >= dateRange.start && user.joinDate <= dateRange.end;
    });

    const totalRevenue = filteredTickets.reduce((sum, ticket) => sum + (ticket.ticketPrice || 0), 0);
    const totalTickets = filteredTickets.length;
    const totalUsers = filteredUsers.length;
    const activeUsers = users.filter(user => {
      const lastActivity = user.lastActivity || user.joinDate;
      const daysSinceActivity = (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceActivity <= 30;
    }).length;

    return {
      revenue: selectedMetrics.includes('revenue') ? totalRevenue : null,
      tickets: selectedMetrics.includes('tickets') ? totalTickets : null,
      users: selectedMetrics.includes('users') ? totalUsers : null,
      activeUsers
    };
  }, [tickets, users, dateRange, selectedMetrics]);

  // Gestion des métriques sélectionnées
  const handleMetricToggle = (metric: string) => {
    setIsChartLoading(true);
    
    setTimeout(() => {
      setSelectedMetrics(prev => 
        prev.includes(metric) 
          ? prev.filter(m => m !== metric)
          : [...prev, metric]
      );
      setIsChartLoading(false);
    }, 100);
  };

  // Gestion des loteries
  const handleViewLottery = (lottery: any) => {
    setSelectedLottery(lottery);
    setShowLotteryModal(true);
  };

  const handleEditLottery = (lottery: any) => {
    setSelectedLottery(lottery);
    setEditFormData({
      name: lottery.name,
      type: lottery.type,
      prize: lottery.prize,
      prizeEur: lottery.prizeEur,
      ticketPrice: lottery.ticketPrice,
      maxParticipants: lottery.maxParticipants,
      drawDate: lottery.drawDate,
      frequency: lottery.frequency,
      description: lottery.description || ''
    });
    setShowEditModal(true);
  };

  const handleAddLottery = () => {
    setAddFormData({
      name: '',
      type: 'jackpot',
      prize: '',
      prizeEur: '',
      ticketPrice: '',
      maxParticipants: '',
      drawDate: '',
      frequency: '',
      description: ''
    });
    setShowAddModal(true);
  };

  const handleDeleteLottery = (lottery: any) => {
    setLotteryToDelete(lottery);
    setShowDeleteConfirm(true);
  };

  const handleSaveEdit = () => {
    if (selectedLottery && editFormData) {
      const updatedLottery: any = {
        ...selectedLottery,
        name: editFormData.name || selectedLottery.name,
        type: editFormData.type || selectedLottery.type,
        prize: editFormData.prize || selectedLottery.prize,
        prizeEur: editFormData.prizeEur || selectedLottery.prizeEur,
        ticketPrice: Number(editFormData.ticketPrice) || selectedLottery.ticketPrice,
        maxParticipants: Number(editFormData.maxParticipants) || selectedLottery.maxParticipants,
        drawDate: editFormData.drawDate || selectedLottery.drawDate,
        frequency: editFormData.frequency || selectedLottery.frequency,
        description: editFormData.description || selectedLottery.description,
        updatedAt: new Date().toISOString()
      };
      
      updateLottery(updatedLottery);
      setShowEditModal(false);
      setSelectedLottery(null);
      setEditFormData({});
    }
  };

  const handleCreateLottery = () => {
    if (addFormData.name && addFormData.prize && addFormData.ticketPrice) {
      const newLottery = {
        name: addFormData.name,
        type: addFormData.type,
        prize: addFormData.prize,
        prizeEur: addFormData.prizeEur,
        ticketPrice: Number(addFormData.ticketPrice),
        maxParticipants: Number(addFormData.maxParticipants),
        currentTickets: 0,
        drawDate: addFormData.drawDate,
        status: 'active' as const,
        frequency: addFormData.frequency,
        description: addFormData.description
      };
      
      createLottery(newLottery);
      setShowAddModal(false);
      setAddFormData({
        name: '',
        type: 'jackpot',
        prize: '',
        prizeEur: '',
        ticketPrice: '',
        maxParticipants: '',
        drawDate: '',
        frequency: '',
        description: ''
      });
    }
  };

  const confirmDeleteLottery = () => {
    if (lotteryToDelete) {
      deleteLottery(lotteryToDelete.id);
      setShowDeleteConfirm(false);
      setLotteryToDelete(null);
    }
  };

  // Filtrage des loteries par statut
  const getFilteredLotteries = () => {
    return lotteries.filter(lottery => {
      if (lotteryTab === 'active') return lottery.status === 'active';
      if (lotteryTab === 'upcoming') return lottery.status === 'upcoming';
      if (lotteryTab === 'completed') return lottery.status === 'completed';
      return true;
    });
  };

  // Gestion des gagnants
  const handleAddWinner = () => {
    const winner = {
      id: Date.now().toString(),
      ...newWinner,
      createdAt: new Date().toISOString()
    };

    const updatedWinners = [...winners, winner];
    setWinners(updatedWinners);
    localStorage.setItem('bitwin-winners', JSON.stringify(updatedWinners));

    setShowAddWinnerModal(false);
    setNewWinner({
      name: '',
      date: '',
      amount: '',
      lotteryType: 'jackpot',
      message: '',
      verified: true
    });
  };

  // Fonction pour filtrer les utilisateurs
  const getFilteredUsers = () => {
    let filtered = allUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      generatePhoneNumber(user.id).includes(searchTerm)
    );

    // Filtre par statut
    if (userStatusFilter !== 'all') {
      filtered = filtered.filter(user => getUserStatus(user) === userStatusFilter);
    }

    // Filtre par pays
    if (userCountryFilter !== 'all') {
      filtered = filtered.filter(user => getUserCountry(user.email).name === userCountryFilter);
    }

    return filtered;
  };

  // Export des données
  const exportData = (format: 'csv' | 'json') => {
    const data = {
      users,
      tickets,
      winners,
      lotteries,
      activityLogs,
      exportDate: new Date().toISOString()
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bitwin-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      // Export CSV simplifié pour les utilisateurs
      const csvContent = [
        'Nom,Email,Tickets,Date inscription,Dernière activité',
        ...users.map(user => 
          `"${user.name}","${user.email}",${user.tickets},"${user.joinDate}","${user.lastActivity || 'N/A'}"`
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bitwin-users-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // Fonction pour exporter les utilisateurs en CSV
  const exportUsersCSV = () => {
    const filteredUsers = getFilteredUsers();
    const csvData = filteredUsers.map(user => {
      const country = getUserCountry(user.email);
      const status = getUserStatus(user);
      const totalSpent = calculateUserTotalSpent(user.id);
      
      return {
      'Nom': user.name,
      'Email': user.email,
      'Téléphone': generatePhoneNumber(user.id),
      'Pays': country.name,
      'Date d\'inscription': user.joinDate,
      'Nombre de tickets': user.tickets || 0,
      'Montant total dépensé (€)': totalSpent.toFixed(2),
      'Dernière activité': user.lastActivity ? new Date(user.lastActivity).toLocaleDateString('fr-FR') : 'Jamais',
      'Statut': status,
      'Code de parrainage': user.referralCode
      };
    });

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bitwin-users-${new Date().toISOString().split('T')[0]}.csv`;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addBackupEntry('Export utilisateurs CSV', `Export de ${filteredUsers.length} utilisateurs`, { count: filteredUsers.length }, 'user');
  };

  const renderOverview = () => {
    const filteredData = getFilteredData();
    const chartData = generateChartData();
    
    return (
      <div className="space-y-6">
        {/* Header avec filtres */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">Vue d'ensemble</h2>
          
          {/* Filtres de période */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Sélecteur de période */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Période d'analyse</label>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setSelectedPeriod('today')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === 'today'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Aujourd'hui
                </button>
                <button
                  onClick={() => setSelectedPeriod('week')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === 'week'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cette semaine
                </button>
                <button
                  onClick={() => setSelectedPeriod('month')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === 'month'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Ce mois
                </button>
                <button
                  onClick={() => {
                    setSelectedPeriod('custom');
                    setShowCustomDatePicker(!showCustomDatePicker);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === 'custom'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Plage personnalisée
                </button>
              </div>
              
              {/* Sélecteur de dates personnalisées */}
              {showCustomDatePicker && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Filtres de loterie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Filtres de tirage</label>
              <div className="space-y-3">
                {/* Sélection de la loterie */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Loterie</label>
                  <select
                    value={selectedLottery}
                    onChange={(e) => setSelectedLottery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">Toutes les loteries</option>
                    <option value="jackpot">Jackpot Hebdomadaire</option>
                    <option value="megaJackpot">Méga Jackpot Mensuel</option>
                  </select>
                </div>
                
                {/* Statut du tirage */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">État du tirage</label>
                  <select
                    value={selectedLotteryStatus}
                    onChange={(e) => setSelectedLotteryStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">Tous les états</option>
                    <option value="active">Tirage en cours</option>
                    <option value="upcoming">Tirage à venir</option>
                    <option value="completed">Tirage terminé</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Métriques clés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenus</p>
                <p className="text-2xl font-bold text-green-600">{filteredData.revenue.toFixed(2)}€</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedPeriod === 'today' ? 'Aujourd\'hui' :
                   selectedPeriod === 'week' ? 'Cette semaine' :
                   selectedPeriod === 'month' ? 'Ce mois' : 'Période sélectionnée'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tickets Vendus</p>
                <p className="text-2xl font-bold text-blue-600">{filteredData.ticketsSold}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedPeriod === 'today' ? 'Aujourd\'hui' :
                   selectedPeriod === 'week' ? 'Cette semaine' :
                   selectedPeriod === 'month' ? 'Ce mois' : 'Période sélectionnée'}
                </p>
              </div>
              <Ticket className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Nouveaux Utilisateurs</p>
                <p className="text-2xl font-bold text-purple-600">{filteredData.newUsers}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedPeriod === 'today' ? 'Aujourd\'hui' :
                   selectedPeriod === 'week' ? 'Cette semaine' :
                   selectedPeriod === 'month' ? 'Ce mois' : 'Période sélectionnée'}
                </p>
              </div>
              <UserPlus className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold text-orange-600">{filteredData.activeUsers}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedPeriod === 'today' ? 'Aujourd\'hui' :
                   selectedPeriod === 'week' ? 'Cette semaine' :
                   selectedPeriod === 'month' ? 'Ce mois' : 'Période sélectionnée'}
                </p>
              </div>
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
        
        {/* Graphique d'évolution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-black">Évolution des Métriques</h3>
            
            {/* Sélecteurs de métriques */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Métriques à afficher :</span>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chartMetrics.revenue}
                    onChange={(e) => setChartMetrics(prev => ({ ...prev, revenue: e.target.checked }))}
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-green-600 font-medium">💰 Revenus (€)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chartMetrics.tickets}
                    onChange={(e) => setChartMetrics(prev => ({ ...prev, tickets: e.target.checked }))}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-blue-600 font-medium">🎫 Tickets Vendus</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chartMetrics.users}
                    onChange={(e) => setChartMetrics(prev => ({ ...prev, users: e.target.checked }))}
                    className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-purple-600 font-medium">👥 Nouveaux Utilisateurs</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chartMetrics.draws}
                    onChange={(e) => setChartMetrics(prev => ({ ...prev, draws: e.target.checked }))}
                    className="w-4 h-4 text-gray-500 border-gray-300 rounded focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-600 font-medium">🏆 Tirages Effectués</span>
                </label>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              
              {chartMetrics.revenue && (
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="💰 Revenus (€)"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              )}
              
              {chartMetrics.tickets && (
                <Line 
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="🎫 Tickets Vendus"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              )}
              
              {chartMetrics.users && (
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="👥 Nouveaux Utilisateurs"
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              )}
              
              {chartMetrics.draws && (
                <Line 
                  type="monotone" 
                  dataKey="draws" 
                  stroke="#6b7280" 
                  strokeWidth={3}
                  name="🏆 Tirages Effectués"
                  dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderLotteries = () => {
    const filteredLotteries = getFilteredLotteries();
    
    return (
      <div className="space-y-6">
        {/* En-tête avec onglets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'active', name: 'En cours', count: lotteries.filter(l => l.status === 'active').length },
                { id: 'upcoming', name: 'À venir', count: lotteries.filter(l => l.status === 'upcoming').length },
                { id: 'completed', name: 'Terminées', count: lotteries.filter(l => l.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setLotteryTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    lotteryTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.name}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lotteryTab === tab.id
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Loteries En Cours</h3>
              <button
                onClick={handleAddLottery}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter une loterie
              </button>
            </div>
            
            {filteredLotteries.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune loterie {lotteryTab === 'active' ? 'en cours' : lotteryTab === 'upcoming' ? 'à venir' : 'terminée'}
                </h3>
                <p className="text-gray-600">
                  {lotteryTab === 'active' && 'Aucune loterie n\'est actuellement active.'}
                  {lotteryTab === 'upcoming' && 'Aucune loterie n\'est programmée.'}
                  {lotteryTab === 'completed' && 'Aucune loterie n\'a encore été terminée.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredLotteries.map((lottery) => {
                  const progress = lottery.maxParticipants > 0 
                    ? (lottery.currentTickets / lottery.maxParticipants) * 100 
                    : 0;
                  
                  return (
                    <div key={lottery.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {lottery.type === 'jackpot' ? (
                              <Calendar className="w-5 h-5 text-orange-500" />
                            ) : (
                              <Trophy className="w-5 h-5 text-yellow-600" />
                            )}
                            <h3 className="text-lg font-semibold text-gray-900">{lottery.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              lottery.status === 'active' ? 'bg-green-100 text-green-800' :
                              lottery.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {lottery.status === 'active' ? 'En cours' :
                               lottery.status === 'upcoming' ? 'À venir' : 'Terminée'}
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Prix</p>
                              <p className="font-semibold text-lg">{lottery.prize}</p>
                              <p className="text-sm text-gray-600">{lottery.prizeEur}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Participants</p>
                              <p className="font-semibold text-lg">
                                {lottery.currentTickets?.toLocaleString() || 0} / {lottery.maxParticipants?.toLocaleString() || 0}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Tirage</p>
                              <p className="font-semibold">
                                {new Date(lottery.drawDate).toLocaleDateString('fr-FR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>

                          {/* Barre de progression */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progression</span>
                              <span>{progress.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  progress < 30 ? 'bg-red-500' :
                                  progress < 70 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleViewLottery(lottery)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Visualiser"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {lottery.status !== 'completed' && (
                            <>
                              <button
                                onClick={() => handleEditLottery(lottery)}
                                className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                title="Modifier"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              
                              <button
                                onClick={() => handleDeleteLottery(lottery)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderUsers = () => {
    const filteredUsers = getFilteredUsers();
    
    return (
      <div className="space-y-6">
        {/* Filtres */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <select
                value={userStatusFilter}
                onChange={(e) => setUserStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">Tous les utilisateurs</option>
                <option value="Actif">Actifs (7 derniers jours)</option>
                <option value="Modérément actif">Modérément actifs (30 derniers jours)</option>
                <option value="Inactif">Inactifs</option>
              </select>
            </div>
            
            <button
              onClick={exportUsersCSV}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Utilisateurs ({filteredUsers.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière activité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const lastActivity = user.lastActivity || user.joinDate;
                  const daysSinceActivity = (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24);
                  const isActive = daysSinceActivity <= 30;
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{user.tickets || 0}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(lastActivity).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-black">
              Historique des Tickets ({filteredTickets.length})
            </h3>
            
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Filtre par plage de dates */}
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                  className="text-sm border-none outline-none bg-transparent"
                  placeholder="Date début"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                  className="text-sm border-none outline-none bg-transparent"
                  placeholder="Date fin"
                />
                {(dateRange.startDate || dateRange.endDate) && (
                  <button
                    onClick={clearDateFilter}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                    title="Effacer le filtre de date"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              
              {/* Filtre par loterie */}
              <select
                value={selectedLotteryFilter}
                onChange={(e) => setSelectedLotteryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="">Toutes les loteries</option>
                {uniqueLotteries.map(lottery => (
                  <option key={lottery} value={lottery}>
                    {lottery}
                  </option>
                ))}
              </select>
              
              {/* Bouton Export Excel */}
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Exporter en Excel
              </button>
            </div>
          </div>
          
          {/* Indicateurs de filtres actifs */}
          {(selectedLotteryFilter !== '' || dateRange.startDate || dateRange.endDate) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedLotteryFilter !== '' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <Filter className="w-3 h-3" />
                  Loterie: {selectedLotteryFilter}
                  <button
                    onClick={() => setSelectedLotteryFilter('')}
                    className="ml-1 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(dateRange.startDate || dateRange.endDate) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  <Calendar className="w-3 h-3" />
                  Période: {dateRange.startDate || '...'} → {dateRange.endDate || '...'}
                  <button
                    onClick={clearDateFilter}
                    className="ml-1 hover:text-orange-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loterie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'achat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ticket.userName || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{ticket.userEmail || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.lotteryName}</div>
                    <div className="text-sm text-gray-500">{ticket.prize}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.ticketPrice}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.purchaseDate ? new Date(ticket.purchaseDate).toLocaleDateString('fr-FR') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      ticket.status === 'active' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status === 'active' ? 'Actif' : 'Terminé'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredTickets.length === 0 && (
            <div className="text-center py-8">
              <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Aucun ticket trouvé</h4>
              <p className="text-gray-600">
                {selectedLotteryFilter !== '' || dateRange.startDate || dateRange.endDate
                  ? 'Aucun ticket ne correspond aux filtres sélectionnés'
                  : 'Aucun ticket disponible'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderWinners = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Gagnants ({winners.length})
          </h3>
          <button
            onClick={() => setShowAddWinnerModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajouter un gagnant
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {winners.map((winner) => (
          <div key={winner.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  winner.lotteryType === 'jackpot' ? 'bg-orange-100' : 'bg-yellow-100'
                }`}>
                  {winner.lotteryType === 'jackpot' ? (
                    <Calendar className="w-6 h-6 text-orange-500" />
                  ) : (
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold text-gray-900">{winner.name}</h4>
                    {winner.verified && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600">{winner.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{new Date(winner.date).toLocaleDateString('fr-FR')}</span>
                    <span className="font-semibold text-orange-500">{winner.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Journal d'Activité ({activityLogs.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {activityLogs.slice(0, 50).map((log) => (
            <div key={log.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  log.type === 'lottery' ? 'bg-orange-500' :
                  log.type === 'user' ? 'bg-blue-500' :
                  log.type === 'payment' ? 'bg-green-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{log.action}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                  <p className="text-xs text-gray-500 mt-1">Par {log.user}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBackup = () => (
    <div className="space-y-6">
      <AirtableSync />
      
      {/* Section de sauvegarde existante */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Archive className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-bold text-black">Sauvegarde Locale</h3>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Sauvegarde et Export</h3>
          <div className="flex gap-2">
            <button
              onClick={() => exportData('json')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
            <button
              onClick={exportBackup}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Sauvegarde Complète
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Statistiques</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Utilisateurs :</span>
                <span className="font-medium">{users.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tickets :</span>
                <span className="font-medium">{tickets.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loteries :</span>
                <span className="font-medium">{lotteries.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gagnants :</span>
                <span className="font-medium">{winners.length}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Dernière sauvegarde</h4>
            <div className="text-sm text-gray-600">
              {backupHistory.length > 0 ? (
                <div>
                  <p>{new Date(backupHistory[0].timestamp).toLocaleString('fr-FR')}</p>
                  <p className="text-xs mt-1">{backupHistory[0].details}</p>
                </div>
              ) : (
                <p>Aucune sauvegarde effectuée</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Gestion et supervision de la plateforme BitWin</p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <nav className="flex overflow-x-auto">
            {[
              { id: 'overview', name: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'lotteries', name: 'Loteries', icon: Trophy },
              { id: 'users', name: 'Utilisateurs', icon: Users },
              { id: 'tickets', name: 'Tickets', icon: Ticket },
              { id: 'winners', name: 'Gagnants', icon: Bitcoin },
              { id: 'activity', name: 'Activité', icon: Activity },
              { id: 'backup', name: 'Sauvegarde', icon: Save },
              { id: 'news', name: 'Actualités', icon: Globe }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'lotteries' && renderLotteries()}
        {activeTab === 'users' && (
          <div>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Gestion des Utilisateurs ({getFilteredUsers().length})
                </h3>
                <p className="text-gray-600">
                  Gérez les comptes utilisateurs et leurs données
                </p>
              </div>
              
              {/* Filtres */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="Actif">Actif</option>
                  <option value="Modérément actif">Modérément actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
                
                <select
                  value={userCountryFilter}
                  onChange={(e) => setUserCountryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  <option value="all">Tous les pays</option>
                  <option value="France">🇫🇷 France</option>
                  <option value="Allemagne">🇩🇪 Allemagne</option>
                  <option value="Espagne">🇪🇸 Espagne</option>
                  <option value="Italie">🇮🇹 Italie</option>
                  <option value="International">🌍 International</option>
                </select>
                
                <button
                  onClick={exportUsersCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>

            {getFilteredUsers().length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
                <p className="text-gray-600">Aucun utilisateur ne correspond aux critères de recherche.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Utilisateur</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Pays</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Inscription</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Activité</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Tickets</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Dépenses</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredUsers().map((user, index) => {
                        const country = getUserCountry(user.email);
                        const status = getUserStatus(user);
                        const totalSpent = calculateUserTotalSpent(user.id);
                        const phoneNumber = generatePhoneNumber(user.id);
                        
                        return (
                          <tr key={user.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{user.name}</div>
                                  <div className="text-gray-500 text-sm">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-sm">
                                <div className="text-gray-900 font-medium">{phoneNumber}</div>
                                <div className="text-gray-500">{user.email}</div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{country.flag}</span>
                                <span className="text-sm text-gray-700">{country.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-sm">
                                <div className="text-gray-900 font-medium">
                                  {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                                </div>
                                <div className="text-gray-500">
                                  {Math.floor((new Date().getTime() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))} jours
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-sm">
                                <div className="text-gray-900 font-medium">
                                  {user.lastActivity ? new Date(user.lastActivity).toLocaleDateString('fr-FR') : 'Jamais'}
                                </div>
                                <div className="text-gray-500">
                                  {user.lastActivity ? 
                                    `Il y a ${Math.floor((new Date().getTime() - new Date(user.lastActivity).getTime()) / (1000 * 60 * 60 * 24))} jours` : 
                                    'Aucune activité'
                                  }
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{user.tickets || 0}</div>
                                <div className="text-xs text-gray-500">tickets</div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-center">
                                <div className="text-lg font-bold text-orange-600">{totalSpent.toFixed(2)}€</div>
                                <div className="text-xs text-gray-500">total</div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                status === 'Actif' ? 'bg-green-100 text-green-800' :
                                status === 'Modérément actif' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                {/* Footer avec statistiques */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{getFilteredUsers().length} utilisateur(s) affiché(s)</span>
                    <span>Total dépenses: {getFilteredUsers().reduce((total, user) => total + calculateUserTotalSpent(user.id), 0).toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'tickets' && renderTickets()}
        {activeTab === 'winners' && renderWinners()}
        {activeTab === 'activity' && renderActivity()}
        {activeTab === 'backup' && renderBackup()}
        {activeTab === 'news' && (
          <NewsManagement />
        )}

        {/* Modales */}
        {showLotteryModal && selectedLottery && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Détails de la loterie</h3>
                <button
                  onClick={() => setShowLotteryModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Nom</label>
                    <p className="font-medium">{selectedLottery.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Type</label>
                    <p className="font-medium">{selectedLottery.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Prix</label>
                    <p className="font-medium">{selectedLottery.prize}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Statut</label>
                    <p className="font-medium">{selectedLottery.status}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Date de tirage</label>
                  <p className="font-medium">
                    {new Date(selectedLottery.drawDate).toLocaleString('fr-FR')}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Participants</label>
                  <p className="font-medium">
                    {selectedLottery.currentTickets} / {selectedLottery.maxParticipants}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowLotteryModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedLottery && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 my-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Modifier la loterie</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={editFormData.name || ''}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={editFormData.type || 'jackpot'}
                      onChange={(e) => setEditFormData({...editFormData, type: e.target.value as 'jackpot' | 'megaJackpot'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="jackpot">Jackpot</option>
                      <option value="megaJackpot">Méga Jackpot</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                    <input
                      type="text"
                      value={editFormData.prize || ''}
                      onChange={(e) => setEditFormData({...editFormData, prize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="1 Bitcoin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix EUR</label>
                    <input
                      type="text"
                      value={editFormData.prizeEur || ''}
                      onChange={(e) => setEditFormData({...editFormData, prizeEur: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="≈ 95,000€"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix du ticket</label>
                    <input
                      type="number"
                      value={editFormData.ticketPrice || ''}
                      onChange={(e) => setEditFormData({...editFormData, ticketPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="29.99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Participants max</label>
                    <input
                      type="number"
                      value={editFormData.maxParticipants || ''}
                      onChange={(e) => setEditFormData({...editFormData, maxParticipants: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="3000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date du tirage</label>
                  <input
                    type="datetime-local"
                    value={editFormData.drawDate ? new Date(editFormData.drawDate).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setEditFormData({...editFormData, drawDate: new Date(e.target.value).toISOString()})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fréquence</label>
                  <input
                    type="text"
                    value={editFormData.frequency || ''}
                    onChange={(e) => setEditFormData({...editFormData, frequency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Chaque dimanche à 20h00 UTC"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder="Description de la loterie..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 my-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Ajouter une loterie</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input
                      type="text"
                      value={addFormData.name}
                      onChange={(e) => setAddFormData({...addFormData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Jackpot Hebdomadaire"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select
                      value={addFormData.type}
                      onChange={(e) => setAddFormData({...addFormData, type: e.target.value as 'jackpot' | 'megaJackpot'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="jackpot">Jackpot</option>
                      <option value="megaJackpot">Méga Jackpot</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix *</label>
                    <input
                      type="text"
                      value={addFormData.prize}
                      onChange={(e) => setAddFormData({...addFormData, prize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="1 Bitcoin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix EUR</label>
                    <input
                      type="text"
                      value={addFormData.prizeEur}
                      onChange={(e) => setAddFormData({...addFormData, prizeEur: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="≈ 95,000€"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix du ticket *</label>
                    <input
                      type="number"
                      value={addFormData.ticketPrice}
                      onChange={(e) => setAddFormData({...addFormData, ticketPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="29.99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Participants max</label>
                    <input
                      type="number"
                      value={addFormData.maxParticipants}
                      onChange={(e) => setAddFormData({...addFormData, maxParticipants: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="3000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date du tirage</label>
                  <input
                    type="datetime-local"
                    value={addFormData.drawDate}
                    onChange={(e) => setAddFormData({...addFormData, drawDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fréquence</label>
                  <input
                    type="text"
                    value={addFormData.frequency}
                    onChange={(e) => setAddFormData({...addFormData, frequency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Chaque dimanche à 20h00 UTC"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={addFormData.description}
                    onChange={(e) => setAddFormData({...addFormData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder="Description de la loterie..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateLottery}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && lotteryToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Confirmer la suppression</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer la loterie "{lotteryToDelete.name}" ? 
                Cette action est irréversible.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDeleteLottery}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Winner Modal */}
        {showAddWinnerModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Ajouter un gagnant</h3>
                <button
                  onClick={() => setShowAddWinnerModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input
                    type="text"
                    value={newWinner.name}
                    onChange={(e) => setNewWinner({...newWinner, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Nom du gagnant"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    value={newWinner.date}
                    onChange={(e) => setNewWinner({...newWinner, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Montant *</label>
                  <input
                    type="text"
                    value={newWinner.amount}
                    onChange={(e) => setNewWinner({...newWinner, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="1 Bitcoin"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de loterie</label>
                  <select
                    value={newWinner.lotteryType}
                    onChange={(e) => setNewWinner({...newWinner, lotteryType: e.target.value as 'jackpot' | 'megaJackpot'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="jackpot">Jackpot</option>
                    <option value="megaJackpot">Méga Jackpot</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={newWinner.message}
                    onChange={(e) => setNewWinner({...newWinner, message: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder="Message de félicitations..."
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={newWinner.verified}
                    onChange={(e) => setNewWinner({...newWinner, verified: e.target.checked})}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="verified" className="text-sm text-gray-700">Gagnant vérifié</label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddWinnerModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddWinner}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;