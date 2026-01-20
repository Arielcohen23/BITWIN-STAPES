import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Bitcoin, Shield, Clock, Users, Trophy, CreditCard, HelpCircle, AlertCircle, CheckCircle, Star, Calendar, Zap, TrendingUp, Award, Mail, Phone, FileText, Gift, Lock, Crown, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: t('faq.allQuestions'), icon: HelpCircle },
    { id: 'general', name: t('faq.general'), icon: Star },
    { id: 'tickets', name: t('faq.ticketsParticipation'), icon: Trophy },
    { id: 'payment', name: t('faq.payments'), icon: CreditCard },
    { id: 'security', name: t('faq.security'), icon: Shield },
    { id: 'draws', name: t('faq.draws'), icon: Calendar },
    { id: 'winnings', name: t('faq.winningsWithdrawals'), icon: Bitcoin },
    { id: 'technical', name: t('faq.technical'), icon: Zap }
  ];

  const faqItems: FAQItem[] = [
    // GÉNÉRAL
    {
      id: 'what-is-bitlotto',
      question: 'Qu\'est-ce que BitWin ?',
      answer: `BitWin est la première plateforme de loterie Bitcoin sécurisée et transparente. Nous organisons des tirages hebdomadaires (1 Bitcoin) et mensuels (3 Bitcoin), où tu peux tenter de gagner du Bitcoin en obtenant un ticket. Pour participer au tirage, tu dois d'abord répondre à une question de compétence. Une fois ta réponse validée, tu pourras accéder à l'achat de ton ticket. Tous nos tirages sont vérifiables sur la blockchain Bitcoin et utilisent un système de tirage électronique certifié TPAL pour garantir l'équité et la transparence.`,
      category: 'general'
    },
    {
      id: 'how-does-it-work',
      question: 'Comment fonctionne BitWin ?',
      answer: 'C\'est simple : 1) Créez votre compte et recevez 5 tickets gratuits, 2) Achetez des tickets supplémentaires (à partir de 29,99€), 3) Participez automatiquement aux tirages hebdomadaires et mensuels, 4) Si vous gagnez, vos Bitcoin sont transférés directement sur votre wallet. Chaque ticket vous donne une chance égale de gagner.',
      category: 'general'
    },
    {
      id: 'is-it-legal',
      question: 'BitWin est-il légal ?',
      answer: 'Oui, BitWin opère en conformité avec les réglementations en vigueur. Nous utilisons un système de tirage électronique certifié TPAL (Third Party Audited Lottery) qui garantit l\'équité et la transparence. Nos tirages sont vérifiables publiquement et nous respectons toutes les obligations légales relatives aux jeux en ligne.',
      category: 'general'
    },
    {
      id: 'age-requirement',
      question: 'Quel âge faut-il avoir pour participer ?',
      answer: 'Vous devez avoir au minimum 18 ans pour créer un compte et participer aux tirages BitLotto. Cette restriction d\'âge est strictement appliquée lors de l\'inscription et peut nécessiter une vérification d\'identité.',
      category: 'general'
    },
    {
      id: 'countries-allowed',
      question: 'Dans quels pays BitWin est-il disponible ?',
      answer: 'BitWin est disponible dans la plupart des pays, à l\'exception de ceux où les jeux en ligne sont interdits par la loi locale. Lors de votre inscription, nous vérifierons automatiquement si votre pays de résidence est éligible. Les pays actuellement exclus incluent les États-Unis, la France, la Chine, et certains pays du Moyen-Orient.',
      category: 'general'
    },

    // TICKETS & PARTICIPATION
    {
      id: 'ticket-price',
      question: 'Combien coûte un ticket ?',
      answer: 'Chaque ticket coûte 29,99€ (environ 0.001 Bitcoin selon le cours actuel). Ce prix fixe vous donne accès à tous les tirages : hebdomadaires (1 Bitcoin) et mensuels (3 Bitcoin). Plus vous avez de tickets, plus vos chances de gagner augmentent proportionnellement.',
      category: 'tickets'
    },
    {
      id: 'max-tickets',
      question: 'Combien de tickets puis-je acheter ?',
      answer: 'Vous pouvez acheter jusqu\'à 50 tickets par transaction pour maintenir l\'équité du jeu. Il n\'y a pas de limite sur le nombre total de tickets que vous pouvez posséder sur votre compte. Vous pouvez effectuer plusieurs achats si vous souhaitez avoir plus de 50 tickets.',
      category: 'tickets'
    },
    {
      id: 'ticket-validity',
      question: 'Combien de temps mes tickets sont-ils valides ?',
      answer: 'Vos tickets sont valides indéfiniment ! Ils participent automatiquement à tous les tirages hebdomadaires et mensuels jusqu\'à ce que vous gagniez ou décidiez de les utiliser. Les tickets non gagnants restent actifs pour les tirages suivants, vous n\'avez donc jamais besoin de racheter des tickets.',
      category: 'tickets'
    },
    {
      id: 'free-tickets',
      question: 'Comment obtenir des tickets bonus ?',
      answer: 'Plusieurs moyens d\'obtenir des tickets bonus : 1) 2 tickets pour chaque ami parrainé qui s\'inscrit, 2) Tickets bonus lors d\'achats groupés (10 bonus pour 100 tickets achetés, 50 bonus pour 250 tickets), 3) Promotions spéciales lors d\'événements et concours.',
      category: 'tickets'
    },
    {
      id: 'referral-program',
      question: 'Comment fonctionne le programme de parrainage ?',
      answer: 'Chaque utilisateur reçoit un code de parrainage unique. Quand quelqu\'un s\'inscrit avec votre code, vous recevez tous les deux 2 tickets gratuits. Il n\'y a pas de limite au nombre de personnes que vous pouvez parrainer. Votre code de parrainage est disponible dans votre dashboard.',
      category: 'tickets'
    },
    {
      id: 'ticket-transfer',
      question: 'Puis-je transférer mes tickets à quelqu\'un d\'autre ?',
      answer: 'Non, les tickets sont nominatifs et liés à votre compte. Ils ne peuvent pas être transférés, vendus ou échangés avec d\'autres utilisateurs. Cette politique garantit l\'intégrité du système et empêche les manipulations.',
      category: 'tickets'
    },

    // PAIEMENTS
    {
      id: 'payment-methods',
      question: 'Quelles méthodes de paiement acceptez-vous ?',
      answer: 'Nous acceptons : 1) Bitcoin (BTC) - 0% de frais, traitement instantané, 2) Cartes bancaires (Visa, Mastercard, Amex) - 2.9% de frais, traitement en 1-3 minutes, 3) Portefeuilles crypto (MetaMask, Trust Wallet, etc.) - 1% de frais, traitement en 30 secondes. Le paiement en Bitcoin est recommandé pour éviter les frais.',
      category: 'payment'
    },
    {
      id: 'payment-security',
      question: 'Mes paiements sont-ils sécurisés ?',
      answer: 'Absolument. Nous utilisons un chiffrement SSL 256-bit pour toutes les transactions. Les paiements par carte sont traités par des processeurs certifiés PCI-DSS. Pour Bitcoin, nous utilisons des adresses multi-signatures. Nous ne stockons jamais vos informations de paiement sensibles sur nos serveurs.',
      category: 'payment'
    },
    {
      id: 'payment-confirmation',
      question: 'Combien de temps pour confirmer un paiement ?',
      answer: 'Cela dépend de la méthode : Bitcoin (1-6 confirmations, 10-60 minutes), Carte bancaire (instantané à 3 minutes), Portefeuilles crypto (30 secondes à 5 minutes). Vous recevrez un email de confirmation dès que votre paiement est validé et vos tickets seront immédiatement ajoutés à votre compte.',
      category: 'payment'
    },
    {
      id: 'refund-policy',
      question: 'Puis-je demander un remboursement ?',
      answer: 'Les achats de tickets sont généralement non remboursables une fois le paiement confirmé, conformément à la nature des jeux de hasard. Cependant, nous pouvons traiter des remboursements en cas d\'erreur technique de notre part ou de double paiement. Contactez notre support dans les 24h pour toute réclamation légitime.',
      category: 'payment'
    },
    {
      id: 'currency-conversion',
      question: 'Comment sont calculés les taux de change ?',
      answer: 'Nous utilisons les taux de change en temps réel de CoinGecko et Binance pour convertir entre EUR et BTC. Les taux sont mis à jour toutes les minutes. Le taux affiché lors de votre achat est garanti pendant 15 minutes pour finaliser votre transaction.',
      category: 'payment'
    },

    // SÉCURITÉ
    {
      id: 'account-security',
      question: 'Comment sécuriser mon compte ?',
      answer: 'Recommandations de sécurité : 1) Utilisez un mot de passe fort et unique, 2) Activez l\'authentification à deux facteurs (2FA), 3) Ne partagez jamais vos identifiants, 4) Vérifiez toujours l\'URL (bitlotto.com), 5) Déconnectez-vous après chaque session, 6) Surveillez vos emails de notification.',
      category: 'security'
    },
    {
      id: 'data-protection',
      question: 'Comment protégez-vous mes données personnelles ?',
      answer: 'Nous respectons le RGPD et utilisons un chiffrement AES-256 pour toutes les données sensibles. Vos informations sont stockées sur des serveurs sécurisés avec accès restreint. Nous ne vendons jamais vos données à des tiers et vous pouvez demander leur suppression à tout moment.',
      category: 'security'
    },
    {
      id: 'wallet-security',
      question: 'Comment sécurisez-vous les Bitcoin ?',
      answer: 'Nous utilisons un système de cold storage (stockage hors ligne) pour 95% des fonds, avec des portefeuilles multi-signatures nécessitant plusieurs clés pour toute transaction. Les hot wallets pour les paiements quotidiens sont limités et surveillés 24/7. Nous travaillons avec des custodians réglementés.',
      category: 'security'
    },
    {
      id: 'phishing-protection',
      question: 'Comment éviter les tentatives de phishing ?',
      answer: 'Attention aux signes de phishing : 1) Vérifiez toujours l\'URL exacte (bitlotto.com), 2) Nous ne demandons jamais vos mots de passe par email, 3) Méfiez-vous des emails urgents demandant des actions immédiates, 4) Utilisez toujours nos liens officiels, 5) Signalez tout email suspect à security@bitlotto.com.',
      category: 'security'
    },

    // TIRAGES
    {
      id: 'draw-schedule',
      question: 'Quand ont lieu les tirages ?',
      answer: 'Jackpots : Chaque dimanche à 20h00 UTC (1 Bitcoin à gagner). Méga jackpots : Le 1er de chaque mois à 20h00 UTC (3 Bitcoin à gagner). Les horaires sont fixes et ne peuvent pas être reportés. Nous diffusons les tirages en direct sur notre site et nos réseaux sociaux.',
      category: 'draws'
    },
    {
      id: 'draw-fairness',
      question: 'Comment garantissez-vous l\'équité des tirages ?',
      answer: 'Nous utilisons le système TPAL (Third Party Audited Lottery) avec randomdraws.com pour sélectionner les gagnants. Le processus utilise un générateur de nombres aléatoires certifié, indépendant de BitLotto. Chaque tirage génère un certificat public vérifiable avec horodatage sécurisé.',
      category: 'draws'
    },
    {
      id: 'draw-verification',
      question: 'Comment puis-je vérifier les résultats d\'un tirage ?',
      answer: 'Tous les tirages sont publics et vérifiables : 1) Certificat TPAL publié après chaque tirage, 2) Hash du bloc Bitcoin utilisé comme source d\'aléatoire, 3) Liste complète des participants (anonymisée), 4) Algorithme de sélection open source, 5) Historique complet disponible sur notre site.',
      category: 'draws'
    },
    {
      id: 'minimum-participants',
      question: 'Y a-t-il un nombre minimum de participants ?',
      answer: 'Non, il n\'y a pas de minimum. Même avec un seul participant, le tirage aura lieu à la date prévue et cette personne gagnera automatiquement. Cependant, plus il y a de participants, plus l\'excitation est grande ! Nous garantissons qu\'il y aura toujours un gagnant.',
      category: 'draws'
    },
    {
      id: 'draw-cancellation',
      question: 'Un tirage peut-il être annulé ?',
      answer: 'Non, une fois la date de tirage annoncée, elle ne peut pas être annulée ou reportée. Cependant, un tirage peut être avancé si tous les tickets disponibles sont vendus avant la date prévue. Dans ce cas, tous les participants sont notifiés 24h à l\'avance minimum.',
      category: 'draws'
    },
    {
      id: 'live-draw',
      question: 'Puis-je assister au tirage en direct ?',
      answer: 'Oui ! Tous nos tirages sont diffusés en direct sur notre site web et nos chaînes YouTube/Twitch. Vous pouvez voir le processus de sélection en temps réel, avec l\'interface TPAL et l\'annonce du gagnant. Les rediffusions sont disponibles pendant 30 jours.',
      category: 'draws'
    },

    // GAINS & RETRAITS
    {
      id: 'winning-notification',
      question: 'Comment saurai-je si j\'ai gagné ?',
      answer: 'Si vous gagnez : 1) Email immédiat avec les détails, 2) Notification sur votre dashboard, 3) SMS si vous avez fourni votre numéro, 4) Annonce publique (avec votre accord), 5) Votre compte sera mis à jour automatiquement. Nous vous contacterons dans les 5 minutes suivant le tirage.',
      category: 'winnings'
    },
    {
      id: 'prize-payout',
      question: 'Comment et quand recevrai-je mes gains ?',
      answer: 'Les gains sont transférés automatiquement sur votre wallet Bitcoin dans les 30 minutes suivant le tirage. Vous devez avoir une adresse Bitcoin valide dans votre profil. Si vous n\'en avez pas, nous vous aiderons à en créer une. Aucun frais n\'est prélevé sur vos gains.',
      category: 'winnings'
    },
    {
      id: 'tax-implications',
      question: 'Dois-je payer des impôts sur mes gains ?',
      answer: 'Les obligations fiscales dépendent de votre pays de résidence. Dans la plupart des juridictions, les gains de loterie sont imposables. Nous fournissons tous les documents nécessaires pour votre déclaration fiscale. Consultez un conseiller fiscal local pour connaître vos obligations spécifiques.',
      category: 'winnings'
    },
    {
      id: 'prize-claim-time',
      question: 'Ai-je une limite de temps pour réclamer mes gains ?',
      answer: 'Vous avez 1 an pour réclamer vos gains à partir de la date du tirage. Passé ce délai, les gains non réclamés sont redistribués dans les prix futurs. Nous vous enverrons plusieurs rappels pendant cette période. Il est donc important de maintenir vos informations de contact à jour.',
      category: 'winnings'
    },
    {
      id: 'multiple-wins',
      question: 'Puis-je gagner plusieurs fois ?',
      answer: 'Absolument ! Il n\'y a aucune limite au nombre de fois que vous pouvez gagner. Chaque tirage est indépendant et vos tickets participent à tous les tirages futurs. Certains de nos utilisateurs ont gagné plusieurs fois, c\'est tout à fait possible et légal.',
      category: 'winnings'
    },
    {
      id: 'partial-wins',
      question: 'Y a-t-il des prix secondaires ?',
      answer: 'Actuellement, nous avons un seul gagnant par tirage qui remporte la totalité du prix (1 Bitcoin ou 3 Bitcoin). Nous étudions la possibilité d\'ajouter des prix secondaires dans le futur, mais pour l\'instant, c\'est "winner takes all" pour maximiser l\'impact du gain principal.',
      category: 'winnings'
    },

    // TECHNIQUE
    {
      id: 'browser-compatibility',
      question: 'Quels navigateurs sont supportés ?',
      answer: 'BitLotto fonctionne sur tous les navigateurs modernes : Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. Nous recommandons d\'utiliser la dernière version de votre navigateur pour une expérience optimale. JavaScript doit être activé.',
      category: 'technical'
    },
    {
      id: 'mobile-app',
      question: 'Y a-t-il une application mobile ?',
      answer: 'Pas encore, mais notre site web est entièrement responsive et fonctionne parfaitement sur mobile. Vous pouvez ajouter bitlotto.com à votre écran d\'accueil pour une expérience similaire à une app. Une application native iOS/Android est en développement pour 2024.',
      category: 'technical'
    },
    {
      id: 'api-access',
      question: 'Proposez-vous une API pour les développeurs ?',
      answer: 'Nous travaillons sur une API publique qui permettra aux développeurs d\'accéder aux données des tirages, statistiques et historiques. Elle sera disponible en 2024 avec une documentation complète. Inscrivez-vous à notre newsletter pour être notifié du lancement.',
      category: 'technical'
    },
    {
      id: 'system-maintenance',
      question: 'Que se passe-t-il pendant la maintenance ?',
      answer: 'Les maintenances sont programmées en dehors des heures de tirage et annoncées 48h à l\'avance. Pendant la maintenance, vous ne pouvez pas acheter de tickets, mais vos tickets existants restent valides. Les tirages ne sont jamais affectés par la maintenance.',
      category: 'technical'
    },
    {
      id: 'data-backup',
      question: 'Mes données sont-elles sauvegardées ?',
      answer: 'Oui, nous effectuons des sauvegardes automatiques toutes les heures sur plusieurs centres de données géographiquement distribués. Vos tickets et historique sont protégés contre toute perte de données. Nous testons régulièrement nos procédures de restauration.',
      category: 'technical'
    },
    {
      id: 'blockchain-integration',
      question: 'Comment utilisez-vous la blockchain Bitcoin ?',
      answer: 'Nous utilisons la blockchain Bitcoin de plusieurs façons : 1) Hash des blocs comme source d\'aléatoire pour les tirages, 2) Stockage des preuves de tirage, 3) Paiements directs aux gagnants, 4) Vérification publique de tous les processus. Cela garantit une transparence totale.',
      category: 'technical'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('faq.description')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                <category.icon className="w-3 h-3" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600 text-center">
            {filteredItems.length} {filteredItems.length === 1 ? t('faq.questionFound') : t('faq.questionsFound')}
            {searchTerm && ` ${t('faq.for')} "${searchTerm}"`}
          </p>
        </div>

        {/* FAQ Items - New Design matching Draws page */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    {(() => {
                      switch (item.category) {
                        case 'general':
                          return <Star className="w-4 h-4 text-gray-600" />;
                        case 'tickets':
                          return <Trophy className="w-4 h-4 text-gray-600" />;
                        case 'payment':
                          return <Bitcoin className="w-4 h-4 text-gray-600" />;
                        case 'security':
                          return <Shield className="w-4 h-4 text-gray-600" />;
                        case 'draws':
                          return <Calendar className="w-4 h-4 text-gray-600" />;
                        case 'winnings':
                          return <Bitcoin className="w-4 h-4 text-gray-600" />;
                        case 'technical':
                          return <Zap className="w-4 h-4 text-gray-600" />;
                        default:
                          return <HelpCircle className="w-4 h-4 text-gray-600" />;
                      }
                    })()}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {item.question}
                  </h3>
                </div>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    {(() => {
                      // Réponses structurées selon l'ID de la question
                      switch (item.id) {
                        case 'ticket-price':
                          return (
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">€</span>
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Prix accessible</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">29,99€ par ticket</p>
                                <p className="text-gray-500 text-sm">Prix étudié pour rester accessible tout en garantissant des gains attractifs</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Rapport qualité/prix</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Ratio optimal</p>
                                <p className="text-gray-500 text-sm">30€ pour 1 chance sur 500 de gagner 100 000€, soit un ratio exceptionnel</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Award className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Réductions</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Jusqu'à -25%</p>
                                <p className="text-gray-500 text-sm">Remises dégressives : 15+ tickets (-10%), 20+ (-15%), 25+ (-20%), 50+ (-25%)</p>
                              </div>
                            </div>
                          );

                        case 'what-is-bitlotto':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Bitcoin className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Première plateforme Bitcoin</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Loterie Bitcoin sécurisée</p>
                                <p className="text-gray-500 text-sm">La première plateforme de loterie Bitcoin transparente et équitable au monde</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Système TPAL certifié</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Tirages vérifiables</p>
                                <p className="text-gray-500 text-sm">Tous nos tirages sont vérifiables sur la blockchain Bitcoin</p>
                              </div>
                            </div>
                          );

                        case 'how-does-it-work':
                          return (
                            <div className="grid md:grid-cols-4 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">1</div>
                                <h5 className="font-semibold text-gray-900 mb-2">Créez votre compte</h5>
                                <p className="text-gray-500 text-sm">Inscription gratuite + 5 tickets offerts</p>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">2</div>
                                <h5 className="font-semibold text-gray-900 mb-2">Achetez des tickets</h5>
                                <p className="text-gray-500 text-sm">À partir de 29,99€ par ticket</p>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">3</div>
                                <h5 className="font-semibold text-gray-900 mb-2">Participez aux tirages</h5>
                                <p className="text-gray-500 text-sm">Automatiquement inclus dans tous les tirages</p>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">4</div>
                                <h5 className="font-semibold text-gray-900 mb-2">Recevez vos Bitcoin</h5>
                                <p className="text-gray-500 text-sm">Transfert direct sur votre wallet</p>
                              </div>
                            </div>
                          );

                        case 'is-it-legal':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">100% Légal</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Conformité réglementaire</p>
                                <p className="text-gray-500 text-sm">Opération en conformité avec toutes les réglementations en vigueur</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Système TPAL</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Certification tierce</p>
                                <p className="text-gray-500 text-sm">Third Party Audited Lottery garantit l'équité</p>
                              </div>
                            </div>
                          );

                        case 'age-requirement':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-lg">18</span>
                                </div>
                                <h5 className="font-semibold text-gray-900">Âge minimum requis</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">
                                Vous devez avoir au minimum 18 ans pour créer un compte et participer aux tirages BitLotto.
                              </p>
                              <p className="text-gray-500 text-sm">
                                Cette restriction d'âge est appliquée lors de l'inscription et peut nécessiter une vérification d'identité.
                              </p>
                            </div>
                          );

                        case 'countries-allowed':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Pays autorisés</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Disponible mondialement</p>
                                <p className="text-gray-500 text-sm">BitWin est disponible dans la plupart des pays du monde</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Pays exclus</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Restrictions légales</p>
                                <p className="text-gray-500 text-sm">États-Unis, Chine, certains pays du Moyen-Orient</p>
                              </div>
                            </div>
                          );
                        case 'payment-methods':
                          return (
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Bitcoin className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Bitcoin</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">0% de frais</p>
                                <p className="text-gray-500 text-sm">Traitement instantané, méthode recommandée</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CreditCard className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Cartes bancaires</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">2.9% de frais</p>
                                <p className="text-gray-500 text-sm">Visa, Mastercard, Amex - Traitement en 1-3 minutes</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Portefeuilles crypto</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">1% de frais</p>
                                <p className="text-gray-500 text-sm">MetaMask, Trust Wallet - Traitement en 30 secondes</p>
                              </div>
                            </div>
                          );

                        case 'draw-schedule':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Calendar className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Jackpot Hebdomadaire</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Chaque dimanche à 20h00 UTC</p>
                                <p className="text-gray-500 text-sm">Soit 21h00 en France (heure d'hiver) ou 22h00 (heure d'été)</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Trophy className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Méga Jackpot Mensuel</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Le 1er de chaque mois à 20h00 UTC</p>
                                <p className="text-gray-500 text-sm">Diffusion en direct sur nos réseaux sociaux et notre site</p>
                              </div>
                            </div>
                          );

                        case 'draw-fairness':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Système TPAL</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Certification tierce partie</p>
                                <p className="text-gray-500 text-sm">Randomdraws.com garantit une sélection 100% aléatoire et vérifiable</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Bitcoin className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Blockchain Bitcoin</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Source d'aléatoire inviolable</p>
                                <p className="text-gray-500 text-sm">Hash des blocs Bitcoin utilisé, rendant toute manipulation impossible</p>
                              </div>
                            </div>
                          );

                        case 'prize-payout':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Clock className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Paiement ultra-rapide</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">30 minutes maximum</p>
                                <p className="text-gray-500 text-sm">Dès l'annonce du résultat, vos Bitcoin sont transférés automatiquement</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Contact immédiat</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Notification instantanée</p>
                                <p className="text-gray-500 text-sm">Email, SMS et appel téléphonique pour vous informer de votre victoire</p>
                              </div>
                            </div>
                          );

                        case 'account-security':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <Shield className="w-3 h-3 text-white" />
                                </div>
                                <h5 className="font-semibold text-gray-900">Recommandations de sécurité</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">Bonnes pratiques</p>
                              <p className="text-gray-500 text-sm">
                                Utilisez un mot de passe fort et unique, activez l'authentification à deux facteurs (2FA), ne partagez jamais vos identifiants, vérifiez toujours l'URL (bitlotto.com), déconnectez-vous après chaque session et surveillez vos emails de notification.
                              </p>
                            </div>
                          );

                        case 'max-tickets':
                          return (
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">50</span>
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Limite par transaction</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Maximum 50 tickets</p>
                                <p className="text-gray-500 text-sm">Pour maintenir l'équité et éviter la concentration excessive</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">∞</span>
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Pas de limite totale</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Achats multiples autorisés</p>
                                <p className="text-gray-500 text-sm">Vous pouvez effectuer plusieurs transactions de 50 tickets</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Plus de chances</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Probabilités cumulées</p>
                                <p className="text-gray-500 text-sm">Chaque ticket supplémentaire augmente vos chances de gagner</p>
                              </div>
                            </div>
                          );

                        case 'ticket-validity':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-lg">∞</span>
                                </div>
                                <h5 className="font-semibold text-gray-900">Validité illimitée</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">
                                Vos tickets sont valides indéfiniment ! Ils participent automatiquement à tous les tirages hebdomadaires et mensuels.
                              </p>
                              <p className="text-gray-500 text-sm">
                                Les tickets non gagnants restent actifs pour les tirages suivants, vous n'avez donc jamais besoin de racheter des tickets.
                              </p>
                            </div>
                          );

                        case 'free-tickets':
                          return (
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Users className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Parrainage</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">2 tickets par ami</p>
                                <p className="text-gray-500 text-sm">Pour chaque ami parrainé qui s'inscrit</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Trophy className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Achats groupés</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Jusqu'à 50 bonus</p>
                                <p className="text-gray-500 text-sm">10 bonus pour 100 tickets, 50 pour 250</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Star className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Promotions</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Événements spéciaux</p>
                                <p className="text-gray-500 text-sm">Concours et promotions ponctuelles</p>
                              </div>
                            </div>
                          );

                        case 'referral-program':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Users className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Code unique</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Parrainage illimité</p>
                                <p className="text-gray-500 text-sm">Chaque utilisateur reçoit un code de parrainage unique disponible dans son dashboard</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Gift className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Récompense mutuelle</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">2 tickets chacun</p>
                                <p className="text-gray-500 text-sm">Vous et votre filleul recevez tous les deux 2 tickets gratuits</p>
                              </div>
                            </div>
                          );

                        case 'ticket-transfer':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <AlertCircle className="w-4 h-4 text-white" />
                                </div>
                                <h5 className="font-semibold text-gray-900">Tickets non transférables</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">
                                Les tickets sont nominatifs et liés à votre compte. Ils ne peuvent pas être transférés, vendus ou échangés.
                              </p>
                              <p className="text-gray-500 text-sm">
                                Cette politique garantit l'intégrité du système et empêche les manipulations.
                              </p>
                            </div>
                          );

                        case 'payment-security':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Chiffrement SSL 256-bit</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Sécurité maximale</p>
                                <p className="text-gray-500 text-sm">Toutes les transactions sont protégées par un chiffrement de niveau bancaire</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Processeurs certifiés</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">PCI-DSS compliant</p>
                                <p className="text-gray-500 text-sm">Paiements traités par des processeurs certifiés, aucune donnée stockée</p>
                              </div>
                            </div>
                          );

                        case 'payment-confirmation':
                          return (
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Bitcoin className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Bitcoin</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">10-60 minutes</p>
                                <p className="text-gray-500 text-sm">1-6 confirmations réseau requises</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CreditCard className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Carte bancaire</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Instantané à 3 min</p>
                                <p className="text-gray-500 text-sm">Validation immédiate du paiement</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Portefeuilles crypto</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">30 sec à 5 min</p>
                                <p className="text-gray-500 text-sm">Confirmation rapide via wallet</p>
                              </div>
                            </div>
                          );

                        case 'refund-policy':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Principe général</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Non remboursable</p>
                                <p className="text-gray-500 text-sm">Les achats sont définitifs une fois le paiement confirmé</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Exceptions</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Erreurs techniques</p>
                                <p className="text-gray-500 text-sm">Remboursement possible en cas d'erreur de notre part</p>
                              </div>
                            </div>
                          );

                        case 'currency-conversion':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Taux en temps réel</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">CoinGecko + Binance</p>
                                <p className="text-gray-500 text-sm">Mise à jour toutes les minutes pour une précision maximale</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Clock className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Taux garanti</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">15 minutes</p>
                                <p className="text-gray-500 text-sm">Le taux affiché est garanti pendant 15 minutes</p>
                              </div>
                            </div>
                          );

                        case 'data-protection':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Conformité RGPD</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Protection européenne</p>
                                <p className="text-gray-500 text-sm">Respect total du Règlement Général sur la Protection des Données</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Lock className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Chiffrement AES-256</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Sécurité maximale</p>
                                <p className="text-gray-500 text-sm">Toutes les données sensibles sont chiffrées</p>
                              </div>
                            </div>
                          );

                        case 'wallet-security':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Cold Storage</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">95% hors ligne</p>
                                <p className="text-gray-500 text-sm">Stockage sécurisé avec portefeuilles multi-signatures</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Clock className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Surveillance 24/7</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Monitoring continu</p>
                                <p className="text-gray-500 text-sm">Hot wallets limités et surveillés en permanence</p>
                              </div>
                            </div>
                          );

                        case 'phishing-protection':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <AlertCircle className="w-3 h-3 text-white" />
                                </div>
                                <h5 className="font-semibold text-gray-900">Protection anti-phishing</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">Signes à éviter</p>
                              <p className="text-gray-500 text-sm">
                                URL différente de bitlotto.com, demandes de mot de passe par email, emails urgents demandant des actions immédiates, liens suspects. En cas de doute, signalez à security@bitlotto.com
                              </p>
                            </div>
                          );

                        case 'draw-verification':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Certificat TPAL</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Publié après chaque tirage</p>
                                <p className="text-gray-500 text-sm">Document officiel vérifiable publiquement</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Bitcoin className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Hash Bitcoin</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Source d'aléatoire</p>
                                <p className="text-gray-500 text-sm">Utilisation du hash des blocs Bitcoin</p>
                              </div>
                            </div>
                          );

                        case 'minimum-participants':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <h5 className="font-semibold text-gray-900">Aucun minimum requis</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">
                                Même avec un seul participant, le tirage aura lieu à la date prévue et cette personne gagnera automatiquement.
                              </p>
                              <p className="text-gray-500 text-sm">
                                Il y aura toujours un gagnant, quel que soit le nombre de participants !
                              </p>
                            </div>
                          );

                        case 'draw-cancellation':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Pas d'annulation</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Date fixe</p>
                                <p className="text-gray-500 text-sm">Une fois annoncée, la date ne peut pas être annulée ou reportée</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Clock className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Tirage anticipé</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Si tous les tickets vendus</p>
                                <p className="text-gray-500 text-sm">Notification 24h à l'avance minimum</p>
                              </div>
                            </div>
                          );

                        case 'live-draw':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Play className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Diffusion en direct</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Multi-plateformes</p>
                                <p className="text-gray-500 text-sm">Site web, YouTube, Twitch - Processus visible en temps réel</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Clock className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Rediffusions</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">30 jours</p>
                                <p className="text-gray-500 text-sm">Disponibles pendant 30 jours après le tirage</p>
                              </div>
                            </div>
                          );

                        case 'winning-notification':
                          return (
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Mail className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Email immédiat</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Notification complète</p>
                                <p className="text-gray-500 text-sm">Avec tous les détails</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Phone className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">SMS + Appel</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Contact téléphonique</p>
                                <p className="text-gray-500 text-sm">Direct et immédiat</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Trophy className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Dashboard</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Mise à jour automatique</p>
                                <p className="text-gray-500 text-sm">En temps réel</p>
                              </div>
                            </div>
                          );

                        case 'tax-implications':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Dépend de votre pays</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Obligations variables</p>
                                <p className="text-gray-500 text-sm">Les gains de loterie sont généralement imposables</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <FileText className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Documents fournis</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Aide à la déclaration</p>
                                <p className="text-gray-500 text-sm">Tous les documents nécessaires pour vos impôts</p>
                              </div>
                            </div>
                          );

                        case 'prize-claim-time':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <Clock className="w-4 h-4 text-white" />
                                </div>
                                <h5 className="font-semibold text-gray-900">1 an pour réclamer</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">
                                Vous avez 1 an pour réclamer vos gains à partir de la date du tirage. Passé ce délai, les gains sont redistribués.
                              </p>
                              <p className="text-gray-500 text-sm">
                                Maintenez vos informations de contact à jour pour recevoir nos rappels !
                              </p>
                            </div>
                          );

                        case 'multiple-wins':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <Trophy className="w-4 h-4 text-white" />
                                </div>
                                <h5 className="font-semibold text-gray-900">Gains multiples autorisés</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">
                                Aucune limite au nombre de fois que vous pouvez gagner ! Chaque tirage est indépendant.
                              </p>
                              <p className="text-gray-500 text-sm">
                                Certains de nos utilisateurs ont gagné plusieurs fois - c'est tout à fait légal !
                              </p>
                            </div>
                          );

                        case 'partial-wins':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <Crown className="w-4 h-4 text-white" />
                                </div>
                                <h5 className="font-semibold text-gray-900">Winner takes all</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">
                                Un seul gagnant par tirage remporte la totalité du prix (1 Bitcoin ou 3 Bitcoin).
                              </p>
                              <p className="text-gray-500 text-sm">
                                Nous étudions l'ajout de prix secondaires pour maximiser les chances de gain.
                              </p>
                            </div>
                          );

                        case 'browser-compatibility':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Navigateurs supportés</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</p>
                                <p className="text-gray-500 text-sm">Utilisez la dernière version pour une expérience optimale</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Prérequis</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">JavaScript activé</p>
                                <p className="text-gray-500 text-sm">Nécessaire pour le fonctionnement de la plateforme</p>
                              </div>
                            </div>
                          );

                        case 'mobile-app':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Phone className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Site responsive</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Optimisé mobile</p>
                                <p className="text-gray-500 text-sm">Fonctionne parfaitement sur tous les appareils</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Calendar className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">App native</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">En développement</p>
                                <p className="text-gray-500 text-sm">Application iOS/Android prévue pour 2024</p>
                              </div>
                            </div>
                          );

                        case 'api-access':
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                  <Zap className="w-4 h-4 text-white" />
                                </div>
                                <h5 className="font-semibold text-gray-900">API publique en développement</h5>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">
                                Une API publique sera disponible en 2024 avec accès aux données des tirages, statistiques et historiques.
                              </p>
                              <p className="text-gray-500 text-sm">
                                Inscrivez-vous à notre newsletter pour être notifié du lancement !
                              </p>
                            </div>
                          );

                        case 'system-maintenance':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Clock className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Maintenance programmée</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Hors heures de tirage</p>
                                <p className="text-gray-500 text-sm">Annoncée 48h à l'avance, tickets existants restent valides</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Tirages protégés</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Jamais affectés</p>
                                <p className="text-gray-500 text-sm">Les tirages ne sont jamais impactés par la maintenance</p>
                              </div>
                            </div>
                          );

                        case 'data-backup':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Sauvegardes automatiques</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Toutes les heures</p>
                                <p className="text-gray-500 text-sm">Sur plusieurs centres de données géographiquement distribués</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Tests réguliers</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Procédures testées</p>
                                <p className="text-gray-500 text-sm">Nous testons régulièrement nos procédures de restauration</p>
                              </div>
                            </div>
                          );

                        case 'blockchain-integration':
                          return (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Bitcoin className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Source d'aléatoire</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Hash des blocs Bitcoin</p>
                                <p className="text-gray-500 text-sm">Utilisé pour les tirages</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <h5 className="font-semibold text-gray-900">Preuves stockées</h5>
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Transparence totale</p>
                                <p className="text-gray-500 text-sm">Stockage des preuves de tirage sur blockchain</p>
                              </div>
                            </div>
                          );

                        default:
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <p className="text-gray-900 font-medium mb-2">
                                {item.answer.split('\n')[0]}
                              </p>
                              {item.answer.split('\n').length > 1 && (
                                <p className="text-gray-500 text-sm">
                                  {item.answer.split('\n').slice(1).join('\n')}
                                </p>
                              )}
                            </div>
                          );
                      }
                    })()}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('faq.noQuestionsFound')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('faq.tryModifyingSearch')}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              {t('faq.resetFilters')}
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white text-center">
          <h2 className="text-xl font-bold mb-3">
            {t('faq.cantFindAnswer')}
          </h2>
          <p className="mb-4 opacity-90">
            {t('faq.supportTeamAvailable')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@bitlotto.com"
              className="px-5 py-2 bg-white text-orange-500 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              {t('faq.contactSupport')}
            </a>
            <a
              href="/contact"
              className="px-5 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-orange-500 transition-colors font-medium"
            >
              {t('faq.helpCenter')}
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-5 text-center shadow-sm border border-gray-200">
            <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">{t('faq.quickResponse')}</h3>
            <p className="text-gray-600 text-sm">{t('faq.supportAvailable24h')}</p>
          </div>
          <div className="bg-white rounded-lg p-5 text-center shadow-sm border border-gray-200">
            <Users className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">{t('faq.activeCommunity')}</h3>
            <p className="text-gray-600 text-sm">{t('faq.moreThanPlayers')}</p>
          </div>
          <div className="bg-white rounded-lg p-5 text-center shadow-sm border border-gray-200">
            <CheckCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">{t('faq.guaranteedSatisfaction')}</h3>
            <p className="text-gray-600 text-sm">{t('faq.customerSatisfaction')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;