import React from 'react';
import { Shield, Eye, Lock, Users, Globe, Database, FileText, Settings } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const dataTypes = [
    {
      category: 'Données d\'Identification',
      items: ['Nom complet', 'Adresse email', 'Date de naissance', 'Numéro de téléphone'],
      purpose: 'Création et gestion de compte, vérification d\'identité',
      retention: '5 ans après fermeture du compte'
    },
    {
      category: 'Données Financières',
      items: ['Historique des transactions', 'Méthodes de paiement', 'Adresses Bitcoin'],
      purpose: 'Traitement des paiements, lutte contre la fraude',
      retention: '10 ans (obligations légales)'
    },
    {
      category: 'Données de Navigation',
      items: ['Adresse IP', 'Cookies', 'Pages visitées', 'Temps de session'],
      purpose: 'Amélioration du service, sécurité, analytics',
      retention: '2 ans maximum'
    },
    {
      category: 'Données de Jeu',
      items: ['Tickets achetés', 'Participations', 'Gains', 'Préférences'],
      purpose: 'Gestion des tirages, historique personnel',
      retention: 'Durée de vie du compte + 3 ans'
    }
  ];

  const rights = [
    {
      right: 'Droit d\'Accès',
      description: 'Obtenir une copie de toutes vos données personnelles',
      icon: Eye
    },
    {
      right: 'Droit de Rectification',
      description: 'Corriger ou mettre à jour vos informations',
      icon: Settings
    },
    {
      right: 'Droit à l\'Effacement',
      description: 'Demander la suppression de vos données (sous conditions)',
      icon: FileText
    },
    {
      right: 'Droit à la Portabilité',
      description: 'Récupérer vos données dans un format structuré',
      icon: Database
    },
    {
      right: 'Droit d\'Opposition',
      description: 'Vous opposer au traitement de vos données',
      icon: Shield
    },
    {
      right: 'Droit de Limitation',
      description: 'Limiter le traitement de vos données',
      icon: Lock
    }
  ];

  const securityMeasures = [
    'Chiffrement AES-256 pour toutes les données sensibles',
    'Authentification à deux facteurs (2FA) disponible',
    'Surveillance 24h/24 des accès et activités suspectes',
    'Sauvegardes chiffrées sur plusieurs centres de données',
    'Accès restreint aux données selon le principe du moindre privilège',
    'Audits de sécurité réguliers par des tiers indépendants',
    'Formation continue du personnel sur la protection des données',
    'Protocoles de réponse aux incidents de sécurité'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-black mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-xl text-gray-600">
            Comment nous collectons, utilisons et protégeons vos données
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Dernière mise à jour : 15 janvier 2025 • Conforme RGPD
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Introduction</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              BitWins SAS ("nous", "notre", "BitWins") s'engage à protéger votre vie privée 
              et vos données personnelles. Cette politique explique comment nous collectons, 
              utilisons, stockons et protégeons vos informations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nous respectons le Règlement Général sur la Protection des Données (RGPD) et 
              toutes les lois applicables en matière de protection des données.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-2">Responsable du Traitement</h3>
              <p className="text-blue-700">
                <strong>BitWins SAS</strong><br />
                123 Avenue des Champs-Élysées<br />
                75008 Paris, France<br />
                Email : privacy@bitwins.com
              </p>
            </div>
          </div>
        </div>

        {/* Types de Données */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Données Collectées</h2>
          </div>
          <div className="space-y-6">
            {dataTypes.map((type, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{type.category}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Données collectées :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {type.items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Finalité :</h4>
                    <p className="text-sm text-gray-600">{type.purpose}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Conservation :</h4>
                    <p className="text-sm text-gray-600">{type.retention}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bases Légales */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Bases Légales du Traitement</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Exécution du Contrat</h3>
                <p className="text-green-700 text-sm">
                  Traitement nécessaire pour fournir nos services de loterie et gérer votre compte.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Obligations Légales</h3>
                <p className="text-blue-700 text-sm">
                  Respect des réglementations anti-blanchiment, fiscales et de jeux en ligne.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-purple-800 mb-1">Intérêts Légitimes</h3>
                <p className="text-purple-700 text-sm">
                  Amélioration de nos services, sécurité, prévention de la fraude.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 mb-1">Consentement</h3>
                <p className="text-orange-700 text-sm">
                  Marketing, newsletters et communications promotionnelles (révocable à tout moment).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Partage des Données */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Partage des Données</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Nous partageons vos données avec :</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Prestataires de Services :</strong>
                    <span className="text-gray-700"> Processeurs de paiement, hébergeurs, services d'analytics</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Autorités Légales :</strong>
                    <span className="text-gray-700"> Uniquement sur demande légale ou judiciaire</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Partenaires TPAL :</strong>
                    <span className="text-gray-700"> Pour la certification des tirages (données anonymisées)</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 mb-2">Nous ne vendons jamais vos données</h3>
              <p className="text-red-700">
                BitLotto ne vend, ne loue et ne partage jamais vos données personnelles 
                à des fins commerciales avec des tiers.
              </p>
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Mesures de Sécurité</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {securityMeasures.map((measure, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{measure}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vos Droits */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Vos Droits RGPD</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {rights.map((right, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <right.icon className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900">{right.right}</h3>
                </div>
                <p className="text-gray-700 text-sm">{right.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">Comment exercer vos droits :</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Envoyez un email à <strong>privacy@bitwins.com</strong></li>
              <li>• Utilisez le formulaire de contact avec la catégorie "Données personnelles"</li>
              <li>• Connectez-vous à votre compte et accédez aux paramètres de confidentialité</li>
            </ul>
            <p className="text-sm text-blue-600 mt-4">
              Nous répondons à toutes les demandes dans un délai de 30 jours maximum.
            </p>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Politique des Cookies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Types de Cookies Utilisés :</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <strong className="text-gray-900">Cookies Essentiels</strong>
                    <p className="text-sm text-gray-600">Nécessaires au fonctionnement du site</p>
                  </div>
                  <span className="text-green-600 font-medium">Toujours actifs</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <strong className="text-gray-900">Cookies Analytics</strong>
                    <p className="text-sm text-gray-600">Mesure d'audience et amélioration</p>
                  </div>
                  <span className="text-orange-600 font-medium">Avec consentement</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <strong className="text-gray-900">Cookies Marketing</strong>
                    <p className="text-sm text-gray-600">Publicité personnalisée</p>
                  </div>
                  <span className="text-orange-600 font-medium">Avec consentement</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres 
              de votre navigateur ou notre centre de préférences.
            </p>
          </div>
        </div>

        {/* Transferts Internationaux */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Transferts Internationaux</h2>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Certaines de nos données peuvent être transférées vers des pays hors de l'Union Européenne, 
              notamment pour l'hébergement et les services de paiement.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-3">Garanties de Protection :</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Clauses contractuelles types approuvées par la Commission Européenne</li>
                <li>• Certification Privacy Shield pour les prestataires américains</li>
                <li>• Décisions d'adéquation de la Commission Européenne</li>
                <li>• Mesures de sécurité supplémentaires (chiffrement, pseudonymisation)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact DPO */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Contact et Réclamations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Délégué à la Protection des Données</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email :</strong> dpo@bitwin.com</p>
                <p><strong>Adresse :</strong> DPO BitWin, 123 Avenue des Champs-Élysées, 75008 Paris</p>
                <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Autorité de Contrôle</h3>
              <div className="space-y-2 text-gray-700">
                <p>Si vous n'êtes pas satisfait de notre réponse, vous pouvez saisir :</p>
                <p><strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés)</p>
                <p>3 Place de Fontenoy, 75007 Paris</p>
                <p>www.cnil.fr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;