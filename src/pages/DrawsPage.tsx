import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Trophy, Clock, ArrowRight, ChevronDown, TrendingUp, AlertCircle, Award, CheckCircle, Shield, Bitcoin, Users, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLottery } from '../contexts/LotteryContext';
import Countdown from '../components/Countdown';

const DrawsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [activeFaq, setActiveFaq] = useState<string>('');
  const { t } = useLanguage();
  const { lotteries } = useLottery();
  const navigate = useNavigate();

  // Fonction pour rafraîchir les données
  React.useEffect(() => {
    const handleStorageChange = () => {
      // Force un re-render quand les données changent
      window.location.reload();
    };

    const handleLotteriesUpdate = () => {
      // Force un re-render quand les loteries sont mises à jour
      window.location.reload();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('lotteriesUpdated', handleLotteriesUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('lotteriesUpdated', handleLotteriesUpdate);
    };
  }, []);

  const handlePurchaseClick = (lotteryType?: 'jackpot' | 'megaJackpot') => {
    if (lotteryType) {
      navigate('/purchase', { state: { preselectedLottery: lotteryType } });
    } else {
      navigate('/purchase');
    }
    window.scrollTo(0, 0);
  };

  // Fonction pour obtenir l'icône selon le type
  const getLotteryIcon = (type: string) => {
    switch (type) {
      case 'jackpot':
        return Calendar;
      case 'megaJackpot':
        return Trophy;
      default:
        return Clock;
    }
  };

  // Fonction pour obtenir la couleur selon le type
  const getLotteryColor = (type: string) => {
    switch (type) {
      case 'jackpot':
        return 'text-orange-500';
      case 'megaJackpot':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  const getFilteredDraws = () => {
    return lotteries.filter(lottery => lottery.status === activeTab);
  };

  const tabs = [
    { id: 'active' as const, name: t('draws.active'), count: lotteries.filter(d => d.status === 'active').length },
    { id: 'upcoming' as const, name: t('draws.upcoming'), count: lotteries.filter(d => d.status === 'upcoming').length },
    { id: 'completed' as const, name: t('draws.completed'), count: lotteries.filter(d => d.status === 'completed').length }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header épuré */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">
            {t('draws.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('draws.description')}
          </p>
        </div>

        {/* Navigation simple */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Grid vertical des tirages - NOUVEAU DESIGN */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {getFilteredDraws().map((lottery) => {
            const IconComponent = getLotteryIcon(lottery.type);
            const iconColor = getLotteryColor(lottery.type);
            
            return (
            <div key={lottery.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              
              {/* Header avec prix */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-5 h-5 ${iconColor}`} />
                    <h3 className="text-lg font-bold text-black">
                      {lottery.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-black">{lottery.prize}</div>
                    <div className="text-sm text-gray-600">{lottery.prizeEur}</div>
                  </div>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="p-6">
                {/* Date du tirage */}
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-1">Prochain tirage</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(lottery.drawDate).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* Countdown pour les tirages actifs */}
                {lottery.status === 'active' && (
                  <div className="mb-6">
                    <Countdown 
                      targetDate={lottery.drawDate} 
                      title="Temps restant"
                      size="small"
                    />
                  </div>
                )}

                {/* Informations essentielles */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-gray-600 mb-1">Prix du ticket</div>
                      <div className="font-bold text-black">{lottery.ticketPrice}€</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 mb-1">Participants max</div>
                      <div className="font-bold text-black">{lottery.maxParticipants?.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Gagnant pour les tirages terminés */}
                {lottery.status === 'completed' && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 font-medium text-center">🏆 Gagnant annoncé</p>
                  </div>
                )}

                {/* Bouton d'action */}
                {lottery.status === 'active' && (
                  <button
                    onClick={() => handlePurchaseClick(lottery.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Participer au tirage
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {lottery.status === 'upcoming' && (
                  <button
                    onClick={() => handlePurchaseClick(lottery.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Participer au tirage
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {lottery.status === 'completed' && (
                  <div className="w-full px-5 py-3 bg-gray-100 text-gray-500 rounded-lg font-medium text-center">
                    Tirage terminé
                  </div>
                )}
              </div>
            </div>
          );
          })}
        </div>

        {/* État vide */}
        {getFilteredDraws().length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Clock className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('draws.noDraws')} {activeTab === 'active' ? t('draws.active').toLowerCase() : activeTab === 'upcoming' ? t('draws.upcoming').toLowerCase() : t('draws.completed').toLowerCase()}
            </h3>
            <p className="text-gray-600">
              {t('draws.comingSoon')}
            </p>
          </div>
        )}

        {/* CTA simple */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/purchase')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            {t('draws.buyTickets')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* FAQ Section redesignée - Style premium et sobre */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-3">
              Questions Fréquentes
            </h2>
            <p className="text-gray-600">
              Tout ce que vous devez savoir sur nos tirages
            </p>
          </div>

          <div className="space-y-3">
            {/* Question 1 - Probabilités */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === 'probabilities' ? '' : 'probabilities')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Quelles sont mes chances de gagner ?
                  </h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  activeFaq === 'probabilities' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeFaq === 'probabilities' && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Comparaison des probabilités</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">BitWin</span>
                              <span className="text-sm font-semibold text-gray-900">1 sur 500</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-800 h-2 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Loterie classique</span>
                              <span className="text-sm font-semibold text-gray-600">1 sur 19 millions</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-400 h-2 rounded-full" style={{ width: '2.6%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                              <TrendingUp className="w-3 h-3 text-white" />
                            </div>
                            <h5 className="font-medium text-gray-900">BitWin</h5>
                          </div>
                          <p className="text-gray-800 font-medium mb-1">1 chance sur 500</p>
                          <p className="text-gray-600 text-xs">Probabilité exceptionnelle de gagner 100 000€+</p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 bg-gray-500 rounded-lg flex items-center justify-center">
                              <AlertCircle className="w-3 h-3 text-white" />
                            </div>
                            <h5 className="font-medium text-gray-900">Loterie classique</h5>
                          </div>
                          <p className="text-gray-800 font-medium mb-1">1 chance sur 19 millions</p>
                          <p className="text-gray-600 text-xs">Probabilité traditionnelle très faible</p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                              <Award className="w-3 h-3 text-white" />
                            </div>
                            <h5 className="font-medium text-gray-900">Avantage</h5>
                          </div>
                          <p className="text-gray-800 font-medium mb-1">×38 plus de chances</p>
                          <p className="text-gray-600 text-xs">Probabilité multipliée par 38 000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question 2 - Régularité */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === 'frequency' ? '' : 'frequency')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Y a-t-il toujours un gagnant ?
                  </h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  activeFaq === 'frequency' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeFaq === 'frequency' && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                            <Calendar className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Régularité garantie</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">Un gagnant chaque semaine et chaque mois</p>
                        <p className="text-gray-600 text-sm">Tirage hebdomadaire + mensuel pour une régularité optimale des gains</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Aucun report</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">Gagnant systématiquement désigné</p>
                        <p className="text-gray-600 text-sm">Contrairement aux loteries traditionnelles, nos tirages ne sont jamais reportés</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question 3 - Sécurité */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === 'security' ? '' : 'security')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Comment vérifier l'équité des tirages ?
                  </h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  activeFaq === 'security' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeFaq === 'security' && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Système TPAL</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">Certification tierce partie</p>
                        <p className="text-gray-600 text-sm">Randomdraws.com garantit une sélection 100% aléatoire et vérifiable</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                            <Bitcoin className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Blockchain Bitcoin</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">Source d'aléatoire inviolable</p>
                        <p className="text-gray-600 text-sm">Hash des blocs Bitcoin utilisé, rendant toute manipulation impossible</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question 4 - Prix des tickets */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === 'pricing' ? '' : 'pricing')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Bitcoin className="w-4 h-4 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Combien coûte un ticket et pourquoi ce prix ?
                  </h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  activeFaq === 'pricing' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeFaq === 'pricing' && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">€</span>
                          </div>
                          <h5 className="font-medium text-gray-900">Prix accessible</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-1">29,99€ par ticket</p>
                        <p className="text-gray-600 text-xs">Prix étudié pour rester accessible tout en garantissant des gains attractifs</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Rapport qualité/prix</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-1">Ratio optimal</p>
                        <p className="text-gray-600 text-xs">30€ pour 1 chance sur 500 de gagner 100 000€, soit un ratio exceptionnel</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-600 rounded-lg flex items-center justify-center">
                            <Award className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Réductions</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-1">Jusqu'à -25%</p>
                        <p className="text-gray-600 text-xs">Remises dégressives : 15+ tickets (-10%), 20+ (-15%), 25+ (-20%), 50+ (-25%)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question 5 - Délais de paiement */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === 'payment' ? '' : 'payment')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Combien de temps pour recevoir mes gains ?
                  </h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  activeFaq === 'payment' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeFaq === 'payment' && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                            <Clock className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Paiement ultra-rapide</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">30 minutes maximum</p>
                        <p className="text-gray-600 text-sm">Dès l'annonce du résultat, vos Bitcoin sont transférés automatiquement</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Contact immédiat</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">Notification instantanée</p>
                        <p className="text-gray-600 text-sm">Email, SMS et appel téléphonique pour vous informer de votre victoire</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question 6 - Limite de tickets */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === 'limits' ? '' : 'limits')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Combien de tickets puis-je acheter ?
                  </h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  activeFaq === 'limits' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeFaq === 'limits' && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">50</span>
                          </div>
                          <h5 className="font-medium text-gray-900">Limite par transaction</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-1">Maximum 50 tickets</p>
                        <p className="text-gray-600 text-xs">Pour maintenir l'équité et éviter la concentration excessive</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">∞</span>
                          </div>
                          <h5 className="font-medium text-gray-900">Pas de limite totale</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-1">Achats multiples autorisés</p>
                        <p className="text-gray-600 text-xs">Vous pouvez effectuer plusieurs transactions de 50 tickets</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-600 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Plus de chances</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-1">Probabilités cumulées</p>
                        <p className="text-gray-600 text-xs">Chaque ticket supplémentaire augmente vos chances de gagner</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question 7 - Horaires des tirages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === 'schedule' ? '' : 'schedule')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Quand ont lieu les tirages exactement ?
                  </h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  activeFaq === 'schedule' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeFaq === 'schedule' && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                            <Calendar className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Jackpot Hebdomadaire</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">Chaque dimanche à 20h00 UTC</p>
                        <p className="text-gray-600 text-sm">Soit 21h00 en France (heure d'hiver) ou 22h00 (heure d'été)</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                            <Trophy className="w-3 h-3 text-white" />
                          </div>
                          <h5 className="font-medium text-gray-900">Méga Jackpot Mensuel</h5>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">Le 1er de chaque mois à 20h00 UTC</p>
                        <p className="text-gray-600 text-sm">Diffusion en direct sur nos réseaux sociaux et notre site</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <h5 className="font-medium text-gray-900">Informations importantes</h5>
                      </div>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Les tirages sont diffusés en direct sur randomdraws.com</li>
                        <li>• Vous recevez une notification 1h avant chaque tirage</li>
                        <li>• Les résultats sont publiés immédiatement après le tirage</li>
                        <li>• Aucun report possible : les tirages ont toujours lieu à l'heure prévue</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawsPage;