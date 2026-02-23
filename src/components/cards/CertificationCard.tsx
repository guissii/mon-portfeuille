import { Link } from 'react-router-dom';
import { ExternalLink, Award, CheckCircle, Calendar } from 'lucide-react';
import { cn, formatDate, getImageUrl } from '@/lib/utils';
import type { Certification } from '@/types';

interface CertificationCardProps {
  certification: Certification;
  variant?: 'default' | 'compact';
  className?: string;
}

const levelColors = {
  beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
  intermediate: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  advanced: 'bg-cyber-mauve/10 text-cyber-mauve-light border-cyber-mauve/20',
  expert: 'bg-cyber-yellow/10 text-cyber-yellow border-cyber-yellow/20',
};

const levelLabels = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
  expert: 'Expert',
};

export function CertificationCard({ certification, variant = 'default', className }: CertificationCardProps) {
  const isCompact = variant === 'compact';
  const hasVerification = !!certification.verify_url;

  return (
    <article
      className={cn(
        'cyber-card p-5 group',
        isCompact && 'p-4',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Badge/Image */}
        <div className={cn(
          'flex-shrink-0 rounded-lg overflow-hidden bg-cyber-surface border border-white/5',
          isCompact ? 'w-12 h-12' : 'w-16 h-16'
        )}>
          {getImageUrl(certification.badge_url) ? (
            <img
              src={getImageUrl(certification.badge_url)!}
              alt={certification.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Award className={cn(
                'text-cyber-mauve',
                isCompact ? 'w-6 h-6' : 'w-8 h-8'
              )} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={cn(
                'font-semibold text-cyber-text group-hover:text-cyber-mauve transition-colors',
                isCompact ? 'text-base' : 'text-lg'
              )}>
                {certification.name}
              </h3>
              <p className="text-cyber-text-muted text-sm">
                {certification.issuer}
              </p>
            </div>

            {/* Level Badge */}
            <span className={cn(
              'flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium border',
              levelColors[certification.level]
            )}>
              {levelLabels[certification.level]}
            </span>
          </div>

          {/* Meta */}
          {!isCompact && (
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-cyber-text-muted">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Obtenue le {formatDate(certification.issue_date)}</span>
              </div>

              {certification.expiry_date && (
                <span>
                  Expire le {formatDate(certification.expiry_date)}
                </span>
              )}
            </div>
          )}

          {/* Skills */}
          {!isCompact && certification.skills && certification.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {certification.skills.slice(0, 4).map((skill) => (
                <span key={skill} className="cyber-tag">
                  {skill}
                </span>
              ))}
              {certification.skills.length > 4 && (
                <span className="cyber-tag">
                  +{certification.skills.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
            <Link
              to={`/certifications/${certification.slug}`}
              className="text-sm font-medium text-cyber-mauve hover:text-cyber-mauve-light transition-colors"
            >
              Voir les détails
            </Link>

            {hasVerification && (
              <a
                href={certification.verify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-cyber-success hover:text-cyber-success/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <CheckCircle className="w-4 h-4" />
                Vérifier
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
