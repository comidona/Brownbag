import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import type { Episode, ApiResponse } from '../types';

export default function Episodes() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [data, setData] = useState<ApiResponse<Episode> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    api.getEpisodes(page)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [page]);

  const seasons = data ? [...new Set(data.results.map(ep => ep.episode.substring(0, 3)))] : [];
  const filtered = data?.results.filter(ep => selectedSeason === 'all' || ep.episode.startsWith(selectedSeason)) ?? [];

  const seasonNames: Record<string, string> = {
    S01: 'Temporada 1', S02: 'Temporada 2', S03: 'Temporada 3',
    S04: 'Temporada 4', S05: 'Temporada 5',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📺 Episodios</h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
          {data ? `${data.info.count} episodios en total` : 'Cargando...'}
        </p>
      </div>

      {/* Season Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button onClick={() => setSelectedSeason('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${selectedSeason === 'all'
            ? 'bg-gradient-to-r from-[#44FF00] to-[#2DB800] text-black shadow-[0_0_15px_rgba(68,255,0,0.2)]'
            : isDark ? 'bg-[#1e293b] text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}>
          🎬 Todos
        </button>
        {seasons.map(s => (
          <button key={s} onClick={() => setSelectedSeason(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${selectedSeason === s
              ? 'bg-gradient-to-r from-[#00B5CC] to-[#0077B6] text-white shadow-[0_0_15px_rgba(0,181,204,0.2)]'
              : isDark ? 'bg-[#1e293b] text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}>
            {seasonNames[s] ?? s}
          </button>
        ))}
      </div>

      {/* Episodes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`rounded-2xl p-6 animate-pulse ${isDark ? 'bg-[#111827]' : 'bg-slate-200'}`}>
              <div className={`h-4 w-20 rounded mb-3 ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
              <div className={`h-5 w-3/4 rounded mb-2 ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
              <div className={`h-3 w-1/2 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(ep => (
            <div key={ep.id} className={`rounded-2xl p-6 card-hover ${isDark ? 'bg-[#111827] border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-lg bg-[#44FF00]/10 text-[#44FF00] text-sm font-mono font-bold">
                  {ep.episode}
                </span>
                <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{ep.air_date}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{ep.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  👥 {ep.characters.length} personajes
                </span>
              </div>
            </div>
          ))}
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
