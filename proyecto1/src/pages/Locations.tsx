import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import type { Location, ApiResponse } from '../types';

export default function Locations() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [data, setData] = useState<ApiResponse<Location> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.getLocations(page)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [page]);

  const dimensionColors: Record<string, string> = {
    'Dimension C-137': 'from-[#44FF00] to-[#2DB800]',
    'unknown': 'from-gray-500 to-gray-600',
    'Replacement Dimension': 'from-purple-500 to-purple-700',
    'Cronenberg Dimension': 'from-red-500 to-red-700',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🌍 Ubicaciones</h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
          {data ? `${data.info.count} ubicaciones a través del multiverso` : 'Cargando...'}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`rounded-2xl p-6 animate-pulse ${isDark ? 'bg-[#111827]' : 'bg-slate-200'}`}>
              <div className={`h-5 w-1/2 rounded mb-3 ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
              <div className={`h-4 w-3/4 rounded mb-2 ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
              <div className={`h-3 w-1/3 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.results.map(loc => (
            <div key={loc.id} className={`rounded-2xl overflow-hidden card-hover ${isDark ? 'bg-[#111827] border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
              {/* Header con gradiente */}
              <div className={`h-3 bg-gradient-to-r ${dimensionColors[loc.dimension] ?? 'from-[#00B5CC] to-[#0077B6]'}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{loc.name}</h3>
                    <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{loc.type}</span>
                  </div>
                  <span className="text-2xl">
                    {loc.type === 'Planet' ? '🪐' : loc.type === 'Space station' ? '🛸' : loc.type === 'Microverse' ? '🔬' : '🌌'}
                  </span>
                </div>

                <div className={`p-3 rounded-xl mb-3 ${isDark ? 'bg-[#1e293b]' : 'bg-slate-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>🌀 Dimensión</p>
                  <p className="font-medium text-sm">{loc.dimension}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    👥 {loc.residents.length} residentes
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-lg ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    #{loc.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
