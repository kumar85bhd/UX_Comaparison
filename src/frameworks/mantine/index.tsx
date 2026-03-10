import React, { useState, useMemo, useContext } from 'react';
import { 
  MantineProvider, 
  Container, 
  Title, 
  Text, 
  TextInput, 
  Select, 
  Grid, 
  Card, 
  Badge, 
  Group, 
  ActionIcon, 
  ThemeIcon,
  Transition,
  Flex,
  Box,
  Paper
} from '@mantine/core';
import { Search, Star, ExternalLink, Filter, Sparkles } from 'lucide-react';
import { MOCK_APPS } from '../../mockData';
import { ThemeContext } from '../../ThemeContext';
import { getCategoryTheme } from '../../utils/categoryColors';
import RobotAnimation from '../../components/RobotAnimation';

// Mantine v7 requires styles to be imported
import '@mantine/core/styles.css';

const MantineUI: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
    <MantineProvider defaultColorScheme="auto" forceColorScheme={theme}>
      <div style={{ minHeight: '100vh', padding: '1rem', backgroundColor: 'var(--mantine-color-body)', position: 'relative', overflow: 'hidden' }}>
        {/* Background Atmospheric Elements */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
          <RobotAnimation className="absolute -top-20 -right-20 opacity-20 dark:opacity-10 scale-150" />
          <div style={{ position: 'absolute', top: '50%', left: '25%', width: '400px', height: '400px', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '50%', filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: '25%', width: '500px', height: '500px', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '50%', filter: 'blur(150px)' }} />
        </div>

        <Container size="xl" py="xl" style={{ position: 'relative', zIndex: 10 }}>
          <Transition mounted={mounted} transition="fade" duration={400} timingFunction="ease">
            {(styles) => (
              <div style={styles}>
                {/* Header / Controls */}
                <Paper 
                  withBorder 
                  radius="xl" 
                  p="xl" 
                  mb="xl" 
                  bg="var(--mantine-color-body)" 
                  style={{ 
                    backdropFilter: 'blur(20px)', 
                    backgroundColor: 'rgba(var(--mantine-color-body-rgb), 0.6)',
                    boxShadow: 'var(--mantine-shadow-xl)',
                    borderRadius: '2.5rem'
                  }}
                >
                  <Flex justify="space-between" align="center" wrap="wrap" gap="xl">
                    <Box>
                      <Group gap="sm" mb={4}>
                        <ThemeIcon size={40} radius="xl" variant="filled" color="blue">
                          <Sparkles size={24} />
                        </ThemeIcon>
                        <Title order={1} size={32} fw={900}>GenAI <Text span c="blue" inherit>Workspace</Text></Title>
                      </Group>
                      <Text c="dimmed" size="sm" fw={500}>Manage your premium AI toolkit • {filteredApps.length} tools available</Text>
                    </Box>
                    
                    <Flex gap="md" wrap="wrap">
                      <TextInput
                        placeholder="Search apps..."
                        leftSection={<Search size={18} />}
                        value={search}
                        onChange={(event) => setSearch(event.currentTarget.value)}
                        w={{ base: '100%', sm: 280 }}
                        radius="lg"
                        size="md"
                      />
                      <Select
                        placeholder="Category"
                        leftSection={<Filter size={18} />}
                        data={categories}
                        value={category}
                        onChange={(val) => setCategory(val || 'All')}
                        w={{ base: '100%', sm: 180 }}
                        radius="lg"
                        size="md"
                      />
                    </Flex>
                  </Flex>
                </Paper>

                <Grid gutter="lg">
                  {filteredApps.map((app, index) => {
                    const catTheme = getCategoryTheme(app.category);
                    return (
                      <Grid.Col key={app.id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
                        <Transition mounted={mounted} transition="slide-up" duration={400} timingFunction="ease">
                          {(cardStyles) => (
                            <div style={{...cardStyles, transitionDelay: `${index * 30}ms`, height: '100%'}}>
                              <Card 
                                shadow="sm" 
                                padding="xl" 
                                radius="xl" 
                                withBorder 
                                component="a" 
                                href={app.url} 
                                target="_blank"
                                style={{ 
                                  height: '100%', 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  transition: 'all 400ms ease',
                                  cursor: 'pointer',
                                  borderRadius: '2.2rem',
                                  position: 'relative',
                                  overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'translateY(-10px)';
                                  e.currentTarget.style.boxShadow = 'var(--mantine-shadow-2xl)';
                                  const gradientOverlay = e.currentTarget.querySelector('.gradient-overlay') as HTMLElement;
                                  if (gradientOverlay) gradientOverlay.style.opacity = '1';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = 'var(--mantine-shadow-sm)';
                                  const gradientOverlay = e.currentTarget.querySelector('.gradient-overlay') as HTMLElement;
                                  if (gradientOverlay) gradientOverlay.style.opacity = '0';
                                }}
                              >
                                {/* Gradient Overlay */}
                                <div 
                                  className="gradient-overlay"
                                  style={{ 
                                    position: 'absolute', 
                                    inset: 0, 
                                    background: `linear-gradient(135deg, ${catTheme.color}22 0%, transparent 100%)`,
                                    opacity: 0,
                                    transition: 'opacity 500ms ease',
                                    pointerEvents: 'none'
                                  }} 
                                />

                                <Group justify="space-between" mb="lg" style={{ position: 'relative', zIndex: 1 }}>
                                  <Group gap="md">
                                    <ThemeIcon size={48} radius="xl" variant="light" color={catTheme.color}>
                                      <Text fw={900} size="xl">{app.name.charAt(0)}</Text>
                                    </ThemeIcon>
                                    <Box>
                                      <Text fw={800} size="lg" style={{ lineHeight: 1.2 }}>{app.name}</Text>
                                      <Badge color={catTheme.color} variant="light" size="xs" radius="sm" tt="uppercase" fw={900}>
                                        {app.category}
                                      </Badge>
                                    </Box>
                                  </Group>
                                  <ActionIcon 
                                    variant="subtle" 
                                    size="lg"
                                    radius="md"
                                    color={favorites.has(app.id) ? "yellow" : "gray"}
                                    onClick={(e) => toggleFavorite(e, app.id)}
                                  >
                                    <Star size={20} fill={favorites.has(app.id) ? "currentColor" : "none"} />
                                  </ActionIcon>
                                </Group>

                                <Text size="sm" c="dimmed" style={{ flex: 1, position: 'relative', zIndex: 1 }} lineClamp={2} fw={500}>
                                  {app.description}
                                </Text>

                                <Group justify="space-between" mt="xl" pt="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)', position: 'relative', zIndex: 1 }}>
                                  <Box>
                                    <Text size="9px" fw={900} tt="uppercase" c="dimmed" lts="0.05em">Usage</Text>
                                    <Text size="xs" fw={800}>{app.launch_count.toLocaleString()} launches</Text>
                                  </Box>
                                  <Group gap={4} c="blue">
                                    <Text size="xs" fw={900} tt="uppercase">Open</Text>
                                    <ExternalLink size={12} />
                                  </Group>
                                </Group>
                              </Card>
                            </div>
                          )}
                        </Transition>
                      </Grid.Col>
                    );
                  })}
                </Grid>

                {filteredApps.length === 0 && (
                  <Paper withBorder radius="xl" py={100} ta="center" bg="var(--mantine-color-body)" style={{ borderStyle: 'dashed', borderRadius: '3rem', backgroundColor: 'rgba(var(--mantine-color-body-rgb), 0.4)', backdropFilter: 'blur(10px)' }}>
                    <Box style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                      <Sparkles size={64} color="var(--mantine-color-dimmed)" style={{ opacity: 0.2 }} />
                    </Box>
                    <Title order={3} mb="xs">No tools found</Title>
                    <Text c="dimmed" maw={400} mx="auto" mb="xl">
                      We couldn't find any AI applications matching your current search or filters.
                    </Text>
                    <ActionIcon variant="filled" color="blue" size="xl" radius="xl" onClick={() => {setSearch(''); setCategory('All');}} style={{ width: 'auto', padding: '0 2rem' }}>
                      Clear all filters
                    </ActionIcon>
                  </Paper>
                )}
              </div>
            )}
          </Transition>
        </Container>
      </div>
    </MantineProvider>
  );
};

export default MantineUI;

