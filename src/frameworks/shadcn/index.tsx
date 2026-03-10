import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, ExternalLink, Filter, Sparkles } from 'lucide-react';
import { MOCK_APPS } from '../../mockData';
import { getCategoryTheme } from '../../utils/categoryColors';
import RobotAnimation from '../../components/RobotAnimation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Shadcn UI primitives mock
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-3xl border bg-card text-card-foreground shadow-sm transition-all", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-bold leading-none tracking-tight text-lg", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground leading-relaxed", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-input bg-transparent px-4 py-2 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)} {...props} />
))
Badge.displayName = "Badge"

const ShadcnUI: React.FC = () => {
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
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background Atmospheric Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <RobotAnimation className="absolute -top-20 -right-20 opacity-20 dark:opacity-10 scale-150" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-7xl mx-auto space-y-8"
      >
        {/* Header / Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-card/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-black tracking-tight">GenAI <span className="text-primary">Workspace</span></h1>
            </div>
            <p className="text-sm text-muted-foreground font-medium">Manage your premium AI toolset • {filteredApps.length} tools available</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                type="text" 
                placeholder="Search tools..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 w-full sm:w-72 h-12 rounded-2xl"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-12 w-full rounded-2xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pl-11 sm:w-48 appearance-none cursor-pointer font-medium"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2.2rem]"
                >
                  <Card className="h-full flex flex-col hover:border-primary/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
                    {/* Multi-color Gradient Background */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", theme.gradient)} />
                    
                    <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-4">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500", theme.bg, theme.darkBg, theme.text, theme.darkText)}>
                          <span className="text-xl font-black">{app.name.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                          <CardTitle className="group-hover:text-primary transition-colors leading-tight">{app.name}</CardTitle>
                          <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-70", theme.text, theme.darkText)}>{app.category}</span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => toggleFavorite(e, app.id)}
                        className="p-2 rounded-xl hover:bg-muted transition-all active:scale-90"
                      >
                        <Star 
                          className={cn("h-5 w-5 transition-all", favorites.has(app.id) ? "fill-yellow-400 text-yellow-400 scale-110" : "text-muted-foreground")} 
                        />
                      </button>
                    </CardHeader>
                    <CardContent className="relative flex-1 pt-0">
                      <CardDescription className="line-clamp-2 font-medium">
                        {app.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="relative border-t pt-5 text-xs text-muted-foreground justify-between bg-muted/10">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Usage</span>
                        <span className="font-black text-foreground">{app.launch_count.toLocaleString()} launches</span>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-primary font-black uppercase tracking-wider flex items-center gap-1 text-[10px]">
                        Open <ExternalLink className="h-3 w-3" />
                      </span>
                    </CardFooter>
                  </Card>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>
        
        {filteredApps.length === 0 && (
          <div className="text-center py-32 border-2 border-dashed rounded-[3rem] bg-card/40 backdrop-blur-md flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-muted-foreground/20" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full blur-md"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">No tools found</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">We couldn't find any AI applications matching your current search or filters.</p>
            </div>
            <button onClick={() => {setSearch(''); setCategory('All');}} className="mt-4 px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">Clear all filters</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ShadcnUI;

