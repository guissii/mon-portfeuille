import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { ArrowLeft, Award, Calendar, ExternalLink, CheckCircle, Shield } from 'lucide-react';

export function CertificationDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [cert, setCert] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyber-mauve border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!cert) return (
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-cyber-text mb-4">Certification non trouvee</h1>
            <Link to="/certifications" className="text-cyber-mauve hover:underline">Retour aux certifications</Link>
        </div>
    );

    const levelLabel: Record<string, string> = { beginner: 'Debutant', intermediate: 'Intermediaire', advanced: 'Avance', expert: 'Expert' };

    return (
        <div className="min-h-screen pt-24 lg:pt-32 pb-20">
            <div className="section-padding">
                <div className="container-max max-w-4xl">
                    {/* Back */}
                    <Link to="/certifications" className="inline-flex items-center gap-2 text-cyber-text-muted hover:text-cyber-mauve mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Retour aux certifications
                    </Link>

                    {/* Header */}
                    <div className="cyber-card p-8 lg:p-12 mb-8">
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            {/* Badge/Image */}
                            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(157, 107, 247, 0.1)', border: '1px solid rgba(157, 107, 247, 0.2)' }}>
                                {cert.image_url ? (
                                    <img src={cert.image_url} alt={cert.name} className="w-20 h-20 lg:w-28 lg:h-28 object-contain rounded-lg" />
                                ) : (
                                    <Award className="w-12 h-12 text-cyber-mauve" />
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(157, 107, 247, 0.2)', color: '#c4b5fd' }}>
                                        {levelLabel[cert.level] || cert.level}
                                    </span>
                                    {cert.verify_url && (
                                        <a href={cert.verify_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-green-400">
                                            <CheckCircle className="w-3 h-3" /> Verifiee
                                        </a>
                                    )}
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-cyber-text mb-2">{cert.name}</h1>
                                <p className="text-xl text-cyber-text-muted mb-4">{cert.issuer}</p>

                                {/* Dates */}
                                <div className="flex flex-wrap gap-6 text-sm text-cyber-text-muted">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Obtenue le {new Date(cert.issue_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    {cert.expiry_date && (
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            <span>Expire le {new Date(cert.expiry_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    )}
                                </div>

                                {cert.credential_id && (
                                    <p className="text-sm text-cyber-text-muted mt-3">Credential ID: <span className="text-cyber-text font-mono">{cert.credential_id}</span></p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {cert.description && (
                        <div className="cyber-card p-8 mb-8">
                            <h2 className="text-xl font-semibold text-cyber-text mb-4">Description</h2>
                            <div className="prose prose-invert max-w-none text-cyber-text-muted whitespace-pre-wrap">{cert.description}</div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4">
                        {cert.verify_url && (
                            <a href={cert.verify_url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" /> Verifier la certification
                            </a>
                        )}
                        {cert.badge_url && (
                            <a href={cert.badge_url} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
                                <Award className="w-4 h-4" /> Voir le badge
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
