
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserTool } from "@/data/types";
import { EmptyToolsState } from "@/components/tools/EmptyToolsState";
import { DashboardHeader } from "@/components/tools/DashboardHeader";
import { DashboardStats } from "@/components/tools/DashboardStats";
import { ToolsList } from "@/components/tools/ToolsList";

const MyTools = () => {
  const [tools, setTools] = useState<UserTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [activeToolsCount, setActiveToolsCount] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mostUsedCategory, setMostUsedCategory] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const calculateMonthlySpend = (toolsList: UserTool[]) => {
    return toolsList.reduce((acc: number, tool: UserTool) => {
      if (tool.subscription_status === 'active') {
        return acc + (typeof tool.monthly_cost === 'number' ? tool.monthly_cost : 0);
      }
      return acc;
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }

        const { data: userTools, error } = await supabase
          .from("user_tools")
          .select(`
            *,
            tool:tools(*)
          `)
          .eq("user_id", user.id);

        if (error) throw error;

        const processedTools = userTools.map((userTool: any) => ({
          ...userTool,
          tool: userTool.tool
        }));

        setTools(processedTools);
        setMonthlySpend(calculateMonthlySpend(processedTools));
        setActiveToolsCount(processedTools.filter(t => t.subscription_status === 'active').length);
        
        const categoryCount = processedTools.reduce((acc: Record<string, number>, tool: UserTool) => {
          const category = tool.tool?.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        
        const mostUsed = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0];
        setMostUsedCategory(mostUsed?.[0] || 'None');

      } catch (error) {
        console.error("Error fetching tools:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch your tools. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, toast]);

  const handleRemoveTool = (toolId: string) => {
    const updatedTools = tools.filter(tool => tool.tool_id !== toolId);
    setTools(updatedTools);
    setMonthlySpend(calculateMonthlySpend(updatedTools));
    setActiveToolsCount(updatedTools.filter(t => t.subscription_status === 'active').length);
  };

  const handleUpdateTool = (toolId: string, updates: Partial<UserTool>) => {
    const updatedTools = tools.map(tool => 
      tool.tool_id === toolId ? { ...tool, ...updates } : tool
    );
    setTools(updatedTools);
    setMonthlySpend(calculateMonthlySpend(updatedTools));
    setActiveToolsCount(updatedTools.filter(t => t.subscription_status === 'active').length);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader viewMode={viewMode} setViewMode={setViewMode} />

        {tools.length === 0 ? (
          <EmptyToolsState />
        ) : (
          <div className="space-y-6">
            <DashboardStats 
              monthlySpend={monthlySpend}
              activeToolsCount={activeToolsCount}
              mostUsedCategory={mostUsedCategory}
            />
            <ToolsList 
              tools={tools}
              viewMode={viewMode}
              onRemoveTool={handleRemoveTool}
              onUpdateTool={handleUpdateTool}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTools;
