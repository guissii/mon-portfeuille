import { useEffect } from 'react';
import { useCertifications } from '@/hooks/useCertifications';
import { CertificationCard } from '@/components/cards/CertificationCard';
import { Award } from 'lucide-react';

export function Certifications() {
  const { certifications, isLoading } = useCertifications({ status: 'published' });

  useEffect(() => {
    document.title = 'Certifications | Mohammed - Cloud/DevOps/AI';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mes certifications Cloud, DevOps et AI. AWS, Kubernetes, Terraform et plus.');
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-cyber-text mb-4">
              Mes <span className="text-cyber-mauve">Certifications</span>
            </h1>
            <p className="text-cyber-text-muted text-lg max-w-2xl">
              Des certifications reconnues par l'industrie validant mon expertise
              technique en cloud, DevOps et sécurité.
            </p>
          </div>



          {/* Certifications List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="cyber-card h-32 animate-pulse" />
              ))}
            </div>
          ) : certifications.length > 0 ? (
            <div className="space-y-4 stagger-children">
              {certifications.map((certification) => (
                <CertificationCard key={certification.id} certification={certification} />
              ))}
            </div>
          ) : (
            <div className="cyber-card p-12 text-center">
              <Award className="w-16 h-16 text-cyber-mauve mx-auto mb-4" />
              <p className="text-cyber-text-muted">Aucune certification pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
