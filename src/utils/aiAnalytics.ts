
import { supabase } from "@/integrations/supabase/client";
import type { ToolCompatibility, AIInsight, ROIMetrics } from "@/types/aiTypes";

export async function getToolCompatibility(toolId1: string, toolId2: string): Promise<ToolCompatibility | null> {
  try {
    const { data, error } = await supabase
      .from('tool_compatibility_scores')
      .select('*')
      .or(`tool_id_1.eq.${toolId1},tool_id_2.eq.${toolId1}`)
      .or(`tool_id_1.eq.${toolId2},tool_id_2.eq.${toolId2}`)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      score: data.compatibility_score || 0,
      factors: data.comparison_metrics as Record<string, number>,
      recommendations: data.use_case_match as string[],
      integration_factors: data.integration_factors as Record<string, any>,
    };
  } catch (error) {
    console.error('Error fetching tool compatibility:', error);
    return null;
  }
}

export async function getToolInsights(toolId: string): Promise<AIInsight[]> {
  try {
    const { data, error } = await supabase
      .from('tool_ai_insights')
      .select('*')
      .eq('tool_id', toolId);

    if (error) throw error;

    return (data || []).map(insight => ({
      id: insight.id,
      type: insight.insight_type,
      score: insight.confidence_score || 0,
      details: insight.insight_data as Record<string, any>,
      insight_data: insight.insight_data as Record<string, any>,
      recommendations: insight.recommendations as string[],
      insight_type: insight.insight_type,
      confidence_score: insight.confidence_score || 0,
      last_updated: insight.last_updated || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching tool insights:', error);
    return [];
  }
}
