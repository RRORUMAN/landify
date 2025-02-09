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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "active_sessions_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_recommendation_results: {
        Row: {
          comparison_data: Json | null
          created_at: string | null
          id: string
          key_strengths: Json[] | null
          match_scores: Json | null
          query: string
          results: Json
          use_case_fit: Json | null
          user_id: string | null
        }
        Insert: {
          comparison_data?: Json | null
          created_at?: string | null
          id?: string
          key_strengths?: Json[] | null
          match_scores?: Json | null
          query: string
          results: Json
          use_case_fit?: Json | null
          user_id?: string | null
        }
        Update: {
          comparison_data?: Json | null
          created_at?: string | null
          id?: string
          key_strengths?: Json[] | null
          match_scores?: Json | null
          query?: string
          results?: Json
          use_case_fit?: Json | null
          user_id?: string | null
        }
        Relationships: []
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "ai_tool_recommendations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_workflow_insights: {
        Row: {
          created_at: string | null
          id: string
          insight_data: Json | null
          insight_type: string
          priority_level: string | null
          status: string | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          insight_data?: Json | null
          insight_type: string
          priority_level?: string | null
          status?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          insight_data?: Json | null
          insight_type?: string
          priority_level?: string | null
          status?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_workflow_insights_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "comparison_features_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_reports: {
        Row: {
          columns: Json | null
          created_at: string | null
          export_format: string | null
          filters: Json | null
          id: string
          last_generated: string | null
          name: string
          schedule: string | null
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          columns?: Json | null
          created_at?: string | null
          export_format?: string | null
          filters?: Json | null
          id?: string
          last_generated?: string | null
          name: string
          schedule?: string | null
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          columns?: Json | null
          created_at?: string | null
          export_format?: string | null
          filters?: Json | null
          id?: string
          last_generated?: string | null
          name?: string
          schedule?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      folder_tools: {
        Row: {
          added_at: string
          added_by: string
          folder_id: string
          id: string
          notes: string | null
          tool_id: string
        }
        Insert: {
          added_at?: string
          added_by: string
          folder_id: string
          id?: string
          notes?: string | null
          tool_id: string
        }
        Update: {
          added_at?: string
          added_by?: string
          folder_id?: string
          id?: string
          notes?: string | null
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "folder_tools_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "tool_folders"
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
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
          ai_ranking: number | null
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
          ai_ranking?: number | null
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
          ai_ranking?: number | null
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "performance_metrics_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      referral_rewards: {
        Row: {
          claimed_at: string | null
          created_at: string | null
          earned_at: string | null
          id: string
          reward_amount: number
          reward_type: string
          status: string
          user_id: string
        }
        Insert: {
          claimed_at?: string | null
          created_at?: string | null
          earned_at?: string | null
          id?: string
          reward_amount: number
          reward_type: string
          status?: string
          user_id: string
        }
        Update: {
          claimed_at?: string | null
          created_at?: string | null
          earned_at?: string | null
          id?: string
          reward_amount?: number
          reward_type?: string
          status?: string
          user_id?: string
        }
        Relationships: []
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
      team_activity_logs: {
        Row: {
          activity_data: Json
          activity_type: string
          created_at: string
          id: string
          team_id: string | null
          user_id: string
        }
        Insert: {
          activity_data?: Json
          activity_type: string
          created_at?: string
          id?: string
          team_id?: string | null
          user_id: string
        }
        Update: {
          activity_data?: Json
          activity_type?: string
          created_at?: string
          id?: string
          team_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_activity_logs_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_discussions: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_ai_summary: boolean | null
          metadata: Json | null
          parent_id: string | null
          team_id: string | null
          tool_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_ai_summary?: boolean | null
          metadata?: Json | null
          parent_id?: string | null
          team_id?: string | null
          tool_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_ai_summary?: boolean | null
          metadata?: Json | null
          parent_id?: string | null
          team_id?: string | null
          tool_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_discussions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "team_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_discussions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_discussions_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "team_discussions_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      team_integrations: {
        Row: {
          config: Json | null
          created_at: string | null
          id: string
          integration_type: string
          is_active: boolean | null
          team_id: string | null
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          id?: string
          integration_type: string
          is_active?: boolean | null
          team_id?: string | null
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          id?: string
          integration_type?: string
          is_active?: boolean | null
          team_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_integrations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invites: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          invite_code: string
          invited_by: string
          reward_credited: boolean | null
          role: string
          team_id: string | null
          used_at: string | null
          used_by: string | null
          uses_remaining: number | null
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          invite_code?: string
          invited_by: string
          reward_credited?: boolean | null
          role?: string
          team_id?: string | null
          used_at?: string | null
          used_by?: string | null
          uses_remaining?: number | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          invite_code?: string
          invited_by?: string
          reward_credited?: boolean | null
          role?: string
          team_id?: string | null
          used_at?: string | null
          used_by?: string | null
          uses_remaining?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_invites_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          joined_at: string
          role: string
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_analytics_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_comparison_insights: {
        Row: {
          created_at: string | null
          id: string
          impact_score: number | null
          insight_category: string
          insight_description: string | null
          insight_title: string
          supporting_data: Json | null
          tool_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          impact_score?: number | null
          insight_category: string
          insight_description?: string | null
          insight_title: string
          supporting_data?: Json | null
          tool_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          impact_score?: number | null
          insight_category?: string
          insight_description?: string | null
          insight_title?: string
          supporting_data?: Json | null
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_comparison_insights_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_comparison_insights_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_comparison_kpis: {
        Row: {
          api_reliability_score: number | null
          created_at: string | null
          documentation_quality_score: number | null
          ease_of_implementation_score: number | null
          feature_completeness_score: number | null
          id: string
          learning_curve_score: number | null
          support_quality_score: number | null
          tool_id: string
          updated_at: string | null
          user_satisfaction_score: number | null
          value_for_money_score: number | null
        }
        Insert: {
          api_reliability_score?: number | null
          created_at?: string | null
          documentation_quality_score?: number | null
          ease_of_implementation_score?: number | null
          feature_completeness_score?: number | null
          id?: string
          learning_curve_score?: number | null
          support_quality_score?: number | null
          tool_id: string
          updated_at?: string | null
          user_satisfaction_score?: number | null
          value_for_money_score?: number | null
        }
        Update: {
          api_reliability_score?: number | null
          created_at?: string | null
          documentation_quality_score?: number | null
          ease_of_implementation_score?: number | null
          feature_completeness_score?: number | null
          id?: string
          learning_curve_score?: number | null
          support_quality_score?: number | null
          tool_id?: string
          updated_at?: string | null
          user_satisfaction_score?: number | null
          value_for_money_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_comparison_kpis_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_comparison_kpis_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_compatibility_scores: {
        Row: {
          ai_ranking: number | null
          comparison_metrics: Json | null
          compatibility_score: number | null
          id: string
          integration_factors: Json | null
          last_analyzed: string | null
          real_time_data: Json | null
          tool_id_1: string | null
          tool_id_2: string | null
          use_case_match: Json | null
        }
        Insert: {
          ai_ranking?: number | null
          comparison_metrics?: Json | null
          compatibility_score?: number | null
          id?: string
          integration_factors?: Json | null
          last_analyzed?: string | null
          real_time_data?: Json | null
          tool_id_1?: string | null
          tool_id_2?: string | null
          use_case_match?: Json | null
        }
        Update: {
          ai_ranking?: number | null
          comparison_metrics?: Json | null
          compatibility_score?: number | null
          id?: string
          integration_factors?: Json | null
          last_analyzed?: string | null
          real_time_data?: Json | null
          tool_id_1?: string | null
          tool_id_2?: string | null
          use_case_match?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_compatibility_scores_tool_id_1_fkey"
            columns: ["tool_id_1"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
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
      tool_feature_matrix: {
        Row: {
          created_at: string | null
          feature_category: string
          feature_description: string | null
          feature_name: string
          feature_strength: number | null
          has_feature: boolean | null
          id: string
          implementation_details: Json | null
          tool_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          feature_category: string
          feature_description?: string | null
          feature_name: string
          feature_strength?: number | null
          has_feature?: boolean | null
          id?: string
          implementation_details?: Json | null
          tool_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          feature_category?: string
          feature_description?: string | null
          feature_name?: string
          feature_strength?: number | null
          has_feature?: boolean | null
          id?: string
          implementation_details?: Json | null
          tool_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_feature_matrix_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_feature_matrix_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_features: {
        Row: {
          created_at: string
          details: Json | null
          feature_category: string
          feature_name: string
          feature_value: string | null
          id: string
          supported: boolean | null
          tool_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          feature_category: string
          feature_name: string
          feature_value?: string | null
          id?: string
          supported?: boolean | null
          tool_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          feature_category?: string
          feature_name?: string
          feature_value?: string | null
          id?: string
          supported?: boolean | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_features_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_features_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_folders: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_shared: boolean | null
          name: string
          parent_folder_id: string | null
          team_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_shared?: boolean | null
          name: string
          parent_folder_id?: string | null
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_shared?: boolean | null
          name?: string
          parent_folder_id?: string | null
          team_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "tool_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_folders_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_integrations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_integrations_data: {
        Row: {
          created_at: string
          details: Json | null
          ease_of_integration: number | null
          id: string
          integration_type: string
          maintenance_effort: number | null
          setup_time: number | null
          supported_platforms: string[] | null
          tool_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          ease_of_integration?: number | null
          id?: string
          integration_type: string
          maintenance_effort?: number | null
          setup_time?: number | null
          supported_platforms?: string[] | null
          tool_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          ease_of_integration?: number | null
          id?: string
          integration_type?: string
          maintenance_effort?: number | null
          setup_time?: number | null
          supported_platforms?: string[] | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_integrations_data_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_integrations_data_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_notes: {
        Row: {
          content: string
          created_at: string
          folder_id: string | null
          id: string
          is_private: boolean | null
          tool_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          folder_id?: string | null
          id?: string
          is_private?: boolean | null
          tool_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          folder_id?: string | null
          id?: string
          is_private?: boolean | null
          tool_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_notes_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "tool_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_performance: {
        Row: {
          accuracy_score: number | null
          api_reliability_score: number | null
          cost_efficiency_score: number | null
          created_at: string
          customization_score: number | null
          ease_of_use_score: number | null
          id: string
          response_time: number | null
          scalability_score: number | null
          support_quality_score: number | null
          tool_id: string | null
          update_frequency: number | null
        }
        Insert: {
          accuracy_score?: number | null
          api_reliability_score?: number | null
          cost_efficiency_score?: number | null
          created_at?: string
          customization_score?: number | null
          ease_of_use_score?: number | null
          id?: string
          response_time?: number | null
          scalability_score?: number | null
          support_quality_score?: number | null
          tool_id?: string | null
          update_frequency?: number | null
        }
        Update: {
          accuracy_score?: number | null
          api_reliability_score?: number | null
          cost_efficiency_score?: number | null
          created_at?: string
          customization_score?: number | null
          ease_of_use_score?: number | null
          id?: string
          response_time?: number | null
          scalability_score?: number | null
          support_quality_score?: number | null
          tool_id?: string | null
          update_frequency?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_performance_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_performance_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_pricing_details: {
        Row: {
          created_at: string
          details: Json | null
          features_included: string[] | null
          id: string
          minimum_commitment: string | null
          monthly_cost: number | null
          overage_costs: Json | null
          plan_name: string
          tool_id: string | null
          usage_limits: Json | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          features_included?: string[] | null
          id?: string
          minimum_commitment?: string | null
          monthly_cost?: number | null
          overage_costs?: Json | null
          plan_name: string
          tool_id?: string | null
          usage_limits?: Json | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          features_included?: string[] | null
          id?: string
          minimum_commitment?: string | null
          monthly_cost?: number | null
          overage_costs?: Json | null
          plan_name?: string
          tool_id?: string | null
          usage_limits?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_pricing_details_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_pricing_details_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_resources: {
        Row: {
          accessibility_score: number | null
          comprehensiveness_score: number | null
          created_at: string
          details: Json | null
          id: string
          quality_score: number | null
          resource_type: string
          tool_id: string | null
          update_frequency: string | null
        }
        Insert: {
          accessibility_score?: number | null
          comprehensiveness_score?: number | null
          created_at?: string
          details?: Json | null
          id?: string
          quality_score?: number | null
          resource_type: string
          tool_id?: string | null
          update_frequency?: string | null
        }
        Update: {
          accessibility_score?: number | null
          comprehensiveness_score?: number | null
          created_at?: string
          details?: Json | null
          id?: string
          quality_score?: number | null
          resource_type?: string
          tool_id?: string | null
          update_frequency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_resources_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_resources_tool_id_fkey"
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_roi_analytics_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_security: {
        Row: {
          certification_status: string | null
          compliance_standards: string[] | null
          created_at: string
          details: Json | null
          id: string
          last_audit_date: string | null
          security_feature: string
          security_score: number | null
          tool_id: string | null
        }
        Insert: {
          certification_status?: string | null
          compliance_standards?: string[] | null
          created_at?: string
          details?: Json | null
          id?: string
          last_audit_date?: string | null
          security_feature: string
          security_score?: number | null
          tool_id?: string | null
        }
        Update: {
          certification_status?: string | null
          compliance_standards?: string[] | null
          created_at?: string
          details?: Json | null
          id?: string
          last_audit_date?: string | null
          security_feature?: string
          security_score?: number | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_security_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_security_tool_id_fkey"
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_usage_stats_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_use_cases: {
        Row: {
          cost_impact: number | null
          created_at: string
          details: Json | null
          effectiveness_score: number | null
          id: string
          implementation_complexity: number | null
          time_savings: number | null
          tool_id: string | null
          use_case: string
        }
        Insert: {
          cost_impact?: number | null
          created_at?: string
          details?: Json | null
          effectiveness_score?: number | null
          id?: string
          implementation_complexity?: number | null
          time_savings?: number | null
          tool_id?: string | null
          use_case: string
        }
        Update: {
          cost_impact?: number | null
          created_at?: string
          details?: Json | null
          effectiveness_score?: number | null
          id?: string
          implementation_complexity?: number | null
          time_savings?: number | null
          tool_id?: string | null
          use_case?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_use_cases_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_use_cases_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_user_experience: {
        Row: {
          avg_response_time: number | null
          common_use_cases: string[] | null
          created_at: string | null
          id: string
          monthly_active_users: number | null
          support_response_time: number | null
          tool_id: string
          updated_at: string | null
          uptime_percentage: number | null
          user_retention_rate: number | null
          user_reviews_summary: Json | null
        }
        Insert: {
          avg_response_time?: number | null
          common_use_cases?: string[] | null
          created_at?: string | null
          id?: string
          monthly_active_users?: number | null
          support_response_time?: number | null
          tool_id: string
          updated_at?: string | null
          uptime_percentage?: number | null
          user_retention_rate?: number | null
          user_reviews_summary?: Json | null
        }
        Update: {
          avg_response_time?: number | null
          common_use_cases?: string[] | null
          created_at?: string | null
          id?: string
          monthly_active_users?: number | null
          support_response_time?: number | null
          tool_id?: string
          updated_at?: string | null
          uptime_percentage?: number | null
          user_retention_rate?: number | null
          user_reviews_summary?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_user_experience_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
          {
            foreignKeyName: "tool_user_experience_tool_id_fkey"
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
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
      user_dashboard_layouts: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          layout_config: Json | null
          layout_name: string
          team_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          layout_config?: Json | null
          layout_name: string
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          layout_config?: Json | null
          layout_name?: string
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_dashboard_layouts_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
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
          edit_history: Json | null
          id: string
          last_edited_at: string | null
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
          edit_history?: Json | null
          id?: string
          last_edited_at?: string | null
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
          edit_history?: Json | null
          id?: string
          last_edited_at?: string | null
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
            referencedRelation: "real_time_tool_metrics"
            referencedColumns: ["tool_id"]
          },
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
      real_time_tool_metrics: {
        Row: {
          ai_ranking: number | null
          category: string | null
          cons: Json | null
          customer_satisfaction_score: number | null
          ease_of_use_score: number | null
          feature_depth_score: number | null
          key_insights: string[] | null
          name: string | null
          pricing: string | null
          pros: Json | null
          roi_score: number | null
          sentiment_score: number | null
          support_score: number | null
          tool_id: string | null
          trend_score: number | null
        }
        Relationships: []
      }
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
      calculate_ai_ranking: {
        Args: {
          p_tool_id: string
        }
        Returns: number
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
      generate_team_workflow_insights: {
        Args: {
          team_id_param: string
        }
        Returns: {
          insight_id: string
          insight_type: string
          insight_data: Json
          priority_level: string
        }[]
      }
      generate_tool_recommendations:
        | {
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
        | {
            Args: {
              p_user_id: string
              p_query: string
              p_limit?: number
            }
            Returns: {
              tool_id: string
              name: string
              description: string
              logo: string
              visit_url: string
              tags: string[]
              score: number
              reviews: number
              bookmarks: number
              pricing: string
              category: string
              featured: boolean
              trending_tools: Json[]
            }[]
          }
      is_team_admin: {
        Args: {
          team_id: string
        }
        Returns: boolean
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
