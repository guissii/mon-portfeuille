import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();

  const githubUrl = settings.github_url || 'https://github.com';
  const linkedinUrl = settings.linkedin_url || 'https://linkedin.com';
  const twitterUrl = settings.twitter_url || 'https://twitter.com';
  const emailAddr = settings.email || 'contact@mohammed.dev';
  const profileName = settings.profile_name || 'Mohammed';

  const footerLinks = {
    navigation: [
      { label: 'Projets', href: '/projects' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Hackathons', href: '/hackathons' },
      { label: 'Engineering', href: '/engineering' },
      { label: 'Agenda', href: '/agenda' },
    ],
    resources: [
      { label: 'GitHub', href: githubUrl, external: true },
      { label: 'LinkedIn', href: linkedinUrl, external: true },
    ],
  };

  const socialLinks = [
    { icon: Github, href: githubUrl, label: 'GitHub' },
    { icon: Linkedin, href: linkedinUrl, label: 'LinkedIn' },
    { icon: Twitter, href: twitterUrl, label: 'Twitter' },
    { icon: Mail, href: `mailto:${emailAddr}`, label: 'Email' },
  ];

  return (
    <footer className="border-t border-white/5 bg-cyber-surface">
      <div className="section-padding py-12 lg:py-16">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-flex items-center gap-3 group mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-cyber-card rounded-lg border border-cyber-yellow/30">
                  <span className="text-cyber-yellow font-bold text-lg font-mono">{profileName[0]}</span>
                </div>
                <div>
                  <span className="text-cyber-text font-semibold">{profileName}</span>
                  <span className="block text-cyber-text-muted text-sm">{settings.profile_title || 'Cloud/DevOps/AI'}</span>
                </div>
              </Link>
              <p className="text-cyber-text-muted text-sm max-w-md mb-6">
                {settings.profile_description || 'Ingenieur Cloud/DevOps/AI specialise dans l\'infrastructure scalable, le CI/CD et l\'observabilite. Disponible pour missions et collaborations.'}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-2.5 rounded-lg bg-cyber-card text-cyber-text-muted hover:text-cyber-mauve hover:bg-cyber-mauve/10 transition-all focus-ring"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-cyber-text font-semibold text-sm uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                {footerLinks.navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-cyber-text-muted hover:text-cyber-mauve text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-cyber-text font-semibold text-sm uppercase tracking-wider mb-4">
                Ressources
              </h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-cyber-text-muted hover:text-cyber-mauve text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cyber-text-muted text-sm">
              {currentYear} {profileName}. Tous droits reserves.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
