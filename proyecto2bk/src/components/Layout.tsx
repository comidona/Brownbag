import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/characters', label: 'Personajes', icon: '👤' },
  { to: '/episodes', label: 'Episodios', icon: '📺' },
  { to: '/locations', label: 'Lugares', icon: '📍' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fafbfc]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-gray-100">
            <NavLink to="/" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
              <span className="text-3xl">🍩</span>
              <div>
                <h1 className="text-lg font-extrabold text-[#FFD521]" style={{ textShadow: '1px 1px 0 #d4a00a' }}>
                  Springfield
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Explorer</p>
              </div>
            </NavLink>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#FFD521]/10 text-[#d4a00a] border-l-4 border-[#FFD521]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }>
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3">
              <div className="w-9 h-9 rounded-full bg-[#FFD521] flex items-center justify-center text-sm font-bold text-white">
                HS
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Homer S.</p>
                <p className="text-xs text-gray-500">Springfield</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="md:hidden flex items-center gap-3 p-4 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="text-lg font-bold text-[#FFD521]">Springfield Explorer</span>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>

        <footer className="p-4 text-center text-xs text-gray-400 border-t border-gray-100">
          🍩 Springfield Explorer — Built with React & The Simpsons API
        </footer>
      </div>
    </div>
  );
}
