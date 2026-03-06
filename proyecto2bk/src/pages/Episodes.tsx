import { useState, useEffect } from 'react';
import { api } from '../services/api';

import type { SimpsonEpisode } from '../types';

export default function Episodes() {
  const [episodes, setEpisodes] = useState<SimpsonEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getEpisodes(page)
      .then((data) => {
        setEpisodes(data.results);
        setHasMore(data.next !== null);
      })
      .catch(() => setEpisodes([]))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📺 Episodios</h1>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : episodes.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-3">📺</span>
          <p className="text-gray-500">No hay episodios disponibles</p>
        </div>
      ) : (
        <div className="space-y-3">
          {episodes.map(ep => (
            <div key={ep.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FFD521]/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-[#d4a00a]">
                    {ep.season ? `S${ep.season}` : `#${ep.id}`}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-gray-800 truncate">{ep.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    {ep.episode_number && <span>Ep. {ep.episode_number}</span>}
                    {ep.airdate && <span>📅 {ep.airdate}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
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
