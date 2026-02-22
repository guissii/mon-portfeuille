import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Calendar, Github, Cloud, Server, Brain, Zap, Award } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useCertifications } from '@/hooks/useCertifications';
import { useHackathons } from '@/hooks/useHackathons';
import { useSettings } from '@/hooks/useSettings';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { CertificationCard } from '@/components/cards/CertificationCard';
import { HackathonCard } from '@/components/cards/HackathonCard';

// SEO
const seoData = {
  title: 'Mohammed | Cloud/DevOps/AI Engineer',
  description: 'Portfolio de Mohammed, ingénieur spécialisé en Cloud, DevOps et AI. Découvrez mes projets, certifications et participations aux hackathons.',
};

export function Home() {
  const { projects, isLoading: projectsLoading } = useProjects({ featured: true, status: 'published', limit: 3 });
  const { certifications, isLoading: certsLoading } = useCertifications({ featured: true, status: 'published' });
  const { hackathons, isLoading: hacksLoading } = useHackathons({ featured: true, status: 'published', limit: 3 });
  const { settings } = useSettings();

  const profilePhoto = settings.profile_photo;
  const profileName = settings.profile_name || 'Mohammed';

  useEffect(() => {
    document.title = seoData.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-cyber" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-mauve/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-yellow/5 rounded-full blur-3xl" />
        </div>

        <div className="relative section-padding w-full">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-success/10 border border-cyber-success/20">
                  <span className="w-2 h-2 rounded-full bg-cyber-success animate-pulse" />
                  <span className="text-cyber-success text-sm font-medium">Disponible pour missions</span>
                </div>

                {/* Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cyber-text leading-tight">
                    Mohammed
                    <span className="block gradient-text mt-2">
                      Cloud / DevOps / AI
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-cyber-text-muted max-w-xl">
                    Ingénieur infrastructure spécialisé dans le cloud scalable,
                    le CI/CD et l'observabilité. Je construis des systèmes robustes
                    et mesurables.
                  </p>
                </div>

                {/* Proof Points */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-cyber-text-muted">
                    <Cloud className="w-5 h-5 text-cyber-mauve" />
                    <span>AWS / GCP / Azure</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cyber-text-muted">
                    <Server className="w-5 h-5 text-cyber-mauve" />
                    <span>Kubernetes / Docker</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cyber-text-muted">
                    <Brain className="w-5 h-5 text-cyber-mauve" />
                    <span>ML Ops / AI</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/projects"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Voir les projets
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/agenda"
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Réserver 15 min
                  </Link>
                  <a
                    href="/cv.pdf"
                    className="btn-secondary inline-flex items-center gap-2"
                    download
                  >
                    <Download className="w-5 h-5" />
                    CV PDF
                  </a>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 pt-4">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-cyber-mauve">5+</div>
                    <div className="text-sm text-cyber-text-muted">Années d'expérience</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-cyber-mauve">15+</div>
                    <div className="text-sm text-cyber-text-muted">Projets livrés</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-cyber-mauve">10+</div>
                    <div className="text-sm text-cyber-text-muted">Certifications</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Profile Photo */}
              <div className="relative hidden lg:block">
                <div className="relative aspect-square max-w-lg mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Outer Rotating Ring */}
                      <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '20s', background: 'conic-gradient(from 0deg, transparent, rgba(157,107,247,0.3), transparent, rgba(250,204,21,0.2), transparent)' }} />

                      {/* Glow Ring */}
                      <div className="absolute inset-4 rounded-full" style={{ boxShadow: '0 0 40px rgba(157,107,247,0.2), inset 0 0 40px rgba(157,107,247,0.1)', border: '2px solid rgba(157,107,247,0.15)' }} />

                      {/* Photo Container */}
                      <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-cyber-mauve/40" style={{ boxShadow: '0 0 60px rgba(157,107,247,0.3), 0 0 120px rgba(157,107,247,0.1)' }}>
                        {profilePhoto ? (
                          <img
                            src={profilePhoto}
                            alt={profileName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-cyber-card flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-cyber-mauve/10 flex items-center justify-center">
                                <Zap className="w-10 h-10 text-cyber-mauve" />
                              </div>
                              <p className="text-cyber-text font-mono text-sm">Infrastructure</p>
                              <p className="text-cyber-mauve font-mono text-xs">as Code</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Floating Tech Labels */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-cyber-card/90 backdrop-blur border border-cyber-mauve/30 text-xs font-mono text-cyber-mauve shadow-lg">
                        Terraform
                      </div>
                      <div className="absolute bottom-12 left-0 px-3 py-1.5 rounded-lg bg-cyber-card/90 backdrop-blur border border-cyber-yellow/30 text-xs font-mono text-cyber-yellow shadow-lg">
                        Kubernetes
                      </div>
                      <div className="absolute bottom-12 right-0 px-3 py-1.5 rounded-lg bg-cyber-card/90 backdrop-blur border border-cyber-mauve/30 text-xs font-mono text-cyber-mauve shadow-lg">
                        CI/CD
                      </div>
                      <div className="absolute top-1/2 right-0 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-cyber-card/90 backdrop-blur border border-green-500/30 text-xs font-mono text-green-400 shadow-lg">
                        Docker
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
          <span className="text-cyber-text-muted text-xs">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-cyber-mauve to-transparent" />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cyber-text mb-4">
                  Projets <span className="text-cyber-mauve">phares</span>
                </h2>
                <p className="text-cyber-text-muted max-w-xl">
                  Une sélection de projets démontrant mon expertise en infrastructure cloud,
                  DevOps et intelligence artificielle.
                </p>
              </div>
              <Link
                to="/projects"
                className="hidden sm:inline-flex items-center gap-2 text-cyber-mauve hover:text-cyber-mauve-light transition-colors"
              >
                Voir tous les projets
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {projectsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="cyber-card h-96 animate-pulse" />
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="cyber-card p-12 text-center">
                <p className="text-cyber-text-muted">Aucun projet phare pour le moment.</p>
              </div>
            )}

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-cyber-mauve"
              >
                Voir tous les projets
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Depth Section */}
      <section className="py-20 lg:py-32 bg-cyber-surface/50">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cyber-text mb-4">
                  Engineering <span className="text-cyber-mauve">Depth</span>
                </h2>
                <p className="text-cyber-text-muted mb-8">
                  Au-delà du code, je documente les architectures, les décisions techniques,
                  les incidents et les leçons apprises. Une approche systémique pour construire
                  des systèmes fiables et maintenables.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Server, title: 'Architecture & Infrastructure', desc: 'Diagrammes C4, IaC, multi-cloud' },
                    { icon: Zap, title: 'CI/CD & Automation', desc: 'Pipelines, GitOps, release management' },
                    { icon: Cloud, title: 'Observabilité', desc: 'Logs, métriques, traces, alerting' },
                    { icon: Award, title: 'Sécurité & Conformité', desc: 'Threat modeling, secrets, compliance' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 p-4 rounded-lg bg-cyber-card border border-white/5 hover:border-cyber-mauve/30 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-cyber-mauve/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-cyber-mauve" />
                      </div>
                      <div>
                        <h3 className="font-medium text-cyber-text">{item.title}</h3>
                        <p className="text-sm text-cyber-text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/engineering"
                  className="inline-flex items-center gap-2 mt-8 btn-primary"
                >
                  Explorer Engineering Depth
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="relative">
                <div className="cyber-card p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-sm text-cyber-text-muted font-mono">architecture.md</span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <p className="text-cyber-text-muted"># Architecture Overview</p>
                    <p className="text-cyber-mauve">## Infrastructure</p>
                    <p className="text-cyber-text">- Multi-region Kubernetes cluster</p>
                    <p className="text-cyber-text">- Terraform for IaC</p>
                    <p className="text-cyber-text">- GitOps with ArgoCD</p>
                    <p className="text-cyber-mauve">## Observability</p>
                    <p className="text-cyber-text">- Prometheus + Grafana</p>
                    <p className="text-cyber-text">- Distributed tracing with Jaeger</p>
                    <p className="text-cyber-text">- PagerDuty for alerting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cyber-text mb-4">
                  Certifications <span className="text-cyber-mauve">clés</span>
                </h2>
                <p className="text-cyber-text-muted max-w-xl">
                  Des certifications reconnues validant mon expertise technique
                  et ma capacité à concevoir des solutions cloud robustes.
                </p>
              </div>
              <Link
                to="/certifications"
                className="hidden sm:inline-flex items-center gap-2 text-cyber-mauve hover:text-cyber-mauve-light transition-colors"
              >
                Voir toutes les certifications
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {certsLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="cyber-card h-32 animate-pulse" />
                ))}
              </div>
            ) : certifications.length > 0 ? (
              <div className="space-y-4">
                {certifications.slice(0, 3).map((cert) => (
                  <CertificationCard key={cert.id} certification={cert} />
                ))}
              </div>
            ) : (
              <div className="cyber-card p-12 text-center">
                <p className="text-cyber-text-muted">Aucune certification pour le moment.</p>
              </div>
            )}

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/certifications"
                className="inline-flex items-center gap-2 text-cyber-mauve"
              >
                Voir toutes les certifications
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathons Section */}
      <section className="py-20 lg:py-32 bg-cyber-surface/50">
        <div className="section-padding">
          <div className="container-max">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cyber-text mb-4">
                  Hackathons <span className="text-cyber-mauve">& Compétitions</span>
                </h2>
                <p className="text-cyber-text-muted max-w-xl">
                  Des expériences intenses de 24 à 48h pour résoudre des problèmes complexes
                  et innover sous pression.
                </p>
              </div>
              <Link
                to="/hackathons"
                className="hidden sm:inline-flex items-center gap-2 text-cyber-mauve hover:text-cyber-mauve-light transition-colors"
              >
                Voir tous les hackathons
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {hacksLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="cyber-card h-80 animate-pulse" />
                ))}
              </div>
            ) : hackathons.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            ) : (
              <div className="cyber-card p-12 text-center">
                <p className="text-cyber-text-muted">Aucun hackathon pour le moment.</p>
              </div>
            )}

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/hackathons"
                className="inline-flex items-center gap-2 text-cyber-mauve"
              >
                Voir tous les hackathons
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="cyber-card p-8 lg:p-16 text-center relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-mauve/10 rounded-full blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyber-text mb-4">
                  Travaillons <span className="gradient-text">ensemble</span>
                </h2>
                <p className="text-cyber-text-muted text-lg max-w-2xl mx-auto mb-8">
                  Vous avez un projet cloud, DevOps ou AI ? Discutons de vos besoins
                  et voyons comment je peux vous aider.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/agenda"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Réserver un appel
                  </Link>
                  <a
                    href="mailto:contact@mohammed.dev"
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Me contacter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
