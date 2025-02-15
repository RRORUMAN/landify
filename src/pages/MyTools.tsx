
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { UserTool } from "@/data/types";
import { EmptyToolsState } from "@/components/tools/EmptyToolsState";
import { DashboardHeader } from "@/components/tools/DashboardHeader";
import { DashboardStats } from "@/components/tools/DashboardStats";
import { ToolsList } from "@/components/tools/ToolsList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddToolDialog } from "@/components/tools/AddToolDialog";
import { tools } from "@/data/tools";

const MyTools = () => {
  // Demo data
  const demoTools: UserTool[] = tools.slice(0, 5).map(tool => ({
    id: tool.id,
    user_id: 'demo-user',
    tool_id: tool.id,
    purchase_date: new Date().toISOString(),
    subscription_status: 'active',
    notes: null,
    subscription_tier: 'pro',
    subscription_details: null,
    monthly_cost: 29.99,
    billing_cycle: 'monthly',
    next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    usage_stats: null,
    active_sessions: 1,
    tool: tool
  }));

  const [userTools, setUserTools] = useState<UserTool[]>(demoTools);
  const [loading, setLoading] = useState(false);
  const [monthlySpend, setMonthlySpend] = useState(149.95); // Demo monthly spend
  const [activeToolsCount, setActiveToolsCount] = useState(5); // Demo active tools count
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mostUsedCategory, setMostUsedCategory] = useState<string>('Content Creation');
  const [addToolDialogOpen, setAddToolDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddTool = async (newTool: UserTool) => {
    try {
      const updatedTools = [...userTools, newTool];
      setUserTools(updatedTools);
      setMonthlySpend(monthlySpend + (newTool.monthly_cost || 0));
      setActiveToolsCount(updatedTools.filter(t => t.subscription_status === 'active').length);
      setAddToolDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Tool added successfully",
      });
    } catch (error) {
      console.error("Error adding tool:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add tool. Please try again.",
      });
    }
  };

  const handleRemoveTool = (toolId: string) => {
    const updatedTools = userTools.filter(tool => tool.tool_id !== toolId);
    setUserTools(updatedTools);
    setMonthlySpend(updatedTools.reduce((acc, tool) => acc + (tool.monthly_cost || 0), 0));
    setActiveToolsCount(updatedTools.filter(t => t.subscription_status === 'active').length);
  };

  const handleUpdateTool = (toolId: string, updates: Partial<UserTool>) => {
    const updatedTools = userTools.map(tool => 
      tool.tool_id === toolId ? { ...tool, ...updates } : tool
    );
    setUserTools(updatedTools);
    setMonthlySpend(updatedTools.reduce((acc, tool) => acc + (tool.monthly_cost || 0), 0));
    setActiveToolsCount(updatedTools.filter(t => t.subscription_status === 'active').length);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <DashboardHeader viewMode={viewMode} setViewMode={setViewMode} />
          <Dialog open={addToolDialogOpen} onOpenChange={setAddToolDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#4361EE] hover:bg-[#3249d8] text-white">
                Add Tool
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogTitle>Add New Tool</DialogTitle>
              <AddToolDialog onAdd={handleAddTool} onClose={() => setAddToolDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {userTools.length === 0 ? (
          <EmptyToolsState />
        ) : (
          <div className="space-y-6">
            <DashboardStats 
              monthlySpend={monthlySpend}
              activeToolsCount={activeToolsCount}
              mostUsedCategory={mostUsedCategory}
            />
            <ToolsList 
              tools={userTools}
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
