export interface CategoryTheme {
  color: string;
  bg: string;
  border: string;
  shadow: string;
  text: string;
  darkBg: string;
  darkBorder: string;
  darkText: string;
  gradient: string;
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  Writing: {
    color: '#8b5cf6', // violet-500
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    shadow: 'shadow-violet-500/10',
    text: 'text-violet-700',
    darkBg: 'dark:bg-violet-500/10',
    darkBorder: 'dark:border-violet-500/20',
    darkText: 'dark:text-violet-400',
    gradient: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
  },
  Research: {
    color: '#0ea5e9', // sky-500
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    shadow: 'shadow-sky-500/10',
    text: 'text-sky-700',
    darkBg: 'dark:bg-sky-500/10',
    darkBorder: 'dark:border-sky-500/20',
    darkText: 'dark:text-sky-400',
    gradient: 'from-sky-500/20 via-indigo-500/10 to-transparent',
  },
  Coding: {
    color: '#10b981', // emerald-500
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    shadow: 'shadow-emerald-500/10',
    text: 'text-emerald-700',
    darkBg: 'dark:bg-emerald-500/10',
    darkBorder: 'dark:border-emerald-500/20',
    darkText: 'dark:text-emerald-400',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
  Image: {
    color: '#f43f5e', // rose-500
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    shadow: 'shadow-rose-500/10',
    text: 'text-rose-700',
    darkBg: 'dark:bg-rose-500/10',
    darkBorder: 'dark:border-rose-500/20',
    darkText: 'dark:text-rose-400',
    gradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
  },
  Audio: {
    color: '#f59e0b', // amber-500
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    shadow: 'shadow-amber-500/10',
    text: 'text-amber-700',
    darkBg: 'dark:bg-amber-500/10',
    darkBorder: 'dark:border-amber-500/20',
    darkText: 'dark:text-amber-400',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
  },
  Default: {
    color: '#64748b', // slate-500
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    shadow: 'shadow-slate-500/10',
    text: 'text-slate-700',
    darkBg: 'dark:bg-slate-500/10',
    darkBorder: 'dark:border-slate-500/20',
    darkText: 'dark:text-slate-400',
    gradient: 'from-slate-500/20 via-slate-400/10 to-transparent',
  }
};

export const getCategoryTheme = (category: string): CategoryTheme => {
  return CATEGORY_THEMES[category] || CATEGORY_THEMES.Default;
};
