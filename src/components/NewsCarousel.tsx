import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Clock } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
  readTime: number;
  source: string;
  link: string;
}

const NewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    // Charger les articles depuis localStorage ou utiliser des articles par défaut
    const savedArticles = localStorage.getItem('bitwin-news-articles');
    if (savedArticles) {
      const parsedArticles = JSON.parse(savedArticles);
      setArticles(parsedArticles.slice(0, 3)); // Limiter à 3 articles pour le carousel
    } else {
      // Articles par défaut
      const defaultArticles: NewsArticle[] = [
        {
          id: 1,
          title: "Bitcoin atteint un nouveau record historique à 100,000$",
          summary: "Le Bitcoin franchit pour la première fois la barre symbolique des 100,000 dollars.",
          image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
          date: "2024-12-15",
          category: "bitcoin",
          readTime: 3,
          source: "CoinDesk",
          link: "https://www.coindesk.com/"
        },
        {
          id: 2,
          title: "L'adoption institutionnelle du Bitcoin s'accélère",
          summary: "De plus en plus d'entreprises Fortune 500 intègrent Bitcoin dans leur trésorerie.",
          image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
          date: "2024-12-10",
          category: "market",
          readTime: 4,
          source: "Bloomberg",
          link: "https://www.bloomberg.com/"
        },
        {
          id: 3,
          title: "Les ETF Bitcoin enregistrent des entrées record",
          summary: "Les fonds négociés en bourse Bitcoin attirent des milliards de dollars d'investissements.",
          image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
          date: "2024-12-08",
          category: "market",
          readTime: 5,
          source: "Financial Times",
          link: "https://www.ft.com/"
        }
      ];
      setArticles(defaultArticles);
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (articles.length === 0) {
    return null;
  }

  const currentArticle = articles[currentIndex];

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative">
        <img 
          src={currentArticle.image} 
          alt={currentArticle.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(currentArticle.date).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'long' 
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {currentArticle.readTime} min
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-black mb-3 line-clamp-2">
          {currentArticle.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {currentArticle.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{currentArticle.source}</span>
          <a
            href={currentArticle.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors text-sm"
          >
            Lire l'article
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;