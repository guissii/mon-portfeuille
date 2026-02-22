import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn(email, password);
    if (result.success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-mauve/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-yellow/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-cyber-card border border-cyber-mauve/30 flex items-center justify-center">
            <span className="text-cyber-mauve font-bold text-2xl font-mono">M</span>
          </div>
          <h1 className="text-2xl font-bold text-cyber-text">Administration</h1>
          <p className="text-cyber-text-muted mt-1">Connectez-vous pour gérer le portfolio</p>
        </div>

        {/* Login Form */}
        <div className="cyber-card p-8">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 text-sm font-medium">Erreur de connexion</p>
                <p className="text-red-400/80 text-sm">{error.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyber-text mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 cyber-input"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cyber-text mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-text-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 cyber-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-text-muted hover:text-cyber-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full btn-primary flex items-center justify-center gap-2',
                isLoading && 'opacity-70 cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a href="/" className="text-cyber-text-muted hover:text-cyber-mauve transition-colors text-sm">
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}
