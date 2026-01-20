import React, { useState } from 'react';
import { Bitcoin, Ticket, Calendar, Trophy, Clock, Users, Copy, Plus, Minus, ArrowRight, Eye, Info, Hash, QrCode, X, History, Play, CheckCircle, AlertCircle, Star, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Countdown from '../components/Countdown';
import PurchaseButton from '../components/PurchaseButton';

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

const Dashboard: React.FC = () => {
  const { user, userTickets } = useAuth();
  const { t } = useLanguage();
  const [selectedTicket, setSelectedTicket] = useState<UserTicket | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const nextWeeklyDraw = new Date();
  nextWeeklyDraw.setDate(nextWeeklyDraw.getDate() + 4);
  
  const nextMonthlyDraw = new Date();
  nextMonthlyDraw.setMonth(nextMonthlyDraw.getMonth() + 1);
  nextMonthlyDraw.setDate(1);

  // Séparer les tickets actifs et l'historique
  const activeTickets = userTickets.filter(ticket => ticket.status === 'active');
  const historicalTickets = userTickets.filter(ticket => ticket.status === 'completed');
  
  const jackpotTickets = activeTickets.filter(ticket => ticket.type === 'jackpot');
  const megaJackpotTickets = activeTickets.filter(ticket => ticket.type === 'megaJackpot');

  // Statistiques pour l'historique
  const totalHistoricalTickets = historicalTickets.length;
  const winningTickets = historicalTickets.filter(ticket => ticket.result === 'winner').length;
  const totalSpentOnHistory = historicalTickets.reduce((sum, ticket) => sum + ticket.ticketPrice, 0);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user?.referralCode || '');
  };

  const copyTicketNumber = (ticketNumber: string) => {
    navigator.clipboard.writeText(ticketNumber);
  };

  const copyTransactionHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
  };

  const tabs = [
    {
      id: 'active',
      name: 'Tickets Actifs',
      count: activeTickets.length,
      icon: Play,
      description: 'Tickets participant aux prochains tirages'
    },
    {
      id: 'history',
      name: 'Historique',
      count: historicalTickets.length,
      icon: History,
      description: 'Tickets des tirages passés'
    }
  ];

  const TicketCard: React.FC<{ ticket: UserTicket; isHistorical?: boolean }> = ({ ticket, isHistorical = false }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-500 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            {ticket.type === 'jackpot' ? (
              <Calendar className="w-5 h-5 text-black" />
            ) : (
              <Trophy className="w-5 h-5 text-orange-500" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-black">
                {ticket.lotteryName}
              </h4>
              <span className="px-2 py-1 bg-orange-50 text-orange-500 text-xs font-medium rounded-full border border-orange-200">
                {ticket.prize}
              </span>
              {isHistorical && ticket.result && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  ticket.result === 'winner' 
                    ? 'bg-orange-50 text-orange-500 border border-orange-200' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}>
                  {ticket.result === 'winner' ? '🏆 Gagnant' : 'Non gagnant'}
                </span>
              )}
              {!isHistorical && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                  En cours
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Numéro :</span>
                <span className="text-sm font-mono bg-gray-50 text-gray-800 px-2 py-1 rounded border border-gray-200">
                  {ticket.ticketNumber}
                </span>
                <button
                  onClick={() => copyTicketNumber(ticket.ticketNumber)}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Transaction :</span>
                <span className="text-sm font-mono bg-gray-50 text-gray-800 px-2 py-1 rounded border border-gray-200">
                  {ticket.transactionHash.substring(0, 8)}...
                </span>
                <button
                  onClick={() => copyTransactionHash(ticket.transactionHash)}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                {isHistorical ? 'Tirage du' : 'Acheté le'} {' '}
                {new Date(isHistorical ? ticket.drawDate : ticket.purchaseDate).toLocaleDateString('fr-FR')} à {' '}
                {new Date(isHistorical ? ticket.drawDate : ticket.purchaseDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xl font-bold text-black mb-1">
            {ticket.prize}
          </p>
          <p className="text-sm text-gray-600 mb-1">{ticket.prizeEur}</p>
          <p className="text-xs text-gray-500">{ticket.ticketPrice}€ payé</p>
          {isHistorical && ticket.result === 'winner' && (
            <p className="text-xs text-orange-500 font-medium mt-2">🏆 Gain remporté !</p>
          )}
          <button
            onClick={() => setSelectedTicket(ticket)}
            className="mt-2 text-xs text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1 hover:underline"
          >
            <Eye className="w-2 h-2" />
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black mb-3">
            Bienvenue, <span className="text-orange-500">{user?.name}</span>
          </h1>
          <p className="text-gray-600">Gérez vos tickets et suivez vos participations</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-600 font-medium mb-1">Tickets Actifs</p>
                    <p className="text-2xl font-bold text-black">{activeTickets.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                    <Play className="w-5 h-5 text-black" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Participent aux prochains tirages</p>
              </div>

              <div className="bg-white border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-600 font-medium mb-1">Historique</p>
                    <p className="text-2xl font-bold text-black">{historicalTickets.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                    <History className="w-5 h-5 text-black" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Tirages passés</p>
              </div>

              <div className="bg-white border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-600 font-medium mb-1">Gains Totaux</p>
                    <p className="text-2xl font-bold text-black">{user?.totalWinnings || 0}</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Bitcoin gagnés</p>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'active' | 'history')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activeTab === tab.id
                          ? 'bg-orange-100 text-orange-600 border border-orange-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-5">
                {/* Active Tickets Tab */}
                {activeTab === 'active' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Tickets Actifs ({activeTickets.length})
                        </h3>
                        <p className="text-gray-600">
                          Ces tickets participent aux prochains tirages
                        </p>
                      </div>
                      <button className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                        <Plus className="w-3 h-3" />
                        Acheter plus
                      </button>
                    </div>

                    {/* Breakdown by lottery type */}
                    {activeTickets.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-3 mb-5">
                        <div className="bg-gray-50 border border-gray-200 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-black" />
                            <span className="font-medium text-black">Jackpot</span>
                          </div>
                          <p className="text-xl font-bold text-black mb-1">{jackpotTickets.length}</p>
                          <p className="text-gray-600 text-sm">tickets pour le tirage hebdomadaire</p>
                        </div>
                        
                        <div className="bg-gray-50 border border-gray-200 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-4 h-4 text-orange-500" />
                            <span className="font-medium text-black">Méga Jackpot</span>
                          </div>
                          <p className="text-xl font-bold text-black mb-1">{megaJackpotTickets.length}</p>
                          <p className="text-gray-600 text-sm">tickets pour le tirage mensuel</p>
                        </div>
                      </div>
                    )}

                    {activeTickets.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-3 border border-gray-200">
                          <Play className="w-6 h-6 text-gray-400" />
                        </div>
                        <h4 className="font-semibold text-black mb-2">Aucun ticket actif</h4>
                        <p className="text-gray-600 mb-4 max-w-md mx-auto">Achetez vos premiers tickets pour participer aux tirages Bitcoin !</p>
                        <button className="flex items-center gap-2 px-5 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-medium mx-auto">
                          <Plus className="w-4 h-4" />
                          Acheter des tickets
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {activeTickets.map((ticket) => (
                          <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Historical Tickets Tab */}
                {activeTab === 'history' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Historique des Tirages ({historicalTickets.length})
                        </h3>
                        <p className="text-gray-600">
                          Tous vos tickets des tirages passés
                        </p>
                      </div>
                    </div>

                    {/* Historical Stats */}
                    {historicalTickets.length > 0 && (
                      <div className="grid md:grid-cols-3 gap-3 mb-5">
                        <div className="bg-gray-50 border border-gray-200 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <History className="w-4 h-4 text-black" />
                            <span className="font-medium text-black">Total Participations</span>
                          </div>
                          <p className="text-xl font-bold text-black mb-1">{totalHistoricalTickets}</p>
                          <p className="text-gray-600 text-sm">tickets joués</p>
                        </div>
                        
                        <div className="bg-gray-50 border border-gray-200 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-4 h-4 text-orange-500" />
                            <span className="font-medium text-black">Gains</span>
                          </div>
                          <p className="text-xl font-bold text-black mb-1">{winningTickets}</p>
                          <p className="text-gray-600 text-sm">tickets gagnants</p>
                        </div>
                        
                        <div className="bg-gray-50 border border-gray-200 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Bitcoin className="w-4 h-4 text-orange-500" />
                            <span className="font-medium text-black">Total Investi</span>
                          </div>
                          <p className="text-xl font-bold text-black mb-1">{totalSpentOnHistory.toFixed(2)}€</p>
                          <p className="text-gray-600 text-sm">sur l'historique</p>
                        </div>
                      </div>
                    )}

                    {historicalTickets.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-3 border border-gray-200">
                          <History className="w-6 h-6 text-gray-400" />
                        </div>
                        <h4 className="font-semibold text-black mb-2">Aucun historique</h4>
                        <p className="text-gray-600 mb-4 max-w-md mx-auto">
                          Vos tickets apparaîtront ici après les tirages auxquels vous avez participé.
                        </p>
                        <button className="flex items-center gap-2 px-5 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-medium mx-auto">
                          <Plus className="w-4 h-4" />
                          Participer aux tirages
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {historicalTickets
                          .sort((a, b) => new Date(b.drawDate).getTime() - new Date(a.drawDate).getTime())
                          .map((ticket) => (
                            <TicketCard key={ticket.id} ticket={ticket} isHistorical={true} />
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Referral Section */}
            <div className="bg-white border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black">Programme de Parrainage</h3>
              </div>
              <p className="mb-3 text-gray-600">
                Partagez votre code de parrainage et gagnez 1 ticket gratuit pour chaque ami qui achète au moins 1 ticket !
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-50 border border-gray-200 px-3 py-2 font-mono text-orange-500">
                  {user?.referralCode}
                </div>
                <button
                  onClick={copyReferralCode}
                  className="bg-gray-100 hover:bg-gray-200 border border-gray-200 p-2 transition-colors"
                >
                  <Copy className="w-4 h-4 text-black" />
                </button>
              </div>
              
              {/* Referral Stats */}
              <div className="bg-gray-50 border border-gray-200 p-3">
                <h4 className="font-medium text-black mb-2">Vos parrainages</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xl font-bold text-black mb-1">
                      {(() => {
                        const rewards = JSON.parse(localStorage.getItem('bitwin-referral-rewards') || '[]');
                        return rewards.filter((r: any) => r.referrerId === user?.id).length;
                      })()}
                    </div>
                    <div className="text-gray-600 text-sm">Amis parrainés</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-black mb-1">
                      {(() => {
                        const rewards = JSON.parse(localStorage.getItem('bitwin-referral-rewards') || '[]');
                        return rewards.filter((r: any) => r.referrerId === user?.id).length;
                      })()}
                    </div>
                    <div className="text-gray-600 text-sm">Tickets gagnés</div>
                  </div>
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/register?ref=${user?.referralCode}`;
                    navigator.clipboard.writeText(shareUrl);
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 py-2 px-3 transition-colors text-sm font-medium text-black"
                >
                  Copier le lien
                </button>
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/register?ref=${user?.referralCode}`;
                    const text = `Rejoins-moi sur BitWin et gagne du Bitcoin ! Utilise mon code ${user?.referralCode} pour obtenir un ticket gratuit : ${shareUrl}`;
                    if (navigator.share) {
                      navigator.share({ title: 'BitWin - Loterie Bitcoin', text, url: shareUrl });
                    } else {
                      navigator.clipboard.writeText(text);
                    }
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 py-2 px-3 transition-colors text-sm font-medium text-black"
                >
                  Partager
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Timers and Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            {/* Next Draws */}
            <div className="bg-white border border-gray-200 p-5 sticky top-8">
              <h3 className="font-semibold text-black mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                Prochains Tirages
              </h3>
              
              <div className="space-y-4">
                {/* Jackpot Timer */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-black" />
                    <span className="font-medium text-black">Jackpot</span>
                    {jackpotTickets.length > 0 && (
                      <span className="bg-orange-50 text-orange-500 text-xs px-2 py-1 border border-orange-200 font-medium">
                        {jackpotTickets.length} ticket{jackpotTickets.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-3">
                    <div className="text-center mb-2">
                      <div className="text-xl font-bold text-black mb-1">1 Bitcoin</div>
                      <div className="text-sm text-gray-600">≈ 95,000€</div>
                    </div>
                    <Countdown 
                      targetDate={nextWeeklyDraw.toISOString()} 
                      title="Temps restant"
                      size="small"
                      currentTickets={jackpotTickets.length}
                      maxTickets={3000}
                    />
                  </div>
                </div>

                {/* Mega Jackpot Timer */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-black">Méga Jackpot</span>
                    {megaJackpotTickets.length > 0 && (
                      <span className="bg-orange-50 text-orange-500 text-xs px-2 py-1 border border-orange-200 font-medium">
                        {megaJackpotTickets.length} ticket{megaJackpotTickets.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-3">
                    <div className="text-center mb-2">
                      <div className="text-xl font-bold text-black mb-1">3 Bitcoin</div>
                      <div className="text-sm text-gray-600">≈ 285,000€</div>
                    </div>
                    <Countdown 
                      targetDate={nextMonthlyDraw.toISOString()} 
                      title="Temps restant"
                      size="small"
                      currentTickets={megaJackpotTickets.length}
                      maxTickets={5000}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Purchase Button */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-medium">
                  <Plus className="w-4 h-4" />
                  Acheter des tickets
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Details Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 max-w-lg w-full p-5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-black">
                  Détails du ticket
                </h3>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-200 p-3">
                  <h4 className="font-medium text-black mb-2">
                    {selectedTicket.lotteryName}
                  </h4>
                  <p className="text-xl font-bold text-black mb-1">
                    {selectedTicket.prize}
                  </p>
                  <p className="text-gray-600">{selectedTicket.prizeEur}</p>
                  
                  {selectedTicket.status === 'completed' && selectedTicket.result && (
                    <div className={`mt-2 p-2 ${
                      selectedTicket.result === 'winner' 
                        ? 'bg-orange-50 border border-orange-200' 
                        : 'bg-gray-100 border border-gray-200'
                    }`}>
                      <span className={`text-sm font-medium ${
                        selectedTicket.result === 'winner' ? 'text-orange-500' : 'text-gray-600'
                      }`}>
                        {selectedTicket.result === 'winner' ? '🏆 Ticket gagnant !' : 'Ticket non gagnant'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Numéro de ticket</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm bg-gray-50 text-gray-800 px-2 py-1 border border-gray-200">
                        {selectedTicket.ticketNumber}
                      </span>
                      <button
                        onClick={() => copyTicketNumber(selectedTicket.ticketNumber)}
                        className="text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Transaction</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm bg-gray-50 text-gray-800 px-2 py-1 border border-gray-200">
                        {selectedTicket.transactionHash.substring(0, 8)}...
                      </span>
                      <button
                        onClick={() => copyTransactionHash(selectedTicket.transactionHash)}
                        className="text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Date d'achat</label>
                  <p className="font-medium text-black">
                    {new Date(selectedTicket.purchaseDate).toLocaleDateString('fr-FR')} à {new Date(selectedTicket.purchaseDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 block mb-1">
                    {selectedTicket.status === 'active' ? 'Prochain tirage' : 'Date du tirage'}
                  </label>
                  <p className="font-medium text-black">
                    {new Date(selectedTicket.drawDate).toLocaleDateString('fr-FR')} à 20h00 UTC
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Prix payé</label>
                  <p className="font-medium text-orange-500">{selectedTicket.ticketPrice}€</p>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Statut</label>
                  <div className="flex items-center gap-2">
                    {selectedTicket.status === 'active' ? (
                      <span className="flex items-center gap-2 text-orange-500">
                        <Play className="w-3 h-3" />
                        Participe au prochain tirage
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-3 h-3" />
                        Tirage terminé
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedTicket(null)}
                className="w-full mt-4 px-3 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors border border-gray-200"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;