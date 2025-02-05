
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
  special_pricing?: boolean;
  created_at?: string | null;
}

export interface Category {
  name: string;
  icon: LucideIcon;
}

export interface UserTool {
  id: string;
  user_id: string;
  tool_id: string;
  purchase_date: string;
  subscription_status: string;
  notes: string;
  subscription_tier: 'free' | 'pro' | 'business' | 'business_plus';
  subscription_details: {
    price: string;
    renewal_date: string;
    category: string;
    description: string;
    url: string;
  };
  monthly_cost?: number;
  billing_cycle?: string;
  next_billing_date?: string;
  usage_stats?: Record<string, any>;
}

export interface SpendForecast {
  id: string;
  user_id: string;
  forecast_date: string;
  forecasted_amount: number;
  forecast_details?: Record<string, any>;
  created_at?: string;
}
