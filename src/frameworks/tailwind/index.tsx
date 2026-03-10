import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, ExternalLink, Filter, Sparkles } from 'lucide-react';
import { MOCK_APPS } from '../../mockData';
import { getCategoryTheme } from '../../utils/categoryColors';
import RobotAnimation from '../../components/RobotAnimation';

const TailwindEnhanced: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = ['All', ...Array.from(new Set(MOCK_APPS.map(app => app.category)))];

  const filteredApps = useMemo(() => {
    return MOCK_APPS.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) || 
                            app.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || app.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans transition-colors duration-300 relative overflow-hidden">
      {/* Background Atmospheric Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <RobotAnimation className="absolute -top-20 -right-20 opacity-20 dark:opacity-10 scale-150" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-7xl mx-auto space-y-8"
      >
        {/* Header / Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-black tracking-tight">GenAI <span className="text-indigo-600 dark:text-indigo-400">Workspace</span></h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Manage your premium AI toolset • {filteredApps.length} tools available</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search tools..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-72 pl-11 pr-4 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-48 pl-11 pr-10 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none transition-all shadow-sm cursor-pointer font-medium"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app, index) => {
              const theme = getCategoryTheme(app.category);
              return (
                <motion.a
                  layout
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={app.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2.2rem] p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl ${theme.shadow} transition-all duration-500 ease-out overflow-hidden`}
                >
                  {/* Multi-color Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  <div className="relative flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${theme.bg} ${theme.darkBg} flex items-center justify-center ${theme.text} ${theme.darkText} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                        <span className="text-xl font-black">{app.name.charAt(0)}</span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">{app.name}</h3>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${theme.text} ${theme.darkText} opacity-70`}>{app.category}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => toggleFavorite(e, app.id)}
                      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
                    >
                      <Star 
                        className={`w-5 h-5 transition-all ${favorites.has(app.id) ? 'fill-amber-400 text-amber-400 scale-110' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'}`} 
                      />
                    </button>
                  </div>
                  
                  <div className="relative flex-1">
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                      {app.description}
                    </p>
                  </div>
                  
                  <div className="relative mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Usage</span>
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300">{app.launch_count.toLocaleString()} launches</span>
                    </div>
                    <div className={`px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-2`}>
                      Open <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>
        
        {filteredApps.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
          >
            <div className="relative inline-block mb-6">
              <Sparkles className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full blur-md"
              />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">No tools found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">We couldn't find any AI applications matching your current search or filters.</p>
            <button onClick={() => {setSearch(''); setCategory('All');}} className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95">Clear all filters</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TailwindEnhanced;

