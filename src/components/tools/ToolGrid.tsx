
import { Tool } from "@/data/types";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface ToolGridProps {
  isLoading: boolean;
  featuredTools: Tool[];
  regularTools: Tool[];
  selectedCategory: string | null;
  filteredTools: Tool[];
  onClearFilters: () => void;
}

const ToolGrid = ({
  isLoading,
  featuredTools,
  regularTools,
  selectedCategory,
  filteredTools,
  onClearFilters,
}: ToolGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="backdrop-blur-md bg-white/70 rounded-xl p-6 shadow-lg border border-white/20">
            <Skeleton className="h-12 w-12 rounded-lg mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {featuredTools.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {featuredTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {selectedCategory || "All Tools"}
          <span className="text-gray-500 text-lg ml-2">
            ({regularTools.length} tools)
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {regularTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {filteredTools.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500">No tools found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default ToolGrid;
