import React from 'react';
import { Shield, AlertTriangle, CheckCircle, X, Users, Globe, Lock, FileText } from 'lucide-react';

const AcceptableUsePolicy: React.FC = () => {
  const prohibitedActivities = [
    'Utilisation de bots ou scripts automatisés pour acheter des tickets',
    'Tentative de manipulation des tirages ou du système',
    'Création de comptes multiples pour contourner les limites',
    'Partage ou vente de comptes utilisateur',
    'Utilisation de la plateforme pour des activités illégales',
    'Harcèlement ou comportement abusif envers d\'autres utilisateurs',
    'Diffusion de contenu offensant, diffamatoire ou inapproprié',
    'Tentative d\'accès non autorisé aux systèmes de BitLotto',
    'Tentative d\'accès non autorisé aux systèmes de BitWins',
    'Utilisation de VPN pour contourner les restrictions géographiques',
    'Blanchiment d\'argent ou financement d\'activités illicites'
  ];

  const allowedActivities = [
    'Participation équitable aux tirages selon les règles établies',
    'Achat de tickets dans les limites autorisées (max 50 par transaction)',
    'Utilisation du programme de parrainage de manière honnête',
    'Communication respectueuse avec le support client',
    'Vérification de l\'authenticité des tirages via les certificats publics',
    'Partage d\'expériences positives sur les réseaux sociaux',
    'Signalement de bugs ou problèmes techniques',
    'Consultation des historiques de tirages et statistiques'
  ];

  const consequences = [
    {
      level: 'Avertissement',
      description: 'Premier manquement mineur aux règles',
      action: 'Email d\'avertissement et rappel des conditions'
    },
    {
      level: 'Suspension temporaire',
      description: 'Violation répétée ou manquement modéré',
      action: 'Suspension du compte de 7 à 30 jours'
    },
    {
      level: 'Suspension définitive',
      description: 'Violation grave ou récidive après suspension',
      action: 'Fermeture permanente du compte et confiscation des fonds'
    },
    {
      level: 'Poursuites légales',
      description: 'Activités criminelles ou fraude avérée',
      action: 'Transmission aux autorités compétentes'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-black mb-4">
            Politique d'Utilisation Acceptable
          </h1>
          <p className="text-xl text-gray-600">
            Règles et directives pour une utilisation responsable de BitLotto
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Dernière mise à jour : 15 janvier 2025
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Introduction</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Cette Politique d'Utilisation Acceptable ("PUA") définit les règles et directives 
              que tous les utilisateurs de BitWins doivent respecter. En utilisant nos services, 
              vous acceptez de vous conformer à ces règles.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              BitWin s'engage à maintenir un environnement sûr, équitable et légal pour tous 
              ses utilisateurs. Cette politique vise à protéger l'intégrité de notre plateforme 
              et à garantir une expérience positive pour tous.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le non-respect de cette politique peut entraîner des sanctions allant de 
              l'avertissement à la fermeture définitive du compte, selon la gravité de l'infraction.
            </p>
          </div>
        </div>

        {/* Activités Autorisées */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold text-black">Activités Autorisées</h2>
          </div>
          <div className="grid gap-4">
            {allowedActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-green-800">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activités Interdites */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <X className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-bold text-black">Activités Interdites</h2>
          </div>
          <div className="grid gap-4">
            {prohibitedActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-800">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conséquences */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Conséquences des Violations</h2>
          </div>
          <div className="space-y-6">
            {consequences.map((consequence, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-orange-500' :
                    index === 2 ? 'bg-red-500' : 'bg-red-700'
                  }`}></div>
                  <h3 className="text-lg font-semibold text-gray-900">{consequence.level}</h3>
                </div>
                <p className="text-gray-600 mb-2">{consequence.description}</p>
                <p className="text-sm text-gray-700 font-medium">{consequence.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signalement */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Signalement de Violations</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Si vous observez des comportements qui violent cette politique, nous vous 
              encourageons à les signaler immédiatement à notre équipe de sécurité.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="font-semibold text-orange-800 mb-3">Comment signaler :</h3>
              <ul className="space-y-2 text-orange-700">
                <li>• Email : <strong>security@bitwin.com</strong></li>
                <li>• Formulaire de contact avec catégorie "Sécurité"</li>
                <li>• Chat en direct (disponible 24h/24)</li>
              </ul>
              <p className="text-sm text-orange-600 mt-4">
                Tous les signalements sont traités de manière confidentielle et dans les plus brefs délais.
              </p>
            </div>
          </div>
        </div>

        {/* Modifications */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">Modifications de cette Politique</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              BitWins se réserve le droit de modifier cette Politique d'Utilisation Acceptable 
              à tout moment. Les modifications importantes seront communiquées aux utilisateurs 
              par email et via notre site web.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La poursuite de l'utilisation de nos services après modification constitue 
              votre acceptation des nouvelles conditions.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Des questions sur cette politique ?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
};

export default AcceptableUsePolicy;