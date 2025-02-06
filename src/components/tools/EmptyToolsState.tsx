
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EmptyToolsState = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Tools Yet</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Start building your collection by adding some tools.
      </p>
      <Button
        onClick={() => navigate("/tools/add")}
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 mx-auto"
      >
        <Plus className="w-4 h-4" /> Browse Tools
      </Button>
    </motion.div>
  );
};
