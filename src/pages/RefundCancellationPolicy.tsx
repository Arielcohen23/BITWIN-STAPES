import React from 'react';
import { RotateCcw, X, Clock, AlertCircle, CheckCircle, CreditCard, Bitcoin, FileText, Phone } from 'lucide-react';

const RefundCancellationPolicy: React.FC = () => {
  const cancellationScenarios = [
    {
      scenario: 'Annulation immédiate',
      timeframe: '10 minutes après achat',
      conditions: 'Aucun tirage n\'a eu lieu',
      refund: '100% remboursé',
      process: 'Automatique via votre compte'
    },
    {
      scenario: 'Annulation rapide',
      timeframe: '24 heures après achat',
      conditions: 'Erreur de votre part prouvée',
      refund: '95% remboursé (frais admin)',
      process: 'Demande au support client'
    },
    {
      scenario: 'Annulation tardive',
      timeframe: 'Plus de 24 heures',
      conditions: 'Circonstances exceptionnelles',
      refund: 'Évaluation au cas par cas',
      process: 'Étude approfondie requise'
    }
  ];

  const refundReasons = [
    {
      reason: 'Erreur technique de BitLotto',
      reason: 'Erreur technique de BitWins',
      eligibility: 'Toujours éligible',
      timeframe: 'Aucune limite',
      amount: '100% + compensation',
      icon: AlertCircle,
      color: 'green'
    },
    {
      reason: 'Double paiement',
      eligibility: 'Toujours éligible',
      timeframe: '90 jours',
      amount: '100% du surplus',
      icon: CreditCard,
      color: 'green'
    },
    {
      reason: 'Paiement non autorisé',
      eligibility: 'Avec preuve bancaire',
      timeframe: '60 jours',
      amount: '100%',
      icon: AlertCircle,
      color: 'orange'
    },
    {
      reason: 'Tirage annulé par BitLotto',
      reason: 'Tirage annulé par BitWins',
      eligibility: 'Automatique',
      timeframe: 'Immédiat',
      amount: '100%',
      icon: X,
      color: 'blue'
    },
    {
      reason: 'Changement d\'avis',
      eligibility: 'Très limitée',
      timeframe: '10 minutes',
      amount: '100%',
      icon: RotateCcw,
      color: 'red'
    },
    {
      reason: 'Problème technique utilisateur',
      eligibility: 'Non éligible',
      timeframe: 'N/A',
      amount: '0%',
      icon: X,
      color: 'gray'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Demande initiale',
      description: 'Contactez notre support avec votre demande détaillée',
      timeframe: 'Immédiat'
    },
    {
      step: 2,
      title: 'Vérification',
      description: 'Notre équipe vérifie l\'éligibilité et les preuves',
      timeframe: '24-48 heures'
    },
    {
      step: 3,
      title: 'Décision',
      description: 'Notification de la décision avec justification',
      timeframe: '48-72 heures'
    },
    {
      step: 4,
      title: 'Traitement',
      description: 'Exécution du remboursement selon la méthode choisie',
      timeframe: '1-10 jours ouvrés'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <RotateCcw className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-black mb-4">
            Politique de Remboursement et d'Annulation
          </h1>
          <p className="text-xl text-gray-600">
            Conditions détaillées pour les remboursements et annulations
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Dernière mise à jour : 15 janvier 2025
          </div>
        </div>

        {/* Principe Général */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Principe Général</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              En raison de la nature instantanée des jeux de loterie et de l'utilisation de 
              cryptomonnaies, <strong>les achats de tickets BitWin sont généralement définitifs</strong> 
              une fois confirmés et les tickets émis.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">Important à Retenir</h3>
                  <p className="text-sm text-gray-600">refunds@bitwins.com</p>
                  <ul>
                    <li>• Les tickets participent immédiatement aux tirages</li>
                    <li>• Les transactions Bitcoin sont irréversibles</li>
                    <li>• Chaque achat constitue un engagement ferme</li>
                    <li>• Des exceptions existent pour des cas spécifiques</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scénarios d'Annulation */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Scénarios d'Annulation</h2>
          </div>
          <div className="space-y-6">
            {cancellationScenarios.map((scenario, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="grid md:grid-cols-5 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{scenario.scenario}</h3>
                    <p className="text-sm text-gray-600">{scenario.timeframe}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Conditions</h4>
                    <p className="text-sm text-gray-600">{scenario.conditions}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Remboursement</h4>
                    <p className={`text-sm font-medium ${
                      scenario.refund.includes('100%') ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {scenario.refund}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Processus</h4>
                    <p className="text-sm text-gray-600">{scenario.process}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-green-500' : 
                      index === 1 ? 'bg-orange-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Raisons de Remboursement */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Éligibilité aux Remboursements</h2>
          <div className="grid gap-4">
            {refundReasons.map((reason, index) => (
              <div key={index} className={`border rounded-lg p-6 ${
                reason.color === 'green' ? 'border-green-200 bg-green-50' :
                reason.color === 'orange' ? 'border-orange-200 bg-orange-50' :
                reason.color === 'blue' ? 'border-blue-200 bg-blue-50' :
                reason.color === 'red' ? 'border-red-200 bg-red-50' :
                'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-start gap-4">
                  <reason.icon className={`w-6 h-6 mt-1 ${
                    reason.color === 'green' ? 'text-green-500' :
                    reason.color === 'orange' ? 'text-orange-500' :
                    reason.color === 'blue' ? 'text-blue-500' :
                    reason.color === 'red' ? 'text-red-500' :
                    'text-gray-500'
                  }`} />
                  <div className="flex-1">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{reason.reason}</h3>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${
                          reason.eligibility.includes('Toujours') || reason.eligibility.includes('Automatique') ? 'text-green-700' :
                          reason.eligibility.includes('Non') ? 'text-red-700' : 'text-orange-700'
                        }`}>
                          {reason.eligibility}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{reason.timeframe}</p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${
                          reason.amount.includes('100%') ? 'text-green-700' :
                          reason.amount === '0%' ? 'text-red-700' : 'text-orange-700'
                        }`}>
                          {reason.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processus de Demande */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Processus de Demande</h2>
          </div>
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {step.step}
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-orange-200 -translate-y-0.5"></div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  <p className="text-xs text-orange-600 font-medium">{step.timeframe}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-4">Documents Requis pour la Demande :</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-blue-700">
                  <li>• ID de transaction ou numéro de commande</li>
                  <li>• Preuve de paiement (reçu, relevé bancaire)</li>
                  <li>• Captures d'écran du problème (si applicable)</li>
                </ul>
                <ul className="space-y-2 text-blue-700">
                  <li>• Description détaillée de la situation</li>
                  <li>• Coordonnées de contact à jour</li>
                  <li>• Adresse Bitcoin pour remboursement (si applicable)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Méthodes de Remboursement */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Méthodes de Remboursement</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <CreditCard className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Carte Bancaire</h3>
              <p className="text-sm text-gray-600 mb-3">
                Remboursement sur la carte utilisée pour l'achat
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Délai :</span>
                  <span className="font-medium">5-10 jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Frais :</span>
                  <span className="font-medium">2.9%</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <Bitcoin className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bitcoin</h3>
              <p className="text-sm text-gray-600 mb-3">
                Transfert direct sur votre wallet Bitcoin
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Délai :</span>
                  <span className="font-medium">24-48h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Frais :</span>
                  <span className="font-medium">Réseau</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crédit Compte</h3>
              <p className="text-sm text-gray-600 mb-3">
                Ajout de tickets gratuits sur votre compte
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Délai :</span>
                  <span className="font-medium">Immédiat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Frais :</span>
                  <span className="font-medium text-green-600">Gratuit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cas Particuliers */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Cas Particuliers</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Remboursements Partiels</h3>
              <p className="text-gray-700 mb-3">
                Dans certaines situations exceptionnelles, des remboursements partiels peuvent être accordés :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Problème technique majeur affectant l'équité du tirage</li>
                <li>• Erreur de communication de notre part sur les conditions</li>
                <li>• Circonstances de force majeure (guerre, catastrophe naturelle)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Comptes Fermés</h3>
              <p className="text-gray-700">
                En cas de fermeture de compte pour violation des conditions d'utilisation, 
                aucun remboursement ne sera accordé. Les fonds peuvent être confisqués 
                selon la gravité de l'infraction.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Délais de Prescription</h3>
              <p className="text-gray-700">
                Toute demande de remboursement doit être formulée dans un délai maximum de 
                90 jours après l'achat initial. Passé ce délai, aucune demande ne sera acceptée.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Faire une Demande</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contacts Support</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">refunds@bitwin.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-sm text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Horaires de Traitement</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Demandes urgentes :</strong> 24h/24</p>
                <p><strong>Demandes standard :</strong> Lun-Ven 9h-18h</p>
                <p><strong>Délai de réponse :</strong> 24-48h maximum</p>
                <p><strong>Traitement :</strong> 3-5 jours ouvrés</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-orange-200">
            <p className="text-orange-700 text-center">
              <strong>Conseil :</strong> Avant de faire une demande, vérifiez que votre situation 
              correspond bien aux critères d'éligibilité pour éviter les délais inutiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundCancellationPolicy;