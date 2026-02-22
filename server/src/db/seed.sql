-- Seed Data for Portfolio

-- Categories
INSERT INTO categories (name, slug, description, icon, color, sort_order) VALUES
  ('Cloud', 'cloud', 'Projets d''infrastructure cloud (AWS, GCP, Azure)', 'Cloud', '#9d6bf7', 1),
  ('DevOps', 'devops', 'CI/CD, automation, infrastructure as code', 'GitBranch', '#facc15', 2),
  ('Cybersecurite', 'cybersecurite', 'Securite informatique, audit, pentest', 'Shield', '#ef4444', 3),
  ('Reseau', 'reseau', 'Architecture reseau, SDN, monitoring', 'Network', '#22c55e', 4),
  ('Intelligence Artificielle', 'intelligence-artificielle', 'Machine Learning, Deep Learning, MLOps', 'Brain', '#3b82f6', 5),
  ('Developpement', 'developpement', 'Applications web, API, microservices', 'Code', '#f97316', 6)
ON CONFLICT (slug) DO NOTHING;

-- Admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, role) VALUES
  ('admin@portfolio.dev', '$2a$12$vxPJDqAvohjI1.Qp44.Fb.7w8ImCIA9g9eeJTuI2cAqiQw8B4HKi.', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Site Settings
INSERT INTO site_settings (key, value) VALUES
  ('github_url', 'https://github.com'),
  ('linkedin_url', 'https://linkedin.com'),
  ('twitter_url', 'https://twitter.com'),
  ('email', 'contact@mohammed.dev'),
  ('profile_name', 'Mohammed'),
  ('profile_title', 'Cloud / DevOps / AI'),
  ('profile_description', 'Ingenieur infrastructure specialise dans le cloud scalable, le CI/CD et l''observabilite. Je construis des systemes robustes et mesurables.'),
  ('profile_photo', ''),
  ('years_experience', '5+'),
  ('projects_count', '15+'),
  ('certifications_count', '10+')
ON CONFLICT (key) DO NOTHING;

-- Demo Projects
INSERT INTO projects (slug, title, tagline, description, problem, solution, impact, metrics, stack, learnings, cover_image, gallery, github_url, role, team_size, duration, status, featured, category_id)
SELECT
  'infrastructure-multi-cloud',
  'Infrastructure Multi-Cloud',
  'Architecture Kubernetes multi-region avec Terraform et GitOps',
  'Ce projet consiste en la conception et le deploiement d''une infrastructure cloud-native scalable supportant plus de 50 microservices repartis sur 3 regions AWS.',
  'Les equipes de developpement deployaient manuellement sur des VMs, causant des downtimes frequents.',
  'Migration vers Kubernetes avec infrastructure as code, CI/CD automatise et observabilite complete.',
  'Reduction de 80% des incidents de production et deploiement 10x plus rapide.',
  '[{"label":"Uptime","value":"99.99","unit":"%"},{"label":"Regions","value":"3"},{"label":"Services","value":"50+"},{"label":"Deployments/jour","value":"120"}]'::jsonb,
  '{"infrastructure":["AWS","EKS","Terraform","VPC"],"cicd":["GitHub Actions","ArgoCD","Helm"],"application":["Node.js","Go","Python"],"monitoring":["Prometheus","Grafana","Jaeger"]}'::jsonb,
  ARRAY['La gestion des secrets multi-regions necessite une solution centralisee comme Vault','Les service mesh ajoutent de la complexite mais sont essentiels','Les tests de chaos engineering permettent de detecter les points de defaillance'],
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1667372393119-c8f473882e8e?w=600&q=80','https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80'],
  'https://github.com',
  'Lead DevOps Engineer',
  8,
  '6 mois',
  'published',
  true,
  c.id
FROM categories c WHERE c.slug = 'cloud'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO projects (slug, title, tagline, description, problem, solution, impact, metrics, stack, learnings, cover_image, github_url, role, team_size, duration, status, featured, category_id)
SELECT
  'mlops-pipeline',
  'MLOps Pipeline',
  'Pipeline CI/CD pour modeles de machine learning avec monitoring',
  'Plateforme MLOps complete permettant aux data scientists de deployer des modeles en production.',
  'Les modeles ML restaient bloques en recherche, difficiles a deployer et monitorer en production.',
  'Pipeline end-to-end avec versioning des donnees, entrainement automatise, et monitoring des performances.',
  'Temps de mise en production des modeles reduit de 3 semaines a 2 jours.',
  '[{"label":"Modeles deployes","value":"25"},{"label":"Predictions/jour","value":"10M"},{"label":"Latence p99","value":"45","unit":"ms"}]'::jsonb,
  '{"infrastructure":["GCP","Vertex AI","Kubernetes"],"cicd":["Kubeflow","MLflow"],"application":["Python","TensorFlow","FastAPI"],"monitoring":["Evidently AI","Prometheus"]}'::jsonb,
  ARRAY['Le drift des donnees est plus critique que le drift des modeles','Les feature stores sont essentiels pour la coherence training/serving'],
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  'https://github.com',
  'ML Engineer',
  5,
  '4 mois',
  'published',
  true,
  c.id
FROM categories c WHERE c.slug = 'intelligence-artificielle'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO projects (slug, title, tagline, description, problem, solution, impact, metrics, stack, learnings, cover_image, github_url, role, team_size, duration, status, featured, category_id)
SELECT
  'security-automation',
  'Security Automation',
  'Scanning de vulnerabilites et remediation automatisee',
  'Implementation d''une chaine de securite DevSecOps avec scanning automatise a chaque etape du pipeline.',
  'Les audits de securite manuels ralentissaient les releases et manquaient de vulnerabilites.',
  'Integration de scanners SAST/DAST/SCA dans le CI/CD avec tickets JIRA automatiques.',
  '90% des vulnerabilites critiques detectees avant la production.',
  '[{"label":"Vulnerabilites trouvees","value":"450+"},{"label":"Temps de remediation","value":"-70","unit":"%"}]'::jsonb,
  '{"infrastructure":["AWS","WAF","GuardDuty"],"cicd":["GitLab CI","Trivy","SonarQube"],"application":["Python","Lambda"],"monitoring":["Splunk","PagerDuty"]}'::jsonb,
  ARRAY['Les faux positifs sont le plus grand defi de l''automatisation securite','La priorisation par CVSS seule est insuffisante'],
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  'https://github.com',
  'Security Engineer',
  3,
  '3 mois',
  'published',
  false,
  c.id
FROM categories c WHERE c.slug = 'cybersecurite'
ON CONFLICT (slug) DO NOTHING;

-- Demo Certifications
INSERT INTO certifications (slug, name, issuer, issue_date, expiry_date, credential_id, verify_url, description, skills, level, status, featured, image_url) VALUES
  ('aws-solutions-architect-professional', 'AWS Solutions Architect - Professional', 'Amazon Web Services', '2024-01-10', '2027-01-10', 'AWS-SAP-123456', 'https://www.credly.com/badges/example', 'Certification de niveau expert demontrant la capacite a concevoir des architectures AWS complexes, hautement disponibles et securisees.', ARRAY['AWS','Architecture','High Availability','Security','Cost Optimization'], 'expert', 'published', true, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80'),
  ('cka-certified-kubernetes-administrator', 'Certified Kubernetes Administrator (CKA)', 'Cloud Native Computing Foundation', '2023-08-15', '2026-08-15', 'CKA-789012', 'https://www.cncf.io/certification/example', 'Certification pratique validant les competences en administration de clusters Kubernetes.', ARRAY['Kubernetes','Containers','Scheduling','Networking','Troubleshooting'], 'advanced', 'published', true, NULL),
  ('terraform-associate', 'HashiCorp Certified: Terraform Associate', 'HashiCorp', '2023-05-20', '2025-05-20', 'TF-345678', NULL, 'Certification sur les bonnes pratiques Terraform et l''Infrastructure as Code.', ARRAY['Terraform','IaC','HCL','State Management'], 'intermediate', 'published', false, NULL)
ON CONFLICT (slug) DO NOTHING;

-- Demo Hackathons
INSERT INTO hackathons (slug, name, organizer, event_date, duration, result, project_name, project_description, role, team_size, team_members, problem, solution, implementation, learnings, tech_stack, demo_url, repo_url, images, status, featured) VALUES
  ('hackathon-devops-2024', 'DevOps World Hackathon 2024', 'Cloud Native Foundation', '2024-02-15', '48h', 'winner', 'AutoRemediate', 'Plateforme de remediation automatique des incidents basee sur l''IA generative.', 'Lead Infrastructure', 4, ARRAY['Alice Chen','Bob Martin','Carol White'], 'Les equipes SRE passent 70% de leur temps sur des incidents recurrents.', 'Un systeme qui analyse les logs, identifie les patterns d''incidents et applique automatiquement les runbooks.', 'Stack: Kubernetes, OpenAI API, Prometheus, custom operators. Deploiement GitOps avec ArgoCD.', ARRAY['L''IA est excellente pour l''analyse de logs mais necessite une validation humaine','Les runbooks doivent etre versionnes comme du code'], ARRAY['Kubernetes','Python','OpenAI','Prometheus','React'], 'https://demo.example.com', 'https://github.com', ARRAY['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80'], 'published', true),
  ('ai-hackathon-paris', 'AI for Good Hackathon Paris', 'Google for Startups', '2023-11-20', '24h', 'finalist', 'GreenCloud Optimizer', 'Optimisation de la consommation energetique des workloads cloud avec ML.', 'ML Engineer', 3, ARRAY['David Lee','Emma Garcia'], 'Le cloud represente 4% des emissions mondiales de CO2.', 'Algorithme de scheduling intelligent qui deplace les workloads vers des regions avec energie verte.', 'Modele de prediction de la charge + API AWS/GCP pour le scheduling.', ARRAY['L''optimisation energetique peut aussi reduire les couts','Les donnees carbone des cloud providers manquent de granularite'], ARRAY['Python','TensorFlow','AWS','FastAPI'], NULL, 'https://github.com', '{}', 'published', true)
ON CONFLICT (slug) DO NOTHING;

-- Timeline Events
INSERT INTO timeline_events (title, description, event_date, event_type, icon, color) VALUES
  ('Certification AWS SAP', 'Obtention de la certification AWS Solutions Architect Professional', '2024-01-10', 'certification', 'Award', '#facc15'),
  ('Hackathon DevOps World', 'Victoire au DevOps World Hackathon 2024 avec AutoRemediate', '2024-02-15', 'hackathon', 'Trophy', '#22c55e'),
  ('Projet Multi-Cloud', 'Lancement de l''infrastructure multi-cloud en production', '2024-01-15', 'project', 'Cloud', '#9d6bf7'),
  ('MLOps Pipeline', 'Deploiement de la plateforme MLOps en production', '2024-02-01', 'project', 'Brain', '#3b82f6'),
  ('Certification CKA', 'Obtention du Certified Kubernetes Administrator', '2023-08-15', 'certification', 'Award', '#facc15'),
  ('Hackathon AI Paris', 'Finaliste au AI for Good Hackathon Paris', '2023-11-20', 'hackathon', 'Trophy', '#22c55e'),
  ('Certification Terraform', 'HashiCorp Certified: Terraform Associate', '2023-05-20', 'certification', 'Award', '#facc15'),
  ('Debut de carriere Cloud', 'Premiere mission en tant qu''ingenieur Cloud', '2021-09-01', 'milestone', 'Zap', '#f97316')
ON CONFLICT DO NOTHING;
