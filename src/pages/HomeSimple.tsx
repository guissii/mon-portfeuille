import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { useCertifications } from '@/hooks/useCertifications';
import { useTimeline } from '@/hooks/useTimeline';
import { useSettings } from '@/hooks/useSettings';
import { ArrowRight, Calendar, Cloud, Server, Brain, Zap, Award, Shield, GitBranch, Code, Trophy, Globe } from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/motion/AnimatedSection';
import { TypewriterText } from '@/components/motion/TypewriterText';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { ParticleField } from '@/components/motion/ParticleField';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  Cloud, Server, Brain, Shield, GitBranch, Code, Award, Trophy, Zap,
};

const typeColors: Record<string, string> = {
  project: '#9d6bf7',
  certification: '#facc15',
  hackathon: '#22c55e',
  formation: '#3b82f6',
  milestone: '#f97316',
};

const typeLabels: Record<string, string> = {
  project: 'Projet',
  certification: 'Certification',
  hackathon: 'Hackathon',
  formation: 'Formation',
  milestone: 'Milestone',
};

export function HomeSimple() {
  const { projects } = useProjects({ status: 'published', featured: true, limit: 3 });
  const { certifications } = useCertifications({ status: 'published', limit: 3 });
  const { events: timelineEvents } = useTimeline(8);
  const { settings } = useSettings();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a14 0%, #11111a 50%, #1a1a2e 100%)' }}>
        {/* Particle Background */}
        <ParticleField particleCount={60} />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(157, 107, 247, 0.15)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(250, 204, 21, 0.08)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(157, 107, 247, 0.3) 0%, transparent 70%)' }} />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 xl:px-12 w-full z-10">
          <div className="max-w-7xl mx-auto">

            {/* Centered Photo + Content Layout */}
            <div className="flex flex-col items-center text-center">

              {/* Professional Photo */}
              <motion.div
                className="relative mb-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Glow ring behind photo */}
                <div className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-breathe" style={{ background: 'linear-gradient(135deg, rgba(157, 107, 247, 0.4), rgba(250, 204, 21, 0.2))', transform: 'scale(1.15)' }} />

                {/* Photo container */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden animate-glow-pulse" style={{ border: '3px solid rgba(157, 107, 247, 0.5)', boxShadow: '0 0 40px rgba(157, 107, 247, 0.3), 0 0 80px rgba(157, 107, 247, 0.1), inset 0 0 30px rgba(0,0,0,0.3)' }}>
                  {getImageUrl(settings.profile_photo) ? (
                    <img
                      src={getImageUrl(settings.profile_photo)!}
                      alt={settings.profile_name || 'Mohammed'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2a2a4e 100%)' }}>
                      <span className="text-5xl sm:text-6xl lg:text-7xl font-bold" style={{ background: 'linear-gradient(135deg, #9d6bf7, #facc15)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {(settings.profile_name || 'M')[0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Status dot */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
                  <div className="w-5 h-5 rounded-full bg-green-400 border-3 border-[#0a0a14]" style={{ boxShadow: '0 0 12px rgba(74, 222, 128, 0.6)' }}>
                    <div className="w-full h-full rounded-full bg-green-400 animate-ping opacity-75" />
                  </div>
                </div>
              </motion.div>

              {/* Status Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Disponible pour missions</span>
              </motion.div>

              {/* Headline */}
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight glow-text">
                  {settings.profile_name || 'Mohammed'}
                  <span className="block mt-2" style={{ background: 'linear-gradient(135deg, #9d6bf7 0%, #c4b5fd 30%, #facc15 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    <TypewriterText
                      words={(() => { try { const p = JSON.parse(settings.hero_titles || '[]'); return p.length > 0 ? p : ['Cloud Engineer', 'DevOps Expert', 'AI Specialist', 'Infrastructure Architect']; } catch { return ['Cloud Engineer', 'DevOps Expert', 'AI Specialist', 'Infrastructure Architect']; } })()}
                      typingSpeed={70}
                      deletingSpeed={40}
                      pauseDuration={2500}
                    />
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                  {settings.profile_description || 'Ingenieur infrastructure specialise dans le cloud scalable, le CI/CD et l\'observabilite. Je construis des systemes robustes et mesurables.'}
                </p>
              </motion.div>

              {/* Tech indicators */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {(() => {
                  const defaultBadges = [
                    { icon: Cloud, label: 'AWS / GCP / Azure' },
                    { icon: Server, label: 'Kubernetes / Docker' },
                    { icon: Brain, label: 'ML Ops / AI' },
                    { icon: Shield, label: 'Cybersecurite' },
                  ];
                  const iconMap: Record<string, any> = { Cloud, Server, Brain, Shield, Globe, Zap, Cpu: Brain };
                  let badges = defaultBadges;
                  try {
                    const parsed = JSON.parse(settings.hero_tech_badges || '[]');
                    if (parsed.length > 0) badges = parsed.map((b: any) => ({ icon: iconMap[b.icon] || Cloud, label: b.label }));
                  } catch { }
                  return badges.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-2 text-sm text-gray-400 px-3 py-2 rounded-lg border border-white/5 backdrop-blur-sm"
                      style={{ background: 'rgba(26, 26, 46, 0.5)' }}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(157, 107, 247, 0.4)' }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: '#9d6bf7' }} />
                      <span>{item.label}</span>
                    </motion.div>
                  ));
                })()}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-lg transition-all"
                    style={{ background: 'linear-gradient(135deg, #9d6bf7, #7c3aed)', boxShadow: '0 0 30px rgba(157, 107, 247, 0.4)' }}
                  >
                    Voir les projets
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/agenda"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-white border border-white/20 transition-all"
                    style={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(10px)' }}
                  >
                    <Calendar className="w-5 h-5" />
                    Reserver un appel
                  </Link>
                </motion.div>
              </motion.div>

              {/* Animated Stats */}
              <motion.div
                className="flex flex-wrap justify-center gap-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold" style={{ color: '#9d6bf7' }}>
                    <AnimatedCounter target={parseInt(settings.years_experience) || 5} suffix="+" duration={2} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Annees d'experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold" style={{ color: '#9d6bf7' }}>
                    <AnimatedCounter target={parseInt(settings.projects_count) || 15} suffix="+" duration={2.2} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Projets livres</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold" style={{ color: '#9d6bf7' }}>
                    <AnimatedCounter target={parseInt(settings.certifications_count) || 10} suffix="+" duration={2.4} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Certifications</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-purple-500/50 to-transparent" />
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 lg:py-32" style={{ background: '#0a0a14' }}>
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up" className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Projets <span style={{ color: '#9d6bf7' }}>phares</span>
                </h2>
                <p className="text-gray-400 max-w-xl">
                  Une selection de projets demontrant mon expertise en infrastructure cloud,
                  DevOps et intelligence artificielle.
                </p>
              </div>
              <Link
                to="/projects"
                className="hidden sm:inline-flex items-center gap-2 transition-colors"
                style={{ color: '#9d6bf7' }}
              >
                Voir tous les projets
                <ArrowRight className="w-5 h-5" />
              </Link>
            </FadeIn>

            {/* Dynamic Project Cards */}
            {projects.length > 0 ? (
              <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <StaggerItem key={project.id}>
                    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <Link to={`/projects/${project.slug}`} className="rounded-xl overflow-hidden group block" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="h-48 overflow-hidden relative">
                          {getImageUrl(project.cover_image) ? (
                            <img src={getImageUrl(project.cover_image)!} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e, #2a2a4e)' }}>
                              <Cloud className="w-12 h-12 text-gray-600" />
                            </div>
                          )}
                          {/* Hover overlay with glow */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-60" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 40px rgba(157, 107, 247, 0.15)' }} />
                        </div>
                        <div className="p-5">
                          {project.stack?.infrastructure && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {(project.stack.infrastructure as string[]).slice(0, 3).map((tag: string) => (
                                <span key={tag} className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(157, 107, 247, 0.2)', color: '#c4b5fd', border: '1px solid rgba(157, 107, 247, 0.3)' }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">{project.title}</h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.tagline}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1" style={{ color: '#9d6bf7' }}>
                              Voir le projet <ArrowRight className="w-4 h-4" />
                            </span>
                            {project.github_url && (
                              <span className="text-xs text-gray-500">GitHub</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Les projets seront bientot disponibles.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Section - Dynamic */}
      {certifications.length > 0 && (
        <section className="py-20 lg:py-32" style={{ background: '#11111a' }}>
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-7xl mx-auto">
              <FadeIn direction="up" className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Certifications <span style={{ color: '#9d6bf7' }}>cles</span>
                  </h2>
                  <p className="text-gray-400 max-w-xl">
                    Des certifications reconnues validant mon expertise technique.
                  </p>
                </div>
                <Link
                  to="/certifications"
                  className="hidden sm:inline-flex items-center gap-2 transition-colors"
                  style={{ color: '#9d6bf7' }}
                >
                  Toutes les certifications
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </FadeIn>

              <StaggerContainer staggerDelay={0.12} className="space-y-4">
                {certifications.map((cert) => (
                  <StaggerItem key={cert.id}>
                    <motion.div whileHover={{ x: 6, scale: 1.01 }} transition={{ duration: 0.25 }}>
                      <Link to={`/certifications/${cert.slug}`} className="p-6 rounded-xl flex items-center gap-4 group transition-all block" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden" style={{ background: 'rgba(157, 107, 247, 0.1)' }}>
                          {getImageUrl(cert.image_url) ? (
                            <img src={getImageUrl(cert.image_url)!} alt={cert.name} className="w-10 h-10 object-contain rounded" />
                          ) : (
                            <Award className="w-7 h-7" style={{ color: '#9d6bf7' }} />
                          )}
                          {/* Shimmer effect on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, transparent 30%, rgba(157, 107, 247, 0.2) 50%, transparent 70%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors">{cert.name}</h3>
                          <p className="text-gray-400 text-sm">{cert.issuer} - {new Date(cert.issue_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(157, 107, 247, 0.2)', color: '#c4b5fd' }}>
                          {cert.level === 'expert' ? 'Expert' : cert.level === 'advanced' ? 'Avance' : cert.level === 'intermediate' ? 'Intermediaire' : 'Debutant'}
                        </span>
                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-cyber-mauve transition-all group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Timeline / Evolution Section */}
      {timelineEvents.length > 0 && (
        <section className="py-20 lg:py-32" style={{ background: '#0a0a14' }}>
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-7xl mx-auto">
              <FadeIn direction="up" className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Mon <span style={{ color: '#9d6bf7' }}>parcours</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Les moments cles de mon evolution professionnelle.
                </p>
              </FadeIn>

              {/* Vertical Timeline */}
              <div className="relative max-w-3xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, rgba(157, 107, 247, 0.5), rgba(250, 204, 21, 0.3), rgba(157, 107, 247, 0.1))' }} />

                {timelineEvents.map((event, index) => {
                  const isLeft = index % 2 === 0;
                  const EventIcon = iconMap[event.icon] || Zap;
                  const color = event.color || typeColors[event.event_type] || '#9d6bf7';

                  return (
                    <FadeIn
                      key={event.id}
                      direction={isLeft ? 'left' : 'right'}
                      delay={index * 0.1}
                    >
                      <div
                        className={cn(
                          'relative flex items-start gap-6 mb-10 sm:mb-12',
                          'sm:flex-row',
                          isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                        )}
                      >
                        {/* Content */}
                        <div className={cn('flex-1 ml-16 sm:ml-0', isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12')}>
                          <motion.div
                            className="p-5 rounded-xl transition-all"
                            style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}
                            whileHover={{ scale: 1.03, borderColor: `${color}40` }}
                          >
                            <div className={cn('flex items-center gap-2 mb-2', isLeft ? 'sm:justify-end' : '')}>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
                                {typeLabels[event.event_type] || event.event_type}
                              </span>
                            </div>
                            <h3 className="text-white font-semibold mb-1">{event.title}</h3>
                            {event.description && (
                              <p className="text-gray-400 text-sm">{event.description}</p>
                            )}
                            <p className="text-gray-500 text-xs mt-2">
                              {new Date(event.event_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                            </p>
                          </motion.div>
                        </div>

                        {/* Node */}
                        <motion.div
                          className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl flex items-center justify-center z-10"
                          style={{ background: '#1a1a2e', border: `2px solid ${color}`, boxShadow: `0 0 20px ${color}40` }}
                          whileHover={{ scale: 1.2, boxShadow: `0 0 30px ${color}60` }}
                        >
                          <EventIcon className="w-5 h-5" style={{ color }} />
                        </motion.div>

                        {/* Empty spacer for opposite side */}
                        <div className="hidden sm:block flex-1" />
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-32" style={{ background: '#11111a' }}>
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <ScaleIn>
              <div className="p-8 lg:p-16 rounded-2xl text-center relative overflow-hidden" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Animated background glow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
                  style={{ background: 'rgba(157, 107, 247, 0.1)' }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Travaillons <span style={{ background: 'linear-gradient(135deg, #9d6bf7 0%, #facc15 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ensemble</span>
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                    Vous avez un projet cloud, DevOps ou AI ? Discutons de vos besoins.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        to="/agenda"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all"
                        style={{ background: 'linear-gradient(135deg, #9d6bf7, #7c3aed)', boxShadow: '0 0 30px rgba(157, 107, 247, 0.4)' }}
                      >
                        <Calendar className="w-5 h-5" />
                        Reserver un appel
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>
    </div>
  );
}
