
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart as BarChartIcon, DollarSign, Building2, Receipt, 
  Calculator, Plus, Calendar, ArrowRight 
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
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { format } from "date-fns";

const Analytics = () => {
  const [userTools, setUserTools] = useState<UserTool[]>([]);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [loading, setLoading] = useState(true);
  const [forecasts, setForecasts] = useState<SpendForecast[]>([]);
  const [availableTools, setAvailableTools] = useState<Tool[]>([]);
  const [selectedToolId, setSelectedToolId] = useState("");
  const [newToolCost, setNewToolCost] = useState("");
  const [newToolBillingCycle, setNewToolBillingCycle] = useState("monthly");
  const { toast } = useToast();

  useEffect(() => {
    fetchUserToolsAndForecasts();
    fetchAvailableTools();
  }, []);

  const fetchAvailableTools = async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setAvailableTools(data || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const fetchUserToolsAndForecasts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view analytics",
          variant: "destructive"
        });
        return;
      }

      // Fetch user tools
      const { data: toolsData, error: toolsError } = await supabase
        .from('user_tools')
        .select('*')
        .eq('user_id', user.id);

      if (toolsError) throw toolsError;

      // Fetch forecasts
      const { data: forecastsData, error: forecastsError } = await supabase
        .from('spend_forecasts')
        .select('*')
        .eq('user_id', user.id)
        .order('forecast_date', { ascending: true });

      if (forecastsError) throw forecastsError;

      setUserTools(toolsData || []);
      setForecasts(forecastsData || []);
      
      // Calculate total monthly spend
      const totalSpend = (toolsData || []).reduce((sum, tool) => 
        sum + (tool.monthly_cost || 0), 0);
      setMonthlySpend(totalSpend);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTool = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

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
          next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          subscription_status: 'active',
          usage_stats: {},
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Tool added",
        description: "Successfully added to your dashboard",
      });

      await fetchUserToolsAndForecasts();
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

  const getSpendingChartData = () => {
    const monthlyData = userTools.map(tool => ({
      name: availableTools.find(t => t.id === tool.tool_id)?.name || tool.tool_id,
      cost: tool.monthly_cost || 0
    }));

    return monthlyData;
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-gray-600 dark:text-gray-300">
          Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Financial Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Track and optimize your AI tools spending</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monthly Spend</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">${monthlySpend}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Active Tools</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{userTools.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Yearly Projection</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    ${(monthlySpend * 12).toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                  <Calculator className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Average Per Tool</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    ${userTools.length ? (monthlySpend / userTools.length).toFixed(2) : '0'}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Monthly Spending by Tool</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getSpendingChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Tools</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add Tool
                </Button>
              </DialogTrigger>
              <DialogContent>
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
            {userTools.map((tool) => {
              const toolInfo = availableTools.find(t => t.id === tool.tool_id);
              return (
                <Card 
                  key={tool.id} 
                  className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {toolInfo?.name || tool.tool_id}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tool.billing_cycle} billing
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ${tool.monthly_cost}/mo
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Next billing: {tool.next_billing_date ? 
                          format(new Date(tool.next_billing_date), 'MMM dd, yyyy') : 
                          'N/A'}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Monthly Reports</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
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
