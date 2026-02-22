import { useEffect } from 'react';
import { useHackathons } from '@/hooks/useHackathons';
import { HackathonCard } from '@/components/cards/HackathonCard';
import { Trophy } from 'lucide-react';

export function Hackathons() {
  const { hackathons, isLoading } = useHackathons({ status: 'published' });

  useEffect(() => {
    document.title = 'Hackathons | Mohammed - Cloud/DevOps/AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mes participations aux hackathons et compétitions. Gagnant, finaliste et projets innovants.');
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-cyber-text mb-4">
              Hackathons <span className="text-cyber-mauve">& Compétitions</span>
            </h1>
            <p className="text-cyber-text-muted text-lg max-w-2xl">
              Des expériences intenses de 24 à 48h pour résoudre des problèmes complexes,
              innover sous pression et collaborer avec des équipes talentueuses.
            </p>
          </div>

          {/* Timeline View */}
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="cyber-card h-40 animate-pulse" />
              ))}
            </div>
          ) : hackathons.length > 0 ? (
            <div className="space-y-6">
              {hackathons.map((hackathon) => (
                <HackathonCard
                  key={hackathon.id}
                  hackathon={hackathon}
                  variant="timeline"
                />
              ))}
            </div>
          ) : (
            <div className="cyber-card p-12 text-center">
              <Trophy className="w-16 h-16 text-cyber-mauve mx-auto mb-4" />
              <p className="text-cyber-text-muted">Aucun hackathon pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
