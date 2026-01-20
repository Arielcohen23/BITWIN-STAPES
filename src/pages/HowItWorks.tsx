import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Trophy, Zap, Bitcoin, CheckCircle, Calendar, Clock, ArrowRight, Play, Award, TrendingUp, Shield } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inscription');
  const [activeFaq, setActiveFaq] = useState<string>('');

  const tabs = [
    {
      id: 'inscription',
      name: 'Inscription',
      icon: Users
    },
    {
      id: 'competition',
      name: 'Compétition',
      icon: Trophy
    },
    {
      id: 'tirage',
      name: 'Tirage',
      icon: Zap
    },
    {
      id: 'gains',
      name: 'Envoi des gains',
      icon: Bitcoin
    }
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'inscription':
        return {
          title: 'Créez votre compte en 2 minutes',
          description: 'Rejoignez BitWin en quelques clics ! Il vous suffit d\'une adresse email valide pour commencer votre aventure Bitcoin. Notre processus d\'inscription est simple, rapide et 100% sécurisé.',
          features: [
            'Inscription gratuite avec votre email',
            'Validation de compte en moins de 5 minutes',
            'Interface intuitive et facile à utiliser',
            'Premier ticket offert pour découvrir',
            'Données protégées par chiffrement SSL',
            'Accès immédiat à votre espace personnel'
          ],
          icon: Users
        };
      case 'competition':
        return {
          title: 'Participez aux tirages Bitcoin',
          description: 'Chaque participation nécessite l\'achat d\'un ticket et une bonne réponse à une question de culture générale. Plus vous participez, plus vous multipliez vos chances de remporter nos jackpots Bitcoin !',
          features: [
            'Jackpot hebdomadaire : 1 Bitcoin tous les dimanches 20h',
            'Méga Jackpot mensuel : 3 Bitcoin dernier dimanche 20h',
            'Questions de culture générale accessibles à tous',
            'Chaque bonne réponse valide votre participation',
            'Tickets à partir de 29,99€ seulement',
            'Participations illimitées pour maximiser vos chances'
          ],
          icon: Trophy
        };
      case 'tirage':
        return {
          title: 'Tirages transparents en direct',
          description: 'Tous nos tirages sont réalisés en live via randomdraws.com, plateforme certifiée qui garantit une transparence totale. Suivez le tirage en direct et découvrez le gagnant en temps réel !',
          features: [
            'Tirages certifiés par randomdraws.com (TPAL)',
            'Diffusion en direct sur notre site web',
            'Nom du gagnant affiché publiquement',
            'Suivi possible sur nos réseaux sociaux',
            'Système prouvé équitable et vérifiable',
            'Aucune manipulation possible du résultat'
          ],
          icon: Zap
        };
      case 'gains':
        return {
          title: 'Réception ultra-rapide de vos gains',
          description: 'Dès l\'annonce du résultat, le gagnant est immédiatement contacté par tous nos canaux. Le paiement s\'effectue dans les 30 minutes via Binance (crypto) ou Revolut (euros), selon votre choix.',
          features: [
            'Contact immédiat : téléphone, email, notification',
            'Paiement en 30 minutes maximum après tirage',
            'Binance pour recevoir vos Bitcoin directement',
            'Revolut pour un virement en euros instantané',
            'Choix du mode de paiement dans votre profil',
            'Aucun frais prélevé sur vos gains'
          ],
          icon: Bitcoin
        };
      default:
        return null;
    }
  };

  const tabContent = getTabContent();

  const faqQuestions = [
    {
      id: 'fairness',
      question: 'Comment puis-je être sûr que les tirages sont équitables ?',
      icon: TrendingUp
    },
    {
      id: 'wrong-answer',
      question: 'Que se passe-t-il si je me trompe à la question ?',
      icon: Calendar
    },
    {
      id: 'payout-time',
      question: 'Combien de temps pour recevoir mes gains ?',
      icon: Shield
    },
    {
      id: 'fees',
      question: 'Y a-t-il des frais sur les gains ?',
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Comment Fonctionne BitWins ?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            La première plateforme de loterie Bitcoin sécurisée et transparente
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
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {tabContent && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <tabContent.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-black">
                    {tabContent.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {tabContent.description}
                </p>
                <ul className="space-y-4">
                  {tabContent.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-lg">
                  <tabContent.icon className="w-32 h-32 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prizes Showcase */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              Nos Prix à Gagner
            </h2>
            <p className="text-lg text-gray-600">
              Deux tirages Bitcoin chaque mois pour maximiser vos chances
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Weekly Prize */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-center">
                <Calendar className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">
                  Jackpot Hebdomadaire
                </h3>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  1 Bitcoin
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  ≈ 95,000€
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-gray-700 font-medium">
                    Tous les dimanches à 20h00
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  Ticket : 29,99€ • Question culture générale
                </div>
              </div>
            </div>

            {/* Monthly Prize */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-center">
                <Trophy className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">
                  Méga Jackpot Mensuel
                </h3>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  3 Bitcoin
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  ≈ 285,000€
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-gray-700 font-medium">
                    Le 1er de chaque mois à 20h00
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  Ticket : 89,99€ • Question culture générale
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              En 4 Étapes Simples
            </h2>
            <p className="text-lg text-gray-600">
              De l'inscription à la réception de vos gains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Inscription</h3>
              <p className="text-gray-600">
                Créez votre compte avec votre email et recevez votre premier ticket gratuit
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Compétition</h3>
              <p className="text-gray-600">
                Achetez vos tickets et répondez aux questions de culture générale
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Tirage</h3>
              <p className="text-gray-600">
                Suivez le tirage en direct via randomdraws.com chaque dimanche
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bitcoin className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Gains</h3>
              <p className="text-gray-600">
                Recevez vos Bitcoin en 30 minutes via Binance ou Revolut
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-lg text-gray-600">
              Tout ce que vous devez savoir sur notre fonctionnement
            </p>
          </div>

          <div className="space-y-3">
            {faqQuestions.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === faq.id ? '' : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <faq.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${
                    activeFaq === faq.id ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {activeFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      {faq.id === 'fairness' && (
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
                      )}
                      
                      {faq.id === 'wrong-answer' && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <p className="text-gray-900 font-medium mb-2">
                            Si votre réponse est incorrecte, votre ticket ne participera pas au tirage.
                          </p>
                          <p className="text-gray-500 text-sm">
                            Mais pas d'inquiétude, vous pouvez racheter un ticket et retenter votre chance ! Les questions sont conçues pour être accessibles à tous.
                          </p>
                        </div>
                      )}
                      
                      {faq.id === 'payout-time' && (
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
                      )}
                      
                      {faq.id === 'fees' && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <p className="text-gray-900 font-medium mb-2">
                            Aucun frais ! BitWins prend en charge tous les frais de transaction.
                          </p>
                          <p className="text-gray-500 text-sm">
                            Vous recevez 100% de vos gains, que ce soit en Bitcoin ou en euros. Nous ne prélevons aucune commission sur vos gains.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Link
            to="/draws"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            Voir les tirages disponibles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;