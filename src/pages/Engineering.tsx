import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Server, Zap, Shield, DollarSign, AlertTriangle, BookOpen, ArrowRight, Code, GitBranch, Activity, GraduationCap, Briefcase, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryMeta: Record<string, { icon: any; color: string; bgColor: string }> = {
  architecture: { icon: Server, color: 'text-cyber-mauve', bgColor: 'bg-cyber-mauve/10' },
  cicd: { icon: GitBranch, color: 'text-cyber-yellow', bgColor: 'bg-cyber-yellow/10' },
  observability: { icon: Activity, color: 'text-green-400', bgColor: 'bg-green-500/10' },
  security: { icon: Shield, color: 'text-red-400', bgColor: 'bg-red-500/10' },
  finops: { icon: DollarSign, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  incidents: { icon: AlertTriangle, color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
};

export function Engineering() {
  const [articles, setArticles] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [expandedExp, setExpandedExp] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Engineering | Mohammed - Cloud/DevOps/AI';
    api.getArticles({ status: 'published' }).then(setArticles).catch(() => { });
    api.getEducation('published').then(setEducation).catch(() => { });
    api.getExperiences('published').then(setExperiences).catch(() => { });
  }, []);

  // Group articles by category
  const categories = Object.entries(
    articles.reduce((acc: Record<string, any[]>, a) => {
      acc[a.category] = acc[a.category] || [];
      acc[a.category].push(a);
      return acc;
    }, {})
  );

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="section-padding">
        <div className="container-max">

          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-cyber-text mb-4">
              Engineering <span className="text-cyber-mauve">Depth</span>
            </h1>
            <p className="text-cyber-text-muted text-lg max-w-3xl">
              Parcours academique, experience professionnelle et articles techniques approfondis
              sur l'architecture cloud, le DevOps et la securite.
            </p>
          </div>

          {/* Experiences Section */}
          {experiences.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-cyber-text mb-8 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-cyber-mauve" /> Experience professionnelle
              </h2>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-mauve/50 via-cyber-mauve/20 to-transparent" />

                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-16">
                      {/* Node */}
                      <div className="absolute left-3 top-6 w-7 h-7 rounded-full bg-cyber-surface border-2 border-cyber-mauve flex items-center justify-center" style={{ boxShadow: '0 0 12px rgba(157,107,247,0.3)' }}>
                        <Briefcase className="w-3 h-3 text-cyber-mauve" />
                      </div>

                      <div className="cyber-card p-6 group">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-cyber-text">{exp.position}</h3>
                            <p className="text-cyber-mauve font-medium">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-cyber-text-muted">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(exp.start_date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} —{' '}
                              {exp.current ? <span className="text-green-400">Present</span> : new Date(exp.end_date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                            </div>
                            {exp.location && (
                              <div className="flex items-center gap-1 mt-1 justify-end"><MapPin className="w-3 h-3" />{exp.location}</div>
                            )}
                          </div>
                        </div>

                        {exp.description && <p className="text-cyber-text-muted text-sm mb-3">{exp.description}</p>}

                        {/* Expandable responsibilities */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div>
                            <button onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)} className="inline-flex items-center gap-1 text-sm text-cyber-mauve mb-2">
                              {expandedExp === exp.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              {expandedExp === exp.id ? 'Masquer' : 'Voir les responsabilites'}
                            </button>
                            {expandedExp === exp.id && (
                              <ul className="space-y-1.5 text-sm text-cyber-text-muted">
                                {exp.responsibilities.map((r: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-mauve mt-1.5 flex-shrink-0" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}

                        {/* Tech tags */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {exp.technologies.map((t: string) => (
                              <span key={t} className="cyber-tag text-[10px]">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-cyber-text mb-8 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-cyber-yellow" /> Parcours académique
              </h2>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-yellow/50 via-cyber-yellow/20 to-transparent" />

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={edu.id} className="relative pl-16" style={{ animationDelay: `${index * 100}ms` }}>
                      {/* Timeline Node */}
                      <div className="absolute left-3 top-6 w-7 h-7 rounded-full bg-cyber-surface border-2 border-cyber-yellow flex items-center justify-center" style={{ boxShadow: '0 0 12px rgba(250,204,21,0.3)' }}>
                        <GraduationCap className="w-3 h-3 text-cyber-yellow" />
                      </div>

                      <div className="cyber-card p-6 group hover:border-cyber-yellow/30 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-cyber-text">{edu.degree}</h3>
                            {edu.field && (
                              <p className="text-cyber-mauve font-medium text-sm">{edu.field}</p>
                            )}
                            <p className="text-cyber-yellow/80 text-sm mt-1">{edu.institution}</p>
                          </div>
                          <div className="text-right text-sm text-cyber-text-muted flex-shrink-0 ml-4">
                            <div className="flex items-center gap-1 justify-end">
                              <Calendar className="w-3 h-3" />
                              {new Date(edu.start_date).getFullYear()} — {edu.end_date ? new Date(edu.end_date).getFullYear() : <span className="text-green-400">En cours</span>}
                            </div>
                            {edu.location && (
                              <div className="flex items-center gap-1 mt-1 justify-end">
                                <MapPin className="w-3 h-3" />{edu.location}
                              </div>
                            )}
                          </div>
                        </div>

                        {edu.description && (
                          <p className="text-cyber-text-muted text-sm leading-relaxed">{edu.description}</p>
                        )}

                        {edu.gpa && (
                          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-yellow/10 border border-cyber-yellow/20">
                            <span className="text-xs text-cyber-yellow font-medium">GPA: {edu.gpa}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Engineering Articles */}
          {articles.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-cyber-text mb-8 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-green-400" /> Articles techniques
              </h2>

              {/* Category filters */}
              {categories.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {categories.map(([cat, arts]) => {
                    const meta = categoryMeta[cat] || { icon: Code, color: 'text-gray-400', bgColor: 'bg-gray-500/10' };
                    const Icon = meta.icon;
                    return (
                      <div key={cat} className="cyber-card p-4">
                        <div className="flex items-center gap-3">
                          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', meta.bgColor)}>
                            <Icon className={cn('w-5 h-5', meta.color)} />
                          </div>
                          <div>
                            <p className="text-cyber-text font-medium capitalize">{cat}</p>
                            <p className="text-cyber-text-muted text-xs">{arts.length} article{arts.length > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="space-y-4">
                {articles.map((article) => {
                  const meta = categoryMeta[article.category] || { icon: Code, color: 'text-gray-400', bgColor: 'bg-gray-500/10' };
                  return (
                    <Link key={article.id} to={`/engineering/${article.slug}`} className="cyber-card p-6 block group hover:border-cyber-mauve/30 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="cyber-tag text-xs capitalize">{article.category}</span>
                            <span className="text-cyber-text-muted text-sm">{article.read_time} min</span>
                          </div>
                          <h3 className="text-lg font-semibold text-cyber-text group-hover:text-cyber-mauve transition-colors mb-2">{article.title}</h3>
                          <p className="text-cyber-text-muted text-sm line-clamp-2">{article.excerpt}</p>
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {article.tags.slice(0, 4).map((t: string) => (
                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-cyber-text-muted">{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-cyber-mauve opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Resources */}
          <div className="cyber-card p-8">
            <h2 className="text-2xl font-bold text-cyber-text mb-6">Ressources</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-cyber-surface border border-white/5">
                <Code className="w-8 h-8 text-cyber-mauve mb-3" />
                <h3 className="font-medium text-cyber-text mb-1">Templates IaC</h3>
                <p className="text-sm text-cyber-text-muted">Modules Terraform reutilisables</p>
              </div>
              <div className="p-4 rounded-lg bg-cyber-surface border border-white/5">
                <BookOpen className="w-8 h-8 text-cyber-yellow mb-3" />
                <h3 className="font-medium text-cyber-text mb-1">Runbooks</h3>
                <p className="text-sm text-cyber-text-muted">Procedures operationnelles</p>
              </div>
              <div className="p-4 rounded-lg bg-cyber-surface border border-white/5">
                <Zap className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="font-medium text-cyber-text mb-1">Snippets</h3>
                <p className="text-sm text-cyber-text-muted">Code snippets et commandes</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
