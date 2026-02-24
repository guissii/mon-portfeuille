import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, Zap, ArrowRight, Github, ExternalLink, Award, Code, Cloud, Server, Brain, Shield, Rocket, Globe, Lightbulb, Target, GitBranch, BarChart3, Flame, Building2, Smartphone, Terminal, Palette, Microscope, Monitor, Link as LinkIcon } from 'lucide-react';
import { cn, formatDate, getImageUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Hackathon } from '@/types';

// ── Icon map (admin-selectable) ─────────────────────────
const iconMap: Record<string, any> = {
  Trophy, Cloud, Server, Brain, Shield, Rocket, Globe, Zap, Lightbulb, Target,
  GitBranch, BarChart3, Flame, Building2, Smartphone, Terminal, Palette, Microscope, Monitor, Link: LinkIcon,
};

interface HackathonCardProps {
  hackathon: Hackathon;
  variant?: 'default' | 'compact' | 'timeline';
  className?: string;
}

// ── Result config (dynamic colors per position) ────────
const resultConfig: Record<string, { label: string; emoji: string; color: string; bg: string; border: string; glow: string }> = {
  winner: { label: '1st Place', emoji: '🥇', color: '#facc15', bg: 'rgba(250, 204, 21, 0.12)', border: 'rgba(250, 204, 21, 0.3)', glow: '0 0 16px rgba(250, 204, 21, 0.25)' },
  top3: { label: 'Top 3', emoji: '🥉', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.12)', border: 'rgba(251, 146, 60, 0.3)', glow: '0 0 16px rgba(251, 146, 60, 0.25)' },
  finalist: { label: 'Finaliste', emoji: '🏆', color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.12)', border: 'rgba(167, 139, 250, 0.3)', glow: '0 0 16px rgba(167, 139, 250, 0.25)' },
  top5: { label: 'Top 5', emoji: '⭐', color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)', border: 'rgba(96, 165, 250, 0.3)', glow: '0 0 16px rgba(96, 165, 250, 0.25)' },
  participant: { label: 'Participant', emoji: '🎯', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.08)', border: 'rgba(148, 163, 184, 0.2)', glow: 'none' },
};

// ── Tech domain detection ───────────────────────────────
function getTechDomain(tech: string): string {
  const t = tech.toLowerCase();
  if (['react', 'vue', 'angular', 'next', 'svelte', 'html', 'css', 'tailwind', 'typescript', 'javascript'].some(k => t.includes(k))) return 'frontend';
  if (['node', 'express', 'fastapi', 'django', 'flask', 'spring', 'nest', 'python', 'go', 'rust'].some(k => t.includes(k))) return 'backend';
  if (['docker', 'kubernetes', 'k8s', 'terraform', 'ansible', 'jenkins', 'ci/cd', 'argocd', 'helm', 'gitops'].some(k => t.includes(k))) return 'devops';
  if (['aws', 'azure', 'gcp', 'cloud', 'lambda', 's3', 'ec2'].some(k => t.includes(k))) return 'cloud';
  if (['tensorflow', 'pytorch', 'openai', 'ml', 'ai', 'gpt', 'llm', 'transformers'].some(k => t.includes(k))) return 'ai';
  if (['postgres', 'mysql', 'mongodb', 'redis', 'sqlite', 'prisma', 'supabase'].some(k => t.includes(k))) return 'data';
  return 'other';
}

const techDomainColors: Record<string, { bg: string; text: string; border: string }> = {
  frontend: { bg: 'rgba(96, 165, 250, 0.12)', text: '#93c5fd', border: 'rgba(96, 165, 250, 0.2)' },
  backend: { bg: 'rgba(74, 222, 128, 0.12)', text: '#86efac', border: 'rgba(74, 222, 128, 0.2)' },
  devops: { bg: 'rgba(250, 204, 21, 0.12)', text: '#fde68a', border: 'rgba(250, 204, 21, 0.2)' },
  cloud: { bg: 'rgba(157, 107, 247, 0.12)', text: '#c4b5fd', border: 'rgba(157, 107, 247, 0.2)' },
  ai: { bg: 'rgba(248, 113, 113, 0.12)', text: '#fca5a5', border: 'rgba(248, 113, 113, 0.2)' },
  data: { bg: 'rgba(45, 212, 191, 0.12)', text: '#5eead4', border: 'rgba(45, 212, 191, 0.2)' },
  other: { bg: 'rgba(156, 163, 175, 0.10)', text: '#d1d5db', border: 'rgba(156, 163, 175, 0.15)' },
};

