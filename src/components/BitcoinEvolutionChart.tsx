import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Bitcoin, Calendar, Euro, ArrowUp } from 'lucide-react';

interface BitcoinDataPoint {
  year: number;
  price: number;
  event?: string;
}

// Données historiques du Bitcoin (2009-2024)
const bitcoinData: BitcoinDataPoint[] = [
  { year: 2009, price: 0, event: "Création du Bitcoin" },
  { year: 2010, price: 0.01, event: "Première transaction" },
  { year: 2011, price: 1, event: "Parité avec le dollar" },
  { year: 2012, price: 13, event: "Premier halving" },
  { year: 2013, price: 200, event: "Première bulle médiatique" },
  { year: 2014, price: 320, event: "Correction majeure" },
  { year: 2015, price: 280, event: "Marché baissier" },
  { year: 2016, price: 450, event: "Deuxième halving" },
  { year: 2017, price: 15000, event: "Bulle spéculative" },
  { year: 2018, price: 3200, event: "Hiver crypto" },
  { year: 2019, price: 7200, event: "Reprise progressive" },
  { year: 2020, price: 23000, event: "Adoption institutionnelle" },
  { year: 2021, price: 50000, event: "ATH historique" },
  { year: 2022, price: 16000, event: "Correction FTX" },
  { year: 2023, price: 42000, event: "Reprise du marché" },
  { year: 2024, price: 95000, event: "Nouveau record absolu" }
];

const BitcoinEvolutionChart: React.FC = () => {
  const formatPrice = (price: number) => {
    if (price === 0) return '0 €';
    if (price < 1) return `${price.toFixed(3)} €`;
    if (price < 1000) return `${price.toFixed(0)} €`;
    return `${(price / 1000).toFixed(0)}k €`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-orange-500 font-bold text-lg">
            {formatPrice(data.price)}
          </p>
          {data.event && (
            <p className="text-gray-600 text-sm mt-1">{data.event}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const currentPrice = bitcoinData[bitcoinData.length - 1].price;
  const initialPrice = bitcoinData[1].price; // 2010 pour éviter 0
  const growth = ((currentPrice - initialPrice) / initialPrice * 100);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              L'Évolution du Bitcoin depuis 2009
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Un Bitcoin gagné aujourd'hui peut valoir bien plus demain. Depuis 2009, son prix est passé de 
            <span className="font-bold text-orange-500"> 0,01 € à +95 000 €</span>. 
            Vous pouvez le conserver… ou l'encaisser.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 shadow-sm border border-gray-200 text-center">
            <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-black mb-1">15 ans</div>
            <div className="text-gray-600">d'existence</div>
          </div>
          <div className="bg-white p-6 shadow-sm border border-gray-200 text-center">
            <ArrowUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-black mb-1">+{growth.toLocaleString()}%</div>
            <div className="text-gray-600">de croissance totale</div>
          </div>
          <div className="bg-white p-6 shadow-sm border border-gray-200 text-center">
            <Euro className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-black mb-1">95 000 €</div>
            <div className="text-gray-600">prix actuel</div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-white p-8 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-black mb-6">Évolution du Prix (2009-2024)</h3>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={bitcoinData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="year" 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatPrice}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#FF6B00"
                  strokeWidth={3}
                  dot={{ fill: '#FF6B00', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#FF6B00', strokeWidth: 2, fill: '#FF6B00' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Timeline Events */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Événements marquants</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { year: 2009, event: "Création", price: "0 €" },
                { year: 2017, event: "Première bulle", price: "15k €" },
                { year: 2021, event: "ATH historique", price: "50k €" },
                { year: 2024, event: "Nouveau record", price: "95k €" }
              ].map((milestone, index) => (
                <div key={index} className="bg-gray-50 p-4 text-center">
                  <div className="text-lg font-bold text-black">{milestone.year}</div>
                  <div className="text-sm text-gray-600 mb-1">{milestone.event}</div>
                  <div className="text-orange-500 font-semibold">{milestone.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white border border-gray-200 p-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">
              Que faire si vous gagnez ?
            </h3>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Si vous remportez un gain en Bitcoin, vous avez le choix entre deux options :
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-800 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="text-xl font-bold text-black">Conserver vos Bitcoin</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  Recevez vos BTC directement sur votre portefeuille personnel.
                </p>
                <p className="text-gray-600 text-sm">
                  Vous pouvez ensuite les stocker, les transférer ou les conserver à long terme selon votre stratégie.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-800 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="text-xl font-bold text-black">Utiliser ou convertir vos Bitcoin</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  Une fois vos BTC crédités sur votre wallet, vous êtes libre de les revendre, de les échanger contre une autre cryptomonnaie ou de les transférer vers la plateforme de votre choix.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 font-medium">
                Aucune recommandation n'est faite. Vous êtes libre de choisir ce qui vous convient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BitcoinEvolutionChart;