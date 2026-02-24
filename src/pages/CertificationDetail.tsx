import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import {
    ArrowLeft, Award, Calendar, ExternalLink, CheckCircle, Shield,
    Download, Clock, Fingerprint, Globe, Sparkles, BookOpen,
    Cloud, Server, Lock, Network, Cpu, Layers, Image, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/motion/AnimatedSection';

// ── Color system for skill domains ──────────────────────
const domainColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    networking: { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)', text: '#60a5fa', glow: 'rgba(59, 130, 246, 0.4)' },
    cloud: { bg: 'rgba(157, 107, 247, 0.15)', border: 'rgba(157, 107, 247, 0.3)', text: '#c4b5fd', glow: 'rgba(157, 107, 247, 0.4)' },
    devops: { bg: 'rgba(250, 204, 21, 0.15)', border: 'rgba(250, 204, 21, 0.3)', text: '#fde68a', glow: 'rgba(250, 204, 21, 0.4)' },
    security: { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)', text: '#fca5a5', glow: 'rgba(239, 68, 68, 0.4)' },
    ai: { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)', text: '#86efac', glow: 'rgba(34, 197, 94, 0.4)' },
    default: { bg: 'rgba(157, 107, 247, 0.15)', border: 'rgba(157, 107, 247, 0.3)', text: '#c4b5fd', glow: 'rgba(157, 107, 247, 0.4)' },
};

