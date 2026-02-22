import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { ArrowLeft, Trophy, Calendar, Users, Code, ExternalLink, Github, Award, Zap, X, ChevronLeft, ChevronRight, Image } from 'lucide-react';

const resultLabels: Record<string, { label: string; color: string }> = {
    winner: { label: 'Gagnant', color: '#facc15' },
    finalist: { label: 'Finaliste', color: '#a78bfa' },
    top3: { label: 'Top 3', color: '#fb923c' },
    top5: { label: 'Top 5', color: '#60a5fa' },
    participant: { label: 'Participant', color: '#94a3b8' },
};

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
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyber-mauve border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!hackathon) return (
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-cyber-text mb-4">Hackathon non trouve</h1>
            <Link to="/hackathons" className="text-cyber-mauve hover:underline">Retour aux hackathons</Link>
        </div>
    );

    const result = resultLabels[hackathon.result] || { label: hackathon.result, color: '#94a3b8' };
    const images = hackathon.images || [];

    return (
        <div className="min-h-screen pt-24 lg:pt-32 pb-20">
            <div className="section-padding">
                <div className="container-max max-w-4xl">
                    <Link to="/hackathons" className="inline-flex items-center gap-2 text-cyber-text-muted hover:text-cyber-mauve mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Retour aux hackathons
                    </Link>

                    {/* Header */}
                    <div className="cyber-card p-8 lg:p-12 mb-8">
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${result.color}20`, border: `1px solid ${result.color}40` }}>
                                <Trophy className="w-8 h-8" style={{ color: result.color }} />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${result.color}20`, color: result.color, border: `1px solid ${result.color}40` }}>
                                        {result.label}
                                    </span>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-cyber-text mb-2">{hackathon.name}</h1>
                                <p className="text-lg text-cyber-text-muted">{hackathon.organizer}</p>

                                <div className="flex flex-wrap gap-6 mt-4 text-sm text-cyber-text-muted">
                                    {hackathon.event_date && (
                                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{new Date(hackathon.event_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</div>
                                    )}
                                    {hackathon.duration && <div className="flex items-center gap-2"><Zap className="w-4 h-4" />{hackathon.duration}</div>}
                                    {hackathon.team_size && <div className="flex items-center gap-2"><Users className="w-4 h-4" />{hackathon.team_size} personnes</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Name & Role */}
                    {(hackathon.project_name || hackathon.role) && (
                        <div className="cyber-card p-6 mb-8">
                            <h2 className="text-lg font-semibold text-cyber-text mb-3 flex items-center gap-2"><Code className="w-5 h-5 text-cyber-mauve" /> Projet</h2>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                {hackathon.project_name && <div><span className="text-cyber-text-muted">Nom du projet:</span> <span className="text-cyber-text font-medium ml-2">{hackathon.project_name}</span></div>}
                                {hackathon.role && <div><span className="text-cyber-text-muted">Role:</span> <span className="text-cyber-text font-medium ml-2">{hackathon.role}</span></div>}
                            </div>
                        </div>
                    )}

                    {/* Description sections */}
                    {hackathon.project_description && (
                        <div className="cyber-card p-6 mb-8">
                            <h2 className="text-lg font-semibold text-cyber-text mb-3">Description du projet</h2>
                            <p className="text-cyber-text-muted whitespace-pre-wrap">{hackathon.project_description}</p>
                        </div>
                    )}

                    {(hackathon.problem || hackathon.solution || hackathon.implementation) && (
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {hackathon.problem && (
                                <div className="cyber-card p-6">
                                    <h3 className="text-lg font-semibold text-cyber-text mb-3">Problématique</h3>
                                    <p className="text-cyber-text-muted text-sm">{hackathon.problem}</p>
                                </div>
                            )}
                            {hackathon.solution && (
                                <div className="cyber-card p-6">
                                    <h3 className="text-lg font-semibold text-cyber-text mb-3">Solution</h3>
                                    <p className="text-cyber-text-muted text-sm">{hackathon.solution}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {hackathon.implementation && (
                        <div className="cyber-card p-6 mb-8">
                            <h3 className="text-lg font-semibold text-cyber-text mb-3">Implementation</h3>
                            <p className="text-cyber-text-muted text-sm whitespace-pre-wrap">{hackathon.implementation}</p>
                        </div>
                    )}

                    {/* Tech Stack */}
                    {hackathon.tech_stack && hackathon.tech_stack.length > 0 && (
                        <div className="cyber-card p-6 mb-8">
                            <h2 className="text-lg font-semibold text-cyber-text mb-3">Technologies</h2>
                            <div className="flex flex-wrap gap-2">
                                {hackathon.tech_stack.map((t: string) => (
                                    <span key={t} className="cyber-tag text-xs">{t}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Screenshots Gallery */}
                    {images.length > 0 && (
                        <div className="cyber-card p-6 mb-8">
                            <h2 className="text-lg font-semibold text-cyber-text mb-4 flex items-center gap-2">
                                <Image className="w-5 h-5 text-cyber-mauve" /> Screenshots
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {images.map((img: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setLightboxIndex(idx)}
                                        className="rounded-xl overflow-hidden border border-white/5 hover:border-cyber-mauve/40 transition-all group cursor-pointer"
                                    >
                                        <img
                                            src={img}
                                            alt={`Screenshot ${idx + 1}`}
                                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links */}
                    <div className="flex flex-wrap gap-4">
                        {hackathon.demo_url && (
                            <a href={hackathon.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" /> Demo
                            </a>
                        )}
                        {hackathon.repo_url && (
                            <a href={hackathon.repo_url} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
                                <Github className="w-4 h-4" /> Code source
                            </a>
                        )}
                        {hackathon.certificate_url && (
                            <a href={hackathon.certificate_url} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
                                <Award className="w-4 h-4" /> Certificat
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && images.length > 0 && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightboxIndex(null)}>
                    <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
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
                        src={images[lightboxIndex]}
                        alt={`Screenshot ${lightboxIndex + 1}`}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="absolute bottom-4 text-white/60 text-sm">
                        {lightboxIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
}
