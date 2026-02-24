import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useHackathons } from '@/hooks/useHackathons';
import { HackathonCard } from '@/components/cards/HackathonCard';
import { Trophy, Zap, Cpu, Cloud, Server, Lock, Layers, SlidersHorizontal, Briefcase } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/AnimatedSection';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { motion } from 'framer-motion';

// ── Tech domain auto-detection ──────────────────────────
function getHackDomain(techStack: string[]): string {
  if (!techStack || techStack.length === 0) return 'all';
  const t = techStack.join(' ').toLowerCase();
  if (['openai', 'tensorflow', 'pytorch', 'ml', 'ai', 'gpt', 'llm'].some(k => t.includes(k))) return 'ai';
  if (['aws', 'azure', 'gcp', 'cloud', 'lambda', 'terraform'].some(k => t.includes(k))) return 'cloud';
  if (['docker', 'kubernetes', 'k8s', 'ci/cd', 'argocd', 'jenkins', 'devops'].some(k => t.includes(k))) return 'devops';
  if (['security', 'owasp', 'pentest', 'encryption'].some(k => t.includes(k))) return 'security';
  return 'all';
}

const filters = [
  { key: 'all', label: 'Tous', icon: Layers },
  { key: 'ai', label: 'AI / ML', icon: Cpu },
  { key: 'cloud', label: 'Cloud', icon: Cloud },
  { key: 'devops', label: 'DevOps', icon: Server },
  { key: 'security', label: 'Security', icon: Lock },
];

const filterColors: Record<string, string> = {
  all: '#9d6bf7', ai: '#fca5a5', cloud: '#c4b5fd', devops: '#fde68a', security: '#86efac',
};

