import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import type { Character } from '../types';

export default function Favorites() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favIds: number[] = JSON.parse(localStorage.getItem('rickpedia-favs') || '[]');
    if (favIds.length === 0) {
      setLoading(false);
      return;
    }
    Promise.all(favIds.map(id => api.getCharacter(id)))
      .then(setCharacters)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const removeFav = (id: number) => {
    const favIds: number[] = JSON.parse(localStorage.getItem('rickpedia-favs') || '[]');
    localStorage.setItem('rickpedia-favs', JSON.stringify(favIds.filter(f => f !== id)));
    setCharacters(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">⭐ Favoritos</h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
          {characters.length} personajes guardados
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="text-5xl float-anim">🌀</div>
        </div>
      ) : characters.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-7xl block mb-4">🌟</span>
          <h2 className="text-2xl font-bold mb-2">Sin favoritos aún</h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Explora personajes y agrégalos a tu colección
          </p>
          <Link to="/characters"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#44FF00] to-[#2DB800] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(68,255,0,0.3)] transition-all">
            👽 Explorar Personajes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map(char => (
            <div key={char.id} className={`rounded-2xl overflow-hidden card-hover ${isDark ? 'bg-[#111827] border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
              <div className="flex">
                <Link to={`/characters/${char.id}`} className="w-28 h-28 shrink-0">
                  <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <Link to={`/characters/${char.id}`} className="font-semibold hover:text-[#44FF00] transition-colors">
                      {char.name}
                    </Link>
                    <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      {char.species} · {char.status}
                    </p>
                  </div>
                  <button onClick={() => removeFav(char.id)}
                    className="self-end text-xs text-red-400 hover:text-red-300 transition-colors">
                    🗑️ Quitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
