import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { cn, formatDate, getImageUrl } from '@/lib/utils';
import type { Hackathon } from '@/types';

interface HackathonCardProps {
  hackathon: Hackathon;
  variant?: 'default' | 'compact' | 'timeline';
  className?: string;
}

const resultConfig = {
  winner: {
    label: 'Gagnant',
    color: 'text-cyber-yellow',
    bgColor: 'bg-cyber-yellow/10',
    borderColor: 'border-cyber-yellow/30',
    icon: Trophy,
  },
  finalist: {
    label: 'Finaliste',
    color: 'text-cyber-mauve',
    bgColor: 'bg-cyber-mauve/10',
    borderColor: 'border-cyber-mauve/30',
    icon: Trophy,
  },
  top3: {
    label: 'Top 3',
    color: 'text-cyber-mauve-light',
    bgColor: 'bg-cyber-mauve/10',
    borderColor: 'border-cyber-mauve/20',
    icon: Trophy,
  },
  top5: {
    label: 'Top 5',
    color: 'text-cyber-text',
    bgColor: 'bg-cyber-card',
    borderColor: 'border-white/10',
    icon: Trophy,
  },
  participant: {
    label: 'Participant',
    color: 'text-cyber-text-muted',
    bgColor: 'bg-cyber-surface',
    borderColor: 'border-white/5',
    icon: Users,
  },
};

export function HackathonCard({ hackathon, variant = 'default', className }: HackathonCardProps) {
  const isCompact = variant === 'compact';
  const isTimeline = variant === 'timeline';
  const result = resultConfig[hackathon.result];
  const ResultIcon = result.icon;

  const mainImage = getImageUrl(hackathon.images?.[0]);

  if (isTimeline) {
    return (
      <article className={cn('relative pl-8 pb-8 last:pb-0', className)}>
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

        {/* Timeline dot */}
        <div className={cn(
          'absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-2',
          result.bgColor,
          result.borderColor
        )}>
          <div className={cn('w-full h-full rounded-full', result.bgColor)} />
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={cn('text-xs font-medium', result.color)}>
                  {result.label}
                </span>
                <span className="text-cyber-text-muted text-xs">
                  {formatDate(hackathon.event_date)}
                </span>
              </div>
              <h3 className="font-semibold text-cyber-text hover:text-cyber-mauve transition-colors">
                <Link to={`/hackathons/${hackathon.slug}`}>
                  {hackathon.name}
                </Link>
              </h3>
              <p className="text-cyber-text-muted text-sm mt-1">
                {hackathon.project_name}
              </p>
            </div>

            <div className={cn(
              'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
              result.bgColor
            )}>
              <ResultIcon className={cn('w-5 h-5', result.color)} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'cyber-card overflow-hidden group',
        className
      )}
    >
      {/* Image */}
      {!isCompact && mainImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={mainImage}
            alt={hackathon.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-cyber-card/50 to-transparent" />

          {/* Result Badge */}
          <div className={cn(
            'absolute top-4 left-4 px-3 py-1.5 rounded-lg flex items-center gap-2 border',
            result.bgColor,
            result.borderColor
          )}>
            <ResultIcon className={cn('w-4 h-4', result.color)} />
            <span className={cn('text-sm font-medium', result.color)}>
              {result.label}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn('p-5', isCompact && 'p-4')}>
        {/* Compact Result Badge */}
        {(isCompact || !mainImage) && (
          <div className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border mb-3',
            result.bgColor,
            result.borderColor
          )}>
            <ResultIcon className={cn('w-3.5 h-3.5', result.color)} />
            <span className={cn('text-xs font-medium', result.color)}>
              {result.label}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className={cn(
          'font-semibold text-cyber-text group-hover:text-cyber-mauve transition-colors',
          isCompact ? 'text-base' : 'text-lg'
        )}>
          {hackathon.name}
        </h3>

        {/* Organizer */}
        <p className="text-cyber-text-muted text-sm mt-1">
          {hackathon.organizer}
        </p>

        {/* Project */}
        {!isCompact && (
          <div className="mt-3 p-3 rounded-lg bg-cyber-surface border border-white/5">
            <p className="text-sm font-medium text-cyber-text">
              {hackathon.project_name}
            </p>
            <p className="text-cyber-text-muted text-sm mt-1 line-clamp-2">
              {hackathon.project_description}
            </p>
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-cyber-text-muted">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(hackathon.event_date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{hackathon.team_size} personnes</span>
          </div>
        </div>

        {/* Tech Stack */}
        {!isCompact && hackathon.tech_stack && hackathon.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {hackathon.tech_stack.slice(0, 4).map((tech) => (
              <span key={tech} className="cyber-tag">
                {tech}
              </span>
            ))}
            {hackathon.tech_stack.length > 4 && (
              <span className="cyber-tag">
                +{hackathon.tech_stack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
          <Link
            to={`/hackathons/${hackathon.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-cyber-mauve hover:text-cyber-mauve-light transition-colors"
          >
            Voir les détails
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex items-center gap-2 ml-auto">
            {hackathon.repo_url && (
              <a
                href={hackathon.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5 transition-all"
                aria-label="Voir le code source"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {hackathon.demo_url && (
              <a
                href={hackathon.demo_url}
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
