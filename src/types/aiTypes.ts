export interface ToolCompatibility {
  score: number;
  factors: Record<string, number>;
  recommendations: string[];
  integration_factors: Record<string, any>;
}

export interface AIInsight {
  id: string;
  type: string;
  score: number;
  details: Record<string, any>;
  insight_data: Record<string, any>;
  recommendations: string[];
  insight_type: string;
  confidence_score: number;
  last_updated: string;
}

export interface ROIMetrics {
  cost_savings: number;
  time_saved: number;
  productivity_gain: number;
  roi_score: number;
}

export interface ToolPerformance {
  accuracy_score: number;
  response_time: number;
  scalability_score: number;
  ease_of_use_score: number;
  cost_efficiency_score: number;
  support_quality_score: number;
  api_reliability_score: number;
  customization_score: number;
  update_frequency: number;
}

export interface ToolFeatureMatrix {
  feature_score: number;
  confidence_score: number;
  implementation_quality: string;
  feature_details: Record<string, any>;
  notes: string;
}

export interface ComparisonFeature {
  id: string;
  feature_name: string;
  feature_category: string;
  feature_value: string | null;
  feature_details: Record<string, any>;
  importance: 'high' | 'medium' | 'low';
  feature_group: string | null;
  help_text: string | null;
  tool_id: string;
  is_premium: boolean;
  sort_order: number;
  name: string;
  description: string;
  confidence_score: number;
  implementation_quality?: string;
  feature_limitations?: string[];
  verification_source_url?: string;
  comparison_note?: string;
  implementation_details?: ToolFeatureMatrix;
  values: Array<{
    toolId: string;
    value: string | boolean | number;
    confidenceScore: number;
    notes?: string;
  }>;
}

export interface FeatureCategory {
  name: string;
  description: string;
  features: ComparisonFeature[];
  confidence_score?: number;
  feature_summary?: Record<string, any>;
}

export interface TeamActivityLog {
  id: string;
  team_id: string;
  user_id: string;
  activity_type: string;
  activity_data: Record<string, any>;
  created_at: string;
}

export interface AIWorkflowInsight {
  id: string;
  insight_type: string;
  insight_data: Record<string, any>;
  priority_level: string;
  created_at: string;
  status: string;
}
