
import { motion, AnimatePresence } from "framer-motion";
import type { UserTool } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Activity, DollarSign, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CategoryToolsProps {
  category: string;
  tools: UserTool[];
  viewMode?: 'grid' | 'list';
  onRemoveTool?: (toolId: string) => void;
}

export const CategoryTools = ({ category, tools, viewMode = 'grid', onRemoveTool }: CategoryToolsProps) => {
  const validTools = tools.filter(userTool => userTool.tool !== undefined);

  const handleRemoveTool = async (toolId: string) => {
    try {
      const { error } = await supabase
        .from('user_tools')
        .delete()
        .eq('tool_id', toolId);

      if (error) throw error;

      onRemoveTool?.(toolId);
      toast({
        title: "Tool removed",
        description: "The tool has been removed from your list",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {validTools.map((userTool) => (
          <motion.div
            key={userTool.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Card className="p-6 bg-white hover:shadow-md transition-shadow">
              <button
                onClick={() => handleRemoveTool(userTool.tool_id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {userTool.tool?.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-sm text-gray-500">Monthly Cost</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-xl font-semibold text-gray-900">
                        {userTool.monthly_cost?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>
                  <Badge variant={userTool.subscription_status === 'active' ? 'default' : 'secondary'}>
                    {userTool.subscription_status}
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  onClick={() => window.open(userTool.tool?.visit_url, '_blank')}
                  className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 bg-white hover:bg-gray-50"
                >
                  Visit Tool <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
