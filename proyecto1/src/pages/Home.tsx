import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data: chars } = useFetch(() => api.getCharacters(1), []);
  const { data: eps } = useFetch(() => api.getEpisodes(1), []);
  const { data: locs } = useFetch(() => api.getLocations(1), []);

  const stats = [
    { label: 'Personajes', value: chars?.info.count ?? '...', icon: '👽', color: 'from-[#44FF00] to-[#2DB800]' },
    { label: 'Episodios', value: eps?.info.count ?? '...', icon: '📺', color: 'from-[#00B5CC] to-[#0077B6]' },
    { label: 'Ubicaciones', value: locs?.info.count ?? '...', icon: '🌍', color: 'from-[#FFB020] to-[#FF6B00]' },
  ];

  const featured = chars?.results.slice(0, 6) ?? [];

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative overflow-hidden py-20 px-4 ${isDark ? 'bg-gradient-to-br from-[#0a0e17] via-[#0d1525] to-[#0a1a1a]' : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50'}`}>
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#44FF00]/5 rounded-full blur-3xl pulse-green" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#00B5CC]/5 rounded-full blur-3xl pulse-green" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="float-anim inline-block mb-6">
            <span className="text-7xl sm:text-8xl">🛸</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#44FF00] via-[#00B5CC] to-[#44FF00] bg-clip-text text-transparent">
              Rickpedia
            </span>
          </h1>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Explora el multiverso de Rick y Morty. Personajes, episodios y ubicaciones de todas las dimensiones.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/characters"
              className="px-6 py-3 bg-gradient-to-r from-[#44FF00] to-[#2DB800] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(68,255,0,0.3)] transition-all hover:scale-105"
            >
              👽 Explorar Personajes
            </Link>
            <Link
              to="/episodes"
              className={`px-6 py-3 border rounded-xl font-semibold transition-all hover:scale-105 ${isDark ? 'border-slate-600 text-slate-300 hover:border-[#00B5CC] hover:text-[#00B5CC]' : 'border-slate-300 text-slate-700 hover:border-[#00B5CC] hover:text-[#00B5CC]'}`}
            >
              📺 Ver Episodios
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className={`rounded-2xl p-6 card-hover ${isDark ? 'bg-[#111827] border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Characters */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">🌟 Personajes Destacados</h2>
          <Link to="/characters" className="text-[#44FF00] hover:text-[#00B5CC] transition-colors text-sm font-medium">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featured.map(char => (
            <Link to={`/characters/${char.id}`} key={char.id} className="group">
              <div className={`rounded-2xl overflow-hidden card-hover ${isDark ? 'bg-[#111827] border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
                <div className="relative">
                  <img src={char.image} alt={char.name} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white ${char.status === 'Alive' ? 'status-alive' : char.status === 'Dead' ? 'status-dead' : 'status-unknown'}`}>
                      {char.status === 'Alive' ? '🟢' : char.status === 'Dead' ? '🔴' : '❓'} {char.status}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">{char.name}</h3>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{char.species}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 ${isDark ? 'bg-[#111827]/50' : 'bg-slate-100/50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🌀 Navega por el Multiverso</h2>
          <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Descubre personajes de dimensiones desconocidas, revive episodios épicos y explora las ubicaciones más icónicas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { to: '/characters', icon: '👽', title: 'Personajes', desc: 'Busca y filtra por estado, especie y género' },
              { to: '/episodes', icon: '📺', title: 'Episodios', desc: 'Navega por temporadas y episodios' },
              { to: '/locations', icon: '🌍', title: 'Ubicaciones', desc: 'Explora dimensiones y planetas' },
            ].map(item => (
              <Link key={item.to} to={item.to} className={`p-6 rounded-2xl card-hover text-left ${isDark ? 'bg-[#0a0e17] border border-slate-800' : 'bg-white border border-slate-200'}`}>
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
