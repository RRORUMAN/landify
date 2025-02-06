
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface AIFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'optimization' | 'insight' | 'prediction';
  score?: number;
}

const AIFeatureCard = ({ title, description, icon, type, score }: AIFeatureCardProps) => {
  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'optimization':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
      case 'insight':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300';
      case 'prediction':
        return 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-300';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-3 hover:shadow-sm transition-shadow bg-white/50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-md ${getBadgeStyles(type)}`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{description}</p>
          </div>
          {score !== undefined && (
            <Badge variant="secondary" className={`text-xs ${getBadgeStyles(type)}`}>
              {score}%
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default AIFeatureCard;
