import { useState, useEffect, useMemo } from 'react';
import { useCertifications } from '@/hooks/useCertifications';
import { CertificationCard } from '@/components/cards/CertificationCard';
import { Award, Cloud, Network, Server, Lock, Cpu, Layers, SlidersHorizontal } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/AnimatedSection';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { motion } from 'framer-motion';

// ── Skill domain detection ──────────────────────────────
function getSkillDomain(skill: string): string {
  const s = skill.toLowerCase();
  if (['tcp', 'ip', 'dns', 'routing', 'bgp', 'network', 'réseau', 'http', 'ssh', 'ssl', 'firewall', 'vpn'].some(k => s.includes(k))) return 'networking';
  if (['aws', 'azure', 'gcp', 'cloud', 'ec2', 's3', 'lambda', 'vpc', 'terraform'].some(k => s.includes(k))) return 'cloud';
  if (['docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'devops', 'helm', 'prometheus', 'monitoring'].some(k => s.includes(k))) return 'devops';
  if (['security', 'sécurité', 'encryption', 'auth', 'compliance', 'resilience'].some(k => s.includes(k))) return 'security';
  if (['ai', 'ml', 'machine learning', 'deep learning', 'nlp', 'tensorflow'].some(k => s.includes(k))) return 'ai';
  return 'default';
}

function getCertDomain(skills: string[]): string {
  if (!skills || skills.length === 0) return 'all';
  const domains = skills.map(getSkillDomain);
  const counts: Record<string, number> = {};
  domains.forEach(d => { if (d !== 'default') counts[d] = (counts[d] || 0) + 1; });
  const entries = Object.entries(counts);
  if (entries.length === 0) return 'all';
  return entries.sort(([, a], [, b]) => b - a)[0][0];
}

// ── Filter config ───────────────────────────────────────
const filters = [
  { key: 'all', label: 'Tous', icon: Layers },
  { key: 'cloud', label: 'Cloud', icon: Cloud },
  { key: 'networking', label: 'Network', icon: Network },
  { key: 'devops', label: 'DevOps', icon: Server },
  { key: 'security', label: 'Security', icon: Lock },
  { key: 'ai', label: 'AI / ML', icon: Cpu },
];

const filterColors: Record<string, string> = {
  all: '#9d6bf7',
  cloud: '#c4b5fd',
  networking: '#60a5fa',
  devops: '#fde68a',
  security: '#fca5a5',
  ai: '#86efac',
};

export function Certifications() {
  const { certifications, isLoading } = useCertifications({ status: 'published' });
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.title = 'Certifications | Mohammed - Cloud/DevOps/AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mes certifications Cloud, DevOps et AI. AWS, Kubernetes, Terraform et plus.');
    }
  }, []);

  // Filter certifications by domain
  const filtered = useMemo(() => {
    if (activeFilter === 'all') return certifications;
    return certifications.filter(c => getCertDomain(c.skills || []) === activeFilter);
  }, [certifications, activeFilter]);

  // Domain stats
  const domainStats = useMemo(() => {
    const stats: Record<string, number> = {};
    certifications.forEach(c => {
      const domain = getCertDomain(c.skills || []);
      stats[domain] = (stats[domain] || 0) + 1;
    });
    return stats;
  }, [certifications]);

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
                    Mes{' '}
                    <span style={{
                      background: 'linear-gradient(135deg, #9d6bf7, #c4b5fd, #facc15)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      Certifications
                    </span>
                  </h1>
                  {/* Animated counter badge */}
                  {certifications.length > 0 && (
                    <motion.span
                      className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold"
                      style={{
                        background: 'rgba(157, 107, 247, 0.15)',
                        color: '#c4b5fd',
                        border: '1px solid rgba(157, 107, 247, 0.25)',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    >
                      <AnimatedCounter target={certifications.length} prefix="+" duration={1.5} />
                    </motion.span>
                  )}
                </div>
                <p className="text-gray-400 text-lg max-w-2xl">
                  Des certifications reconnues par l'industrie validant mon expertise
                  technique en cloud, DevOps et sécurité.
                </p>
              </div>

              {/* Quick domain stats */}
              {certifications.length > 0 && (
                <div className="flex gap-3">
                  {Object.entries(domainStats)
                    .filter(([k]) => k !== 'all')
                    .slice(0, 3)
                    .map(([domain, count]) => {
                      const color = filterColors[domain] || '#9d6bf7';
                      return (
                        <div key={domain} className="text-center">
                          <div className="text-lg font-bold" style={{ color }}>{count}</div>
                          <div className="text-[10px] text-gray-600 uppercase tracking-wider">
                            {domain === 'networking' ? 'Network' : domain}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Animated glow line */}
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
                const count = filter.key === 'all' ? certifications.length : (domainStats[filter.key] || 0);

                // Don't show filter if no certs in that domain (except 'all')
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

          {/* ═══ CERTIFICATIONS GRID ═══ */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-36 rounded-xl animate-pulse"
                  style={{
                    background: '#121829',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <StaggerContainer key={activeFilter} staggerDelay={0.08} className="space-y-4">
              {filtered.map((certification) => (
                <StaggerItem key={certification.id}>
                  <CertificationCard certification={certification} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <FadeIn>
              <div className="rounded-xl p-16 text-center" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Award className="w-16 h-16 text-cyber-mauve mx-auto mb-4 opacity-50" />
                <p className="text-gray-500 text-lg mb-2">
                  {activeFilter !== 'all'
                    ? `Aucune certification ${activeFilter} pour le moment.`
                    : 'Aucune certification pour le moment.'}
                </p>
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="text-cyber-mauve text-sm hover:underline mt-2"
                  >
                    Voir toutes les certifications
                  </button>
                )}
              </div>
            </FadeIn>
          )}

          {/* Result count */}
          {!isLoading && filtered.length > 0 && (
            <FadeIn delay={0.4}>
              <p className="text-center text-gray-600 text-sm mt-8">
                {filtered.length} certification{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
                {activeFilter !== 'all' && ` en ${activeFilter}`}
              </p>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
