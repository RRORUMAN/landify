
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
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
      id: data.id,
      tool_id_1: data.tool_id_1 || '',
      tool_id_2: data.tool_id_2 || '',
      compatibility_score: data.compatibility_score || 0,
      integration_factors: data.integration_factors as ToolCompatibility['integration_factors'],
      use_case_match: data.use_case_match as string[],
      last_analyzed: data.last_analyzed || new Date().toISOString()
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
      tool_id: insight.tool_id || '',
      insight_type: insight.insight_type as 'workflow' | 'budget' | 'team',
      insight_data: insight.insight_data as AIInsight['insight_data'],
      confidence_score: insight.confidence_score || 0,
      recommendations: insight.recommendations as AIInsight['recommendations'],
      last_updated: insight.last_updated || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching tool insights:', error);
    return [];
  }
}
