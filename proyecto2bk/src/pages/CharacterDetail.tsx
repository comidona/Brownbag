import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, getImageUrl } from '../services/api';
import type { SimpsonCharacter } from '../types';

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<SimpsonCharacter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getCharacter(Number(id))
      .then(setCharacter)
      .catch(() => setCharacter(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <span className="text-5xl block animate-bounce">🍩</span>
      <p className="text-gray-500 mt-3">Cargando personaje...</p>
    </div>
  );

  if (!character) return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <span className="text-5xl block mb-3">😵</span>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Personaje no encontrado</h2>
      <Link to="/characters" className="text-[#d4a00a] hover:underline text-sm">← Volver a personajes</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/characters" className="inline-flex items-center text-sm text-gray-500 hover:text-[#d4a00a] mb-6 transition-colors">
        ← Volver a personajes
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="sm:flex">
          <div className="sm:w-1/3 bg-gray-100 flex items-center justify-center p-6">
            <img src={getImageUrl(character.portrait_path)} alt={character.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-[#FFD521] shadow-lg"
              onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="60">🍩</text></svg>'; }} />
          </div>
          <div className="sm:w-2/3 p-6">
            <h1 className="text-2xl font-extrabold text-gray-800 mb-1">{character.name}</h1>
            <p className="text-sm text-gray-500 mb-4">{character.occupation}</p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: 'Estado', value: character.status, icon: '💚' },
                { label: 'Género', value: character.gender, icon: '⚧️' },
                { label: 'Edad', value: character.age ? `${character.age} años` : 'N/A', icon: '🎂' },
                { label: 'Nacimiento', value: character.birthdate ?? 'N/A', icon: '📅' },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">{item.icon} {item.label}</p>
                  <p className="font-semibold text-sm text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>

            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              character.status === 'Alive' ? 'bg-green-100 text-green-700' :
              character.status === 'Deceased' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-600'}`}>
              {character.status}
            </span>
          </div>
        </div>

        {/* Phrases */}
        {character.phrases?.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">💬 Frases Famosas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {character.phrases.slice(0, 10).map((phrase, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm italic text-gray-600">
                  "{phrase}"
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
