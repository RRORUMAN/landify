export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      active_sessions: {
        Row: {
          created_at: string | null
          id: string
          session_data: Json | null
          session_duration: number | null
          session_end: string | null
          session_start: string | null
          tool_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          session_data?: Json | null
          session_duration?: number | null
          session_end?: string | null
          session_start?: string | null
          tool_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          session_data?: Json | null
          session_duration?: number | null
          session_end?: string | null
          session_start?: string | null
          tool_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "active_sessions_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      comparison_features: {
        Row: {
          created_at: string | null
          feature_category: string
          feature_details: Json | null
          feature_group: string | null
          feature_name: string
          feature_value: string | null
          help_text: string | null
          id: string
          importance: string | null
          is_premium: boolean | null
          sort_order: number | null
          tool_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature_category: string
          feature_details?: Json | null
          feature_group?: string | null
          feature_name: string
          feature_value?: string | null
          help_text?: string | null
          id?: string
          importance?: string | null
          is_premium?: boolean | null
          sort_order?: number | null
          tool_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature_category?: string
          feature_details?: Json | null
          feature_group?: string | null
          feature_name?: string
          feature_value?: string | null
          help_text?: string | null
          id?: string
          importance?: string | null
          is_premium?: boolean | null
          sort_order?: number | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comparison_features_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_health: {
        Row: {
          created_at: string | null
          error_count: number | null
          health_data: Json | null
          id: string
          last_check: string | null
          response_time: number | null
          status: string
          tool_id: string | null
          uptime_percentage: number | null
        }
        Insert: {
          created_at?: string | null
          error_count?: number | null
          health_data?: Json | null
          id?: string
          last_check?: string | null
          response_time?: number | null
          status?: string
          tool_id?: string | null
          uptime_percentage?: number | null
        }
        Update: {
          created_at?: string | null
          error_count?: number | null
          health_data?: Json | null
          id?: string
          last_check?: string | null
          response_time?: number | null
          status?: string
          tool_id?: string | null
          uptime_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_health_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          adoption_rate: number | null
          automation_score: number | null
          confidence_score: number | null
          created_at: string | null
          ease_of_use_score: number | null
          feature_depth_score: number | null
          id: string
          integration_score: number | null
          last_updated: string | null
          metric_details: Json | null
          metric_name: string
          metric_unit: string | null
          metric_value: number | null
          roi_score: number | null
          sample_size: number | null
          support_score: number | null
          time_saved_per_task: number | null
          tool_id: string | null
        }
        Insert: {
          adoption_rate?: number | null
          automation_score?: number | null
          confidence_score?: number | null
          created_at?: string | null
          ease_of_use_score?: number | null
          feature_depth_score?: number | null
          id?: string
          integration_score?: number | null
          last_updated?: string | null
          metric_details?: Json | null
          metric_name: string
          metric_unit?: string | null
          metric_value?: number | null
          roi_score?: number | null
          sample_size?: number | null
          support_score?: number | null
          time_saved_per_task?: number | null
          tool_id?: string | null
        }
        Update: {
          adoption_rate?: number | null
          automation_score?: number | null
          confidence_score?: number | null
          created_at?: string | null
          ease_of_use_score?: number | null
          feature_depth_score?: number | null
          id?: string
          integration_score?: number | null
          last_updated?: string | null
          metric_details?: Json | null
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number | null
          roi_score?: number | null
          sample_size?: number | null
          support_score?: number | null
          time_saved_per_task?: number | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      spend_forecasts: {
        Row: {
          created_at: string | null
          forecast_date: string
          forecast_details: Json | null
          forecasted_amount: number
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          forecast_date: string
          forecast_details?: Json | null
          forecasted_amount: number
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          forecast_date?: string
          forecast_details?: Json | null
          forecasted_amount?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_limits: {
        Row: {
          features: Json
          price_monthly: number
          tier: Database["public"]["Enums"]["subscription_tier"]
          tools_per_category: number
        }
        Insert: {
          features: Json
          price_monthly: number
          tier: Database["public"]["Enums"]["subscription_tier"]
          tools_per_category: number
        }
        Update: {
          features?: Json
          price_monthly?: number
          tier?: Database["public"]["Enums"]["subscription_tier"]
          tools_per_category?: number
        }
        Relationships: []
      }
      tool_analytics: {
        Row: {
          created_at: string | null
          id: string
          tool_id: string
          usage_date: string | null
          usage_details: Json | null
          usage_duration: number | null
          usage_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          tool_id: string
          usage_date?: string | null
          usage_details?: Json | null
          usage_duration?: number | null
          usage_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          tool_id?: string
          usage_date?: string | null
          usage_details?: Json | null
          usage_duration?: number | null
          usage_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_analytics_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_integrations: {
        Row: {
          created_at: string | null
          id: string
          integration_details: Json | null
          integration_name: string
          integration_type: string
          is_active: boolean | null
          tool_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          integration_details?: Json | null
          integration_name: string
          integration_type: string
          is_active?: boolean | null
          tool_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          integration_details?: Json | null
          integration_name?: string
          integration_type?: string
          is_active?: boolean | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_integrations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_reviews_sentiment: {
        Row: {
          analysis_date: string | null
          cons: Json | null
          id: string
          key_insights: string[] | null
          pros: Json | null
          sentiment_score: number | null
          tool_id: string | null
        }
        Insert: {
          analysis_date?: string | null
          cons?: Json | null
          id?: string
          key_insights?: string[] | null
          pros?: Json | null
          sentiment_score?: number | null
          tool_id?: string | null
        }
        Update: {
          analysis_date?: string | null
          cons?: Json | null
          id?: string
          key_insights?: string[] | null
          pros?: Json | null
          sentiment_score?: number | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_reviews_sentiment_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          best_for: string[] | null
          bookmarks: number
          category: string
          company_name: string | null
          company_size: string | null
          created_at: string | null
          description: string
          featured: boolean
          founding_year: number | null
          id: string
          integrations_count: number | null
          logo: string
          monthly_active_users: number | null
          name: string
          pricing: string
          rating: number
          reviews: number
          tags: string[]
          visit_url: string
        }
        Insert: {
          best_for?: string[] | null
          bookmarks?: number
          category: string
          company_name?: string | null
          company_size?: string | null
          created_at?: string | null
          description: string
          featured?: boolean
          founding_year?: number | null
          id: string
          integrations_count?: number | null
          logo: string
          monthly_active_users?: number | null
          name: string
          pricing: string
          rating: number
          reviews: number
          tags: string[]
          visit_url: string
        }
        Update: {
          best_for?: string[] | null
          bookmarks?: number
          category?: string
          company_name?: string | null
          company_size?: string | null
          created_at?: string | null
          description?: string
          featured?: boolean
          founding_year?: number | null
          id?: string
          integrations_count?: number | null
          logo?: string
          monthly_active_users?: number | null
          name?: string
          pricing?: string
          rating?: number
          reviews?: number
          tags?: string[]
          visit_url?: string
        }
        Relationships: []
      }
      usage_reports: {
        Row: {
          created_at: string | null
          id: string
          last_sent: string | null
          next_send: string | null
          recipients: string[] | null
          report_data: Json | null
          report_type: string
          schedule: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_sent?: string | null
          next_send?: string | null
          recipients?: string[] | null
          report_data?: Json | null
          report_type: string
          schedule?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_sent?: string | null
          next_send?: string | null
          recipients?: string[] | null
          report_data?: Json | null
          report_type?: string
          schedule?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          custom_shortcuts: Json | null
          dashboard_layout: Json | null
          favorites: string[] | null
          id: string
          recent_items: Json | null
          theme: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          custom_shortcuts?: Json | null
          dashboard_layout?: Json | null
          favorites?: string[] | null
          id?: string
          recent_items?: Json | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          custom_shortcuts?: Json | null
          dashboard_layout?: Json | null
          favorites?: string[] | null
          id?: string
          recent_items?: Json | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_tools: {
        Row: {
          billing_cycle: string | null
          id: string
          monthly_cost: number | null
          next_billing_date: string | null
          notes: string | null
          purchase_date: string | null
          subscription_details: Json | null
          subscription_status: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          tool_id: string
          usage_stats: Json | null
          user_id: string
        }
        Insert: {
          billing_cycle?: string | null
          id?: string
          monthly_cost?: number | null
          next_billing_date?: string | null
          notes?: string | null
          purchase_date?: string | null
          subscription_details?: Json | null
          subscription_status?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          tool_id: string
          usage_stats?: Json | null
          user_id: string
        }
        Update: {
          billing_cycle?: string | null
          id?: string
          monthly_cost?: number | null
          next_billing_date?: string | null
          notes?: string | null
          purchase_date?: string | null
          subscription_details?: Json | null
          subscription_status?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          tool_id?: string
          usage_stats?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tools_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier: "free" | "pro" | "business" | "business_plus"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
