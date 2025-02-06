export interface ToolCompatibility {
  id: string;
  tool_id_1: string;
  tool_id_2: string;
  compatibility_score: number;
  integration_factors: {
    api_compatibility: number;
    data_sync: number;
    workflow_integration: number;
    user_experience: number;
  };
  use_case_match: string[];
  last_analyzed: string;
}

export interface AIInsight {
  id: string;
  tool_id: string;
  insight_type: 'workflow' | 'budget' | 'team';
  insight_data: {
    efficiency_score?: number;
    cost_impact?: number;
    team_adoption?: number;
    learning_curve?: number;
    automation_potential?: number;
    integration_complexity?: number;
  };
  confidence_score: number;
  recommendations: Array<{
    toolId: string;
    text: string;
  }>;
  last_updated: string;
}

export interface ComparisonFeature {
  name: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  description: string;
  values: {
    toolId: string;
    value: string | boolean | number;
    notes?: string;
    confidenceScore: number;
  }[];
}

export interface FeatureCategory {
  name: string;
  description: string;
  features: ComparisonFeature[];
}

export interface Report {
  id: string;
  name: string;
  type: 'usage' | 'cost' | 'performance';
  schedule: 'daily' | 'weekly' | 'monthly' | null;
  recipients: string[];
  next_send: string;
}

export interface ROIMetrics {
  timeSaved: number;
  costSavings: number;
  productivityGain: number;
  score: number;
}