export function HackathonCard({ hackathon, variant = 'default', className }: HackathonCardProps) {
  const isCompact = variant === 'compact';
  const result = resultConfig[hackathon.result] || resultConfig.participant;
  const [isHovered, setIsHovered] = useState(false);
  const mainImage = getImageUrl(hackathon.images?.[0]);
  const techStack = hackathon.tech_stack || [];
  const showPosition = hackathon.show_position !== false; // default true

  // Timeline variant
  if (variant === 'timeline') {
    return (
      <motion.article
        className={cn('relative pl-8 pb-8 last:pb-0', className)}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, rgba(157,107,247,0.4), rgba(255,255,255,0.04))' }} />
        <div
          className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{ background: result.color, boxShadow: `0 0 8px ${result.color}60` }}
        />
        <Link to={`/hackathons/${hackathon.slug}`}>
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: '#121829',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {showPosition && (
                    <span className="text-xs font-bold" style={{ color: result.color }}>
                      {result.emoji} {result.label}
                    </span>
                  )}
                  {hackathon.event_date && <span className="text-gray-600 text-xs">{formatDate(hackathon.event_date)}</span>}
                </div>
                <h3 className="font-semibold text-white text-sm">{hackathon.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{hackathon.organizer}</p>
              </div>
              <ArrowRight className={cn('w-4 h-4 text-gray-600 transition-all duration-300', isHovered && 'text-cyber-mauve translate-x-1')} />
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Default card
  return (
    <motion.article
      className={cn('relative rounded-xl overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="relative p-[1px] rounded-xl transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${result.border}, rgba(255,255,255,0.06), ${result.border})`
            : 'rgba(255,255,255,0.04)',
        }}
      >
        <div
          className={cn('rounded-xl transition-all duration-300', isCompact ? 'p-4' : 'p-6')}
          style={{
            background: isHovered ? '#151c30' : '#121829',
            boxShadow: isHovered ? `0 12px 40px rgba(0,0,0,0.4), ${result.glow}` : '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <div className="flex items-start gap-5">

            {/* ═══ Zone 1: Event Logo / Icon ═══ */}
            <motion.div
              className="flex-shrink-0 rounded-xl overflow-hidden relative"
              style={{
                width: isCompact ? 56 : 72,
                height: isCompact ? 56 : 72,
                background: result.bg,
                border: `1px solid ${result.border}`,
                boxShadow: isHovered ? result.glow : 'none',
              }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.2 }}
            >
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={hackathon.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (() => {
                const IconComp = iconMap[hackathon.icon || 'Trophy'] || Trophy;
                return (
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComp className="w-8 h-8" style={{ color: result.color }} />
                  </div>
                );
              })()}
            </motion.div>

            {/* ═══ Zone 2: Content ═══ */}
            <div className="flex-1 min-w-0">
              {/* Result badge + Duration */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {showPosition && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: result.bg,
                      color: result.color,
                      border: `1px solid ${result.border}`,
                    }}
                  >
                    {result.emoji} {result.label}
                  </span>
                )}
                {hackathon.duration && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-gray-500">
                    <Zap className="w-2.5 h-2.5" /> {hackathon.duration}
                  </span>
                )}
                {hackathon.show_score && hackathon.score && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold"
                    style={{
                      background: 'rgba(250, 204, 21, 0.1)',
                      color: '#fde68a',
                      border: '1px solid rgba(250, 204, 21, 0.2)',
                    }}
                  >
                    Score: {hackathon.score}/100
                  </span>
                )}
              </div>

              {/* Title — dominant */}
              <h3 className={cn(
                'font-bold text-white transition-colors duration-300 mb-1',
                isCompact ? 'text-base' : 'text-lg',
                isHovered && 'text-cyber-mauve-light'
              )}>
                {hackathon.name}
              </h3>

              {/* Organizer */}
              <p className="text-gray-500 text-sm mb-1">{hackathon.organizer}</p>

              {/* Project name + Role */}
              {!isCompact && hackathon.project_name && (
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-gray-400">
                    <Code className="w-3 h-3" />
                    {hackathon.project_name}
                  </span>
                  {hackathon.role && (
                    <span className="text-gray-600">• {hackathon.role}</span>
                  )}
                </div>
              )}

              {/* Meta row: date + team size */}
              {!isCompact && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                  {hackathon.event_date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(hackathon.event_date)}
                    </span>
                  )}
                  {hackathon.team_size && (
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {hackathon.team_size} personnes
                    </span>
                  )}
                </div>
              )}

              {/* Tech stack chips */}
              {!isCompact && techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {techStack.slice(0, 5).map((tech) => {
                    const domain = getTechDomain(tech);
                    const colors = techDomainColors[domain];
                    return (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-medium"
                        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                      >
                        {tech}
                      </span>
                    );
                  })}
                  {techStack.length > 5 && (
                    <span className="px-2 py-0.5 rounded text-[11px] text-gray-600">
                      +{techStack.length - 5}
                    </span>
                  )}
                </div>
              )}

              {/* CTA + Links */}
              <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                <Link
                  to={`/hackathons/${hackathon.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                  style={{ color: isHovered ? result.color : '#9d6bf7' }}
                >
                  Voir les détails
                  <ArrowRight className={cn('w-4 h-4 transition-transform duration-300', isHovered && 'translate-x-1')} />
                </Link>

                <div className="flex items-center gap-2 ml-auto">
                  {hackathon.repo_url && (
                    <a href={hackathon.repo_url} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-all"
                      onClick={(e) => e.stopPropagation()}>
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {hackathon.demo_url && (
                    <a href={hackathon.demo_url} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-all"
                      onClick={(e) => e.stopPropagation()}>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {hackathon.certificate_url && (
                    <a href={hackathon.certificate_url} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-all"
                      onClick={(e) => e.stopPropagation()}>
                      <Award className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* ═══ Zone 3: Result Badge (desktop only) ═══ */}
            {showPosition && (
              <motion.div
                className="flex-shrink-0 hidden sm:flex flex-col items-center gap-1"
                animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300"
                  style={{
                    background: result.bg,
                    border: `1px solid ${result.border}`,
                    boxShadow: isHovered ? result.glow : 'none',
                  }}
                >
                  {result.emoji}
                </div>
                <span className="text-[9px] text-gray-600 uppercase tracking-wider font-bold mt-1 text-center leading-tight w-14">
                  {result.label}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
