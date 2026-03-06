import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import type { Character, Episode } from '../types';

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getCharacter(Number(id)).then(async (char) => {
      setCharacter(char);
      const favs: number[] = JSON.parse(localStorage.getItem('rickpedia-favs') || '[]');
      setIsFav(favs.includes(char.id));
      const epIds = char.episode.map(url => Number(url.split('/').pop()));
      if (epIds.length === 1) {
        const ep = await api.getEpisode(epIds[0]);
        setEpisodes([ep]);
      } else if (epIds.length > 1) {
        const eps = await api.getMultipleEpisodes(epIds.slice(0, 20));
        setEpisodes(Array.isArray(eps) ? eps : [eps]);
      }
      setLoading(false);
    });
  }, [id]);

  const toggleFav = () => {
    if (!character) return;
    const favs: number[] = JSON.parse(localStorage.getItem('rickpedia-favs') || '[]');
    const newFavs = isFav ? favs.filter(f => f !== character.id) : [...favs, character.id];
    localStorage.setItem('rickpedia-favs', JSON.stringify(newFavs));
    setIsFav(!isFav);
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl float-anim">🌀</div>
      <p className={`mt-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Abriendo portal interdimensional...</p>
    </div>
  );

  if (!character) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <span className="text-6xl block mb-4">💀</span>
      <h2 className="text-2xl font-bold mb-2">Personaje no encontrado</h2>
      <Link to="/characters" className="text-[#44FF00] hover:underline">← Volver a personajes</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/characters" className={`inline-flex items-center gap-1 text-sm mb-6 hover:text-[#44FF00] transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        ← Volver a personajes
      </Link>

      <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-[#111827] border border-slate-800' : 'bg-white border border-slate-200 shadow-lg'}`}>
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/3 relative">
            <img src={character.image} alt={character.name} className="w-full h-full object-cover min-h-[300px]" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-black/20" />
          </div>

          {/* Info */}
          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${character.status === 'Alive' ? 'status-alive' : character.status === 'Dead' ? 'status-dead' : 'status-unknown'}`}>
                    {character.status === 'Alive' ? '🟢 Vivo' : character.status === 'Dead' ? '🔴 Muerto' : '❓ Desconocido'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                    {character.species}
                  </span>
                </div>
              </div>
              <button onClick={toggleFav}
                className={`text-2xl transition-transform hover:scale-125 ${isFav ? '' : 'grayscale'}`}
                title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
                {isFav ? '⭐' : '☆'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Género', value: character.gender, icon: '⚧️' },
                { label: 'Especie', value: character.species, icon: '🧬' },
                { label: 'Tipo', value: character.type || 'N/A', icon: '🏷️' },
                { label: 'Origen', value: character.origin.name, icon: '🏠' },
                { label: 'Ubicación', value: character.location.name, icon: '📍' },
                { label: 'Episodios', value: `${character.episode.length}`, icon: '📺' },
              ].map(item => (
                <div key={item.label} className={`p-3 rounded-xl ${isDark ? 'bg-[#1e293b]' : 'bg-slate-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{item.icon} {item.label}</p>
                  <p className="font-semibold text-sm mt-0.5 truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Episodes */}
        <div className={`border-t p-6 md:p-8 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-4">📺 Episodios ({character.episode.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {episodes.map(ep => (
              <div key={ep.id} className={`p-3 rounded-xl transition-all hover:scale-[1.02] ${isDark ? 'bg-[#1e293b] hover:bg-[#263548]' : 'bg-slate-50 hover:bg-slate-100'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#44FF00]/10 text-[#44FF00] font-semibold">
                    {ep.episode}
                  </span>
                </div>
                <p className="font-medium text-sm mt-1">{ep.name}</p>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{ep.air_date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
