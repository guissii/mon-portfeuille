-- Phase 2 Seed Data: Education, Experiences, Articles

-- Education
INSERT INTO education (institution, degree, field, start_date, end_date, description, location, sort_order, status) VALUES
  ('Ecole Nationale des Sciences Appliquees', 'Diplome d''Ingenieur', 'Genie Informatique et Reseaux', '2018-09-01', '2023-06-30', 'Formation d''ingenieur specialisee en informatique, reseaux et systemes distribues. Projets pratiques en cloud computing, cybersecurite et intelligence artificielle.', 'Maroc', 1, 'published'),
  ('Universite Mohammed V', 'Licence', 'Sciences Mathematiques et Informatique', '2016-09-01', '2018-06-30', 'Formation fondamentale en mathematiques, algorithmique et programmation. Bases solides en structures de donnees et complexite.', 'Rabat, Maroc', 2, 'published'),
  ('Lycee Technique', 'Baccalaureat', 'Sciences Mathematiques B', '2014-09-01', '2016-06-30', 'Baccalaureat scientifique option mathematiques avec mention Bien.', 'Maroc', 3, 'published')
ON CONFLICT DO NOTHING;

-- Experiences
INSERT INTO experiences (company, position, start_date, end_date, current, description, responsibilities, technologies, location, sort_order, status) VALUES
  ('TechCloud Solutions', 'Lead DevOps Engineer', '2023-01-01', NULL, true, 'Pilotage de l''infrastructure cloud multi-region pour une plateforme SaaS B2B. Gestion d''une equipe de 4 ingenieurs DevOps.', ARRAY['Architecture et gestion de clusters Kubernetes multi-region','Mise en place de pipelines CI/CD avec GitHub Actions et ArgoCD','Implementation d''une strategie d''observabilite complete (Prometheus, Grafana, Jaeger)','Reduction de 80% des incidents de production','Automatisation de l''infrastructure avec Terraform et Ansible'], ARRAY['AWS','Kubernetes','Terraform','GitHub Actions','ArgoCD','Prometheus','Grafana','Docker','Python','Go'], 'Paris, France', 1, 'published'),
  ('DataStream Corp', 'Cloud Engineer', '2021-06-01', '2022-12-31', false, 'Conception et deploiement d''architectures cloud-native pour des clients du secteur financier. Migration de workloads on-premise vers le cloud.', ARRAY['Migration de 50+ microservices vers AWS EKS','Conception d''architectures haute disponibilite multi-AZ','Mise en place de solutions de securite (WAF, GuardDuty, IAM)','Automatisation des deployements avec Terraform modules','Support et formation des equipes de developpement'], ARRAY['AWS','GCP','Kubernetes','Terraform','Docker','Helm','Jenkins','SonarQube','Python'], 'Paris, France', 2, 'published'),
  ('CyberGuard SARL', 'Stagiaire Securite Informatique', '2020-03-01', '2020-08-31', false, 'Stage de fin d''etudes en cybersecurite. Audit de securite et mise en place de solutions de protection pour les PME.', ARRAY['Audit de securite d''applications web (OWASP Top 10)','Mise en place de solutions SIEM (Splunk)','Configuration de firewalls et systemes de detection d''intrusion','Redaction de rapports de vulnerabilites et recommandations'], ARRAY['Kali Linux','Wireshark','Nmap','Splunk','Metasploit','OWASP ZAP','Python'], 'Casablanca, Maroc', 3, 'published')
ON CONFLICT DO NOTHING;

