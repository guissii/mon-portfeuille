import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { ArrowLeft, Trophy, Calendar, Users, Code, ExternalLink, Github, Award, Zap, X, ChevronLeft, ChevronRight, Image, Server, Cloud, Cpu, Database, GitBranch, Monitor, Shield, Lightbulb, Target, Layers, Brain, Rocket, Globe, BarChart3, Flame, Building2, Smartphone, Terminal, Palette, Microscope, Link as LinkIcon } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/AnimatedSection';

// ── Icon map (admin-selectable) ─────────────────────────
const iconMap: Record<string, any> = {
    Trophy, Cloud, Server, Brain, Shield, Rocket, Globe, Zap, Lightbulb, Target,
    GitBranch, BarChart3, Flame, Building2, Smartphone, Terminal, Palette, Microscope, Monitor, Link: LinkIcon,
};

// ── Result config ───────────────────────────────────────
const resultConfig: Record<string, { label: string; emoji: string; color: string; bg: string; border: string; glow: string }> = {
    winner: { label: '1st Place', emoji: '🥇', color: '#facc15', bg: 'rgba(250, 204, 21, 0.12)', border: 'rgba(250, 204, 21, 0.3)', glow: '0 0 20px rgba(250, 204, 21, 0.2)' },
    top3: { label: 'Top 3', emoji: '🥉', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.12)', border: 'rgba(251, 146, 60, 0.3)', glow: '0 0 20px rgba(251, 146, 60, 0.2)' },
    finalist: { label: 'Finaliste', emoji: '🏆', color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.12)', border: 'rgba(167, 139, 250, 0.3)', glow: '0 0 20px rgba(167, 139, 250, 0.2)' },
    top5: { label: 'Top 5', emoji: '⭐', color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)', border: 'rgba(96, 165, 250, 0.3)', glow: '0 0 20px rgba(96, 165, 250, 0.2)' },
    participant: { label: 'Participant', emoji: '🎯', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.08)', border: 'rgba(148, 163, 184, 0.2)', glow: 'none' },
};

// ── Tech domain detection & colors ──────────────────────
function getTechDomain(tech: string): string {
    const t = tech.toLowerCase();
    if (['react', 'vue', 'angular', 'next', 'svelte', 'html', 'css', 'tailwind', 'typescript', 'javascript'].some(k => t.includes(k))) return 'frontend';
    if (['node', 'express', 'fastapi', 'django', 'flask', 'spring', 'python', 'go', 'rust'].some(k => t.includes(k))) return 'backend';
    if (['docker', 'kubernetes', 'k8s', 'terraform', 'ansible', 'jenkins', 'ci/cd', 'argocd', 'helm'].some(k => t.includes(k))) return 'devops';
    if (['aws', 'azure', 'gcp', 'cloud', 'lambda', 's3', 'ec2'].some(k => t.includes(k))) return 'cloud';
    if (['tensorflow', 'pytorch', 'openai', 'ml', 'ai', 'gpt', 'llm'].some(k => t.includes(k))) return 'ai';
    if (['postgres', 'mysql', 'mongodb', 'redis', 'sqlite', 'prisma', 'supabase'].some(k => t.includes(k))) return 'data';
    return 'other';
}

const techDomainColors: Record<string, { bg: string; text: string; border: string; icon: any }> = {
    frontend: { bg: 'rgba(96, 165, 250, 0.12)', text: '#93c5fd', border: 'rgba(96, 165, 250, 0.2)', icon: Monitor },
    backend: { bg: 'rgba(74, 222, 128, 0.12)', text: '#86efac', border: 'rgba(74, 222, 128, 0.2)', icon: Server },
    devops: { bg: 'rgba(250, 204, 21, 0.12)', text: '#fde68a', border: 'rgba(250, 204, 21, 0.2)', icon: GitBranch },
    cloud: { bg: 'rgba(157, 107, 247, 0.12)', text: '#c4b5fd', border: 'rgba(157, 107, 247, 0.2)', icon: Cloud },
    ai: { bg: 'rgba(248, 113, 113, 0.12)', text: '#fca5a5', border: 'rgba(248, 113, 113, 0.2)', icon: Cpu },
    data: { bg: 'rgba(45, 212, 191, 0.12)', text: '#5eead4', border: 'rgba(45, 212, 191, 0.2)', icon: Database },
    other: { bg: 'rgba(156, 163, 175, 0.10)', text: '#d1d5db', border: 'rgba(156, 163, 175, 0.15)', icon: Layers },
};

