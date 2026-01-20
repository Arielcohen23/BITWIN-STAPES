import React, { useState } from 'react';
import { Database, Download, Upload, BarChart3, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useAirtableSync } from '../hooks/useAirtableSync';

const AirtableSync: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const { syncAllData, getStats, exportData } = useAirtableSync();

  const handleSyncAll = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      await syncAllData();
      setLastSync(new Date().toLocaleString('fr-FR'));
      setMessage({ type: 'success', text: 'Synchronisation complète réussie !' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la synchronisation' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStats = async () => {
    setIsLoading(true);
    
    try {
      const airtableStats = await getStats();
      setStats(airtableStats);
      setMessage({ type: 'success', text: 'Statistiques récupérées depuis Airtable' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la récupération des stats' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    setIsLoading(true);
    
    try {
      const data = await exportData();
      if (data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bitwin-airtable-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        setMessage({ type: 'success', text: 'Export téléchargé avec succès' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'export' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-black">Synchronisation Airtable CRM</h3>
      </div>

      {/* Message de statut */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {message.text}
        </div>
      )}

      {/* Informations de configuration */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">Configuration requise :</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• VITE_AIRTABLE_API_KEY : Votre clé API Airtable</li>
          <li>• VITE_AIRTABLE_BASE_ID : L'ID de votre base Airtable</li>
          <li>• Tables requises : Utilisateurs, Tickets, Transactions, Parrainages</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={handleSyncAll}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          Synchroniser tout
        </button>

        <button
          onClick={handleGetStats}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <BarChart3 className="w-4 h-4" />}
          Voir les stats
        </button>

        <button
          onClick={handleExport}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Exporter
        </button>
      </div>

      {/* Informations de synchronisation */}
      {lastSync && (
        <div className="text-sm text-gray-600 mb-4">
          Dernière synchronisation : {lastSync}
        </div>
      )}

      {/* Statistiques Airtable */}
      {stats && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Statistiques Airtable :</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
              <div className="text-sm text-gray-600">Utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalTickets}</div>
              <div className="text-sm text-gray-600">Tickets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.totalRevenue.toFixed(2)}€</div>
              <div className="text-sm text-gray-600">Revenus</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.activeUsers}</div>
              <div className="text-sm text-gray-600">Actifs</div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600">
        <p className="font-medium mb-2">Instructions :</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Configurez vos variables d'environnement Airtable</li>
          <li>Créez les tables dans votre base Airtable</li>
          <li>Cliquez sur "Synchroniser tout" pour importer toutes les données</li>
          <li>Les nouvelles données seront automatiquement synchronisées</li>
        </ol>
      </div>
    </div>
  );
};

export default AirtableSync;