
export interface ToolCompatibility {
  compatibility_score: number;
  integration_factors: Record<string, any>;
  use_case_match: string[];
  last_analyzed: string;
}

export interface AIInsight {
  insight_type: string;
  insight_data: Record<string, any>;
  confidence_score: number;
  recommendations: string[];
}

export interface ROIMetrics {
  time_saved: number;
  cost_savings: number;
  productivity_gain: number;
  roi_score: number;
  predictions: {
    projected_savings: number;
    payback_period: number;
    confidence_level: number;
  };
}
