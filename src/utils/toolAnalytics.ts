
import { supabase } from "@/integrations/supabase/client";

export const trackToolInteraction = async (toolId: string, interactionType: 'view' | 'click' | 'bookmark' | 'share') => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('tool_analytics')
      .insert({
        tool_id: toolId,
        usage_type: interactionType,
        usage_details: {
          source: 'web',
          timestamp: new Date().toISOString(),
          page: window.location.pathname
        },
        user_id: user?.id || null
      });

    if (error) throw error;

    // Update tool bookmarks count if it's a bookmark interaction
    if (interactionType === 'bookmark') {
      const { error: updateError } = await supabase.rpc('increment_tool_bookmarks', {
        p_tool_id: toolId
      });

      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error('Error tracking tool interaction:', error);
  }
};
