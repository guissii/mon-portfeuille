import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Server, Zap, Shield, DollarSign, AlertTriangle, BookOpen, ArrowRight, Code, GitBranch, Activity, GraduationCap, Briefcase, MapPin, Calendar, ChevronDown, ChevronUp, Layers, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/motion/AnimatedSection';

const categoryMeta: Record<string, { icon: any; color: string; bgColor: string; border: string; glow: string }> = {
  architecture: { icon: Server, color: '#c4b5fd', bgColor: 'rgba(157, 107, 247, 0.1)', border: 'rgba(157, 107, 247, 0.2)', glow: '0 0 20px rgba(157, 107, 247, 0.2)' },
  cicd: { icon: GitBranch, color: '#fde68a', bgColor: 'rgba(250, 204, 21, 0.1)', border: 'rgba(250, 204, 21, 0.2)', glow: '0 0 20px rgba(250, 204, 21, 0.2)' },
  observability: { icon: Activity, color: '#86efac', bgColor: 'rgba(74, 222, 128, 0.1)', border: 'rgba(74, 222, 128, 0.2)', glow: '0 0 20px rgba(74, 222, 128, 0.2)' },
  security: { icon: Shield, color: '#fca5a5', bgColor: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)', glow: '0 0 20px rgba(239, 68, 68, 0.2)' },
  finops: { icon: DollarSign, color: '#6ee7b7', bgColor: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)', glow: '0 0 20px rgba(16, 185, 129, 0.2)' },
  incidents: { icon: AlertTriangle, color: '#fdba74', bgColor: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.2)', glow: '0 0 20px rgba(249, 115, 22, 0.2)' },
};