export function Hackathons() {
  const { hackathons, isLoading } = useHackathons({ status: 'published' });
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.title = 'Hackathons | Mohammed - Cloud/DevOps/AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mes participations aux hackathons et compétitions. Gagnant, finaliste et projets innovants.');
    }
  }, []);

  // Filter hackathons by domain
  const filtered = useMemo(() => {
    if (activeFilter === 'all') return hackathons;
    return hackathons.filter(h => getHackDomain(h.tech_stack || []) === activeFilter);
  }, [hackathons, activeFilter]);

  // Compute stats
  const stats = useMemo(() => {
    const topFinishes = hackathons.filter(h => ['winner', 'top3', 'finalist'].includes(h.result)).length;
    const totalTechs = new Set(hackathons.flatMap(h => h.tech_stack || [])).size;
    return { total: hackathons.length, topFinishes, totalTechs };
  }, [hackathons]);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20" style={{ background: '#0B0F1A' }}>
      <div className="section-padding">
        <div className="container-max">

          {/* ═══ HERO SECTION ═══ */}
          <FadeIn direction="up" className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl sm:text-5xl font-bold text-white">
                    <span style={{
                      background: 'linear-gradient(135deg, #9d6bf7, #c4b5fd, #facc15)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      Hackathons
                    </span>
                    {' '}<span className="text-white">&</span>{' '}
                    <span className="text-gray-400">Compétitions</span>
                  </h1>
                </div>
                <p className="text-gray-400 text-lg max-w-2xl">
                  Des expériences intenses de 24 à 48h pour résoudre des problèmes complexes,
                  innover sous pression et collaborer avec des équipes talentueuses.
                </p>
              </div>
            </div>

            {/* Stats row */}
            {hackathons.length > 0 && (
              <div className="flex flex-wrap gap-6 mb-6">
                <motion.div
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{ background: 'rgba(157, 107, 247, 0.08)', border: '1px solid rgba(157, 107, 247, 0.15)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Trophy className="w-5 h-5 text-cyber-mauve" />
                  <div>
                    <span className="text-xl font-bold text-white">
                      <AnimatedCounter target={stats.total} prefix="+" duration={1.5} />
                    </span>
                    <span className="text-gray-500 text-xs ml-1.5">Hackathons</span>
                  </div>
                </motion.div>

                {stats.topFinishes > 0 && (
                  <motion.div
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                    style={{ background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.15)' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <div>
                      <span className="text-xl font-bold text-white">
                        <AnimatedCounter target={stats.topFinishes} duration={1.5} />
                      </span>
                      <span className="text-gray-500 text-xs ml-1.5">Top Finishes</span>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{ background: 'rgba(96, 165, 250, 0.08)', border: '1px solid rgba(96, 165, 250, 0.15)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="text-xl font-bold text-white">
                      <AnimatedCounter target={stats.totalTechs} prefix="+" duration={1.5} />
                    </span>
                    <span className="text-gray-500 text-xs ml-1.5">Technologies</span>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Glow line */}
            <div className="relative h-px mb-8 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 w-1/3 rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(157, 107, 247, 0.6), rgba(250, 204, 21, 0.3), transparent)' }}
                animate={{ left: ['-33%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <div className="w-full h-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
            </div>
          </FadeIn>

          {/* ═══ FILTER BAR ═══ */}
          <FadeIn delay={0.2} className="mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <SlidersHorizontal className="w-4 h-4 text-gray-600 flex-shrink-0 mr-1" />
              {filters.map((filter) => {
                const isActive = activeFilter === filter.key;
                const FilterIcon = filter.icon;
                const color = filterColors[filter.key];
                const count = filter.key === 'all'
                  ? hackathons.length
                  : hackathons.filter(h => getHackDomain(h.tech_stack || []) === filter.key).length;

                if (filter.key !== 'all' && count === 0) return null;

                return (
                  <motion.button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex-shrink-0"
                    style={{
                      background: isActive ? `${color}18` : 'transparent',
                      color: isActive ? color : '#6b7280',
                      border: `1px solid ${isActive ? `${color}30` : 'rgba(255,255,255,0.04)'}`,
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FilterIcon className="w-3.5 h-3.5" />
                    {filter.label}
                    {count > 0 && (
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                        style={{
                          background: isActive ? `${color}25` : 'rgba(255,255,255,0.04)',
                          color: isActive ? color : '#6b7280',
                        }}
                      >
                        {count}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </FadeIn>

          {/* ═══ HACKATHON CARDS ═══ */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 rounded-xl animate-pulse" style={{ background: '#121829', animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <StaggerContainer key={activeFilter} staggerDelay={0.1} className="space-y-4">
              {filtered.map((hackathon) => (
                <StaggerItem key={hackathon.id}>
                  <HackathonCard hackathon={hackathon} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <FadeIn>
              <div className="rounded-xl p-16 text-center relative overflow-hidden" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                {/* Subtle glassmorphism trophy */}
                <div className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{
                  background: 'rgba(157, 107, 247, 0.08)',
                  border: '1px solid rgba(157, 107, 247, 0.15)',
                  boxShadow: '0 0 30px rgba(157, 107, 247, 0.1)',
                }}>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Trophy className="w-10 h-10 text-cyber-mauve" />
                  </motion.div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {activeFilter !== 'all'
                    ? `Aucun hackathon ${activeFilter} pour le moment`
                    : 'Aucun hackathon pour le moment'}
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Je me prépare activement pour des challenges d'innovation compétitifs.
                </p>

                <div className="flex gap-3 justify-center">
                  {activeFilter !== 'all' && (
                    <button onClick={() => setActiveFilter('all')} className="px-4 py-2 rounded-lg text-sm text-cyber-mauve hover:bg-cyber-mauve/10 transition-all border border-cyber-mauve/20">
                      Voir tous les hackathons
                    </button>
                  )}
                  <Link to="/projects" className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-cyber-mauve/20 hover:bg-cyber-mauve/30 transition-all border border-cyber-mauve/30">
                    Voir mes projets →
                  </Link>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Count footer */}
          {!isLoading && filtered.length > 0 && (
            <FadeIn delay={0.4}>
              <p className="text-center text-gray-600 text-sm mt-8">
                {filtered.length} hackathon{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
                {activeFilter !== 'all' && ` en ${activeFilter}`}
              </p>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
