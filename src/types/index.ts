// ==================== BASE TYPES ====================

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  status: 'draft' | 'published';
  featured: boolean;
}

// ==================== PROJECT TYPES ====================

export interface Project extends BaseEntity {
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  metrics: ProjectMetric[];
  stack: TechStack;
  architecture?: ArchitectureSection;
  security?: SecuritySection;
  performance?: PerformanceSection;
  postmortem?: PostmortemSection;
  learnings: string[];
  cover_image?: string;
  gallery: string[];
  github_url?: string;
  live_url?: string;
  demo_url?: string;
  documentation_url?: string;
  pdf_url?: string;
  role: string;
  team_size?: number;
  duration?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface TechStack {
  infrastructure: string[];
  cicd: string[];
  application: string[];
  monitoring: string[];
}

export interface ArchitectureSection {
  overview: string;
  diagram_url?: string;
  components: ArchitectureComponent[];
  decisions: TechnicalDecision[];
}

export interface ArchitectureComponent {
  name: string;
  description: string;
  tech: string[];
}

export interface TechnicalDecision {
  context: string;
  decision: string;
  consequences: string[];
}

export interface SecuritySection {
  overview: string;
  authentication: string;
  authorization: string;
  secrets_management: string;
  headers?: string[];
}

export interface PerformanceSection {
  overview: string;
  optimizations: string[];
  benchmarks?: PerformanceBenchmark[];
}

export interface PerformanceBenchmark {
  metric: string;
  value: string;
  before?: string;
}

export interface PostmortemSection {
  incident: string;
  timeline: string;
  root_cause: string;
  resolution: string;
  lessons: string[];
  preventive_measures: string[];
}

// ==================== CERTIFICATION TYPES ====================

export interface Certification extends BaseEntity {
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  verify_url?: string;
  description: string;
  skills: string[];
  image_url?: string;
  badge_url?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// ==================== HACKATHON TYPES ====================

export interface Hackathon extends BaseEntity {
  name: string;
  organizer: string;
  event_date: string;
  duration: string;
  result: 'winner' | 'finalist' | 'top3' | 'top5' | 'participant';
  project_name: string;
  project_description: string;
  role: string;
  team_size: number;
  team_members?: string[];
  problem: string;
  solution: string;
  implementation: string;
  learnings: string[];
  tech_stack: string[];
  demo_url?: string;
  repo_url?: string;
  slides_url?: string;
  video_url?: string;
  images: string[];
}

// ==================== ENGINEERING DEPTH TYPES ====================

export interface EngineeringArticle extends BaseEntity {
  title: string;
  category: 'architecture' | 'cicd' | 'observability' | 'security' | 'finops' | 'incidents' | 'best-practices';
  summary: string;
  content: string;
  related_project_id?: string;
  tags: string[];
  reading_time: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// ==================== USER TYPES ====================

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'viewer';
  created_at: string;
  last_sign_in?: string;
}

// ==================== NAVIGATION TYPES ====================

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// ==================== UI TYPES ====================

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

// ==================== SEO TYPES ====================

export interface SEOData {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string[];
}
