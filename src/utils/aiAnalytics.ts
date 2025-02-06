
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/data/types";
import type { ToolCompatibility, AIInsight, ROIMetrics } from "@/types/aiTypes";

export async function getToolCompatibility(toolId1: string, toolId2: string): Promise<ToolCompatibility | null> {
  const { data, error } = await supabase
    .from('tool_compatibility_scores')
    .select('*')
    .or(`tool_id_1.eq.${toolId1},tool_id_2.eq.${toolId1}`)
    .or(`tool_id_1.eq.${toolId2},tool_id_2.eq.${toolId2}`)
    .single();

  if (error) {
    console.error('Error fetching tool compatibility:', error);
    return null;
  }

  return data;
}

export async function getToolInsights(toolId: string): Promise<AIInsight[]> {
  const { data, error } = await supabase
    .from('tool_ai_insights')
    .select('*')
    .eq('tool_id', toolId);

  if (error) {
    console.error('Error fetching tool insights:', error);
    return [];
  }

  return data;
}

export async function getROIAnalytics(toolId: string): Promise<ROIMetrics | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('tool_roi_analytics')
    .select('*')
    .eq('tool_id', toolId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching ROI analytics:', error);
    return null;
  }

  return data;
}
