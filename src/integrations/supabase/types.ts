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
      ai_savings_analysis: {
        Row: {
          ai_recommendations: Json | null
          analysis_date: string | null
          created_at: string | null
          id: string
          optimization_suggestions: Json | null
          overlap_analysis: Json | null
          potential_savings: number | null
          total_spend: number | null
          usage_patterns: Json | null
          user_id: string
        }
        Insert: {
          ai_recommendations?: Json | null
          analysis_date?: string | null
          created_at?: string | null
          id?: string
          optimization_suggestions?: Json | null
          overlap_analysis?: Json | null
          potential_savings?: number | null
          total_spend?: number | null
          usage_patterns?: Json | null
          user_id: string
        }
        Update: {
          ai_recommendations?: Json | null
          analysis_date?: string | null
          created_at?: string | null
          id?: string
          optimization_suggestions?: Json | null
          overlap_analysis?: Json | null
          potential_savings?: number | null
          total_spend?: number | null
          usage_patterns?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ai_tool_recommendations: {
        Row: {
          created_at: string | null
          id: string
          priority_level: string | null
          reasoning: string | null
          recommendation_type: string
          score: number | null
          suggested_alternatives: Json | null
          tool_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          priority_level?: string | null
          reasoning?: string | null
          recommendation_type: string
          score?: number | null
          suggested_alternatives?: Json | null
          tool_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          priority_level?: string | null
          reasoning?: string | null
          recommendation_type?: string
          score?: number | null
          suggested_alternatives?: Json | null
          tool_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_tool_recommendations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      comparison_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      comparison_feature_definitions: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          evaluation_criteria: Json | null
          id: string
          importance: string | null
          name: string
          sort_order: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          evaluation_criteria?: Json | null
          id?: string
          importance?: string | null
          name: string
          sort_order?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          evaluation_criteria?: Json | null
          id?: string
          importance?: string | null
          name?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comparison_feature_definitions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "comparison_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      comparison_features: {
        Row: {
          created_at: string | null
          data_quality_score: number | null
          feature_category: string
          feature_details: Json | null
          feature_group: string | null
          feature_name: string
          feature_value: string | null
          help_text: string | null
          id: string
          importance: string | null
          is_premium: boolean | null
          last_verified_date: string | null
          sort_order: number | null
          tool_id: string | null
          verification_source: string | null
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          data_quality_score?: number | null
          feature_category: string
          feature_details?: Json | null
          feature_group?: string | null
          feature_name: string
          feature_value?: string | null
          help_text?: string | null
          id?: string
          importance?: string | null
          is_premium?: boolean | null
          last_verified_date?: string | null
          sort_order?: number | null
          tool_id?: string | null
          verification_source?: string | null
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          data_quality_score?: number | null
          feature_category?: string
          feature_details?: Json | null
          feature_group?: string | null
          feature_name?: string
          feature_value?: string | null
          help_text?: string | null
          id?: string
          importance?: string | null
          is_premium?: boolean | null
          last_verified_date?: string | null
          sort_order?: number | null
          tool_id?: string | null
          verification_source?: string | null
          weight?: number | null
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
          api_reliability_score: number | null
          automation_score: number | null
          confidence_score: number | null
          created_at: string | null
          customer_satisfaction_score: number | null
          ease_of_use_score: number | null
          feature_depth_score: number | null
          id: string
          integration_score: number | null
          last_updated: string | null
          learning_curve_score: number | null
          metric_details: Json | null
          metric_name: string
          metric_unit: string | null
          metric_value: number | null
          roi_score: number | null
          sample_size: number | null
          support_response_time: number | null
          support_score: number | null
          time_saved_per_task: number | null
          tool_id: string | null
        }
        Insert: {
          adoption_rate?: number | null
          api_reliability_score?: number | null
          automation_score?: number | null
          confidence_score?: number | null
          created_at?: string | null
          customer_satisfaction_score?: number | null
          ease_of_use_score?: number | null
          feature_depth_score?: number | null
          id?: string
          integration_score?: number | null
          last_updated?: string | null
          learning_curve_score?: number | null
          metric_details?: Json | null
          metric_name: string
          metric_unit?: string | null
          metric_value?: number | null
          roi_score?: number | null
          sample_size?: number | null
          support_response_time?: number | null
          support_score?: number | null
          time_saved_per_task?: number | null
          tool_id?: string | null
        }
        Update: {
          adoption_rate?: number | null
          api_reliability_score?: number | null
          automation_score?: number | null
          confidence_score?: number | null
          created_at?: string | null
          customer_satisfaction_score?: number | null
          ease_of_use_score?: number | null
          feature_depth_score?: number | null
          id?: string
          integration_score?: number | null
          last_updated?: string | null
          learning_curve_score?: number | null
          metric_details?: Json | null
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number | null
          roi_score?: number | null
          sample_size?: number | null
          support_response_time?: number | null
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
      saved_comparisons: {
        Row: {
          comparison_data: Json
          created_at: string | null
          custom_weights: Json | null
          exported_count: number | null
          id: string
          is_public: boolean | null
          name: string
          tool_ids: string[]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comparison_data: Json
          created_at?: string | null
          custom_weights?: Json | null
          exported_count?: number | null
          id?: string
          is_public?: boolean | null
          name: string
          tool_ids: string[]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comparison_data?: Json
          created_at?: string | null
          custom_weights?: Json | null
          exported_count?: number | null
          id?: string
          is_public?: boolean | null
          name?: string
          tool_ids?: string[]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
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
      tool_ai_insights: {
        Row: {
          confidence_score: number | null
          id: string
          insight_data: Json | null
          insight_type: string
          last_updated: string | null
          recommendations: Json | null
          tool_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          id?: string
          insight_data?: Json | null
          insight_type: string
          last_updated?: string | null
          recommendations?: Json | null
          tool_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          id?: string
          insight_data?: Json | null
          insight_type?: string
          last_updated?: string | null
          recommendations?: Json | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_ai_insights_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
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
      tool_compatibility_scores: {
        Row: {
          compatibility_score: number | null
          id: string
          integration_factors: Json | null
          last_analyzed: string | null
          tool_id_1: string | null
          tool_id_2: string | null
          use_case_match: Json | null
        }
        Insert: {
          compatibility_score?: number | null
          id?: string
          integration_factors?: Json | null
          last_analyzed?: string | null
          tool_id_1?: string | null
          tool_id_2?: string | null
          use_case_match?: Json | null
        }
        Update: {
          compatibility_score?: number | null
          id?: string
          integration_factors?: Json | null
          last_analyzed?: string | null
          tool_id_1?: string | null
          tool_id_2?: string | null
          use_case_match?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_compatibility_scores_tool_id_1_fkey"
            columns: ["tool_id_1"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_compatibility_scores_tool_id_2_fkey"
            columns: ["tool_id_2"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_feature_evaluations: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          evaluation_source: string | null
          feature_id: string | null
          id: string
          last_evaluated: string | null
          notes: string | null
          tool_id: string | null
          value: Json
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          evaluation_source?: string | null
          feature_id?: string | null
          id?: string
          last_evaluated?: string | null
          notes?: string | null
          tool_id?: string | null
          value: Json
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          evaluation_source?: string | null
          feature_id?: string | null
          id?: string
          last_evaluated?: string | null
          notes?: string | null
          tool_id?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "tool_feature_evaluations_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "comparison_feature_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_feature_evaluations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_integration_status: {
        Row: {
          created_at: string | null
          error_count: number | null
          id: string
          last_sync_at: string | null
          status: string
          tool_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          error_count?: number | null
          id?: string
          last_sync_at?: string | null
          status: string
          tool_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          error_count?: number | null
          id?: string
          last_sync_at?: string | null
          status?: string
          tool_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_integration_status_tool_id_fkey"
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
            isOneToOne: true
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_roi_analytics: {
        Row: {
          cost_savings: number | null
          historical_data: Json | null
          id: string
          last_updated: string | null
          predictions: Json | null
          productivity_gain: number | null
          roi_score: number | null
          time_saved: number | null
          tool_id: string | null
          user_id: string | null
        }
        Insert: {
          cost_savings?: number | null
          historical_data?: Json | null
          id?: string
          last_updated?: string | null
          predictions?: Json | null
          productivity_gain?: number | null
          roi_score?: number | null
          time_saved?: number | null
          tool_id?: string | null
          user_id?: string | null
        }
        Update: {
          cost_savings?: number | null
          historical_data?: Json | null
          id?: string
          last_updated?: string | null
          predictions?: Json | null
          productivity_gain?: number | null
          roi_score?: number | null
          time_saved?: number | null
          tool_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_roi_analytics_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_usage_analytics: {
        Row: {
          activity_type: string | null
          created_at: string | null
          id: string
          productivity_score: number | null
          tool_id: string | null
          usage_context: Json | null
          usage_duration: number | null
          usage_timestamp: string | null
          user_id: string | null
        }
        Insert: {
          activity_type?: string | null
          created_at?: string | null
          id?: string
          productivity_score?: number | null
          tool_id?: string | null
          usage_context?: Json | null
          usage_duration?: number | null
          usage_timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string | null
          created_at?: string | null
          id?: string
          productivity_score?: number | null
          tool_id?: string | null
          usage_context?: Json | null
          usage_duration?: number | null
          usage_timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_usage_analytics_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_usage_stats: {
        Row: {
          created_at: string | null
          id: string
          last_used_at: string | null
          tool_id: string
          total_time_spent: number | null
          updated_at: string | null
          usage_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          tool_id: string
          total_time_spent?: number | null
          updated_at?: string | null
          usage_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          tool_id?: string
          total_time_spent?: number | null
          updated_at?: string | null
          usage_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_usage_stats_tool_id_fkey"
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
          company_logo: string | null
          company_name: string | null
          company_size: string | null
          company_website: string | null
          created_at: string | null
          description: string
          feature_screenshots: Json | null
          featured: boolean
          founding_year: number | null
          id: string
          integration_count: number | null
          integrations_count: number | null
          last_updated: string | null
          logo: string
          monthly_active_users: number | null
          name: string
          pricing: string
          pricing_range: string | null
          rating: number
          reviews: number
          roi_metrics: Json | null
          screenshots: Json[] | null
          tags: string[]
          version_history: Json | null
          visit_url: string
        }
        Insert: {
          best_for?: string[] | null
          bookmarks?: number
          category: string
          company_logo?: string | null
          company_name?: string | null
          company_size?: string | null
          company_website?: string | null
          created_at?: string | null
          description: string
          feature_screenshots?: Json | null
          featured?: boolean
          founding_year?: number | null
          id: string
          integration_count?: number | null
          integrations_count?: number | null
          last_updated?: string | null
          logo: string
          monthly_active_users?: number | null
          name: string
          pricing?: string
          pricing_range?: string | null
          rating?: number
          reviews?: number
          roi_metrics?: Json | null
          screenshots?: Json[] | null
          tags?: string[]
          version_history?: Json | null
          visit_url: string
        }
        Update: {
          best_for?: string[] | null
          bookmarks?: number
          category?: string
          company_logo?: string | null
          company_name?: string | null
          company_size?: string | null
          company_website?: string | null
          created_at?: string | null
          description?: string
          feature_screenshots?: Json | null
          featured?: boolean
          founding_year?: number | null
          id?: string
          integration_count?: number | null
          integrations_count?: number | null
          last_updated?: string | null
          logo?: string
          monthly_active_users?: number | null
          name?: string
          pricing?: string
          pricing_range?: string | null
          rating?: number
          reviews?: number
          roi_metrics?: Json | null
          screenshots?: Json[] | null
          tags?: string[]
          version_history?: Json | null
          visit_url?: string
        }
        Relationships: []
      }
      trending_tools: {
        Row: {
          created_at: string | null
          id: string
          tool_id: string | null
          trend_data: Json | null
          trend_score: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          tool_id?: string | null
          trend_data?: Json | null
          trend_score?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          tool_id?: string | null
          trend_data?: Json | null
          trend_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trending_tools_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: true
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_anomalies: {
        Row: {
          anomaly_data: Json | null
          anomaly_type: string
          detection_timestamp: string | null
          id: string
          is_resolved: boolean | null
          severity_level: string | null
          tool_id: string | null
          user_id: string | null
        }
        Insert: {
          anomaly_data?: Json | null
          anomaly_type: string
          detection_timestamp?: string | null
          id?: string
          is_resolved?: boolean | null
          severity_level?: string | null
          tool_id?: string | null
          user_id?: string | null
        }
        Update: {
          anomaly_data?: Json | null
          anomaly_type?: string
          detection_timestamp?: string | null
          id?: string
          is_resolved?: boolean | null
          severity_level?: string | null
          tool_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_anomalies_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
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
      user_tool_interactions: {
        Row: {
          id: string
          interaction_count: number | null
          is_favorite: boolean | null
          last_viewed_at: string | null
          tool_id: string
          user_id: string
        }
        Insert: {
          id?: string
          interaction_count?: number | null
          is_favorite?: boolean | null
          last_viewed_at?: string | null
          tool_id: string
          user_id: string
        }
        Update: {
          id?: string
          interaction_count?: number | null
          is_favorite?: boolean | null
          last_viewed_at?: string | null
          tool_id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tools: {
        Row: {
          active_sessions: number | null
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
          active_sessions?: number | null
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
          active_sessions?: number | null
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
      analyze_tool_usage_patterns: {
        Args: {
          p_user_id: string
          p_tool_id: string
          p_time_range?: unknown
        }
        Returns: Json
      }
      calculate_tool_compatibility: {
        Args: {
          p_tool_id_1: string
          p_tool_id_2: string
        }
        Returns: number
      }
      calculate_tool_savings: {
        Args: {
          p_user_id: string
        }
        Returns: {
          total_current_spend: number
          potential_savings: number
          recommendations: Json
        }[]
      }
      generate_tool_recommendations: {
        Args: {
          p_user_id: string
        }
        Returns: {
          recommendation_id: string
          tool_id: string
          recommendation_type: string
          score: number
          reasoning: string
          suggested_alternatives: Json
          priority_level: string
        }[]
      }
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
