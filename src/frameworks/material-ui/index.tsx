import React, { useState, useMemo, useContext } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  IconButton, 
  Box, 
  InputAdornment,
  Fade,
  Grow,
  Paper,
  alpha
} from '@mui/material';
import { Search, Star, ExternalLink, Filter, Sparkles } from 'lucide-react';
import { MOCK_APPS } from '../../mockData';
import { ThemeContext } from '../../ThemeContext';
import { getCategoryTheme } from '../../utils/categoryColors';
import RobotAnimation from '../../components/RobotAnimation';

const MaterialUI: React.FC = () => {
  const { theme: currentTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const theme = useMemo(() => createTheme({
    palette: {
      mode: currentTheme,
      primary: {
        main: '#6366f1', // Indigo 500
      },
      background: {
        default: currentTheme === 'dark' ? '#020617' : '#f8fafc', // Slate 950 / Slate 50
        paper: currentTheme === 'dark' ? '#0f172a' : '#ffffff', // Slate 900 / White
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h3: {
        fontWeight: 900,
        letterSpacing: '-0.03em',
      },
      h4: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            boxShadow: currentTheme === 'dark' 
              ? '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)'
              : '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: currentTheme === 'dark'
                ? '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)'
                : '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          }
        }
      }
    },
  }), [currentTheme]);

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: 6, position: 'relative', overflow: 'hidden' }}>
        {/* Background Atmospheric Elements */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
          <RobotAnimation className="absolute -top-20 -right-20 opacity-20 dark:opacity-10 scale-150" />
          <Box sx={{ position: 'absolute', top: '50%', left: '25%', width: 400, height: 400, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: '50%', filter: 'blur(120px)' }} />
          <Box sx={{ position: 'absolute', bottom: 0, right: '25%', width: 500, height: 500, bgcolor: alpha(theme.palette.secondary?.main || '#7c3aed', 0.05), borderRadius: '50%', filter: 'blur(150px)' }} />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
          <Fade in={true} timeout={800}>
            <Box sx={{ spaceY: 4 }}>
              {/* Header / Controls */}
              <Paper 
                sx={{ 
                  p: 4, 
                  mb: 6, 
                  borderRadius: 10, 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' }, 
                  justifyContent: 'space-between', 
                  alignItems: { xs: 'flex-start', md: 'center' }, 
                  gap: 3,
                  bgcolor: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: 'blur(20px)',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1.5, bgcolor: 'primary.main', borderRadius: 3, boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)' }}>
                    <Sparkles size={28} color="white" />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="900" sx={{ lineHeight: 1.1 }}>
                      GenAI <Box component="span" sx={{ color: 'primary.main' }}>Workspace</Box>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="500">
                      Manage your premium AI toolkit • {filteredApps.length} tools available
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
                  <TextField
                    placeholder="Search tools..."
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search size={20} />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 4, height: 48 }
                    }}
                    sx={{ width: { xs: '100%', sm: 280 } }}
                  />
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    size="small"
                    displayEmpty
                    sx={{ width: { xs: '100%', sm: 180 }, borderRadius: 4, height: 48 }}
                    startAdornment={
                      <InputAdornment position="start">
                        <Filter size={20} />
                      </InputAdornment>
                    }
                  >
                    {categories.map(cat => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </Paper>

              <Grid container spacing={3}>
                {filteredApps.map((app, index) => {
                  const catTheme = getCategoryTheme(app.category);
                  return (
                    <Grow in={true} timeout={index * 50} key={app.id}>
                      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Card 
                          component="a" 
                          href={app.url} 
                          target="_blank" 
                          sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            textDecoration: 'none',
                            color: 'inherit',
                            borderRadius: 9,
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.5s ease',
                            '&:hover': {
                              transform: 'translateY(-10px)',
                              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                              '& .gradient-bg': { opacity: 1 }
                            }
                          }}
                        >
                          {/* Multi-color Gradient Background */}
                          <Box 
                            className="gradient-bg"
                            sx={{ 
                              position: 'absolute', 
                              inset: 0, 
                              background: `linear-gradient(135deg, ${alpha(catTheme.color, 0.15)} 0%, transparent 100%)`,
                              opacity: 0,
                              transition: 'opacity 0.7s ease',
                              pointerEvents: 'none'
                            }} 
                          />

                          <CardContent sx={{ flexGrow: 1, p: 3.5, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box 
                                  sx={{ 
                                    width: 48, 
                                    height: 48, 
                                    borderRadius: 3, 
                                    bgcolor: alpha(catTheme.color, 0.1), 
                                    color: catTheme.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem',
                                    fontWeight: 900,
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                                  }}
                                >
                                  {app.name.charAt(0)}
                                </Box>
                                <Box>
                                  <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                                    {app.name}
                                  </Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: catTheme.color, opacity: 0.8 }}>
                                    {app.category}
                                  </Typography>
                                </Box>
                              </Box>
                              <IconButton 
                                onClick={(e) => toggleFavorite(e, app.id)}
                                sx={{ color: favorites.has(app.id) ? '#fbbf24' : alpha(theme.palette.text.disabled, 0.3), p: 1 }}
                              >
                                <Star size={20} fill={favorites.has(app.id) ? 'currentColor' : 'none'} />
                              </IconButton>
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.6,
                              fontWeight: 500
                            }}>
                              {app.description}
                            </Typography>
                          </CardContent>
                          
                          <CardActions sx={{ borderTop: 1, borderColor: alpha(theme.palette.divider, 0.05), px: 3, py: 2, justifyContent: 'space-between', bgcolor: alpha(theme.palette.action.hover, 0.3), position: 'relative', zIndex: 1 }}>
                            <Box>
                              <Typography variant="caption" sx={{ display: 'block', textTransform: 'uppercase', fontSize: '0.55rem', fontWeight: 900, color: 'text.disabled', letterSpacing: '0.1em' }}>
                                Usage
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 800, fontSize: '0.75rem' }}>
                                {app.launch_count.toLocaleString()} launches
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 900, textTransform: 'uppercase', fontSize: '0.65rem' }}>
                              Open <ExternalLink size={14} />
                            </Typography>
                          </CardActions>
                        </Card>
                      </Grid>
                    </Grow>
                  );
                })}
              </Grid>

              {filteredApps.length === 0 && (
                <Paper sx={{ textAlign: 'center', py: 12, borderRadius: 10, border: '2px dashed', borderColor: 'divider', bgcolor: alpha(theme.palette.background.paper, 0.4), backdropFilter: 'blur(10px)' }}>
                  <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                    <Sparkles size={64} style={{ opacity: 0.1 }} />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    No tools found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 300, mx: 'auto' }}>
                    We couldn't find any AI applications matching your current search or filters.
                  </Typography>
                  <IconButton color="primary" onClick={() => {setSearch(''); setCategory('All');}} sx={{ borderRadius: 4, px: 4, py: 1.5, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
                    <Typography variant="button" fontWeight="bold">Clear all filters</Typography>
                  </IconButton>
                </Paper>
              )}
            </Box>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MaterialUI;