-- Engineering Articles
INSERT INTO articles (title, slug, excerpt, content, category, read_time, tags, status, featured) VALUES
  ('Architecture d''une plateforme multi-tenant sur Kubernetes', 'architecture-multi-tenant-kubernetes', 'Comment concevoir une architecture Kubernetes scalable et securisee pour supporter des milliers de tenants avec isolation reseau et gestion des ressources.', 'Cet article explore en detail les patterns d''architecture pour construire une plateforme multi-tenant sur Kubernetes. Nous aborderons l''isolation par namespace, les NetworkPolicies, les ResourceQuotas, et les strategies de deploiement par tenant.', 'architecture', 12, ARRAY['Kubernetes','Architecture','Multi-tenant','Cloud Native'], 'published', true),
  ('GitOps avec ArgoCD: retour d''experience', 'gitops-argocd-retour-experience', 'Apres 2 ans d''utilisation d''ArgoCD en production, voici les lecons apprises et les meilleures pratiques pour un deploiement GitOps reussi.', 'Le GitOps est devenu le standard de facto pour le deploiement sur Kubernetes. Dans cet article, je partage mon experience avec ArgoCD, les pieges a eviter et les patterns qui fonctionnent a grande echelle.', 'cicd', 8, ARRAY['GitOps','ArgoCD','CI/CD','Kubernetes'], 'published', true),
  ('Observabilite moderne: au-dela des logs', 'observabilite-moderne-au-dela-logs', 'Pourquoi les logs seuls ne suffisent plus et comment implementer une veritable observabilite avec metriques, traces distribuees et alerting intelligent.', 'L''observabilite est un pilier essentiel de toute infrastructure cloud-native. Cet article presente une approche complete combinant logs structures, metriques (Prometheus), traces distribuees (Jaeger) et alerting (PagerDuty).', 'observability', 10, ARRAY['Observabilite','Prometheus','Grafana','Jaeger','Monitoring'], 'published', true),
  ('Securiser un cluster Kubernetes en production', 'securiser-cluster-kubernetes-production', 'Guide pratique pour durcir la securite d''un cluster Kubernetes: RBAC, Pod Security Standards, Network Policies, secrets management avec Vault.', 'La securite sur Kubernetes ne se limite pas aux RBAC. Cet article couvre les Pod Security Standards, les NetworkPolicies, l''integration avec HashiCorp Vault pour la gestion des secrets, et les bonnes pratiques de scanning d''images.', 'security', 15, ARRAY['Kubernetes','Securite','RBAC','Vault','DevSecOps'], 'published', false),
  ('Optimisation des couts cloud: guide FinOps', 'optimisation-couts-cloud-finops', 'Strategies concretes pour reduire vos factures cloud de 30 a 50% sans compromettre les performances. Tagging, rightsizing, reserved instances et spot.', 'Le FinOps est une discipline essentielle pour maitriser les depenses cloud. Cet article presente des strategies eprouvees: tagging systematique, rightsizing des instances, utilisation de reserved instances et spot instances.', 'finops', 8, ARRAY['FinOps','AWS','Couts','Optimisation','Cloud'], 'published', false)
ON CONFLICT (slug) DO NOTHING;

-- Additional timeline events for education and experiences
INSERT INTO timeline_events (title, description, event_date, event_type, icon, color) VALUES
  ('Diplome d''Ingenieur', 'Obtention du diplome d''ingenieur en Genie Informatique et Reseaux', '2023-06-30', 'formation', 'GraduationCap', '#3b82f6'),
  ('Lead DevOps Engineer', 'Debut du poste de Lead DevOps chez TechCloud Solutions', '2023-01-01', 'milestone', 'Briefcase', '#f97316'),
  ('Cloud Engineer', 'Debut du poste chez DataStream Corp', '2021-06-01', 'milestone', 'Briefcase', '#f97316'),
  ('Stage Cybersecurite', 'Stage de fin d''etudes chez CyberGuard SARL', '2020-03-01', 'milestone', 'Shield', '#ef4444')
ON CONFLICT DO NOTHING;

-- Add more projects to make the portfolio richer
INSERT INTO projects (slug, title, tagline, description, problem, solution, impact, stack, cover_image, github_url, role, team_size, duration, status, featured, category_id)
SELECT
  'cicd-platform',
  'Plateforme CI/CD Enterprise',
  'Pipeline CI/CD unifie pour 20+ equipes de developpement',
  'Conception d''une plateforme CI/CD centralisee supportant plusieurs langages et frameworks avec des templates reutilisables.',
  'Chaque equipe avait son propre pipeline CI/CD, causant de la fragmentation et des problemes de securite.',
  'Plateforme centralisee avec templates standardises, gates de qualite et deploiement automatise.',
  'Temps de release reduit de 3 jours a 2 heures. Couverture de tests passee de 40% a 85%.',
  '{"infrastructure":["AWS","ECS","ECR"],"cicd":["GitHub Actions","SonarQube","Trivy"],"application":["Node.js","Java","Python"],"monitoring":["Datadog","PagerDuty"]}'::jsonb,
  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
  'https://github.com',
  'DevOps Lead',
  5,
  '4 mois',
  'published',
  false,
  c.id
FROM categories c WHERE c.slug = 'devops'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO projects (slug, title, tagline, description, stack, cover_image, github_url, role, duration, status, featured, category_id)
SELECT
  'network-monitoring',
  'Monitoring Reseau SDN',
  'Supervision en temps reel d''une infrastructure reseau SDN',
  'Systeme de monitoring avance pour une infrastructure SDN avec detection d''anomalies et alerting automatise.',
  '{"infrastructure":["OpenStack","OVS","ONOS"],"application":["Python","Elasticsearch","Kibana"],"monitoring":["Zabbix","Telegraf","InfluxDB"]}'::jsonb,
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  'https://github.com',
  'Network Engineer',
  '3 mois',
  'published',
  false,
  c.id
FROM categories c WHERE c.slug = 'reseau'
ON CONFLICT (slug) DO NOTHING;
