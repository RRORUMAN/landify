
export interface ToolCompatibility {
  id: string;
  tool_id_1: string;
  tool_id_2: string;
  compatibility_score: number;
  integration_factors: Record<string, any>;
  use_case_match: string[];
  last_analyzed: string;
}

export interface AIInsight {
  id: string;
  tool_id: string;
  insight_type: string;
  insight_data: Record<string, any>;
  confidence_score: number;
  recommendations: string[];
  last_updated: string;
}

export interface ROIMetrics {
  id: string;
  user_id: string;
  tool_id: string;
  time_saved: number;
  cost_savings: number;
  productivity_gain: number;
  roi_score: number;
  historical_data: Record<string, any>[];
  predictions: {
    projected_savings: number;
    payback_period: number;
    confidence_level: number;
  };
  last_updated: string;
}

export interface AIAnalysis {
  total_tools: number;
  tools_data: Record<string, any>;
  analysis_date: string;
  potential_savings: number;
}