export function Engineering() {
  const [articles, setArticles] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'articles'>('experience');

  useEffect(() => {
    document.title = 'Engineering Depth | Portfolio';
    window.scrollTo(0, 0);
    api.getArticles({ status: 'published' }).then(setArticles).catch(() => { });
    api.getEducation('published').then(setEducation).catch(() => { });
    api.getExperiences('published').then(setExperiences).catch(() => { });
  }, []);

  const categories = Object.entries(
    articles.reduce((acc: Record<string, any[]>, a) => {
      acc[a.category] = acc[a.category] || [];
      acc[a.category].push(a);
      return acc;
    }, {})
  ).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="min-h-screen pb-20" style={{ background: '#050505' }}>
      {/* ═══════════════════════════════════════════════════
                1️⃣ HERO SECTION
                ═══════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0f0920 0%, #050505 100%)' }} />
          <motion.div
            className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(157,107,247,0.15) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative z-10 section-padding">
          <div className="container-max max-w-5xl">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(157,107,247,0.1)', border: '1px solid rgba(157,107,247,0.2)' }}>
                <Terminal className="w-4 h-4 text-cyber-mauve" />
                <span className="text-xs font-semibold text-cyber-mauve tracking-wider uppercase">Deep Dive Technique</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                Engineering <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-mauve via-purple-400 to-cyber-yellow">
                  Excellence.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
                Mon parcours académique, mon expérience sur le terrain, et mes réflexions approfondies
                sur l'architecture Cloud, le DevOps, et la fiabilité des systèmes à grande échelle.
              </p>
            </FadeIn>

            {/* Stats Row */}
            <FadeIn delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Articles', value: articles.length, icon: BookOpen, color: '#c4b5fd' },
                  { label: 'Ans d\'Exp', value: '+3', icon: Briefcase, color: '#fde68a' }, // Hardcoded for demo, could be dynamic
                  { label: 'Diplômes', value: education.length, icon: GraduationCap, color: '#86efac' },
                  { label: 'Domaines', value: categories.length, icon: Layers, color: '#fca5a5' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl relative overflow-hidden group" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: `radial-gradient(circle at center, ${stat.color}, transparent)` }} />
                    <div className="flex items-center gap-3 mb-2">
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
                2️⃣ NAVIGATION TABS
                ═══════════════════════════════════════════════════ */}
      <div className="sticky top-[73px] z-40" style={{ background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-padding py-0">
          <div className="container-max max-w-5xl flex items-center overflow-x-auto no-scrollbar">
            {[
              { id: 'experience', label: 'Expérience', icon: Briefcase },
              { id: 'education', label: 'Formation', icon: GraduationCap },
              { id: 'articles', label: 'Articles & Focus', icon: BookOpen },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap`}
                style={{ color: activeTab === tab.id ? '#fff' : '#888' }}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-cyber-mauve' : ''}`} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="engineer_active_tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-mauve"
                    style={{ boxShadow: '0 0 10px rgba(157,107,247,0.5)' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
                3️⃣ CONTENT SECTIONS (Animated Switch)
                ═══════════════════════════════════════════════════ */}
      <div className="section-padding pt-12">
        <div className="container-max max-w-5xl">
          <AnimatePresence mode="wait">
            {/* ── EXPERIENCE ── */}
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Parcours Professionnel</h2>
                  <p className="text-gray-400">Chronologie de mes rôles et responsabilités sur le terrain.</p>
                </div>

                {experiences.length === 0 ? (
                  <div className="p-8 rounded-2xl text-center border border-white/5 bg-white/[0.02]">
                    <p className="text-gray-500">Aucune expérience renseignée pour le moment.</p>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Glowing vertical line */}
                    <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-cyber-mauve/50 via-cyber-mauve/10 to-transparent" />

                    <StaggerContainer staggerDelay={0.15} className="space-y-8">
                      {experiences.map((exp) => (
                        <StaggerItem key={exp.id}>
                          <div className="relative pl-16 group">
                            {/* Node */}
                            <div className="absolute left-[-2px] sm:left-[11px] top-6 w-[26px] h-[26px] rounded-full bg-[#050505] border-[3px] border-cyber-mauve shadow-[0_0_15px_rgba(157,107,247,0.4)] flex items-center justify-center translate-x-[-50%] z-10 sm:translate-x-0" />

                            {/* Fix for mobile where absolute left is not ideal */}
                            <div className="absolute left-6 top-6 w-3 h-3 rounded-full bg-[#050505] border-2 border-cyber-mauve shadow-[0_0_12px_rgba(157,107,247,0.4)] z-10 transform -translate-x-1/2 group-hover:bg-cyber-mauve transition-colors duration-300" />

                            <div
                              className="rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:border-cyber-mauve/30"
                              style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.01)',
                              }}
                            >
                              <div className="absolute top-0 left-0 w-1 h-full bg-cyber-mauve/0 group-hover:bg-cyber-mauve/80 transition-all duration-300" />

                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                <div>
                                  <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                                  <div className="flex items-center gap-2 text-cyber-mauve font-semibold">
                                    <Briefcase className="w-4 h-4" />
                                    {exp.company}
                                    {exp.current && (
                                      <span className="ml-2 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border border-green-500/30 text-green-400 bg-green-500/10">
                                        Actuel
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-400 sm:text-right flex flex-row sm:flex-col gap-3 sm:gap-1">
                                  <div className="flex items-center gap-1.5 opacity-80">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(exp.start_date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} —{' '}
                                    {exp.current ? 'Présent' : new Date(exp.end_date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                                  </div>
                                  {exp.location && (
                                    <div className="flex items-center gap-1.5 opacity-80 sm:justify-end">
                                      <MapPin className="w-3.5 h-3.5" />
                                      {exp.location}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {exp.description && (
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">{exp.description}</p>
                              )}

                              {/* Responsibilities */}
                              {exp.responsibilities && exp.responsibilities.length > 0 && (
                                <div className="mb-4">
                                  <button
                                    onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
                                    className="inline-flex items-center gap-2 text-sm text-cyber-mauve hover:text-white transition-colors py-1 focus:outline-none"
                                  >
                                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-cyber-mauve/10 text-cyber-mauve">
                                      {expandedExp === exp.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </div>
                                    {expandedExp === exp.id ? 'Masquer les détails' : 'Voir les responsabilités clés'}
                                  </button>
                                  <AnimatePresence>
                                    {expandedExp === exp.id && (
                                      <motion.ul
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-3 space-y-2 text-sm text-gray-400 overflow-hidden"
                                      >
                                        {exp.responsibilities.map((r: string, i: number) => (
                                          <li key={i} className="flex items-start gap-2.5">
                                            <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-cyber-mauve/70 flex-shrink-0" />
                                            <span className="leading-relaxed">{r}</span>
                                          </li>
                                        ))}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )}

                              {/* Technologies */}
                              {exp.technologies && exp.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                                  {exp.technologies.map((t: string) => (
                                    <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-md" style={{ background: 'rgba(255,255,255,0.03)', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.08)' }}>
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── EDUCATION ── */}
            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Formation Académique</h2>
                  <p className="text-gray-400">Fondations théoriques et diplômes obtenus.</p>
                </div>

                {education.length === 0 ? (
                  <div className="p-8 rounded-2xl text-center border border-white/5 bg-white/[0.02]">
                    <p className="text-gray-500">Aucune formation renseignée pour le moment.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    <StaggerContainer staggerDelay={0.1}>
                      {education.map((edu) => (
                        <StaggerItem key={edu.id}>
                          <div
                            className="h-full rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                            style={{
                              background: 'linear-gradient(145deg, rgba(30,30,40,0.5) 0%, rgba(15,15,20,0.5) 100%)',
                              border: '1px solid rgba(255,255,255,0.05)',
                              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                            }}
                          >
                            {/* Glow effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at top right, #fde68a, transparent 70%)' }} />

                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.2)' }}>
                              <GraduationCap className="w-6 h-6 text-cyber-yellow" />
                            </div>

                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{edu.degree}</h3>
                              {edu.field && <p className="text-cyber-yellow font-medium text-sm mb-1">{edu.field}</p>}
                              <p className="text-gray-400 font-medium">{edu.institution}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(edu.start_date).getFullYear()} — {edu.end_date ? new Date(edu.end_date).getFullYear() : 'En cours'}
                              </div>
                              {edu.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5" /> {edu.location}
                                </div>
                              )}
                            </div>

                            {edu.description && (
                              <p className="text-gray-400 text-sm leading-relaxed mb-4">{edu.description}</p>
                            )}

                            {edu.gpa && (
                              <div className="mt-auto pt-4 border-t border-white/5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                  <span className="text-xs font-bold text-gray-300">GPA / Score:</span>
                                  <span className="text-xs font-bold text-cyber-yellow">{edu.gpa}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── ARTICLES ── */}
            {activeTab === 'articles' && (
              <motion.div
                key="articles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Focus Techniques</h2>
                    <p className="text-gray-400">Plongées en profondeur sur des sujets métiers précis.</p>
                  </div>
                </div>

                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map(([cat, arts]) => {
                      const meta = categoryMeta[cat] || { icon: Code, color: '#aaa', bgColor: 'bg-white/5', border: 'border-white/10', glow: 'none' };
                      const Icon = meta.icon;
                      return (
                        <div key={cat} className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ background: meta.bgColor, borderColor: meta.border }}>
                          <Icon className="w-4 h-4" style={{ color: meta.color }} />
                          <span className="text-sm font-medium text-white capitalize">{cat}</span>
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(0,0,0,0.3)', color: meta.color }}>
                            {arts.length}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {articles.length === 0 ? (
                  <div className="p-8 rounded-2xl text-center border border-white/5 bg-white/[0.02]">
                    <p className="text-gray-500">Aucun article publié pour le moment.</p>
                  </div>
                ) : (
                  <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-5">
                    {articles.map((article) => {
                      const meta = categoryMeta[article.category] || categoryMeta.architecture;
                      const CatIcon = meta.icon;
                      return (
                        <StaggerItem key={article.id}>
                          <Link to={`/engineering/${article.slug}`} className="block h-full outline-none">
                            <div
                              className="h-full rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                              style={{
                                background: 'rgba(20,20,30,0.4)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                              }}
                            >
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${meta.bgColor}, transparent 80%)` }} />

                              <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: meta.bgColor, color: meta.color, border: `1px solid ${meta.border}` }}>
                                    <CatIcon className="w-3.5 h-3.5" />
                                    <span className="capitalize">{article.category}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-cyber-text-muted">
                                    <Activity className="w-3.5 h-3.5" /> {article.read_time} min
                                  </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-mauve transition-colors line-clamp-2">
                                  {article.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
                                  {article.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                  {/* Tags */}
                                  <div className="flex flex-wrap gap-1.5 overflow-hidden h-6">
                                    {article.tags?.slice(0, 3).map((tag: string) => (
                                      <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-gray-400 border border-white/5 whitespace-nowrap">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
                4️⃣ RESOURCES SECTION
                ═══════════════════════════════════════════════════ */}
      <div className="section-padding pt-12">
        <div className="container-max max-w-5xl">
          <ScaleIn delay={0.2}>
            <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(30,20,50,0.4) 0%, rgba(10,10,20,0.8) 100%)', border: '1px solid rgba(157,107,247,0.2)' }}>
              <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(157,107,247,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(250,204,21,0.2) 0%, transparent 50%)' }} />

              <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
                <div className="max-w-xl text-center lg:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Boîte à Outils & Ressources</h2>
                  <p className="text-gray-400">Une collection maintenue de configurations, snippets et playbooks que j'utilise au quotidien pour accélérer mes déploiements.</p>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-cyber-mauve/50 transition-colors cursor-pointer group w-32">
                    <Code className="w-8 h-8 text-cyber-mauve group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-300">IaC</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-cyber-yellow/50 transition-colors cursor-pointer group w-32">
                    <BookOpen className="w-8 h-8 text-cyber-yellow group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-300">Runbooks</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-green-400/50 transition-colors cursor-pointer group w-32">
                    <Zap className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-300">Snippets</span>
                  </div>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </div>

    </div>
  );
}
