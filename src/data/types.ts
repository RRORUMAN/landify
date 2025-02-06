import { LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  pricing: string;
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  visit_url: string;
  bookmarks: number;
  founding_year?: number | null;
  company_name?: string | null;
  company_size?: string | null;
  best_for?: string[] | null;
  integrations_count?: number | null;
  monthly_active_users?: number | null;
  created_at?: string | null;
  special_pricing?: boolean;
  company_website?: string | null;
  integration_count?: number | null;
  pricing_range?: string | null;
  monthly_cost?: number;
  trending_tools?: {
    trend_score: number;
    trend_data?: {
      views: number;
      bookmarks: number;
      clicks: number;
      last_interaction: string;
      reviews: number;
    };
  }[];
  ai_insights?: {
    compatibility_score?: number;
    feature_match_confidence?: number;
    recommendation_strength?: number;
    use_cases?: string[];
  };
  integration_details?: {
    compatibility_factors?: Record<string, number>;
    integration_score?: number;
    potential_issues?: string[];
  };
}

export interface Category {
  name: string;
  icon: LucideIcon;
}

export type SubscriptionTier = 'free' | 'pro' | 'business' | 'business_plus';

export interface UserTool {
  id: string;
  user_id: string;
  tool_id: string;
  purchase_date: string | null;
  subscription_status: string | null;
  notes: string | null;
  subscription_tier: SubscriptionTier | null;
  subscription_details: Record<string, any> | null;
  monthly_cost: number | null;
  billing_cycle: string | null;
  next_billing_date: string | null;
  usage_stats: Record<string, any> | null;
  active_sessions?: number;
  tool?: Tool;
}

export interface SpendForecast {
  id: string;
  user_id: string;
  forecast_date: string;
  forecasted_amount: number;
  forecast_details: Record<string, any> | null;
  created_at?: string | null;
}

export interface ComparisonFeature {
  id: string;
  tool_id: string | null;
  feature_category: string;
  feature_name: string;
  feature_value: string | null;
  feature_details: Record<string, any> | null;
  is_premium: boolean;
  help_text: string | null;
  sort_order: number;
  importance: 'high' | 'medium' | 'low';
  feature_group: string | null;
  created_at?: string | null;
}

export interface SubscriptionLimit {
  tier: SubscriptionTier;
  tools_per_category: number;
  price_monthly: number;
  features: Record<string, any>;
}

export interface Team {
  id: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export interface ToolFolder {
  id: string;
  name: string;
  description: string | null;
  team_id: string | null;
  created_by: string;
  parent_folder_id: string | null;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
}

export interface FolderTool {
  id: string;
  folder_id: string;
  tool_id: string;
  added_by: string;
  added_at: string;
  notes: string | null;
  tool?: Tool;
}

export type TeamRole = 'admin' | 'member' | 'viewer';

export interface TeamInvite {
  id: string;
  team_id: string;
  invited_by: string;
  invite_code: string;
  role: TeamRole;
  expires_at: string;
  created_at: string;
  used_at: string | null;
  uses_remaining: number;
}

export interface TeamActivityLog {
  id: string;
  team_id: string;
  user_id: string;
  activity_type: string;
  activity_data: Record<string, any>;
  created_at: string;
}

export interface ToolNote {
  id: string;
  tool_id: string;
  folder_id: string;
  user_id: string;
  content: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}
