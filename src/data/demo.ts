// Données de démonstration pour le portfolio

export const demoProjects = [
  {
    id: '1',
    slug: 'infrastructure-multi-cloud',
    title: 'Infrastructure Multi-Cloud',
    tagline: 'Architecture Kubernetes multi-région avec Terraform et GitOps',
    description: `Ce projet consiste en la conception et le déploiement d'une infrastructure cloud-native scalable supportant plus de 50 microservices répartis sur 3 régions AWS (us-east-1, eu-west-1, ap-southeast-1).

L'architecture repose sur des clusters Kubernetes EKS managés avec autoscaling automatique des nœuds et des pods. L'infrastructure est entièrement codifiée avec Terraform et gérée via un workflow GitOps avec ArgoCD.

Les défis principaux étaient:
- Garantir la haute disponibilité avec un SLA de 99.99%
- Implémenter un déploiement zero-downtime
- Gérer la latence inter-régions pour les services temps réel
- Maintenir la cohérence des données entre les régions`,
    problem: 'Les équipes de développement déployaient manuellement sur des VMs, causant des downtimes fréquents et une scalabilité limitée.',
    solution: 'Migration vers Kubernetes avec infrastructure as code, CI/CD automatisé et observabilité complète.',
    impact: 'Réduction de 80% des incidents de production et déploiement 10x plus rapide.',
    status: 'published',
    featured: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-02-20T00:00:00Z',
    role: 'Lead DevOps Engineer',
    team_size: 8,
    duration: '6 mois',
    cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1667372393119-c8f473882e8e?w=600&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80'
    ],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    metrics: [
      { label: 'Uptime', value: '99.99', unit: '%' },
      { label: 'Régions', value: '3' },
      { label: 'Services', value: '50+' },
      { label: 'Déploiements/jour', value: '120' }
    ],
    stack: {
      infrastructure: ['AWS', 'EKS', 'Terraform', 'VPC'],
      cicd: ['GitHub Actions', 'ArgoCD', 'Helm'],
      application: ['Node.js', 'Go', 'Python'],
      monitoring: ['Prometheus', 'Grafana', 'Jaeger']
    },
    learnings: [
 'La gestion des secrets multi-régions nécessite une solution centralisée comme Vault',
      'Les service mesh (Istio) ajoutent de la complexité mais sont essentiels pour le traffic management',
      'Les tests de chaos engineering permettent de détecter les points de défaillance avant la production'
    ]
  },
  {
    id: '2',
    slug: 'mlops-pipeline',
    title: 'MLOps Pipeline',
    tagline: 'Pipeline CI/CD pour modèles de machine learning avec monitoring',
    description: 'Plateforme MLOps complète permettant aux data scientists de déployer des modèles en production avec la même rigueur que le code applicatif.',
    problem: 'Les modèles ML restaient bloqués en recherche, difficiles à déployer et monitorer en production.',
    solution: 'Pipeline end-to-end avec versioning des données, entraînement automatisé, et monitoring des performances des modèles.',
    impact: 'Temps de mise en production des modèles réduit de 3 semaines à 2 jours.',
    status: 'published',
    featured: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-25T00:00:00Z',
    role: 'ML Engineer',
    team_size: 5,
    duration: '4 mois',
    cover_image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    gallery: [],
    github_url: 'https://github.com',
    metrics: [
      { label: 'Modèles déployés', value: '25' },
      { label: 'Prédictions/jour', value: '10M' },
      { label: 'Latence p99', value: '45', unit: 'ms' }
    ],
    stack: {
      infrastructure: ['GCP', 'Vertex AI', 'Kubernetes'],
      cicd: ['Kubeflow', 'MLflow'],
      application: ['Python', 'TensorFlow', 'FastAPI'],
      monitoring: ['Evidently AI', 'Prometheus']
    },
    learnings: [
      'Le drift des données est plus critique que le drift des modèles',
      'Les feature stores sont essentiels pour la cohérence training/serving'
    ]
  },
  {
    id: '3',
    slug: 'security-automation',
    title: 'Security Automation',
    tagline: 'Scanning de vulnérabilités et remédiation automatisée',
    description: 'Implémentation d\'une chaîne de sécurité DevSecOps avec scanning automatisé à chaque étape du pipeline.',
    problem: 'Les audits de sécurité manuels ralentissaient les releases et manquaient de vulnérabilités.',
    solution: 'Intégration de scanners SAST/DAST/SCA dans le CI/CD avec tickets JIRA automatiques.',
    impact: '90% des vulnérabilités critiques détectées avant la production.',
    status: 'published',
    featured: false,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z',
    role: 'Security Engineer',
    team_size: 3,
    duration: '3 mois',
    cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    gallery: [],
    github_url: 'https://github.com',
    metrics: [
      { label: 'Vulnérabilités trouvées', value: '450+' },
      { label: 'Temps de remédiation', value: '-70', unit: '%' }
    ],
    stack: {
      infrastructure: ['AWS', 'WAF', 'GuardDuty'],
      cicd: ['GitLab CI', 'Trivy', 'SonarQube'],
      application: ['Python', 'Lambda'],
      monitoring: ['Splunk', 'PagerDuty']
    },
    learnings: [
      'Les faux positifs sont le plus grand défi de l\'automatisation sécurité',
      'La priorisation par CVSS seule est insuffisante'
    ]
  }
];

