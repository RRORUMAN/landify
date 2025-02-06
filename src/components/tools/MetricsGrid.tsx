
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface Metric {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  tooltip: string;
  subtext?: string;
}

interface MetricsGridProps {
  metrics: Metric[];
}

export const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {metrics.map((metric) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${metric.color}`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-black dark:text-white">{metric.title}</p>
                      <p className="text-2xl font-semibold text-[#000000e6]">{metric.value}</p>
                      {metric.subtext && (
                        <p className="text-sm text-black dark:text-white mt-1">{metric.subtext}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>{metric.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      ))}
    </div>
  );
};
