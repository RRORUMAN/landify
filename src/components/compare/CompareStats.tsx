
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import CompanyHeader from "./stats/CompanyHeader";
import CompanyInfo from "./stats/CompanyInfo";
import PerformanceMetrics from "./stats/PerformanceMetrics";
import SentimentAnalysis from "./stats/SentimentAnalysis";

interface CompareStatsProps {
  tools: Tool[];
}

interface PerformanceMetric {
  tool_id: string;
  metric_value: number;
  roi_score: number;
  ease_of_use_score: number;
  time_saved_per_task: number;
}

interface SentimentData {
  tool_id: string;
  sentiment_score: number;
  pros: string[];
  cons: string[];
  key_insights: string[];
}

const CompareStats = ({ tools }: CompareStatsProps) => {
  const { data: performanceMetrics = [], isError: isMetricsError } = useQuery({
    queryKey: ['performance_metrics', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .in('tool_id', tools.map(t => t.id));
      
      if (error) {
        toast({
          title: "Error loading metrics",
          description: "Could not load performance metrics",
          variant: "destructive",
        });
        throw error;
      }
      return data as PerformanceMetric[];
    }
  });

  const { data: sentimentData = [], isError: isSentimentError } = useQuery({
    queryKey: ['tool_reviews_sentiment', tools.map(t => t.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_reviews_sentiment')
        .select('*')
        .in('tool_id', tools.map(t => t.id));
      
      if (error) {
        toast({
          title: "Error loading sentiment data",
          description: "Could not load sentiment analysis",
          variant: "destructive",
        });
        throw error;
      }
      return data as SentimentData[];
    }
  });

  const getSentimentData = (toolId: string) => {
    return sentimentData.find(s => s.tool_id === toolId);
  };

  if (isMetricsError || isSentimentError) {
    return (
      <div className="text-center py-8 text-gray-500">
        Error loading comparison data. Please try again.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool) => {
        const metrics = performanceMetrics.find(m => m.tool_id === tool.id);
        const sentiment = getSentimentData(tool.id);
        
        return (
          <Card key={tool.id} className="p-6 flex flex-col gap-6">
            <CompanyHeader tool={tool} />
            <CompanyInfo tool={tool} />
            <PerformanceMetrics metrics={metrics || {}} />
            <SentimentAnalysis 
              pros={sentiment?.pros} 
              cons={sentiment?.cons} 
              key_insights={sentiment?.key_insights} 
            />
            <Button
              variant="outline"
              className="mt-auto w-full"
              onClick={() => window.open(tool.visit_url, '_blank')}
            >
              <Link className="h-4 w-4 mr-2" />
              Visit Tool
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default CompareStats;