export const demoCertifications = [
  {
    id: '1',
    slug: 'aws-solutions-architect-professional',
    name: 'AWS Solutions Architect - Professional',
    issuer: 'Amazon Web Services',
    issue_date: '2024-01-10',
    expiry_date: '2027-01-10',
    credential_id: 'AWS-SAP-123456',
    verify_url: 'https://www.credly.com/badges/example',
    description: 'Certification de niveau expert démontrant la capacité à concevoir des architectures AWS complexes, hautement disponibles et sécurisées.',
    status: 'published',
    featured: true,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
    skills: ['AWS', 'Architecture', 'High Availability', 'Security', 'Cost Optimization'],
    level: 'expert',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    badge_url: null
  },
  {
    id: '2',
    slug: 'cka-certified-kubernetes-administrator',
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    issue_date: '2023-08-15',
    expiry_date: '2026-08-15',
    credential_id: 'CKA-789012',
    verify_url: 'https://www.cncf.io/certification/example',
    description: 'Certification pratique validant les compétences en administration de clusters Kubernetes.',
    status: 'published',
    featured: true,
    created_at: '2023-08-15T00:00:00Z',
    updated_at: '2023-08-15T00:00:00Z',
    skills: ['Kubernetes', 'Containers', 'Scheduling', 'Networking', 'Troubleshooting'],
    level: 'advanced',
    image_url: null,
    badge_url: null
  },
  {
    id: '3',
    slug: 'terraform-associate',
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    issue_date: '2023-05-20',
    expiry_date: '2025-05-20',
    credential_id: 'TF-345678',
    verify_url: null,
    description: 'Certification sur les bonnes pratiques Terraform et l\'Infrastructure as Code.',
    status: 'published',
    featured: false,
    created_at: '2023-05-20T00:00:00Z',
    updated_at: '2023-05-20T00:00:00Z',
    skills: ['Terraform', 'IaC', 'HCL', 'State Management'],
    level: 'intermediate',
    image_url: null,
    badge_url: null
  }
];

export const demoHackathons = [
  {
    id: '1',
    slug: 'hackathon-devops-2024',
    name: 'DevOps World Hackathon 2024',
    organizer: 'Cloud Native Foundation',
    event_date: '2024-02-15',
    duration: '48h',
    result: 'winner',
    project_name: 'AutoRemediate',
    project_description: 'Plateforme de remédiation automatique des incidents basée sur l\'IA générative.',
    role: 'Lead Infrastructure',
    team_size: 4,
    team_members: ['Alice Chen', 'Bob Martin', 'Carol White'],
    problem: 'Les équipes SRE passent 70% de leur temps sur des incidents récurrents.',
    solution: 'Un système qui analyse les logs, identifie les patterns d\'incidents et applique automatiquement les runbooks de remédiation.',
    implementation: 'Stack: Kubernetes, OpenAI API, Prometheus, custom operators. Déploiement GitOps avec ArgoCD.',
    learnings: [
      'L\'IA est excellente pour l\'analyse de logs mais nécessite une validation humaine',
      'Les runbooks doivent être versionnés comme du code'
    ],
    tech_stack: ['Kubernetes', 'Python', 'OpenAI', 'Prometheus', 'React'],
    demo_url: 'https://demo.example.com',
    repo_url: 'https://github.com',
    slides_url: null,
    video_url: null,
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80'
    ],
    status: 'published',
    featured: true,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  },
  {
    id: '2',
    slug: 'ai-hackathon-paris',
    name: 'AI for Good Hackathon Paris',
    organizer: 'Google for Startups',
    event_date: '2023-11-20',
    duration: '24h',
    result: 'finalist',
    project_name: 'GreenCloud Optimizer',
    project_description: 'Optimisation de la consommation énergétique des workloads cloud avec ML.',
    role: 'ML Engineer',
    team_size: 3,
    team_members: ['David Lee', 'Emma Garcia'],
    problem: 'Le cloud représente 4% des émissions mondiales de CO2.',
    solution: 'Algorithme de scheduling intelligent qui déplace les workloads vers des régions avec énergie verte.',
    implementation: 'Modèle de prédiction de la charge + API AWS/GCP pour le scheduling.',
    learnings: [
      'L\'optimisation énergétique peut aussi réduire les coûts',
      'Les données carbone des cloud providers manquent de granularité'
    ],
    tech_stack: ['Python', 'TensorFlow', 'AWS', 'FastAPI'],
    demo_url: null,
    repo_url: 'https://github.com',
    slides_url: null,
    video_url: null,
    images: [],
    status: 'published',
    featured: true,
    created_at: '2023-11-20T00:00:00Z',
    updated_at: '2023-11-20T00:00:00Z'
  }
];
