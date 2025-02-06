
import { UserTool } from "@/data/types";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CategoryTools } from "@/components/tools/CategoryTools";

interface ToolsListProps {
  tools: UserTool[];
  viewMode: 'grid' | 'list';
  onRemoveTool: (toolId: string) => void;
  onUpdateTool: (toolId: string, updates: Partial<UserTool>) => void;
}

export const ToolsList = ({ tools, viewMode, onRemoveTool, onUpdateTool }: ToolsListProps) => {
  const categorizedTools = tools.reduce((acc, tool) => {
    const category = tool.tool?.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  return (
    <AnimatePresence mode="wait">
      {Object.entries(categorizedTools).map(([category, categoryTools]) => (
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
              onRemoveTool={onRemoveTool}
              onUpdateTool={onUpdateTool}
            />
          </Card>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
