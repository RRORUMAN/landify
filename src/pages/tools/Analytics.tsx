
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { UserTool, SpendForecast } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { AnalyticsSummaryCards } from "@/components/analytics/AnalyticsSummaryCards";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { ToolsList } from "@/components/analytics/ToolsList";
import { AddToolDialog } from "@/components/analytics/AddToolDialog";
import { PerformanceMetrics } from "@/components/analytics/PerformanceMetrics";

const Analytics = () => {
  const { data: userTools = [], isLoading: isLoadingTools } = useQuery({
    queryKey: ['user_tools'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('user_tools')
        .select(`
          *,
          tool:tools (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data as UserTool[];
    }
  });

  const { data: analytics = [], isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['tool_analytics', userTools.map(t => t.tool_id)],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('tool_analytics')
        .select('*')
        .eq('user_id', user.id)
        .in('tool_id', userTools.map(t => t.tool_id));

      if (error) throw error;
      return data;
    },
    enabled: userTools.length > 0
  });

  const { data: metrics = [], isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['performance_metrics', userTools.map(t => t.tool_id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .in('tool_id', userTools.map(t => t.tool_id));

      if (error) throw error;
      return data;
    },
    enabled: userTools.length > 0
  });

  const { data: forecasts = [], isLoading: isLoadingForecasts } = useQuery({
    queryKey: ['spend_forecasts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('spend_forecasts')
        .select('*')
        .eq('user_id', user.id)
        .order('forecast_date', { ascending: true });

      if (error) throw error;
      return data as SpendForecast[];
    }
  });

  const { data: availableTools = [] } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const monthlySpend = userTools.reduce((sum, tool) => 
    sum + (tool.monthly_cost || 0), 0);

  const getToolMetrics = (toolId: string) => {
    return metrics.filter(m => m.tool_id === toolId);
  };

  const isLoading = isLoadingTools || isLoadingAnalytics || isLoadingMetrics || isLoadingForecasts;

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-gray-600">
          Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Analytics Dashboard</h1>
        <p className="text-gray-600">Track, analyze, and optimize your AI tools investment</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AnalyticsSummaryCards
            userTools={userTools}
            monthlySpend={monthlySpend}
            metrics={metrics}
          />
          <AnalyticsCharts
            forecasts={forecasts}
            userTools={userTools}
            metrics={metrics}
          />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your AI Tools Portfolio</h2>
            <AddToolDialog availableTools={availableTools} />
          </div>
          <ToolsList
            userTools={userTools}
            getToolMetrics={getToolMetrics}
          />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceMetrics
            userTools={userTools}
            metrics={metrics}
          />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">
              Generate AI-Powered Analytics Report
            </h3>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Generate Report <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