// ── Role icon mapping ───────────────────────────────────
function getRoleIcon(role: string) {
    const r = role.toLowerCase();
    if (['backend', 'api', 'server'].some(k => r.includes(k))) return Server;
    if (['frontend', 'ui', 'ux'].some(k => r.includes(k))) return Monitor;
    if (['cloud', 'infra', 'devops', 'deploy', 'sre'].some(k => r.includes(k))) return Cloud;
    if (['ml', 'ai', 'data', 'machine'].some(k => r.includes(k))) return Cpu;
    if (['security', 'sec'].some(k => r.includes(k))) return Shield;
    if (['lead', 'manager', 'pm'].some(k => r.includes(k))) return Target;
    return Code;
}

export function HackathonDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [hackathon, setHackathon] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                const list = await api.getHackathons({ status: 'published' });
                const found = list.find((h: any) => h.slug === slug);
                setHackathon(found || null);
            } catch { setHackathon(null); }
            setLoading(false);
        })();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center" style={{ background: '#0B0F1A' }}>
            <div className="w-8 h-8 border-2 border-cyber-mauve border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!hackathon) return (
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center" style={{ background: '#0B0F1A' }}>
            <h1 className="text-2xl font-bold text-white mb-4">Hackathon non trouvé</h1>
            <Link to="/hackathons" className="text-cyber-mauve hover:underline">Retour aux hackathons</Link>
        </div>
    );

    const result = resultConfig[hackathon.result] || resultConfig.participant;
    const images = hackathon.images || [];
    const techStack = hackathon.tech_stack || [];
    const learnings = hackathon.learnings || [];
    const showPosition = hackathon.show_position !== false;
    const RoleIcon = hackathon.role ? getRoleIcon(hackathon.role) : Code;

    // Group techs by domain
    const techByDomain = techStack.reduce((acc: Record<string, string[]>, tech: string) => {
        const domain = getTechDomain(tech);
        if (!acc[domain]) acc[domain] = [];
        acc[domain].push(tech);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <div className="min-h-screen pt-24 lg:pt-32 pb-20" style={{ background: '#0B0F1A' }}>
            <div className="section-padding">
                <div className="container-max max-w-4xl">

                    {/* Back link */}
                    <FadeIn>
                        <Link to="/hackathons" className="inline-flex items-center gap-2 text-gray-500 hover:text-cyber-mauve mb-8 transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Retour aux hackathons
                        </Link>
                    </FadeIn>

                    {/* ═══ 1. HERO SECTION ═══ */}
                    <FadeIn direction="up">
                        <div className="relative rounded-2xl overflow-hidden mb-8" style={{
                            background: 'linear-gradient(135deg, #121829, #1a1f35)',
                            border: `1px solid ${result.border}`,
                            boxShadow: result.glow,
                        }}>
                            {/* Gradient BG effect */}
                            <div className="absolute inset-0 opacity-30" style={{
                                background: `radial-gradient(ellipse at 30% 0%, ${result.color}20, transparent 60%)`,
                            }} />

                            <div className="relative p-8 lg:p-12">
                                <div className="flex items-start gap-6">
                                    {/* Dynamic event icon */}
                                    {(() => {
                                        const HeroIcon = iconMap[hackathon.icon || 'Trophy'] || Trophy;
                                        return (
                                            <motion.div
                                                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                                                style={{ background: result.bg, border: `1px solid ${result.border}` }}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                            >
                                                <HeroIcon className="w-8 h-8" style={{ color: result.color }} />
                                            </motion.div>
                                        );
                                    })()}

                                    <div className="flex-1">
                                        {/* Result badge */}
                                        {showPosition && (
                                            <span
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                                                style={{ background: result.bg, color: result.color, border: `1px solid ${result.border}` }}
                                            >
                                                {result.emoji} {result.label}
                                            </span>
                                        )}

                                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{hackathon.name}</h1>
                                        <p className="text-lg text-gray-400">{hackathon.organizer}</p>

                                        {/* Meta pills */}
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            {hackathon.event_date && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400"
                                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(hackathon.event_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                                </span>
                                            )}
                                            {hackathon.duration && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400"
                                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                    <Zap className="w-3.5 h-3.5" />
                                                    {hackathon.duration}
                                                </span>
                                            )}
                                            {hackathon.team_size && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400"
                                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                    <Users className="w-3.5 h-3.5" />
                                                    {hackathon.team_size} personnes
                                                </span>
                                            )}
                                            {hackathon.show_score && hackathon.score && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                                                    style={{ background: 'rgba(250, 204, 21, 0.1)', color: '#fde68a', border: '1px solid rgba(250, 204, 21, 0.2)' }}>
                                                    Score: {hackathon.score}/100
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* ═══ 2. PROJECT & MY ROLE ═══ */}
                    {(hackathon.project_name || hackathon.role) && (
                        <FadeIn delay={0.1}>
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                {/* Project card */}
                                {hackathon.project_name && (
                                    <div className="rounded-xl p-6" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Code className="w-4 h-4 text-cyber-mauve" />
                                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Projet</h2>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{hackathon.project_name}</h3>
                                        {hackathon.project_description && (
                                            <p className="text-gray-500 text-sm">{hackathon.project_description}</p>
                                        )}
                                    </div>
                                )}

                                {/* Role card */}
                                {hackathon.role && (
                                    <div className="rounded-xl p-6" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Target className="w-4 h-4 text-cyber-mauve" />
                                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Mon rôle</h2>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                style={{ background: 'rgba(157, 107, 247, 0.1)', border: '1px solid rgba(157, 107, 247, 0.2)' }}>
                                                <RoleIcon className="w-5 h-5 text-cyber-mauve" />
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">{hackathon.role}</p>
                                                {hackathon.team_members && hackathon.team_members.length > 0 && (
                                                    <p className="text-gray-600 text-xs">
                                                        Équipe: {hackathon.team_members.join(', ')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FadeIn>
                    )}

                    {/* ═══ 3. PROBLEM & SOLUTION ═══ */}
                    {(hackathon.problem || hackathon.solution) && (
                        <FadeIn delay={0.15}>
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                {hackathon.problem && (
                                    <motion.div
                                        className="rounded-xl p-6 transition-all duration-300"
                                        style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}
                                        whileHover={{ borderColor: 'rgba(248, 113, 113, 0.2)' }}
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ background: 'rgba(248, 113, 113, 0.12)', color: '#fca5a5' }}>!</div>
                                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Problématique</h2>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{hackathon.problem}</p>
                                    </motion.div>
                                )}
                                {hackathon.solution && (
                                    <motion.div
                                        className="rounded-xl p-6 transition-all duration-300"
                                        style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}
                                        whileHover={{ borderColor: 'rgba(74, 222, 128, 0.2)' }}
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ background: 'rgba(74, 222, 128, 0.12)', color: '#86efac' }}>✓</div>
                                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Solution</h2>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{hackathon.solution}</p>
                                    </motion.div>
                                )}
                            </div>
                        </FadeIn>
                    )}

                    {/* ═══ 4. IMPLEMENTATION / TECHNICAL ARCHITECTURE ═══ */}
                    {hackathon.implementation && (
                        <FadeIn delay={0.2}>
                            <div className="rounded-xl p-6 mb-8" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-2 mb-4">
                                    <Server className="w-4 h-4 text-cyber-mauve" />
                                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Architecture Technique</h2>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{hackathon.implementation}</p>
                            </div>
                        </FadeIn>
                    )}

                    {/* ═══ 5. TECH STACK (grouped by domain) ═══ */}
                    {techStack.length > 0 && (
                        <FadeIn delay={0.25}>
                            <div className="rounded-xl p-6 mb-8" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-2 mb-5">
                                    <Code className="w-4 h-4 text-cyber-mauve" />
                                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Stack Technique</h2>
                                    <span className="ml-auto text-[10px] text-gray-600">{techStack.length} technologies</span>
                                </div>
                                <StaggerContainer staggerDelay={0.05} className="space-y-4">
                                    {Object.entries(techByDomain).map(([domain, techs]: [string, any]) => {
                                        const config = techDomainColors[domain] || techDomainColors.other;
                                        const DomainIcon = config.icon;
                                        return (
                                            <StaggerItem key={domain}>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                                        style={{ background: config.bg, border: `1px solid ${config.border}` }}>
                                                        <DomainIcon className="w-3.5 h-3.5" style={{ color: config.text }} />
                                                    </div>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {techs.map((tech: string) => (
                                                            <motion.span
                                                                key={tech}
                                                                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                                                style={{ background: config.bg, color: config.text, border: `1px solid ${config.border}` }}
                                                                whileHover={{ scale: 1.05, boxShadow: `0 0 8px ${config.border}` }}
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </StaggerItem>
                                        );
                                    })}
                                </StaggerContainer>
                            </div>
                        </FadeIn>
                    )}

                    {/* ═══ 6. RESULT & SCORE (admin-controlled) ═══ */}
                    {showPosition && (
                        <FadeIn delay={0.3}>
                            <div className="rounded-xl p-6 mb-8 relative overflow-hidden" style={{
                                background: 'linear-gradient(135deg, #121829, #1a1f35)',
                                border: `1px solid ${result.border}`,
                            }}>
                                <div className="absolute inset-0 opacity-20" style={{
                                    background: `radial-gradient(circle at 80% 20%, ${result.color}15, transparent 60%)`,
                                }} />
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Trophy className="w-4 h-4" style={{ color: result.color }} />
                                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Résultat</h2>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-4xl">{result.emoji}</div>
                                        <div>
                                            <p className="text-2xl font-bold" style={{ color: result.color }}>{result.label}</p>
                                            {hackathon.show_score && hackathon.score && (
                                                <p className="text-gray-500 text-sm mt-1">Score: <span className="text-yellow-300 font-semibold">{hackathon.score}/100</span></p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {/* ═══ 7. LESSONS LEARNED ═══ */}
                    {learnings.length > 0 && (
                        <FadeIn delay={0.35}>
                            <div className="rounded-xl p-6 mb-8" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-2 mb-5">
                                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Leçons apprises</h2>
                                </div>
                                <StaggerContainer staggerDelay={0.08} className="space-y-3">
                                    {learnings.map((lesson: string, idx: number) => (
                                        <StaggerItem key={idx}>
                                            <motion.div
                                                className="flex items-start gap-3 rounded-lg p-3 transition-all duration-300"
                                                style={{ background: 'rgba(255,255,255,0.02)' }}
                                                whileHover={{ background: 'rgba(250, 204, 21, 0.04)', x: 4 }}
                                            >
                                                <span className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                                                    style={{ background: 'rgba(250, 204, 21, 0.12)', color: '#fde68a' }}>
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                <p className="text-gray-300 text-sm leading-relaxed">{lesson}</p>
                                            </motion.div>
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            </div>
                        </FadeIn>
                    )}

                    {/* ═══ 8. GALLERY ═══ */}
                    {images.length > 0 && (
                        <FadeIn delay={0.4}>
                            <div className="rounded-xl p-6 mb-8" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-2 mb-4">
                                    <Image className="w-4 h-4 text-cyber-mauve" />
                                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Screenshots</h2>
                                    <span className="ml-auto text-[10px] text-gray-600">{Math.min(images.length, 4)} images</span>
                                </div>
                                {/* Structured gallery: adaptive layout based on count */}
                                {(() => {
                                    const gallery = images.slice(0, 4);
                                    const count = gallery.length;
                                    if (count === 1) return (
                                        <motion.button onClick={() => setLightboxIndex(0)} className="w-full rounded-xl overflow-hidden group" style={{ border: '1px solid rgba(255,255,255,0.06)' }} whileHover={{ scale: 1.01 }}>
                                            <img src={getImageUrl(gallery[0]) || ''} alt="Screenshot" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                        </motion.button>
                                    );
                                    if (count === 2) return (
                                        <div className="grid grid-cols-2 gap-3">
                                            {gallery.map((img: string, idx: number) => (
                                                <motion.button key={idx} onClick={() => setLightboxIndex(idx)} className="rounded-xl overflow-hidden group" style={{ border: '1px solid rgba(255,255,255,0.06)' }} whileHover={{ scale: 1.02 }}>
                                                    <img src={getImageUrl(img) || ''} alt={`Screenshot ${idx + 1}`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    );
                                    if (count === 3) return (
                                        <div className="grid grid-cols-2 gap-3">
                                            <motion.button onClick={() => setLightboxIndex(0)} className="col-span-2 rounded-xl overflow-hidden group" style={{ border: '1px solid rgba(255,255,255,0.06)' }} whileHover={{ scale: 1.01 }}>
                                                <img src={getImageUrl(gallery[0]) || ''} alt="Screenshot 1" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                            </motion.button>
                                            {gallery.slice(1).map((img: string, idx: number) => (
                                                <motion.button key={idx + 1} onClick={() => setLightboxIndex(idx + 1)} className="rounded-xl overflow-hidden group" style={{ border: '1px solid rgba(255,255,255,0.06)' }} whileHover={{ scale: 1.02 }}>
                                                    <img src={getImageUrl(img) || ''} alt={`Screenshot ${idx + 2}`} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    );
                                    return (
                                        <div className="grid grid-cols-2 gap-3">
                                            {gallery.map((img: string, idx: number) => (
                                                <motion.button key={idx} onClick={() => setLightboxIndex(idx)} className="rounded-xl overflow-hidden group" style={{ border: '1px solid rgba(255,255,255,0.06)' }} whileHover={{ scale: 1.02 }}>
                                                    <img src={getImageUrl(img) || ''} alt={`Screenshot ${idx + 1}`} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    );
                                })()}
                            </div>
                        </FadeIn>
                    )}

                    {/* ═══ LINKS / CTAs ═══ */}
                    <FadeIn delay={0.45}>
                        <div className="flex flex-wrap gap-3">
                            {hackathon.demo_url && (
                                <a href={hackathon.demo_url} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                                    style={{ background: 'rgba(157, 107, 247, 0.2)', border: '1px solid rgba(157, 107, 247, 0.3)' }}>
                                    <ExternalLink className="w-4 h-4" /> Voir la démo
                                </a>
                            )}
                            {hackathon.repo_url && (
                                <a href={hackathon.repo_url} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <Github className="w-4 h-4" /> Code source
                                </a>
                            )}
                            {hackathon.certificate_url && (
                                <a href={hackathon.certificate_url} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <Award className="w-4 h-4" /> Certificat
                                </a>
                            )}
                            {hackathon.slides_url && (
                                <a href={hackathon.slides_url} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <Layers className="w-4 h-4" /> Slides
                                </a>
                            )}
                        </div>
                    </FadeIn>

                    {/* ═══ FOOTER — Back to all ═══ */}
                    <FadeIn delay={0.5}>
                        <div className="mt-12 pt-8 border-t border-white/5 text-center">
                            <Link to="/hackathons" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-all"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <ArrowLeft className="w-4 h-4" />
                                Tous les hackathons
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* ═══ LIGHTBOX ═══ */}
            {lightboxIndex !== null && images.length > 0 && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setLightboxIndex(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
                        <X className="w-6 h-6" />
                    </button>
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + images.length) % images.length); }}
                                className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % images.length); }}
                                className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}
                    <img
                        src={getImageUrl(images[lightboxIndex]) || ''}
                        alt={`Screenshot ${lightboxIndex + 1}`}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="absolute bottom-4 text-white/60 text-sm">
                        {lightboxIndex + 1} / {images.length}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
