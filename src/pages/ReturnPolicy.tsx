import React from 'react';
import { RotateCcw, Clock, CheckCircle, X, AlertCircle, CreditCard, Bitcoin, FileText } from 'lucide-react';

const ReturnPolicy: React.FC = () => {
  const eligibleReturns = [
    {
      scenario: 'Erreur technique de BitWins',
      description: 'Double facturation, erreur de prix, bug système',
      timeframe: '30 jours',
      process: 'Automatique après vérification'
    },
    {
      scenario: 'Paiement non autorisé',
      description: 'Utilisation frauduleuse de votre carte bancaire',
      timeframe: '60 jours',
      process: 'Enquête avec votre banque'
    },
    {
      scenario: 'Service non fourni',
      description: 'Tirage annulé définitivement par BitWins',
      timeframe: '7 jours',
      process: 'Remboursement automatique'
    }
  ];

  const nonEligibleReturns = [
    'Changement d\'avis après achat de tickets',
    'Perte au tirage (résultat normal du jeu)',
    'Fluctuation de la valeur du Bitcoin',
    'Regret après avoir découvert les règles',
    'Problèmes techniques de votre côté',
    'Erreur de saisie de votre part',
    'Tickets achetés il y a plus de 30 jours'
  ];

  const refundMethods = [
    {
      method: 'Carte bancaire',
      timeframe: '5-10 jours ouvrés',
      description: 'Remboursement sur la carte utilisée pour l\'achat',
      icon: CreditCard
    },
    {
      method: 'Bitcoin',
      timeframe: '24-48 heures',
      description: 'Transfert sur votre wallet Bitcoin',
      icon: Bitcoin
    },
    {
      method: 'Crédit compte',
      timeframe: 'Immédiat',
      description: 'Ajout de tickets gratuits sur votre compte',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <RotateCcw className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-black mb-4">
            Politique de Retour
          </h1>
          <p className="text-xl text-gray-600">
            Conditions et procédures pour les remboursements
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
              En raison de la nature des jeux de hasard et de l'utilisation de cryptomonnaies, 
              <strong> les achats de tickets BitWins sont généralement non remboursables</strong> 
              une fois le paiement confirmé et les tickets émis.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">Important</h3>
                  <p className="text-orange-700">
                    Cette politique est conforme aux réglementations sur les jeux en ligne et 
                    vise à maintenir l'intégrité de notre système de loterie. Des exceptions 
                    peuvent être accordées dans des circonstances particulières.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cas Éligibles */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold text-black">Cas Éligibles au Remboursement</h2>
          </div>
          <div className="space-y-6">
            {eligibleReturns.map((item, index) => (
              <div key={index} className="border border-green-200 rounded-lg p-6 bg-green-50">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-green-800">{item.scenario}</h3>
                  <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    {item.timeframe}
                  </span>
                </div>
                <p className="text-green-700 mb-2">{item.description}</p>
                <p className="text-sm text-green-600">
                  <strong>Processus :</strong> {item.process}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cas Non Éligibles */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <X className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-bold text-black">Cas Non Éligibles</h2>
          </div>
          <div className="grid gap-3">
            {nonEligibleReturns.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Procédure de Demande */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Procédure de Demande</h2>
          </div>
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-500 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                <p className="text-sm text-gray-600">
                  Contactez notre support dans les 24h
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-500 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-sm text-gray-600">
                  Fournissez les preuves nécessaires
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-500 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Évaluation</h3>
                <p className="text-sm text-gray-600">
                  Analyse de votre demande sous 48h
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-500 font-bold">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Remboursement</h3>
                <p className="text-sm text-gray-600">
                  Traitement selon la méthode choisie
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-3">Informations à Fournir :</h3>
              <ul className="space-y-1 text-blue-700">
                <li>• Numéro de transaction ou ID de commande</li>
                <li>• Date et heure de l'achat</li>
                <li>• Montant payé et méthode de paiement</li>
                <li>• Description détaillée du problème</li>
                <li>• Captures d'écran si applicable</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Méthodes de Remboursement */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Méthodes de Remboursement</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {refundMethods.map((method, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                <method.icon className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.method}</h3>
                <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2 justify-center">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{method.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Délais et Frais */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Délais et Frais</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Délais de Traitement</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Évaluation de la demande :</span>
                  <span className="font-medium">24-48h</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Remboursement carte :</span>
                  <span className="font-medium">5-10 jours</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Remboursement Bitcoin :</span>
                  <span className="font-medium">24-48h</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Crédit compte :</span>
                  <span className="font-medium">Immédiat</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frais de Remboursement</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Erreur de BitWins :</span>
                  <span className="font-medium text-green-600">Gratuit</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Remboursement Bitcoin :</span>
                  <span className="font-medium">Frais réseau</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Remboursement carte :</span>
                  <span className="font-medium">2.9%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Crédit compte :</span>
                  <span className="font-medium text-green-600">Gratuit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Exceptions et Cas Particuliers */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Exceptions et Cas Particuliers</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Période de Grâce</h3>
              <p className="text-gray-700">
                Vous disposez de 10 minutes après l'achat pour annuler votre commande 
                si aucun tirage n'a eu lieu entre temps.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comptes Fermés</h3>
              <p className="text-gray-700">
                En cas de fermeture de compte pour violation des conditions, 
                aucun remboursement ne sera accordé.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Force Majeure</h3>
              <p className="text-gray-700">
                En cas d'événements exceptionnels (guerre, catastrophe naturelle, etc.), 
                des remboursements partiels peuvent être accordés au cas par cas.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Demander un Remboursement</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Si vous pensez être éligible à un remboursement, contactez notre équipe support 
              dès que possible avec tous les détails de votre situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:support@bitwin.com"
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-center font-medium"
              >
                Email : support@bitwin.com
              </a>
              <a
                href="/contact"
                className="flex-1 px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors text-center font-medium"
              >
                Formulaire de contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;