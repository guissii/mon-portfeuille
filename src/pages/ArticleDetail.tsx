import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { ArrowLeft, Calendar, Clock, Tag, BookOpen, ChevronRight } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

export function ArticleDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                const data = await api.getArticleBySlug(slug);
                setArticle(data);
                if (data) {
                    document.title = `${data.title} | Engineering - Cloud/DevOps/AI`;
                }
            } catch {
                setArticle(null);
            }
            setLoading(false);
        })();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyber-mauve border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!article) return (
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-cyber-text mb-4">Article non trouvé</h1>
            <Link to="/engineering" className="text-cyber-mauve hover:underline">Retour aux articles</Link>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 lg:pt-32 pb-20">
            <div className="section-padding">
                <div className="container-max max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-cyber-text-muted mb-8">
                        <Link to="/" className="hover:text-cyber-mauve transition-colors">Accueil</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/engineering" className="hover:text-cyber-mauve transition-colors">Engineering</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-cyber-text truncate max-w-xs">{article.title}</span>
                    </nav>

                    <Link to="/engineering" className="inline-flex items-center gap-2 text-cyber-text-muted hover:text-cyber-mauve transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Retour aux articles
                    </Link>

                    {/* Cover Image */}
                    {getImageUrl(article.cover_image) && (
                        <div className="mb-8 rounded-xl overflow-hidden border border-white/5">
                            <img
                                src={getImageUrl(article.cover_image)!}
                                alt={article.title}
                                className="w-full h-auto max-h-[400px] object-cover"
                            />
                        </div>
                    )}

                    {/* Header */}
                    <div className="cyber-card p-8 lg:p-12 mb-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {article.category && (
                                <span className="cyber-tag text-xs capitalize">{article.category}</span>
                            )}
                            {article.featured && (
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/30">
                                    En vedette
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold text-cyber-text mb-4">{article.title}</h1>

                        {article.excerpt && (
                            <p className="text-lg text-cyber-text-muted mb-6">{article.excerpt}</p>
                        )}

                        <div className="flex flex-wrap gap-6 text-sm text-cyber-text-muted">
                            {article.read_time && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-cyber-mauve" />
                                    {article.read_time} min de lecture
                                </div>
                            )}
                            {article.created_at && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-cyber-mauve" />
                                    {new Date(article.created_at).toLocaleDateString('fr-FR', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="cyber-card p-8 lg:p-12 mb-8">
                        <div className="prose prose-invert max-w-none">
                            <div className="text-cyber-text-muted leading-relaxed whitespace-pre-wrap text-[15px]">
                                {article.content}
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="cyber-card p-6 mb-8">
                            <h3 className="text-sm font-medium text-cyber-text mb-3 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-cyber-mauve" /> Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-cyber-text-muted border border-white/5 hover:border-cyber-mauve/30 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back Link */}
                    <div className="text-center mt-12">
                        <Link to="/engineering" className="btn-secondary inline-flex items-center gap-2">
                            <BookOpen className="w-5 h-5" /> Voir tous les articles
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
