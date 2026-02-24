import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle, Calendar, Clock, ArrowRight, Network, Cloud, Server, Lock, Cpu, Layers } from 'lucide-react';
import { cn, formatDate, getImageUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Certification } from '@/types';

interface CertificationCardProps {
  certification: Certification;
  variant?: 'default' | 'compact';
  className?: string;
}

// ── Level colors (dynamic by level) ─────────────────────
const levelConfig: Record<string, { label: string; color: string; bg: string; border: string; glow: string }> = {
  beginner: { label: 'Débutant', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.12)', border: 'rgba(74, 222, 128, 0.25)', glow: '0 0 12px rgba(74, 222, 128, 0.3)' },
  intermediate: { label: 'Intermédiaire', color: '#9d6bf7', bg: 'rgba(157, 107, 247, 0.12)', border: 'rgba(157, 107, 247, 0.25)', glow: '0 0 12px rgba(157, 107, 247, 0.3)' },
  advanced: { label: 'Avancé', color: '#facc15', bg: 'rgba(250, 204, 21, 0.12)', border: 'rgba(250, 204, 21, 0.25)', glow: '0 0 12px rgba(250, 204, 21, 0.3)' },
  expert: { label: 'Expert', color: '#f87171', bg: 'rgba(248, 113, 113, 0.12)', border: 'rgba(248, 113, 113, 0.25)', glow: '0 0 12px rgba(248, 113, 113, 0.3)' },
};

