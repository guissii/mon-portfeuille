import { useState, useEffect } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const techFilters = [
  'AWS',
  'GCP',
  'Azure',
  'Kubernetes',
  'Docker',
  'Terraform',
  'CI/CD',
  'Python',
  'Node.js',
  'React',
];

export function Projects() {
  const { projects, isLoading } = useProjects({ status: 'published' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  useEffect(() => {
    document.title = 'Projets | Mohammed - Cloud/DevOps/AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez mes projets Cloud, DevOps et AI. Infrastructure as Code, CI/CD, observabilité et plus.');
    }
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTech = selectedTechs.length === 0 || selectedTechs.some(tech => 
      project.stack?.infrastructure?.includes(tech) ||
      project.stack?.application?.includes(tech) ||
      project.stack?.cicd?.includes(tech)
    );

    return matchesSearch && matchesTech;
  });

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTechs([]);
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-cyber-text mb-4">
              Mes <span className="text-cyber-mauve">Projets</span>
            </h1>
            <p className="text-cyber-text-muted text-lg max-w-2xl">
              Une collection de projets démontrant mon expertise en infrastructure cloud, 
              DevOps et intelligence artificielle. Chaque projet inclut architecture, 
              décisions techniques et résultats mesurables.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-text-muted" />
              <Input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 cyber-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-text-muted hover:text-cyber-text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Tech Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-cyber-text-muted text-sm">
                <Filter className="w-4 h-4" />
                <span>Filtrer par techno:</span>
              </div>
              {techFilters.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium transition-all',
                    selectedTechs.includes(tech)
                      ? 'bg-cyber-mauve text-white'
                      : 'bg-cyber-card text-cyber-text-muted hover:text-cyber-text border border-white/10'
                  )}
                >
                  {tech}
                </button>
              ))}
              {(selectedTechs.length > 0 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-cyber-mauve hover:text-cyber-mauve-light transition-colors"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="cyber-card h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="cyber-card p-12 text-center">
              <p className="text-cyber-text-muted mb-4">
                Aucun projet ne correspond à vos critères.
              </p>
              <button
                onClick={clearFilters}
                className="text-cyber-mauve hover:text-cyber-mauve-light transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Results Count */}
          {!isLoading && (
            <p className="mt-8 text-sm text-cyber-text-muted">
              {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