// ── Skill domain detection ──────────────────────────────
function getSkillDomain(skill: string): string {
    const s = skill.toLowerCase();
    if (['tcp', 'ip', 'dns', 'routing', 'bgp', 'ospf', 'vlan', 'subnet', 'network', 'réseau', 'http', 'ssh', 'ssl', 'tls', 'firewall', 'vpn', 'load balancer', 'cdn'].some(k => s.includes(k))) return 'networking';
    if (['aws', 'azure', 'gcp', 'cloud', 'ec2', 's3', 'lambda', 'vpc', 'iam', 'rds', 'route53', 'cloudfront', 'terraform', 'iaas', 'paas', 'saas'].some(k => s.includes(k))) return 'cloud';
    if (['docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'ansible', 'gitlab', 'devops', 'helm', 'prometheus', 'grafana', 'monitoring', 'observability', 'pipeline'].some(k => s.includes(k))) return 'devops';
    if (['security', 'sécurité', 'encryption', 'auth', 'owasp', 'pentest', 'vulnerability', 'compliance', 'iso', 'soc', 'zero trust', 'resilience'].some(k => s.includes(k))) return 'security';
    if (['ai', 'ml', 'machine learning', 'deep learning', 'nlp', 'tensorflow', 'pytorch', 'model', 'llm', 'data'].some(k => s.includes(k))) return 'ai';
    return 'default';
}

// ── Domain icon mapping ─────────────────────────────────
function getDomainIcon(domain: string) {
    switch (domain) {
        case 'networking': return Network;
        case 'cloud': return Cloud;
        case 'devops': return Server;
        case 'security': return Lock;
        case 'ai': return Cpu;
        default: return Layers;
    }
}

// ── Level configuration ─────────────────────────────────
const levelConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
    beginner: { label: 'Débutant', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.15)', border: 'rgba(74, 222, 128, 0.3)' },
    intermediate: { label: 'Intermédiaire', color: '#facc15', bg: 'rgba(250, 204, 21, 0.15)', border: 'rgba(250, 204, 21, 0.3)' },
    advanced: { label: 'Avancé', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.3)' },
    expert: { label: 'Expert', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)' },
};

// ── Validity timeline component ─────────────────────────
function ValidityTimeline({ issueDate, expiryDate }: { issueDate: string; expiryDate?: string }) {
    const now = new Date();
    const issue = new Date(issueDate);
    const expiry = expiryDate ? new Date(expiryDate) : null;

    let progress = 100;
    let status = 'permanent';
    let statusLabel = 'Permanente';
    let statusColor = '#4ade80';

    if (expiry) {
        const total = expiry.getTime() - issue.getTime();
        const elapsed = now.getTime() - issue.getTime();
        progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);

        if (now > expiry) {
            status = 'expired';
            statusLabel = 'Expirée';
            statusColor = '#ef4444';
        } else if (progress > 80) {
            status = 'expiring';
            statusLabel = 'Expire bientôt';
            statusColor = '#f97316';
        } else {
            status = 'active';
            statusLabel = 'Active';
            statusColor = '#4ade80';
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Validité</span>
                <span className="flex items-center gap-2 font-medium" style={{ color: statusColor }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: statusColor }} />
                    {statusLabel}
                </span>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${statusColor}, ${statusColor}80)` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
                <span>{issue.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</span>
                <span>{expiry ? expiry.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) : '∞ Permanente'}</span>
            </div>
        </div>
    );
}

// ── Skill Chip with hover popup ─────────────────────────
function SkillChip({ skill }: { skill: string }) {
    const [hovered, setHovered] = useState(false);
    const domain = getSkillDomain(skill);
    const colors = domainColors[domain];
    const DomainIcon = getDomainIcon(domain);

    return (
        <motion.div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
        >
            <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-default transition-all duration-300"
                style={{
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    boxShadow: hovered ? `0 0 20px ${colors.glow}` : 'none',
                }}
            >
                <DomainIcon className="w-3.5 h-3.5" />
                {skill}
            </div>

            {/* Domain tooltip */}
            {hovered && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap z-20"
                    style={{
                        background: 'rgba(17, 17, 26, 0.95)',
                        border: `1px solid ${colors.border}`,
                        backdropFilter: 'blur(8px)',
                        color: colors.text,
                    }}
                >
                    {domain === 'networking' && '🌐 Networking'}
                    {domain === 'cloud' && '☁️ Cloud'}
                    {domain === 'devops' && '⚙️ DevOps'}
                    {domain === 'security' && '🔒 Security'}
                    {domain === 'ai' && '🤖 AI / ML'}
                    {domain === 'default' && '💡 Compétence'}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 rotate-45" style={{ background: 'rgba(17, 17, 26, 0.95)', borderRight: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }} />
                </motion.div>
            )}
        </motion.div>
    );
}

// ── Main Component ──────────────────────────────────────
export function CertificationDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [cert, setCert] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                const certs = await api.getCertifications({ status: 'published' });
                const found = certs.find((c: any) => c.slug === slug);
                setCert(found || null);
            } catch { setCert(null); }
            setLoading(false);
        })();
    }, [slug]);

    // ── Loading shimmer ───────────────────────────────────
    if (loading) return (
        <div className="min-h-screen pt-24">
            <div className="section-padding">
                <div className="container-max max-w-5xl space-y-6">
                    {/* Hero shimmer */}
                    <div className="h-80 rounded-2xl animate-pulse" style={{ background: 'linear-gradient(135deg, #1a1a2e, #121829)' }}>
                        <div className="h-full flex items-center justify-center">
                            <div className="space-y-4 text-center">
                                <div className="w-20 h-20 rounded-xl mx-auto" style={{ background: 'rgba(157, 107, 247, 0.1)' }} />
                                <div className="w-64 h-6 rounded mx-auto" style={{ background: 'rgba(255,255,255,0.05)' }} />
                                <div className="w-40 h-4 rounded mx-auto" style={{ background: 'rgba(255,255,255,0.03)' }} />
                            </div>
                        </div>
                    </div>
                    {/* Cards shimmer */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="h-48 rounded-xl animate-pulse" style={{ background: '#1a1a2e' }} />
                        <div className="h-48 rounded-xl animate-pulse" style={{ background: '#1a1a2e', animationDelay: '0.1s' }} />
                    </div>
                    <div className="h-32 rounded-xl animate-pulse" style={{ background: '#1a1a2e', animationDelay: '0.2s' }} />
                </div>
            </div>
        </div>
    );

    // ── Not found ─────────────────────────────────────────
    if (!cert) return (
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(157, 107, 247, 0.1)' }}>
                <Award className="w-10 h-10 text-cyber-mauve" />
            </div>
            <h1 className="text-2xl font-bold text-cyber-text">Certification non trouvée</h1>
            <Link to="/certifications" className="text-cyber-mauve hover:underline inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Retour aux certifications
            </Link>
        </div>
    );

    const level = levelConfig[cert.level] || levelConfig.intermediate;
    const skills: string[] = cert.skills || [];

    // Parse description into sections if contains line breaks
    const descriptionParagraphs = (cert.description || '').split('\n').filter((p: string) => p.trim());

    return (
        <div className="min-h-screen pb-20" style={{ background: '#0B0F1A' }}>

            {/* ═══════════════════════════════════════════════════
          1️⃣ HERO SECTION — Impact immédiat
          ═══════════════════════════════════════════════════ */}
            <section className="relative pt-24 lg:pt-32 pb-16 overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0B0F1A 0%, #1a1040 40%, #0B0F1A 100%)' }} />
                    <motion.div
                        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
                        style={{ background: 'rgba(157, 107, 247, 0.08)' }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl"
                        style={{ background: 'rgba(250, 204, 21, 0.04)' }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <div className="relative section-padding">
                    <div className="container-max max-w-5xl">
                        {/* Back button */}
                        <FadeIn delay={0}>
                            <Link to="/certifications" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyber-mauve mb-10 transition-colors text-sm group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour aux certifications
                            </Link>
                        </FadeIn>

                        {/* Hero card with glassmorphism */}
                        <FadeIn delay={0.1}>
                            <div
                                className="relative rounded-2xl p-8 lg:p-12 overflow-hidden"
                                style={{
                                    background: 'rgba(18, 24, 41, 0.6)',
                                    backdropFilter: 'blur(20px) saturate(180%)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                                }}
                            >
                                {/* Subtle glow border */}
                                <div className="absolute inset-0 rounded-2xl opacity-40" style={{ background: 'linear-gradient(135deg, rgba(157, 107, 247, 0.1), transparent 50%, rgba(250, 204, 21, 0.05))' }} />

                                <div className="relative flex flex-col md:flex-row items-start gap-8">
                                    {/* Badge/Logo */}
                                    <motion.div
                                        className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                                        style={{
                                            background: 'rgba(157, 107, 247, 0.08)',
                                            border: '1px solid rgba(157, 107, 247, 0.2)',
                                            boxShadow: '0 0 30px rgba(157, 107, 247, 0.1)',
                                        }}
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(157, 107, 247, 0.2)' }}
                                    >
                                        {getImageUrl(cert.image_url) ? (
                                            <img src={getImageUrl(cert.image_url)!} alt={cert.name} className="w-24 h-24 lg:w-32 lg:h-32 object-contain" />
                                        ) : (
                                            <Award className="w-14 h-14 text-cyber-mauve" />
                                        )}
                                        {/* Shimmer overlay */}
                                        <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)', backgroundSize: '200% 100%', animation: 'shimmer 3s infinite' }} />
                                    </motion.div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            {/* Level badge */}
                                            <span
                                                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                                                style={{ background: level.bg, color: level.color, border: `1px solid ${level.border}` }}
                                            >
                                                {level.label}
                                            </span>

                                            {/* Verification status */}
                                            {cert.verify_url && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                                                    <CheckCircle className="w-3.5 h-3.5" /> Vérifiée
                                                </span>
                                            )}
                                        </div>

                                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 leading-tight">
                                            {cert.name}
                                        </h1>

                                        <p className="text-lg lg:text-xl text-gray-300 mb-6">{cert.issuer}</p>

                                        {/* Date pills */}
                                        <div className="flex flex-wrap gap-4 text-sm mb-8">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                <Calendar className="w-4 h-4 text-cyber-mauve" />
                                                <span className="text-gray-300">
                                                    {new Date(cert.issue_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                            {cert.expiry_date && (
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                    <Clock className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-gray-300">
                                                        Expire le {new Date(cert.expiry_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* CTA Buttons */}
                                        <div className="flex flex-wrap gap-3">
                                            {cert.verify_url && (
                                                <motion.a
                                                    href={cert.verify_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all"
                                                    style={{ background: 'linear-gradient(135deg, #7C3AED, #9d6bf7)', boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' }}
                                                    whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)' }}
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    <ExternalLink className="w-4 h-4" /> Vérifier la certification
                                                </motion.a>
                                            )}
                                            {cert.badge_url && (
                                                <motion.a
                                                    href={getImageUrl(cert.badge_url) || cert.badge_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white text-sm border transition-all"
                                                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}
                                                    whileHover={{ scale: 1.03, borderColor: 'rgba(157, 107, 247, 0.4)' }}
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    <Download className="w-4 h-4" /> Voir le badge
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
          2️⃣ CERTIFICATE OVERVIEW CARD + Validity Timeline
          ═══════════════════════════════════════════════════ */}
            <section className="section-padding -mt-4">
                <div className="container-max max-w-5xl">
                    <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-6">
                        {/* Overview Card */}
                        <StaggerItem>
                            <div className="h-full rounded-xl p-6" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-5">Détails du certificat</h3>
                                <div className="space-y-4">
                                    {/* Organisme */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(157, 107, 247, 0.1)' }}>
                                            {getImageUrl(cert.image_url) ? (
                                                <img src={getImageUrl(cert.image_url)!} alt="" className="w-7 h-7 object-contain rounded" />
                                            ) : (
                                                <Globe className="w-5 h-5 text-cyber-mauve" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Organisme</p>
                                            <p className="text-white font-medium text-sm">{cert.issuer}</p>
                                        </div>
                                    </div>

                                    {/* Niveau */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: level.bg }}>
                                            <Sparkles className="w-5 h-5" style={{ color: level.color }} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Niveau</p>
                                            <p className="font-medium text-sm" style={{ color: level.color }}>{level.label}</p>
                                        </div>
                                    </div>

                                    {/* Credential ID */}
                                    {cert.credential_id && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(250, 204, 21, 0.1)' }}>
                                                <Fingerprint className="w-5 h-5 text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Credential ID</p>
                                                <p className="text-white font-mono text-xs">{cert.credential_id}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </StaggerItem>

                        {/* Validity Timeline Card */}
                        <StaggerItem>
                            <div className="h-full rounded-xl p-6" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-5">Validité</h3>
                                <ValidityTimeline issueDate={cert.issue_date} expiryDate={cert.expiry_date} />

                                {/* Quick date details */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Obtenue</span>
                                        <span className="text-white">{new Date(cert.issue_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    {cert.expiry_date && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Expiration</span>
                                            <span className="text-white">{new Date(cert.expiry_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
          3️⃣ SKILLS & TECHNOLOGIES — Dynamic Chips
          ═══════════════════════════════════════════════════ */}
            {skills.length > 0 && (
                <section className="section-padding py-12">
                    <div className="container-max max-w-5xl">
                        <FadeIn>
                            <div className="rounded-xl p-8" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(157, 107, 247, 0.1)' }}>
                                        <Cpu className="w-5 h-5 text-cyber-mauve" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Compétences & Technologies</h2>
                                        <p className="text-gray-500 text-sm">{skills.length} compétences validées par cette certification</p>
                                    </div>
                                </div>

                                {/* Skill chips grid */}
                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill: string, i: number) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                                        >
                                            <SkillChip skill={skill} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Domain legend */}
                                <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-white/5">
                                    {[
                                        { domain: 'networking', label: '🌐 Networking', color: '#60a5fa' },
                                        { domain: 'cloud', label: '☁️ Cloud', color: '#c4b5fd' },
                                        { domain: 'devops', label: '⚙️ DevOps', color: '#fde68a' },
                                        { domain: 'security', label: '🔒 Security', color: '#fca5a5' },
                                        { domain: 'ai', label: '🤖 AI/ML', color: '#86efac' },
                                    ].map(d => (
                                        <span key={d.domain} className="text-xs flex items-center gap-1.5" style={{ color: d.color }}>
                                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                                            {d.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════
          4️⃣ ENGINEERING DEPTH — What I Learned
          ═══════════════════════════════════════════════════ */}
            {descriptionParagraphs.length > 0 && (
                <section className="section-padding py-12">
                    <div className="container-max max-w-5xl">
                        <FadeIn>
                            <div className="rounded-xl p-8" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(250, 204, 21, 0.1)' }}>
                                        <BookOpen className="w-5 h-5 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Fondations Techniques</h2>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-6 ml-[52px]">Ce que cette certification m'a apporté en profondeur</p>

                                <div className="space-y-3">
                                    {descriptionParagraphs.map((paragraph: string, i: number) => {
                                        // Contextual icons based on content
                                        const icons = [
                                            { icon: '🎯', gradient: 'linear-gradient(135deg, rgba(250,204,21,0.15), rgba(250,204,21,0.05))' },
                                            { icon: '⚙️', gradient: 'linear-gradient(135deg, rgba(157,107,247,0.15), rgba(157,107,247,0.05))' },
                                            { icon: '🔍', gradient: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(96,165,250,0.05))' },
                                            { icon: '🚀', gradient: 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))' },
                                            { icon: '💡', gradient: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(251,146,60,0.05))' },
                                            { icon: '🛡️', gradient: 'linear-gradient(135deg, rgba(248,113,113,0.15), rgba(248,113,113,0.05))' },
                                        ];
                                        const ic = icons[i % icons.length];
                                        return (
                                            <motion.div
                                                key={i}
                                                className="flex gap-4 p-4 rounded-xl transition-all cursor-default"
                                                style={{
                                                    background: ic.gradient,
                                                    border: '1px solid rgba(255,255,255,0.04)',
                                                }}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + i * 0.1 }}
                                                whileHover={{
                                                    borderColor: 'rgba(157, 107, 247, 0.2)',
                                                    x: 4,
                                                }}
                                            >
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                                                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                    {ic.icon}
                                                </div>
                                                <div className="flex-1 pt-1.5">
                                                    <p className="text-gray-300 text-sm leading-relaxed">{paragraph}</p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════
          5️⃣ REAL WORLD APPLICATION — Cloud Perspective
          ═══════════════════════════════════════════════════ */}
            {skills.length > 0 && (
                <section className="section-padding py-12">
                    <div className="container-max max-w-5xl">
                        <FadeIn>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Application <span className="text-cyber-mauve">Cloud Engineering</span>
                                </h2>
                                <p className="text-gray-400 text-sm">Comment cette certification renforce mon parcours d'ingénieur Cloud</p>
                            </div>
                        </FadeIn>

                        <StaggerContainer staggerDelay={0.12} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {/* Generate application cards based on skill domains */}
                            {(() => {
                                const domains = [...new Set(skills.map(getSkillDomain))];
                                const applicationCards = domains.slice(0, 3).map(domain => {
                                    const DomainIcon = getDomainIcon(domain);
                                    const colors = domainColors[domain];
                                    const domainSkills = skills.filter(s => getSkillDomain(s) === domain);

                                    const titles: Record<string, string> = {
                                        networking: 'Fondations Réseau',
                                        cloud: 'Architecture Cloud',
                                        devops: 'Fiabilité DevOps',
                                        security: 'Sécurité & Conformité',
                                        ai: 'Intelligence Artificielle',
                                        default: 'Compétences Techniques',
                                    };

                                    const descriptions: Record<string, string> = {
                                        networking: 'Fondations essentielles pour le design VPC, la connectivité hybrid cloud et le troubleshooting réseau.',
                                        cloud: 'Design d\'architectures cloud scalables, résilientes et cost-optimized sur les principaux providers.',
                                        devops: 'Automatisation, CI/CD, monitoring et observabilité pour des déploiements fiables et rapides.',
                                        security: 'Sécurisation end-to-end, compliance et gouvernance pour des environnements cloud enterprise.',
                                        ai: 'Déploiement et opérations de modèles ML en production avec MLOps et infrastructure GPU.',
                                        default: 'Compétences techniques contribuant à l\'excellence opérationnelle.',
                                    };

                                    return { domain, DomainIcon, colors, domainSkills, title: titles[domain], description: descriptions[domain] };
                                });

                                return applicationCards.map(({ domain, DomainIcon, colors, domainSkills, title, description }) => (
                                    <StaggerItem key={domain}>
                                        <motion.div
                                            className="h-full rounded-xl p-6 relative overflow-hidden group"
                                            style={{ background: '#121829', border: `1px solid ${colors.border}` }}
                                            whileHover={{ y: -4, boxShadow: `0 8px 30px ${colors.glow}` }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Corner glow */}
                                            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at top right, ${colors.glow}, transparent 70%)` }} />

                                            <div className="relative">
                                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                                                    <DomainIcon className="w-6 h-6" style={{ color: colors.text }} />
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                                                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>

                                                {/* Related skills */}
                                                <div className="flex flex-wrap gap-1.5">
                                                    {domainSkills.slice(0, 4).map(s => (
                                                        <span key={s} className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: colors.bg, color: colors.text }}>
                                                            {s}
                                                        </span>
                                                    ))}
                                                    {domainSkills.length > 4 && (
                                                        <span className="px-2 py-0.5 rounded text-[10px] text-gray-500">+{domainSkills.length - 4}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </StaggerItem>
                                ));
                            })()}
                        </StaggerContainer>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════
          5.5️⃣ GALLERY / SCREENSHOTS
          ═══════════════════════════════════════════════════ */}
            {cert.gallery && cert.gallery.length > 0 && (
                <section className="section-padding py-12" style={{ background: '#0B0F1A' }}>
                    <div className="container-max max-w-5xl">
                        <FadeIn delay={0.4}>
                            <div className="rounded-xl p-6 mb-8" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-2 mb-4">
                                    <Image className="w-4 h-4 text-cyber-mauve" />
                                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Screenshots / Preuves</h2>
                                    <span className="ml-auto text-[10px] text-gray-600">{Math.min(cert.gallery.length, 4)} images</span>
                                </div>
                                {/* Structured gallery: adaptive layout based on count */}
                                {(() => {
                                    const gallery = cert.gallery.slice(0, 4);
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
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════
          6️⃣ VERIFICATION & METADATA — Footer
          ═══════════════════════════════════════════════════ */}
            <section className="section-padding py-12">
                <div className="container-max max-w-5xl">
                    <ScaleIn>
                        <div className="rounded-xl p-8 relative overflow-hidden" style={{ background: '#121829', border: '1px solid rgba(255,255,255,0.06)' }}>
                            {/* Subtle gradient accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(157, 107, 247, 0.3), rgba(250, 204, 21, 0.2), transparent)' }} />

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(74, 222, 128, 0.1)' }}>
                                    <Shield className="w-5 h-5 text-green-400" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Vérification & Métadonnées</h2>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {cert.credential_id && (
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Credential ID</p>
                                        <p className="text-white font-mono text-sm break-all">{cert.credential_id}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date d'obtention</p>
                                    <p className="text-white text-sm">{new Date(cert.issue_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                                {cert.expiry_date && (
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date d'expiration</p>
                                        <p className="text-white text-sm">{new Date(cert.expiry_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                )}
                                {cert.verify_url && (
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Vérification</p>
                                        <a href={cert.verify_url} target="_blank" rel="noopener noreferrer" className="text-cyber-mauve text-sm hover:underline inline-flex items-center gap-1">
                                            <ExternalLink className="w-3 h-3" /> Vérifier en ligne
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Back to all certifications */}
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    <Link
                                        to="/certifications"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Toutes les certifications
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </ScaleIn>
                </div>
            </section>

            {/* ═══ LIGHTBOX ═══ */}
            {
                lightboxIndex !== null && cert.gallery && cert.gallery.length > 0 && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setLightboxIndex(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[60]">
                            <X className="w-6 h-6" />
                        </button>
                        {cert.gallery.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + cert.gallery!.length) % cert.gallery!.length); }}
                                    className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[60]"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % cert.gallery!.length); }}
                                    className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[60]"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                        <img
                            src={getImageUrl(cert.gallery[lightboxIndex]) || ''}
                            alt={`Screenshot ${lightboxIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg relative z-50"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute bottom-4 text-white/60 text-sm z-50">
                            {lightboxIndex + 1} / {cert.gallery.length}
                        </div>
                    </motion.div>
                )
            }
        </div >
    );
}
