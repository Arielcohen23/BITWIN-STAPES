# Configuration Airtable CRM pour BitWin

## 📋 Prérequis

1. **Compte Airtable** : Créez un compte sur [airtable.com](https://airtable.com)
2. **Base Airtable** : Créez une nouvelle base pour BitWin
3. **Clé API** : Générez votre clé API depuis votre compte Airtable

## 🔧 Configuration

### 1. Variables d'environnement

Ajoutez ces variables dans votre fichier `.env` :

```env
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
```

### 2. Structure des tables Airtable

Créez ces 4 tables dans votre base Airtable :

#### Table "Utilisateurs"
- **Nom** (Single line text)
- **Email** (Email)
- **Date d'inscription** (Date)
- **Nombre de tickets** (Number)
- **Gains totaux** (Number)
- **Code de parrainage** (Single line text)
- **Dernière activité** (Date)
- **Statut** (Single select: Actif, Inactif, Suspendu)

#### Table "Tickets"
- **ID Ticket** (Single line text)
- **Email utilisateur** (Email)
- **Type de loterie** (Single select: Jackpot Hebdomadaire, Méga Jackpot Mensuel)
- **Date d'achat** (Date)
- **Prix payé** (Currency)
- **Numéro de ticket** (Single line text)
- **Statut** (Single select: Actif, Terminé)
- **Date de tirage** (Date)
- **Résultat** (Single select: En attente, Gagnant, Perdant)

#### Table "Transactions"
- **ID Transaction** (Single line text)
- **Email utilisateur** (Email)
- **Type** (Single select: Achat de tickets, Remboursement, Gain)
- **Montant** (Currency)
- **Date** (Date)
- **Méthode de paiement** (Single select: Carte bancaire, Bitcoin, PayPal)
- **Statut** (Single select: En attente, Confirmé, Échoué)

#### Table "Parrainages"
- **Email parrain** (Email)
- **Email filleul** (Email)
- **Date de parrainage** (Date)
- **Ticket gratuit donné** (Checkbox)
- **Statut** (Single select: Actif, Inactif)

## 🚀 Utilisation

### Synchronisation automatique
- Les nouvelles données sont automatiquement synchronisées avec Airtable
- Chaque inscription, achat de ticket, et parrainage est envoyé en temps réel

### Synchronisation manuelle
1. Allez dans le **Dashboard Admin**
2. Cliquez sur l'onglet **"Sauvegarde"**
3. Utilisez le bouton **"Synchroniser tout"** pour importer toutes les données existantes

### Fonctionnalités disponibles
- ✅ **Synchronisation complète** : Import de toutes les données existantes
- ✅ **Synchronisation temps réel** : Nouvelles données envoyées automatiquement
- ✅ **Statistiques** : Récupération des stats depuis Airtable
- ✅ **Export** : Téléchargement de toutes les données au format JSON

## 📊 Avantages

### Pour le marketing
- **Segmentation** : Filtrez les utilisateurs par activité, gains, etc.
- **Campagnes** : Créez des campagnes ciblées basées sur les données
- **Suivi** : Analysez les performances des parrainages

### Pour les ventes
- **Lead scoring** : Identifiez les utilisateurs les plus actifs
- **Historique** : Consultez l'historique complet de chaque client
- **Prédictions** : Analysez les tendances d'achat

### Pour le support
- **Vue 360°** : Toutes les informations client en un coup d'œil
- **Historique** : Consultez tous les tickets et transactions
- **Résolution** : Résolvez plus rapidement les problèmes

## 🔒 Sécurité

- **Chiffrement** : Toutes les communications avec Airtable sont chiffrées
- **Permissions** : Configurez les permissions d'accès dans Airtable
- **Audit** : Toutes les actions sont tracées et horodatées

## 📈 Métriques disponibles

- Nombre total d'utilisateurs
- Tickets vendus par période
- Revenus générés
- Taux de conversion
- Performance des parrainages
- Utilisateurs actifs vs inactifs

## 🛠️ Dépannage

### Erreur de connexion
- Vérifiez votre clé API Airtable
- Vérifiez l'ID de votre base
- Assurez-vous que les tables existent

### Données manquantes
- Lancez une synchronisation complète
- Vérifiez les permissions de votre clé API
- Consultez la console pour les erreurs

### Performance
- La synchronisation respecte les limites de taux d'Airtable
- Un délai de 100ms est appliqué entre chaque requête
- Les gros volumes peuvent prendre quelques minutes

## 📞 Support

Pour toute question sur l'intégration Airtable BitWin :
- Consultez la documentation Airtable API
- Vérifiez les logs dans la console du navigateur
- Contactez le support technique si nécessaire