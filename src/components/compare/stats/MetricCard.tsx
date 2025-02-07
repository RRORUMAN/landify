
import { type LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value?: number | null;
  max?: number;
  unit?: string;
  color: string;
  trend?: React.ReactNode;
  inverse?: boolean;
}

const MetricCard = ({ icon: Icon, title, value, max, unit, color, trend, inverse }: MetricCardProps) => {
  if (!value) return null;

  const formatValue = (val: number) => {
    // Round to at most 1 decimal place
    const rounded = Math.round(val * 10) / 10;
    
    if (inverse) {
      return `${rounded}${unit}`;
    }
    
    // If it's a percentage or score out of max
    if (max) {
      const percentage = Math.round((val / max) * 100);
      return `${percentage}%`;
    }
    
    return `${rounded}${unit ?? ''}`;
  };

  return (
    <div className="p-4 rounded-lg border bg-white hover:bg-gray-50 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${color}`} />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        {trend}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-gray-900">
          {formatValue(value)}
        </span>
        {max && !inverse && (
          <span className="text-sm text-gray-500">/ {max}</span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
