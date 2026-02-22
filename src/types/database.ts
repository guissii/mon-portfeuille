export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          status: 'draft' | 'published'
          featured: boolean
          title: string
          tagline: string
          description: string
          problem: string
          solution: string
          impact: string
          metrics: Json
          stack: Json
          architecture: Json | null
          security: Json | null
          performance: Json | null
          postmortem: Json | null
          learnings: string[]
          cover_image: string | null
          gallery: string[]
          github_url: string | null
          live_url: string | null
          demo_url: string | null
          documentation_url: string | null
          role: string
          team_size: number | null
          duration: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          status?: 'draft' | 'published'
          featured?: boolean
          title: string
          tagline: string
          description: string
          problem: string
          solution: string
          impact: string
          metrics?: Json
          stack?: Json
          architecture?: Json | null
          security?: Json | null
          performance?: Json | null
          postmortem?: Json | null
          learnings?: string[]
          cover_image?: string | null
          gallery?: string[]
          github_url?: string | null
          live_url?: string | null
          demo_url?: string | null
          documentation_url?: string | null
          role: string
          team_size?: number | null
          duration?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          slug?: string
          status?: 'draft' | 'published'
          featured?: boolean
          title?: string
          tagline?: string
          description?: string
          problem?: string
          solution?: string
          impact?: string
          metrics?: Json
          stack?: Json
          architecture?: Json | null
          security?: Json | null
          performance?: Json | null
          postmortem?: Json | null
          learnings?: string[]
          cover_image?: string | null
          gallery?: string[]
          github_url?: string | null
          live_url?: string | null
          demo_url?: string | null
          documentation_url?: string | null
          role?: string
          team_size?: number | null
          duration?: string | null
        }
      }
      certifications: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          status: 'draft' | 'published'
          featured: boolean
          name: string
          issuer: string
          issue_date: string
          expiry_date: string | null
          credential_id: string | null
          verify_url: string | null
          description: string
          skills: string[]
          image_url: string | null
          badge_url: string | null
          level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          status?: 'draft' | 'published'
          featured?: boolean
          name: string
          issuer: string
          issue_date: string
          expiry_date?: string | null
          credential_id?: string | null
          verify_url?: string | null
          description: string
          skills?: string[]
          image_url?: string | null
          badge_url?: string | null
          level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          slug?: string
          status?: 'draft' | 'published'
          featured?: boolean
          name?: string
          issuer?: string
          issue_date?: string
          expiry_date?: string | null
          credential_id?: string | null
          verify_url?: string | null
          description?: string
          skills?: string[]
          image_url?: string | null
          badge_url?: string | null
          level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
        }
      }
      hackathons: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          status: 'draft' | 'published'
          featured: boolean
          name: string
          organizer: string
          event_date: string
          duration: string
          result: 'winner' | 'finalist' | 'top3' | 'top5' | 'participant'
          project_name: string
          project_description: string
          role: string
          team_size: number
          team_members: string[] | null
          problem: string
          solution: string
          implementation: string
          learnings: string[]
          tech_stack: string[]
          demo_url: string | null
          repo_url: string | null
          slides_url: string | null
          video_url: string | null
          images: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          status?: 'draft' | 'published'
          featured?: boolean
          name: string
          organizer: string
          event_date: string
          duration: string
          result: 'winner' | 'finalist' | 'top3' | 'top5' | 'participant'
          project_name: string
          project_description: string
          role: string
          team_size: number
          team_members?: string[] | null
          problem: string
          solution: string
          implementation: string
          learnings?: string[]
          tech_stack?: string[]
          demo_url?: string | null
          repo_url?: string | null
          slides_url?: string | null
          video_url?: string | null
          images?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          slug?: string
          status?: 'draft' | 'published'
          featured?: boolean
          name?: string
          organizer?: string
          event_date?: string
          duration?: string
          result?: 'winner' | 'finalist' | 'top3' | 'top5' | 'participant'
          project_name?: string
          project_description?: string
          role?: string
          team_size?: number
          team_members?: string[] | null
          problem?: string
          solution?: string
          implementation?: string
          learnings?: string[]
          tech_stack?: string[]
          demo_url?: string | null
          repo_url?: string | null
          slides_url?: string | null
          video_url?: string | null
          images?: string[]
        }
      }
      engineering_articles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          status: 'draft' | 'published'
          featured: boolean
          title: string
          category: 'architecture' | 'cicd' | 'observability' | 'security' | 'finops' | 'incidents' | 'best-practices'
          summary: string
          content: string
          related_project_id: string | null
          tags: string[]
          reading_time: number
          difficulty: 'beginner' | 'intermediate' | 'advanced'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          status?: 'draft' | 'published'
          featured?: boolean
          title: string
          category: 'architecture' | 'cicd' | 'observability' | 'security' | 'finops' | 'incidents' | 'best-practices'
          summary: string
          content: string
          related_project_id?: string | null
          tags?: string[]
          reading_time?: number
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          slug?: string
          status?: 'draft' | 'published'
          featured?: boolean
          title?: string
          category?: 'architecture' | 'cicd' | 'observability' | 'security' | 'finops' | 'incidents' | 'best-practices'
          summary?: string
          content?: string
          related_project_id?: string | null
          tags?: string[]
          reading_time?: number
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'viewer'
          created_at: string
          last_sign_in: string | null
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'viewer'
          created_at?: string
          last_sign_in?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'viewer'
          created_at?: string
          last_sign_in?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
