
import { HeartHandshake, Brain, Shield, Clock } from "lucide-react";
import MetricCard from "./MetricCard";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KeyMetricsProps {
  metrics: any;
}

const KeyMetrics = ({ metrics }: KeyMetricsProps) => {
  const getTrendIndicator = (value: number, threshold: number = 7.5) => {
    if (value >= threshold) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-gray-900">Performance Metrics</h4>
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          icon={HeartHandshake}
          title="User Satisfaction"
          value={metrics?.customer_satisfaction_score}
          max={5}
          trend={getTrendIndicator(metrics?.customer_satisfaction_score || 0)}
          unit="/5"
          color="text-purple-500"
        />
        <MetricCard
          icon={Brain}
          title="Learning Curve"
          value={metrics?.learning_curve_score}
          max={5}
          trend={getTrendIndicator(metrics?.learning_curve_score || 0)}
          unit="/5"
          color="text-blue-500"
        />
        <MetricCard
          icon={Shield}
          title="API Reliability"
          value={metrics?.api_reliability_score}
          max={5}
          trend={getTrendIndicator(metrics?.api_reliability_score || 0)}
          unit="/5"
          color="text-green-500"
        />
        <MetricCard
          icon={Clock}
          title="Support Response"
          value={metrics?.support_response_time}
          trend={getTrendIndicator(24 - (metrics?.support_response_time || 0))}
          unit="hrs"
          color="text-orange-500"
          inverse
        />
      </div>
    </div>
  );
};

export default KeyMetrics;
