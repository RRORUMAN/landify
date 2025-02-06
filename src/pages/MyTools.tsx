
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, LayoutGrid, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserTool } from "@/data/types";
import { CategoryTools } from "@/components/tools/CategoryTools";
import { EmptyToolsState } from "@/components/tools/EmptyToolsState";
import { Card } from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">My Tools</h1>
          </div>
          <div className="flex items-center gap-4">
            <Tabs defaultValue="grid" className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="grid" 
                  onClick={() => setViewMode('grid')}
                  className="data-[state=active]:bg-[#4361EE] data-[state=active]:text-white"
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Grid
                </TabsTrigger>
                <TabsTrigger 
                  value="list" 
                  onClick={() => setViewMode('list')}
                  className="data-[state=active]:bg-[#4361EE] data-[state=active]:text-white"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              onClick={() => navigate("/tools/add")}
              className="bg-[#4361EE] hover:bg-[#3249d8] text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Tools
            </Button>
          </div>
        </div>

        {tools.length === 0 ? (
          <EmptyToolsState />
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500">Monthly Spend</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-3xl font-semibold text-[#4361EE]">${monthlySpend.toFixed(2)}</p>
                    <p className="ml-2 text-sm text-gray-500">/ month</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500">Active Tools</h3>
                  <p className="mt-2 text-3xl font-semibold text-[#4361EE]">{activeToolsCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500">Most Used Category</h3>
                  <p className="mt-2 text-3xl font-semibold text-[#4361EE]">{mostUsedCategory}</p>
                </div>
              </div>
            </Card>

            <AnimatePresence mode="wait">
              {Object.entries(
                tools.reduce((acc, tool) => {
                  const category = tool.tool?.category || 'Uncategorized';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(tool);
                  return acc;
                }, {} as Record<string, typeof tools>)
              ).map(([category, categoryTools]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {category}
                        <span className="text-gray-500 text-lg ml-2">
                          ({categoryTools.length})
                        </span>
                      </h2>
                    </div>
                    <CategoryTools 
                      category={category} 
                      tools={categoryTools}
                      viewMode={viewMode}
                      onRemoveTool={handleRemoveTool}
                      onUpdateTool={handleUpdateTool}
                    />
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTools;
