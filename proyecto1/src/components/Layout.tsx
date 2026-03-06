import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/characters', label: 'Personajes', icon: '👽' },
  { to: '/episodes', label: 'Episodios', icon: '📺' },
  { to: '/locations', label: 'Ubicaciones', icon: '🌍' },
  { to: '/favorites', label: 'Favoritos', icon: '⭐' },
];

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#0a0e17] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b ${theme === 'dark' ? 'bg-[#0a0e17]/90 border-slate-700/50' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <span className="text-3xl group-hover:animate-spin transition-transform">🛸</span>
              <span className="text-xl font-bold bg-gradient-to-r from-[#44FF00] to-[#00B5CC] bg-clip-text text-transparent">
                Rickpedia
              </span>
            </NavLink>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#44FF00]/10 text-[#44FF00] shadow-[0_0_10px_rgba(68,255,0,0.1)]'
                        : theme === 'dark'
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  <span className="mr-1.5">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Theme Toggle + Profile */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-indigo-600'}`}
                title="Cambiar tema"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#44FF00] to-[#00B5CC] flex items-center justify-center text-white text-sm font-bold cursor-pointer">
                R
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden flex gap-1 pb-2 overflow-x-auto">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive ? 'bg-[#44FF00]/10 text-[#44FF00]' : 'text-slate-500'
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 ${theme === 'dark' ? 'border-slate-800 bg-[#0a0e17]' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            🛸 Rickpedia — Construido con React, TypeScript & Rick and Morty API
          </p>
          <p className="text-xs text-slate-600 mt-1">Demo para presentación de documentación con GitHub Copilot</p>
        </div>
      </footer>
    </div>
  );
}
