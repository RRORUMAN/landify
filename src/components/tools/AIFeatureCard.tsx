
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, LineChart, Clock } from "lucide-react";
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
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'insight':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'prediction':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${getBadgeStyles(type)}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
          </div>
          {score !== undefined && (
            <Badge variant="secondary" className={getBadgeStyles(type)}>
              Score: {score}
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default AIFeatureCard;
