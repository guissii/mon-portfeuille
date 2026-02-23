import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Star } from 'lucide-react';
import { cn, truncate, getImageUrl } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export function ProjectCard({ project, variant = 'default', className }: ProjectCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  const mainImage = getImageUrl(project.cover_image || project.gallery?.[0]);

  return (
    <article
      className={cn(
        'group relative cyber-card overflow-hidden',
        isFeatured && 'lg:col-span-2 lg:row-span-2',
        className
      )}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 cyber-tag-yellow flex items-center gap-1.5">
          <Star className="w-3 h-3" />
          <span>Phare</span>
        </div>
      )}

      {/* Image */}
      <div className={cn(
        'relative overflow-hidden',
        isFeatured ? 'h-64 lg:h-80' : isCompact ? 'h-32' : 'h-48'
      )}>
        {mainImage ? (
          <img
            src={mainImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyber-mauve/20 to-cyber-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-cyber-mauve/10 flex items-center justify-center">
                <span className="text-cyber-mauve font-mono text-2xl font-bold">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-cyber-card/50 to-transparent" />

        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyber-mauve/5" />
      </div>

      {/* Content */}
      <div className={cn(
        'p-5',
        isFeatured && 'lg:p-6'
      )}>
        {/* Tags */}
        {!isCompact && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.stack?.infrastructure?.slice(0, 3).map((tech) => (
              <span key={tech} className="cyber-tag">
                {tech}
              </span>
            ))}
            {project.stack?.infrastructure?.length > 3 && (
              <span className="cyber-tag">
                +{project.stack.infrastructure.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className={cn(
          'font-semibold text-cyber-text mb-2 group-hover:text-cyber-mauve transition-colors',
          isFeatured ? 'text-xl lg:text-2xl' : isCompact ? 'text-base' : 'text-lg'
        )}>
          {project.title}
        </h3>

        {/* Tagline */}
        {!isCompact && (
          <p className="text-cyber-text-muted text-sm mb-4 line-clamp-2">
            {truncate(project.tagline, 120)}
          </p>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && !isCompact && (
          <div className="flex flex-wrap gap-4 mb-4">
            {project.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label} className="flex items-center gap-1.5">
                <span className="text-cyber-mauve font-semibold text-sm">
                  {metric.value}{metric.unit}
                </span>
                <span className="text-cyber-text-muted text-xs">{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-cyber-mauve hover:text-cyber-mauve-light transition-colors"
          >
            Voir le projet
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex items-center gap-2 ml-auto">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5 transition-all"
                aria-label="Voir le code source"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5 transition-all"
                aria-label="Voir la démo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
