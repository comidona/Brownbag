import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, getImageUrl } from '../services/api';
import type { SimpsonCharacter } from '../types';

export default function Characters() {
  const [characters, setCharacters] = useState<SimpsonCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getCharacters(page)
      .then((data) => {
        setCharacters(data.results);
        setHasMore(data.next !== null);
      })
      .catch(() => setCharacters([]))
      .finally(() => setLoading(false));
  }, [page]);

  const filtered = search
    ? characters.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : characters;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👤 Personajes</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input type="text" placeholder="🔍 Buscar personaje..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#FFD521]/50 focus:border-[#FFD521]" />
      </div>

      {/* Table/List View (diferente al grid de App1) */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-3">🍩</span>
          <p className="text-gray-500">No se encontraron personajes</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Personaje</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Ocupación</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Estado</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(char => (
                <tr key={char.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={getImageUrl(char.portrait_path)} alt={char.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="60">🍩</text></svg>'; }} />
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{char.name}</p>
                        <p className="text-xs text-gray-500 sm:hidden">{char.occupation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell truncate max-w-48">{char.occupation}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      char.status === 'Alive' ? 'bg-green-100 text-green-700' :
                      char.status === 'Deceased' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-600'}`}>
                      {char.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/characters/${char.id}`}
                      className="text-xs font-semibold text-[#d4a00a] hover:text-[#b88a00]">
                      Ver detalle →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
