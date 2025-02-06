
import { supabase } from "@/integrations/supabase/client";

export type InteractionType = 'view' | 'click' | 'bookmark' | 'share';

export const trackToolInteraction = async (toolId: string, interactionType: InteractionType) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('tool_analytics')
      .insert({
        tool_id: toolId,
        user_id: user?.id || null,
        usage_type: interactionType as string, // Fix type error by explicitly casting
        usage_details: {
          source: 'web',
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          session_id: crypto.randomUUID(),
          user_agent: navigator.userAgent
        }
      });

    if (error) throw error;

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
