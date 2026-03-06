import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import type { Character, ApiResponse } from '../types';

export default function Characters() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [data, setData] = useState<ApiResponse<Character> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    setLoading(true);
    const filters: Record<string, string> = {};
    if (search) filters.name = search;
    if (status) filters.status = status;
    if (species) filters.species = species;
    if (gender) filters.gender = gender;
    api.getCharacters(page, filters)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [page, search, status, species, gender]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">👽 Personajes</h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
          {data ? `${data.info.count} personajes encontrados` : 'Cargando...'}
        </p>
      </div>

      {/* Filters */}
      <div className={`rounded-2xl p-4 mb-6 ${isDark ? 'bg-[#111827] border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="🔍 Buscar personaje..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className={`px-4 py-2.5 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-[#44FF00]/50 ${isDark ? 'bg-[#1e293b] border border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400'}`}
          />
          <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}
            className={`px-4 py-2.5 rounded-xl text-sm outline-none ${isDark ? 'bg-[#1e293b] border border-slate-700 text-white' : 'bg-slate-50 border border-slate-300 text-slate-900'}`}>
            <option value="">Todos los estados</option>
            <option value="alive">🟢 Vivo</option>
            <option value="dead">🔴 Muerto</option>
            <option value="unknown">❓ Desconocido</option>
          </select>
          <select value={species} onChange={e => { setSpecies(e.target.value); setPage(1); }}
            className={`px-4 py-2.5 rounded-xl text-sm outline-none ${isDark ? 'bg-[#1e293b] border border-slate-700 text-white' : 'bg-slate-50 border border-slate-300 text-slate-900'}`}>
            <option value="">Todas las especies</option>
            <option value="Human">Humano</option>
            <option value="Alien">Alien</option>
            <option value="Robot">Robot</option>
            <option value="Humanoid">Humanoide</option>
            <option value="Mythological Creature">Criatura Mitológica</option>
          </select>
          <select value={gender} onChange={e => { setGender(e.target.value); setPage(1); }}
            className={`px-4 py-2.5 rounded-xl text-sm outline-none ${isDark ? 'bg-[#1e293b] border border-slate-700 text-white' : 'bg-slate-50 border border-slate-300 text-slate-900'}`}>
            <option value="">Todos los géneros</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
      </div>

      {/* Character Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden animate-pulse ${isDark ? 'bg-[#111827]' : 'bg-slate-200'}`}>
              <div className={`aspect-square ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
              <div className="p-4 space-y-2">
                <div className={`h-4 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
                <div className={`h-3 w-2/3 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
              </div>
            </div>
          ))}
        </div>
      ) : data?.results.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.results.map(char => (
            <Link to={`/characters/${char.id}`} key={char.id} className="group">
              <div className={`rounded-2xl overflow-hidden card-hover ${isDark ? 'bg-[#111827] border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
                <div className="relative overflow-hidden">
                  <img src={char.image} alt={char.name} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white ${char.status === 'Alive' ? 'status-alive' : char.status === 'Dead' ? 'status-dead' : 'status-unknown'}`}>
                      {char.status}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent h-20" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{char.name}</h3>
                  <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{char.species} · {char.gender}</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                    📍 {char.location.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🌀</span>
          <h3 className="text-xl font-semibold mb-2">No se encontraron personajes</h3>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Intenta cambiar los filtros de búsqueda</p>
        </div>
      )}

      {/* Pagination */}
      {data && data.info.pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={!data.info.prev}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all disabled:opacity-30 ${isDark ? 'bg-[#1e293b] hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
            ← Anterior
          </button>
          <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Página {page} de {data.info.pages}
          </span>
          <button onClick={() => setPage(p => p + 1)} disabled={!data.info.next}
            className="px-4 py-2 rounded-xl font-medium text-sm bg-gradient-to-r from-[#44FF00] to-[#2DB800] text-black transition-all hover:shadow-[0_0_20px_rgba(68,255,0,0.3)] disabled:opacity-30">
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
