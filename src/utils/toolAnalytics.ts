
import { supabase } from "@/integrations/supabase/client";
import type { InteractionType, AIAnalysis } from "@/types/aiTypes";

export const trackToolInteraction = async (toolId: string, interactionType: InteractionType) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('tool_analytics')
      .insert({
        tool_id: toolId,
        user_id: user?.id || null,
        usage_type: interactionType as string,
        usage_details: {
          source: 'web',
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          session_id: crypto.randomUUID(),
          user_agent: navigator.userAgent
        }
      });

    if (error) throw error;

    // Handle bookmarks separately - removed increment_bookmarks as it's not a valid function
    if (interactionType === 'bookmark') {
      // Fetch current bookmarks count and increment
      const { data: currentTool } = await supabase
        .from('tools')
        .select('bookmarks')
        .eq('id', toolId)
        .single();

      const newCount = ((currentTool?.bookmarks || 0) + 1);

      const { error: updateError } = await supabase
        .from('tools')
        .update({ bookmarks: newCount })
        .eq('id', toolId);

      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error('Error tracking tool interaction:', error);
  }
};

export const getAISavingsAnalysis = async (): Promise<AIAnalysis | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Get latest analysis or calculate new one
    const { data: existingAnalysis } = await supabase
      .from('ai_savings_analysis')
      .select('*')
      .eq('user_id', user.id)
      .order('analysis_date', { ascending: false })
      .limit(1)
      .single();

    // If analysis is less than 24 hours old, return it
    if (existingAnalysis && new Date(existingAnalysis.analysis_date).getTime() > Date.now() - 24 * 60 * 60 * 1000) {
      return {
        total_spend: existingAnalysis.total_spend,
        potential_savings: existingAnalysis.potential_savings,
        recommendations: {
          total_tools: existingAnalysis.ai_recommendations?.[0]?.total_tools || 0,
          tools_data: existingAnalysis.ai_recommendations?.[0]?.tools_data || [],
          analysis_date: existingAnalysis.analysis_date
        }
      };
    }

    // Calculate new analysis using the RPC function
    const { data: newAnalysis, error } = await supabase
      .rpc('calculate_tool_savings', {
        p_user_id: user.id
      });

    if (error) throw error;

    if (newAnalysis?.[0]) {
      const recommendations = typeof newAnalysis[0].recommendations === 'object' 
        ? newAnalysis[0].recommendations 
        : { total_tools: 0, tools_data: [], analysis_date: new Date().toISOString() };

      // Store the new analysis
      await supabase
        .from('ai_savings_analysis')
        .insert({
          user_id: user.id,
          total_spend: newAnalysis[0].total_current_spend,
          potential_savings: newAnalysis[0].potential_savings,
          ai_recommendations: [recommendations]
        });

      return {
        total_spend: newAnalysis[0].total_current_spend,
        potential_savings: newAnalysis[0].potential_savings,
        recommendations: {
          total_tools: recommendations.total_tools || 0,
          tools_data: recommendations.tools_data || [],
          analysis_date: recommendations.analysis_date
        }
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting AI savings analysis:', error);
    return null;
  }
};
