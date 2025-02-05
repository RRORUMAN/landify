
import { supabase } from "@/integrations/supabase/client";

export const trackToolInteraction = async (toolId: string, interactionType: 'view' | 'click' | 'bookmark' | 'share') => {
  try {
    const { error } = await supabase
      .from('tool_analytics')
      .insert({
        tool_id: toolId,
        usage_type: interactionType,
        usage_details: {
          source: 'web',
          timestamp: new Date().toISOString()
        },
        // Allow anonymous analytics tracking
        user_id: (await supabase.auth.getUser()).data.user?.id || null
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking tool interaction:', error);
  }
};
