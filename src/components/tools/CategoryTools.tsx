
import { motion, AnimatePresence } from "framer-motion";
import type { UserTool } from "@/data/types";
import ToolCard from "@/components/ToolCard";

interface CategoryToolsProps {
  category: string;
  tools: UserTool[];
}

export const CategoryTools = ({ category, tools }: CategoryToolsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {category}
        <span className="text-gray-500 text-lg ml-2">
          ({tools.length} tools)
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ToolCard tool={tool.tool!} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
