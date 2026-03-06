import { useState, useEffect } from 'react';
import { api } from '../services/api';

import type { SimpsonLocation } from '../types';

export default function Locations() {
  const [locations, setLocations] = useState<SimpsonLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getLocations(page)
      .then((data) => {
        setLocations(data.results);
        setHasMore(data.next !== null);
      })
      .catch(() => setLocations([]))
      .finally(() => setLoading(false));
  }, [page]);

  const typeIcons: Record<string, string> = {
    'home': '🏠', 'business': '🏪', 'school': '🏫', 'bar': '🍺',
    'restaurant': '🍔', 'government': '🏛️', 'church': '⛪',
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📍 Lugares de Springfield</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : locations.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-3">🗺️</span>
          <p className="text-gray-500">No hay ubicaciones disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map(loc => (
            <div key={loc.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">
                  {typeIcons[loc.use?.toLowerCase() ?? ''] ?? '📍'}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-500">#{loc.id}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{loc.name}</h3>
              {loc.use && <p className="text-xs text-gray-500">{loc.use}</p>}
              {loc.town && <p className="text-xs text-gray-400 mt-1">📮 {loc.town}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-30">
          ← Anterior
        </button>
        <span className="text-sm text-gray-500">Página {page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={!hasMore}
          className="px-4 py-2 rounded-lg bg-[#FFD521] text-white text-sm font-medium hover:bg-[#e6c01d] disabled:opacity-30">
          Siguiente →
        </button>
      </div>
    </div>
  );
}
