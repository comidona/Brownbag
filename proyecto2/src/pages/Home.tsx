import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, getImageUrl } from '../services/api';
import type { SimpsonCharacter } from '../types';

export default function Home() {
  const [featured, setFeatured] = useState<SimpsonCharacter[]>([]);
  const [randomQuote, setRandomQuote] = useState<SimpsonCharacter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCharacters(1)
      .then((data) => {
        const chars = data.results;
        setFeatured(chars.slice(0, 8));
        if (chars.length > 0) setRandomQuote(chars[Math.floor(Math.random() * Math.min(chars.length, 5))]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getNewQuote = () => {
    if (featured.length === 0) return;
    const charsWithPhrases = featured.filter(c => c.phrases?.length > 0);
    if (charsWithPhrases.length > 0) {
      setRandomQuote(charsWithPhrases[Math.floor(Math.random() * charsWithPhrases.length)]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#FFD521] to-[#FFA500] rounded-2xl p-8 mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}>
          🍩 Springfield Explorer
        </h1>
        <p className="text-white/90 text-lg">Explora el universo de Los Simpsons</p>
      </div>

      {/* Quote Generator */}
      {randomQuote && randomQuote.phrases?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💬</span>
            <h2 className="text-lg font-bold text-gray-800">Frase Aleatoria</h2>
          </div>
          <div className="flex items-start gap-4">
            <img src={getImageUrl(randomQuote.portrait_path)} alt={randomQuote.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#FFD521]"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div className="flex-1">
              <p className="text-xl italic text-gray-700 mb-2">
                "{randomQuote.phrases[Math.floor(Math.random() * randomQuote.phrases.length)]}"
              </p>
              <p className="text-sm font-semibold text-gray-500">— {randomQuote.name}</p>
            </div>
          </div>
          <button onClick={getNewQuote}
            className="mt-4 px-4 py-2 bg-[#FFD521] text-white font-semibold rounded-lg hover:bg-[#e6c01d] transition-colors text-sm">
            🎲 Nueva frase
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Personajes', icon: '👤', value: '1182+' },
          { label: 'Episodios', icon: '📺', value: '768+' },
          { label: 'Lugares', icon: '📍', value: '477+' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <span className="text-3xl block mb-2">{stat.icon}</span>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Featured Characters */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Personajes Populares</h2>
          <Link to="/characters" className="text-sm text-[#d4a00a] hover:underline font-semibold">Ver todos →</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featured.slice(0, 4).map(char => (
              <Link to={`/characters/${char.id}`} key={char.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={getImageUrl(char.portrait_path)} alt={char.name}
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="60">🍩</text></svg>'; }} />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-800 truncate">{char.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{char.occupation}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: '/characters', icon: '👤', title: 'Personajes', desc: 'Busca personajes de Springfield', color: 'bg-blue-50 border-blue-200' },
          { to: '/episodes', icon: '📺', title: 'Episodios', desc: 'Navega por temporadas', color: 'bg-green-50 border-green-200' },
          { to: '/locations', icon: '📍', title: 'Lugares', desc: 'Explora Springfield', color: 'bg-purple-50 border-purple-200' },
        ].map(item => (
          <Link key={item.to} to={item.to}
            className={`${item.color} border rounded-xl p-5 hover:shadow-md transition-shadow`}>
            <span className="text-3xl block mb-2">{item.icon}</span>
            <h3 className="font-bold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
