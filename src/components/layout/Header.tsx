import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/hooks/useSettings';

const navItems = [
  { label: 'Projets', href: '/projects' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Hackathons', href: '/hackathons' },
  { label: 'Engineering', href: '/engineering' },
  { label: 'Agenda', href: '/agenda' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const githubUrl = settings.github_url || 'https://github.com';
  const linkedinUrl = settings.linkedin_url || 'https://linkedin.com';
  const emailAddr = settings.email || 'contact@mohammed.dev';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'py-0 border-b border-white/5'
          : 'py-1'
      )}
      style={isScrolled ? {
        background: 'rgba(10, 10, 20, 0.75)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
      } : { background: 'transparent' }}
    >
      <div className="section-padding">
        <div className="container-max">
          <div className={cn(
            'flex items-center justify-between transition-all duration-500',
            isScrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'
          )}>
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus-ring rounded-lg"
              aria-label="Accueil"
            >
              <div className="relative w-10 h-10 flex items-center justify-center bg-cyber-card rounded-lg border border-cyber-yellow/30 group-hover:border-cyber-yellow transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                <span className="text-cyber-yellow font-bold text-lg font-mono">M</span>
                <div className="absolute inset-0 rounded-lg bg-cyber-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <span className="text-cyber-text font-semibold text-sm">{settings.profile_name || 'Mohammed'}</span>
                <span className="block text-cyber-text-muted text-xs">{settings.profile_title || 'Cloud/DevOps/AI'}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus-ring',
                    isActive(item.href)
                      ? 'text-cyber-mauve'
                      : 'text-cyber-text-muted hover:text-cyber-text hover:bg-white/5'
                  )}
                >
                  {item.label}
                  {/* Animated active underline */}
                  {isActive(item.href) && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                      style={{
                        width: '60%',
                        background: 'linear-gradient(90deg, transparent, #9d6bf7, transparent)',
                        boxShadow: '0 0 8px rgba(157, 107, 247, 0.5)',
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Social Links - Desktop */}
              <div className="hidden md:flex items-center gap-1">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5 transition-all focus-ring"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5 transition-all focus-ring"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${emailAddr}`}
                  className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5 transition-all focus-ring"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              {/* CTA Button - Desktop */}
              <Link
                to="/agenda"
                className="hidden sm:inline-flex btn-primary text-sm"
              >
                Reserver 15 min
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-cyber-text hover:bg-white/5 transition-colors focus-ring"
                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-cyber-black/95 backdrop-blur-cyber border-b border-white/5 transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <nav className="section-padding py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'block px-4 py-3 rounded-lg text-base font-medium transition-all focus-ring',
                isActive(item.href)
                  ? 'text-cyber-mauve bg-cyber-mauve/10'
                  : 'text-cyber-text-muted hover:text-cyber-text hover:bg-white/5'
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Social Links */}
          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-white/5">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5 transition-all"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5 transition-all"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>

          <Link
            to="/agenda"
            className="block w-full btn-primary text-center mt-4"
          >
            Reserver 15 min
          </Link>
        </nav>
      </div>
    </header>
  );
}
