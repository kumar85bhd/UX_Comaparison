import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import TailwindEnhanced from './frameworks/tailwind';
import ShadcnUI from './frameworks/shadcn';
import MantineUI from './frameworks/mantine';
import MaterialUI from './frameworks/material-ui';
import { Layers, Moon, Sun } from 'lucide-react';
import { ThemeContext } from './ThemeContext';

const Navigation = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const navItems = [
    { path: '/tailwind', label: 'Tailwind Enhanced' },
    { path: '/shadcn', label: 'ShadCN UI' },
    { path: '/mantine', label: 'Mantine' },
    { path: '/material-ui', label: 'Material UI' },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            <span className="font-semibold text-lg tracking-tight hidden sm:block">UI Framework Comparison</span>
          </div>
          <nav className="flex space-x-1 overflow-x-auto flex-1 justify-center sm:justify-start sm:ml-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors ml-4"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
          <Navigation />
          <main className="flex-1 relative">
            <Routes>
              <Route path="/tailwind" element={<TailwindEnhanced />} />
              <Route path="/shadcn" element={<ShadcnUI />} />
              <Route path="/mantine" element={<MantineUI />} />
              <Route path="/material-ui" element={<MaterialUI />} />
              <Route path="/" element={<Navigate to="/tailwind" replace />} />
              <Route path="*" element={<Navigate to="/tailwind" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
