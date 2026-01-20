import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, ExternalLink, Image, Globe, TrendingUp } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  category: 'bitcoin' | 'crypto' | 'regulation' | 'technology' | 'market';
  readTime: number;
  source: string;
  link: string;
  featured: boolean;
}

const NewsManagement: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    title: '',
    summary: '',
    content: '',
    image: '',
    category: 'bitcoin',
    readTime: 3,
    source: '',
    link: '',
    featured: false
  });

  const categories = [
    { id: 'bitcoin', name: 'Bitcoin', color: 'text-orange-600 bg-orange-100' },
    { id: 'crypto', name: 'Crypto', color: 'text-blue-600 bg-blue-100' },
    { id: 'regulation', name: 'Régulation', color: 'text-purple-600 bg-purple-100' },
    { id: 'technology', name: 'Technologie', color: 'text-green-600 bg-green-100' },
    { id: 'market', name: 'Marchés', color: 'text-red-600 bg-red-100' }
  ];

  // Charger les articles depuis localStorage
  useEffect(() => {
    const savedArticles = localStorage.getItem('bitwin-news-articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    } else {
      // Articles par défaut
      const defaultArticles: NewsArticle[] = [
        {
          id: 1,
          title: "Bitcoin atteint un nouveau record historique à 100,000$",
          summary: "Le Bitcoin franchit pour la première fois la barre symbolique des 100,000 dollars, marquant une étape historique pour la cryptomonnaie.",
          content: "Cette hausse spectaculaire s'explique par l'adoption institutionnelle croissante et l'approbation des ETF Bitcoin par la SEC. Les analystes prévoient une poursuite de cette tendance haussière.",
          image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
          date: "2024-12-15",
          category: "bitcoin",
          readTime: 3,
          source: "CoinDesk",
          link: "https://www.coindesk.com/markets/2024/12/15/bitcoin-hits-100k/",
          featured: true
        },
        {
          id: 2,
          title: "L'adoption institutionnelle du Bitcoin s'accélère en 2024",
          summary: "De plus en plus d'entreprises Fortune 500 intègrent Bitcoin dans leur trésorerie, stimulant la demande institutionnelle.",
          content: "MicroStrategy, Tesla et d'autres géants continuent d'accumuler du Bitcoin, validant sa position comme réserve de valeur numérique.",
          image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
          date: "2024-12-10",
          category: "market",
          readTime: 4,
          source: "Bloomberg",
          link: "https://www.bloomberg.com/news/articles/2024/12/10/institutional-bitcoin-adoption",
          featured: false
        },
        {
          id: 3,
          title: "Les ETF Bitcoin enregistrent des entrées record",
          summary: "Les fonds négociés en bourse Bitcoin attirent des milliards de dollars d'investissements, démocratisant l'accès à la crypto.",
          content: "BlackRock et Fidelity mènent la charge avec leurs ETF Bitcoin, facilitant l'accès des investisseurs traditionnels aux cryptomonnaies.",
          image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
          date: "2024-12-08",
          category: "market",
          readTime: 5,
          source: "Financial Times",
          link: "https://www.ft.com/content/bitcoin-etf-record-inflows",
          featured: true
        }
      ];
      setArticles(defaultArticles);
      localStorage.setItem('bitwin-news-articles', JSON.stringify(defaultArticles));
    }
  }, []);

  // Sauvegarder les articles
  const saveArticles = (updatedArticles: NewsArticle[]) => {
    setArticles(updatedArticles);
    localStorage.setItem('bitwin-news-articles', JSON.stringify(updatedArticles));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingArticle) {
      // Modifier un article existant
      const updatedArticles = articles.map(article =>
        article.id === editingArticle.id
          ? { ...editingArticle, ...formData }
          : article
      );
      saveArticles(updatedArticles);
      setEditingArticle(null);
      
      // Notifier les autres composants de la mise à jour
      const event = new CustomEvent('newsUpdated', {
        detail: { articles: updatedArticles }
      });
      window.dispatchEvent(event);
    } else {
      // Créer un nouvel article
      const newArticle: NewsArticle = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...formData as NewsArticle
      };
      const updatedArticles = [newArticle, ...articles];
      saveArticles(updatedArticles);
      setIsCreating(false);
      
      // Notifier les autres composants de la mise à jour
      const event = new CustomEvent('newsUpdated', {
        detail: { articles: updatedArticles }
      });
      window.dispatchEvent(event);
    }
    
    // Reset form
    setFormData({
      title: '',
      summary: '',
      content: '',
      image: '',
      category: 'bitcoin',
      readTime: 3,
      source: '',
      link: '',
      featured: false
    });
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData(article);
    setIsCreating(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      const updatedArticles = articles.filter(article => article.id !== id);
      saveArticles(updatedArticles);
      
      // Notifier les autres composants de la mise à jour
      const event = new CustomEvent('newsUpdated', {
        detail: { articles: updatedArticles }
      });
      window.dispatchEvent(event);
    }
  };

  const cancelEdit = () => {
    setEditingArticle(null);
    setIsCreating(false);
    setFormData({
      title: '',
      summary: '',
      content: '',
      image: '',
      category: 'bitcoin',
      readTime: 3,
      source: '',
      link: '',
      featured: false
    });
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'text-gray-600 bg-gray-100';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-bold text-black">Gestion des Actualités</h3>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvel article
        </button>
      </div>

      {/* Formulaire de création/édition */}
      {isCreating && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-black">
              {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
            </h4>
            <button
              onClick={cancelEdit}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Résumé *
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenu *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de l'image
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source
                </label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="CoinDesk, Bloomberg..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temps de lecture (min)
                </label>
                <input
                  type="number"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lien externe
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Article à la une
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                {editingArticle ? 'Mettre à jour' : 'Créer l\'article'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des articles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-black">
            Articles ({articles.length})
          </h4>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-8">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Aucun article</h4>
            <p className="text-gray-600 mb-4">Créez votre premier article d'actualité</p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Créer un article
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <div key={article.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-semibold text-black line-clamp-1">{article.title}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      {article.featured && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                          À la une
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{article.summary}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('fr-FR')}
                      </div>
                      <span>{article.readTime} min</span>
                      <span>{article.source}</span>
                      {article.link && (
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-orange-500 hover:text-orange-600"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Lien
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(article)}
                      className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;