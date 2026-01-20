import React, { useState } from 'react';
import { TrendingUp, ExternalLink, Calendar, Clock, Bitcoin, Zap, Globe, ArrowRight, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';

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

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const articlesPerPage = 6;

  const categories = [
    { id: 'all', name: 'Toutes les actualités', icon: Globe },
    { id: 'bitcoin', name: 'Bitcoin', icon: Bitcoin },
    { id: 'crypto', name: 'Crypto', icon: Zap },
    { id: 'regulation', name: 'Régulation', icon: Globe },
    { id: 'technology', name: 'Technologie', icon: TrendingUp },
    { id: 'market', name: 'Marchés', icon: TrendingUp }
  ];

  // Charger les articles depuis localStorage
  React.useEffect(() => {
    const loadArticles = () => {
      const savedArticles = localStorage.getItem('bitwin-news-articles');
      if (savedArticles) {
        setNewsArticles(JSON.parse(savedArticles));
      } else {
        // Articles par défaut si aucun n'existe
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
        setNewsArticles(defaultArticles);
        localStorage.setItem('bitwin-news-articles', JSON.stringify(defaultArticles));
      }
    };

    loadArticles();

    // Écouter les mises à jour depuis le dashboard admin
    const handleNewsUpdate = (event: CustomEvent) => {
      setNewsArticles(event.detail.articles);
    };

    window.addEventListener('newsUpdated', handleNewsUpdate as EventListener);

    return () => {
      window.removeEventListener('newsUpdated', handleNewsUpdate as EventListener);
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bitcoin': return 'text-orange-600 bg-orange-100';
      case 'crypto': return 'text-blue-600 bg-blue-100';
      case 'regulation': return 'text-purple-600 bg-purple-100';
      case 'technology': return 'text-green-600 bg-green-100';
      case 'market': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const totalPages = Math.ceil(regularArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = regularArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Actualités Crypto
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Restez informé des dernières tendances Bitcoin et cryptomonnaies
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher dans les actualités..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
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

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              À la Une
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.slice(0, 2).map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(article.category)}`}>
                        {article.category.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      À LA UNE
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime} min
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-black mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.source}</span>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                      >
                        Lire l'article
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-4">
            Toutes les actualités ({filteredArticles.length})
          </h2>
          
          {paginatedArticles.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos filtres ou votre recherche
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(article.category)}`}>
                        {article.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime} min
                      </div>
                    </div>
                    <h3 className="font-bold text-black mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.source}</span>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors text-sm"
                      >
                        Lire
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3 h-3" />
              Précédent
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-orange-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;