// ── Skill domain detection ──────────────────────────────
function getSkillDomain(skill: string): string {
  const s = skill.toLowerCase();
  if (['tcp', 'ip', 'dns', 'routing', 'bgp', 'ospf', 'vlan', 'subnet', 'network', 'réseau', 'http', 'ssh', 'ssl', 'tls', 'firewall', 'vpn', 'load balancer'].some(k => s.includes(k))) return 'networking';
  if (['aws', 'azure', 'gcp', 'cloud', 'ec2', 's3', 'lambda', 'vpc', 'iam', 'rds', 'route53', 'terraform'].some(k => s.includes(k))) return 'cloud';
  if (['docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'ansible', 'devops', 'helm', 'prometheus', 'monitoring'].some(k => s.includes(k))) return 'devops';
  if (['security', 'sécurité', 'encryption', 'auth', 'owasp', 'pentest', 'compliance', 'resilience'].some(k => s.includes(k))) return 'security';
  if (['ai', 'ml', 'machine learning', 'deep learning', 'nlp', 'tensorflow', 'pytorch'].some(k => s.includes(k))) return 'ai';
  return 'default';
}

// ── Domain colors ───────────────────────────────────────
const domainChipColors: Record<string, { bg: string; text: string; border: string }> = {
  networking: { bg: 'rgba(59, 130, 246, 0.12)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.2)' },
  cloud: { bg: 'rgba(157, 107, 247, 0.12)', text: '#c4b5fd', border: 'rgba(157, 107, 247, 0.2)' },
  devops: { bg: 'rgba(250, 204, 21, 0.12)', text: '#fde68a', border: 'rgba(250, 204, 21, 0.2)' },
  security: { bg: 'rgba(239, 68, 68, 0.12)', text: '#fca5a5', border: 'rgba(239, 68, 68, 0.2)' },
  ai: { bg: 'rgba(34, 197, 94, 0.12)', text: '#86efac', border: 'rgba(34, 197, 94, 0.2)' },
  default: { bg: 'rgba(156, 163, 175, 0.12)', text: '#d1d5db', border: 'rgba(156, 163, 175, 0.2)' },
};

// ── Get primary domain for the cert ─────────────────────
function getPrimaryDomain(skills: string[]): { domain: string; label: string; icon: any } {
  if (!skills || skills.length === 0) return { domain: 'default', label: 'Technique', icon: Layers };
  const domains = skills.map(getSkillDomain);
  const counts: Record<string, number> = {};
  domains.forEach(d => { counts[d] = (counts[d] || 0) + 1; });
  const top = Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0];
  const labels: Record<string, string> = { networking: 'Networking', cloud: 'Cloud', devops: 'DevOps', security: 'Security', ai: 'AI / ML', default: 'Technique' };
  const icons: Record<string, any> = { networking: Network, cloud: Cloud, devops: Server, security: Lock, ai: Cpu, default: Layers };
  return { domain: top, label: labels[top], icon: icons[top] };
}

export function CertificationCard({ certification, variant = 'default', className }: CertificationCardProps) {
  const isCompact = variant === 'compact';
  const level = levelConfig[certification.level] || levelConfig.intermediate;
  const hasVerification = !!certification.verify_url;
  const skills = certification.skills || [];
  const primaryDomain = getPrimaryDomain(skills);
  const [isHovered, setIsHovered] = useState(false);
  const DomainIcon = primaryDomain.icon;

  return (
    <motion.article
      className={cn('relative rounded-xl overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Card with animated border on hover */}
      <div
        className="relative p-[1px] rounded-xl transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${level.border}, rgba(255,255,255,0.08), ${level.border})`
            : 'rgba(255,255,255,0.04)',
        }}
      >
        <div
          className={cn('rounded-xl transition-all duration-300', isCompact ? 'p-4' : 'p-6')}
          style={{
            background: isHovered ? '#151c30' : '#121829',
            boxShadow: isHovered ? `0 8px 32px rgba(0,0,0,0.4), ${level.glow}` : '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <div className="flex items-start gap-5">

            {/* ═══ Zone 1: Logo / Badge ═══ */}
            <motion.div
              className={cn(
                'flex-shrink-0 rounded-xl overflow-hidden relative',
                isCompact ? 'w-14 h-14' : 'w-18 h-18'
              )}
              style={{
                width: isCompact ? 56 : 72,
                height: isCompact ? 56 : 72,
                background: 'rgba(157, 107, 247, 0.06)',
                border: '1px solid rgba(157, 107, 247, 0.15)',
                boxShadow: isHovered ? '0 0 20px rgba(157, 107, 247, 0.15)' : 'none',
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {(getImageUrl(certification.badge_url) || getImageUrl(certification.image_url)) ? (
                <img
                  src={(getImageUrl(certification.badge_url) || getImageUrl(certification.image_url))!}
                  alt={certification.name}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Award className={cn('text-cyber-mauve', isCompact ? 'w-6 h-6' : 'w-8 h-8')} />
                </div>
              )}
              {/* Shimmer overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-700"
                style={{
                  opacity: isHovered ? 0.4 : 0,
                  background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
                  backgroundSize: '200% 100%',
                  animation: isHovered ? 'shimmer 2s infinite' : 'none',
                }}
              />
            </motion.div>

            {/* ═══ Zone 2: Content ═══ */}
            <div className="flex-1 min-w-0">
              {/* Domain indicator + Verified badge */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: domainChipColors[primaryDomain.domain].bg,
                    color: domainChipColors[primaryDomain.domain].text,
                    border: `1px solid ${domainChipColors[primaryDomain.domain].border}`,
                  }}
                >
                  <DomainIcon className="w-2.5 h-2.5" />
                  {primaryDomain.label}
                </span>
                {hasVerification && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-green-400 font-medium">
                    <CheckCircle className="w-3 h-3" /> Vérifiée
                  </span>
                )}
              </div>

              {/* Title - dominant */}
              <h3 className={cn(
                'font-bold text-white transition-colors duration-300 mb-1',
                isCompact ? 'text-base' : 'text-lg',
                isHovered && 'text-cyber-mauve-light'
              )}>
                {certification.name}
              </h3>

              {/* Organization - subdued */}
              <p className="text-gray-500 text-sm mb-3">{certification.issuer}</p>

              {/* Dates */}
              {!isCompact && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(certification.issue_date)}
                  </span>
                  {certification.expiry_date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Exp. {formatDate(certification.expiry_date)}
                    </span>
                  )}
                </div>
              )}

              {/* Skill chips preview */}
              {!isCompact && skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {skills.slice(0, 4).map((skill) => {
                    const domain = getSkillDomain(skill);
                    const colors = domainChipColors[domain];
                    return (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[11px] font-medium"
                        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                  {skills.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[11px] text-gray-600">
                      +{skills.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                <Link
                  to={`/certifications/${certification.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/btn"
                  style={{ color: isHovered ? level.color : '#9d6bf7' }}
                >
                  Voir les détails
                  <ArrowRight
                    className={cn(
                      'w-4 h-4 transition-transform duration-300',
                      isHovered && 'translate-x-1'
                    )}
                  />
                </Link>

                {hasVerification && (
                  <a
                    href={certification.verify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-green-400/70 hover:text-green-400 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Vérifier
                  </a>
                )}
              </div>
            </div>

            {/* ═══ Zone 3: Level Badge ═══ */}
            <motion.div
              className="flex-shrink-0 hidden sm:flex flex-col items-center gap-1"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all duration-300"
                style={{
                  background: level.bg,
                  color: level.color,
                  border: `1px solid ${level.border}`,
                  boxShadow: isHovered ? level.glow : 'none',
                }}
              >
                {level.label}
              </div>
              {skills.length > 0 && (
                <span className="text-[10px] text-gray-600 mt-1">
                  {skills.length} skills
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
