
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tool } from "@/data/types";

export const useToolsQuery = (selectedCategory: string | null) => {
  return useQuery({
    queryKey: ['tools', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('tools')
        .select(`
          *,
          trending_tools (
            trend_score,
            trend_data
          )
        `)
        .order('featured', { ascending: false });
      
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return (data || []).map(tool => ({
        ...tool,
        trending_tools: tool.trending_tools || []
      })) as Tool[];
    }
  });
};
