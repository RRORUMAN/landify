
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart as BarChartIcon, DollarSign, Building2, Receipt, 
  Calculator, Plus, Calendar, ArrowRight, Zap, Clock, Users 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { UserTool, SpendForecast, Tool } from "@/data/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { format, addMonths } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [selectedToolId, setSelectedToolId] = useState("");
  const [newToolCost, setNewToolCost] = useState("");
  const [newToolBillingCycle, setNewToolBillingCycle] = useState("monthly");
  const { toast } = useToast();

  const { data: userTools = [], isLoading: isLoadingTools } = useQuery({
    queryKey: ['user_tools'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('user_tools')
        .select(`
          *,
          tool:tools (
            name,
            logo,
            category,
            company_name,
            monthly_active_users,
            integrations_count
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
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
      return data;
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

  const handleAddTool = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add tools",
          variant: "destructive"
        });
        return;
      }

      const monthlyCost = parseFloat(newToolCost);
      if (isNaN(monthlyCost)) {
        toast({
          title: "Invalid cost",
          description: "Please enter a valid monthly cost",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('user_tools')
        .insert([{
          user_id: user.id,
          tool_id: selectedToolId,
          monthly_cost: monthlyCost,
          billing_cycle: newToolBillingCycle,
          next_billing_date: format(addMonths(new Date(), 1), 'yyyy-MM-dd'),
          subscription_status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Tool added",
        description: "Successfully added to your dashboard",
      });

      setSelectedToolId("");
      setNewToolCost("");
    } catch (error) {
      console.error('Error adding tool:', error);
      toast({
        title: "Error",
        description: "Failed to add tool",
        variant: "destructive"
      });
    }
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Financial Analytics Dashboard</h1>
        <p className="text-gray-600">Track and optimize your AI tools spending</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Spend</p>
                  <p className="text-2xl font-semibold">${monthlySpend.toFixed(2)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Tools</p>
                  <p className="text-2xl font-semibold">{userTools.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time Saved</p>
                  <p className="text-2xl font-semibold">
                    {metrics.reduce((sum, m) => sum + (m.time_saved_per_task || 0), 0)}min/day
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold">
                    {userTools.reduce((sum, t) => sum + (t.tool?.monthly_active_users || 0), 0)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Monthly Spending Trend</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecasts.map(f => ({
                    date: format(new Date(f.forecast_date), 'MMM dd'),
                    amount: f.forecasted_amount
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ fill: '#8884d8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Tool Performance</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userTools.map(tool => ({
                    name: tool.tool?.name || 'Unknown',
                    roi: metrics.find(m => m.tool_id === tool.tool_id)?.roi_score || 0,
                    efficiency: metrics.find(m => m.tool_id === tool.tool_id)?.automation_score || 0
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="roi" fill="#8884d8" name="ROI Score" />
                    <Bar dataKey="efficiency" fill="#82ca9d" name="Efficiency Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Tools</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add Tool
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Tool</DialogTitle>
                  <DialogDescription>
                    Select a tool and enter its cost details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Select value={selectedToolId} onValueChange={setSelectedToolId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tool" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTools.map((tool) => (
                        <SelectItem key={tool.id} value={tool.id}>
                          {tool.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Monthly cost"
                    value={newToolCost}
                    onChange={(e) => setNewToolCost(e.target.value)}
                  />
                  <Select value={newToolBillingCycle} onValueChange={setNewToolBillingCycle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                    onClick={handleAddTool}
                  >
                    Add Tool
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTools.map((tool) => (
              <Card key={tool.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={tool.tool?.logo} 
                      alt={tool.tool?.name} 
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{tool.tool?.name}</h3>
                      <p className="text-sm text-gray-500">{tool.tool?.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${tool.monthly_cost}/mo</p>
                    <p className="text-sm text-gray-500">
                      Next billing: {tool.next_billing_date ? 
                        format(new Date(tool.next_billing_date), 'MMM dd, yyyy') : 
                        'N/A'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {getToolMetrics(tool.tool_id).map((metric) => (
                    <div key={metric.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{metric.metric_name}</span>
                      <span className="font-medium">{metric.metric_value} {metric.metric_unit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Tool Performance Metrics</h2>
            <div className="space-y-8">
              {userTools.map((tool) => {
                const toolMetrics = metrics.filter(m => m.tool_id === tool.tool_id);
                return (
                  <div key={tool.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={tool.tool?.logo} 
                        alt={tool.tool?.name} 
                        className="w-10 h-10 rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{tool.tool?.name}</h3>
                        <p className="text-sm text-gray-500">
                          {tool.tool?.integrations_count} integrations · {tool.tool?.monthly_active_users} active users
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {toolMetrics.map((metric) => (
                        <Card key={metric.id} className="p-4">
                          <p className="text-sm text-gray-600">{metric.metric_name}</p>
                          <p className="text-xl font-semibold">
                            {metric.metric_value} {metric.metric_unit}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Reports</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">
                  Generate Monthly Spending Report
                </h3>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Generate Report <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
