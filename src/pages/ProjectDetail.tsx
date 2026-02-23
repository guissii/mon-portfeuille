import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { ArrowLeft, Github, ExternalLink, BookOpen, ChevronRight, Server, Shield, Zap, Lightbulb } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getImageUrl } from '@/lib/utils';
import type { Project } from '@/types';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { getProjectBySlug } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      setIsLoading(true);
      const { data, error } = await getProjectBySlug(slug);
      if (error) {
        setError(error);
      } else {
        setProject(data);
        if (data) {
          document.title = `${data.title} | Mohammed - Cloud/DevOps/AI`;
        }
      }
      setIsLoading(false);
    };

    loadProject();
  }, [slug, getProjectBySlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 lg:pt-32 pb-20">
        <div className="section-padding">
          <div className="container-max">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-32 bg-cyber-card rounded" />
              <div className="h-96 bg-cyber-card rounded-xl" />
              <div className="h-64 bg-cyber-card rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-24 lg:pt-32 pb-20">
        <div className="section-padding">
          <div className="container-max">
            <div className="cyber-card p-12 text-center">
              <h1 className="text-2xl font-bold text-cyber-text mb-4">
                Projet non trouvé
              </h1>
              <p className="text-cyber-text-muted mb-6">
                Le projet que vous recherchez n'existe pas ou a été déplacé.
              </p>
              <Link to="/projects" className="btn-primary">
                Voir tous les projets
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="section-padding">
        <div className="container-max">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-cyber-text-muted mb-8">
            <Link to="/" className="hover:text-cyber-mauve transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/projects" className="hover:text-cyber-mauve transition-colors">Projets</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cyber-text truncate max-w-xs">{project.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-cyber-text-muted hover:text-cyber-mauve transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux projets
            </Link>

            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyber-text mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-cyber-text-muted max-w-3xl">
                  {project.tagline}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Code
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Voir la démo
                  </a>
                )}
                {project.pdf_url && (
                  <a
                    href={project.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    PDF
                  </a>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {[
                ...(project.stack?.infrastructure || []),
                ...(project.stack?.application || []),
                ...(project.stack?.cicd || []),
              ].slice(0, 8).map((tech) => (
                <span key={tech} className="cyber-tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* Cover Image */}
          {getImageUrl(project.cover_image) && (
            <div className="mb-12 rounded-xl overflow-hidden border border-white/5">
              <img
                src={getImageUrl(project.cover_image)!}
                alt={project.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* TL;DR */}
          <div className="cyber-card p-6 lg:p-8 mb-12">
            <h2 className="text-lg font-semibold text-cyber-text mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyber-mauve" />
              TL;DR
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-cyber-text-muted mb-2">Problème</h3>
                <p className="text-cyber-text">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-cyber-text-muted mb-2">Solution</h3>
                <p className="text-cyber-text">{project.solution}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-cyber-text-muted mb-2">Impact</h3>
                <p className="text-cyber-text">{project.impact}</p>
              </div>
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-cyber-mauve">
                      {metric.value}{metric.unit}
                    </div>
                    <div className="text-sm text-cyber-text-muted">{metric.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-cyber-card border border-white/5 p-1 flex-wrap h-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyber-mauve data-[state=active]:text-white">
                Vue d'ensemble
              </TabsTrigger>
              {project.architecture && (
                <TabsTrigger value="architecture" className="data-[state=active]:bg-cyber-mauve data-[state=active]:text-white">
                  Architecture
                </TabsTrigger>
              )}
              {project.security && (
                <TabsTrigger value="security" className="data-[state=active]:bg-cyber-mauve data-[state=active]:text-white">
                  Sécurité
                </TabsTrigger>
              )}
              {project.performance && (
                <TabsTrigger value="performance" className="data-[state=active]:bg-cyber-mauve data-[state=active]:text-white">
                  Performance
                </TabsTrigger>
              )}
              {project.postmortem && (
                <TabsTrigger value="postmortem" className="data-[state=active]:bg-cyber-mauve data-[state=active]:text-white">
                  Post-mortem
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="cyber-card p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-cyber-text mb-4">Description</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-cyber-text-muted leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>
              </div>

              {project.learnings && project.learnings.length > 0 && (
                <div className="cyber-card p-6 lg:p-8">
                  <h2 className="text-xl font-semibold text-cyber-text mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-cyber-yellow" />
                    Ce que j'ai appris
                  </h2>
                  <ul className="space-y-3">
                    {project.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start gap-3 text-cyber-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-mauve mt-2 flex-shrink-0" />
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Details */}
              <div className="cyber-card p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-cyber-text mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-cyber-mauve" />
                  Stack technique
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {project.stack?.infrastructure && project.stack.infrastructure.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-cyber-text-muted mb-2">Infrastructure</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.infrastructure.map((tech) => (
                          <span key={tech} className="cyber-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.stack?.cicd && project.stack.cicd.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-cyber-text-muted mb-2">CI/CD</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.cicd.map((tech) => (
                          <span key={tech} className="cyber-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.stack?.application && project.stack.application.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-cyber-text-muted mb-2">Application</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.application.map((tech) => (
                          <span key={tech} className="cyber-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.stack?.monitoring && project.stack.monitoring.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-cyber-text-muted mb-2">Monitoring</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.monitoring.map((tech) => (
                          <span key={tech} className="cyber-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {project.architecture && (
              <TabsContent value="architecture" className="space-y-8">
                <div className="cyber-card p-6 lg:p-8">
                  <h2 className="text-xl font-semibold text-cyber-text mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5 text-cyber-mauve" />
                    Architecture
                  </h2>
                  <p className="text-cyber-text-muted mb-6">{project.architecture.overview}</p>

                  {getImageUrl(project.architecture.diagram_url) && (
                    <div className="rounded-xl overflow-hidden border border-white/5 mb-6">
                      <img
                        src={getImageUrl(project.architecture.diagram_url)!}
                        alt="Architecture diagram"
                        className="w-full h-auto"
                      />
                    </div>
                  )}

                  {project.architecture.components && project.architecture.components.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-medium text-cyber-text">Composants</h3>
                      {project.architecture.components.map((component, index) => (
                        <div key={index} className="p-4 rounded-lg bg-cyber-surface border border-white/5">
                          <h4 className="font-medium text-cyber-text mb-1">{component.name}</h4>
                          <p className="text-sm text-cyber-text-muted mb-2">{component.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {component.tech.map((t) => (
                              <span key={t} className="text-xs px-2 py-1 rounded bg-cyber-card text-cyber-text-muted">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            )}

            {project.security && (
              <TabsContent value="security" className="space-y-8">
                <div className="cyber-card p-6 lg:p-8">
                  <h2 className="text-xl font-semibold text-cyber-text mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyber-mauve" />
                    Sécurité
                  </h2>
                  <p className="text-cyber-text-muted mb-6">{project.security.overview}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-cyber-surface border border-white/5">
                      <h3 className="font-medium text-cyber-text mb-2">Authentification</h3>
                      <p className="text-sm text-cyber-text-muted">{project.security.authentication}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-cyber-surface border border-white/5">
                      <h3 className="font-medium text-cyber-text mb-2">Autorisation</h3>
                      <p className="text-sm text-cyber-text-muted">{project.security.authorization}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-cyber-surface border border-white/5 md:col-span-2">
                      <h3 className="font-medium text-cyber-text mb-2">Gestion des secrets</h3>
                      <p className="text-sm text-cyber-text-muted">{project.security.secrets_management}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}

            {project.performance && (
              <TabsContent value="performance" className="space-y-8">
                <div className="cyber-card p-6 lg:p-8">
                  <h2 className="text-xl font-semibold text-cyber-text mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyber-mauve" />
                    Performance
                  </h2>
                  <p className="text-cyber-text-muted mb-6">{project.performance.overview}</p>

                  {project.performance.optimizations && project.performance.optimizations.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium text-cyber-text mb-3">Optimisations</h3>
                      <ul className="space-y-2">
                        {project.performance.optimizations.map((opt, index) => (
                          <li key={index} className="flex items-start gap-3 text-cyber-text-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-mauve mt-2 flex-shrink-0" />
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.performance.benchmarks && project.performance.benchmarks.length > 0 && (
                    <div>
                      <h3 className="font-medium text-cyber-text mb-3">Benchmarks</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.performance.benchmarks.map((bench, index) => (
                          <div key={index} className="p-4 rounded-lg bg-cyber-surface border border-white/5 text-center">
                            <div className="text-2xl font-bold text-cyber-mauve mb-1">{bench.value}</div>
                            <div className="text-sm text-cyber-text-muted">{bench.metric}</div>
                            {bench.before && (
                              <div className="text-xs text-cyber-text-muted mt-1">
                                Avant: {bench.before}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            )}

            {project.postmortem && (
              <TabsContent value="postmortem" className="space-y-8">
                <div className="cyber-card p-6 lg:p-8">
                  <h2 className="text-xl font-semibold text-cyber-text mb-4">
                    Post-mortem: {project.postmortem.incident}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-cyber-text mb-2">Timeline</h3>
                      <p className="text-cyber-text-muted">{project.postmortem.timeline}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                      <h3 className="font-medium text-red-400 mb-2">Cause racine</h3>
                      <p className="text-cyber-text-muted">{project.postmortem.root_cause}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                      <h3 className="font-medium text-green-400 mb-2">Résolution</h3>
                      <p className="text-cyber-text-muted">{project.postmortem.resolution}</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-cyber-text mb-2">Leçons apprises</h3>
                      <ul className="space-y-2">
                        {project.postmortem.lessons.map((lesson, index) => (
                          <li key={index} className="flex items-start gap-3 text-cyber-text-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-yellow mt-2 flex-shrink-0" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-cyber-text mb-2">Mesures préventives</h3>
                      <ul className="space-y-2">
                        {project.postmortem.preventive_measures.map((measure, index) => (
                          <li key={index} className="flex items-start gap-3 text-cyber-text-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-mauve mt-2 flex-shrink-0" />
                            {measure}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-cyber-text mb-6">Galerie</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border border-white/5">
                    <img
                      src={getImageUrl(image) || ''}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
