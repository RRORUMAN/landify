import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, DollarSign, Zap, Building2, Receipt, CreditCard, PieChart, Calculator } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { UserTool, SpendForecast } from "@/data/types";

const Analytics = () => {
  const [userTools, setUserTools] = useState<UserTool[]>([]);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [loading, setLoading] = useState(true);
  const [forecasts, setForecasts] = useState<SpendForecast[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserToolsAndForecasts();
  }, []);

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

  const handleConnectApp = async (toolId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_tools')
        .insert([{
          user_id: user.id,
          tool_id: toolId,
          subscription_status: 'active',
          monthly_cost: 0, // Default value, should be updated by user
          billing_cycle: 'monthly',
          usage_stats: {},
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Tool connected",
        description: "Successfully added to your dashboard",
      });

      await fetchUserToolsAndForecasts();
    } catch (error) {
      console.error('Error connecting tool:', error);
      toast({
        title: "Error",
        description: "Failed to connect tool",
        variant: "destructive"
      });
    }
  };

  const departments = [
    { name: "All", spend: monthlySpend },
    { name: "Marketing", spend: 850 },
    { name: "Sales", spend: 600 },
    { name: "Engineering", spend: 500 },
    { name: "HR", spend: 300 },
    { name: "Finance", spend: 200 },
  ];

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
        <p className="text-gray-600 dark:text-gray-300">Track and optimize your AI tools spending across departments</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Spend</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">${monthlySpend}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
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

            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <Receipt className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Renewals This Month</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {userTools.filter(tool => {
                      const nextBilling = new Date(tool.next_billing_date || '');
                      const now = new Date();
                      return nextBilling.getMonth() === now.getMonth();
                    }).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                  <Calculator className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Forecast (Next Month)</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {forecasts.length > 0 ? `$${forecasts[0].forecasted_amount}` : '-'}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Active Subscriptions</h2>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {userTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{tool.tool_id}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {tool.billing_cycle} • Next billing: {new Date(tool.next_billing_date || '').toLocaleDateString()}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${tool.monthly_cost || 0}/mo
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Spending Forecast</h2>
              <div className="space-y-4">
                {forecasts.slice(0, 3).map((forecast) => (
                  <div
                    key={forecast.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {new Date(forecast.forecast_date).toLocaleDateString()}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Projected spend</p>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${forecast.forecasted_amount}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Department Spending</h2>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {departments.slice(1).map((dept) => (
                    <div key={dept.name} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{dept.name}</h3>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">${dept.spend}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                          style={{ width: `${(dept.spend / departments[0].spend) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Budget Management</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Set Department Budgets</h3>
                  <div className="space-y-3">
                    {departments.slice(1).map((dept) => (
                      <div key={dept.name} className="flex items-center gap-3">
                        <span className="text-sm text-blue-800 dark:text-blue-200 w-24">{dept.name}</span>
                        <Input
                          type="number"
                          placeholder="Set budget"
                          className="dark:bg-gray-700/50 dark:text-white dark:border-gray-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Subscription Optimization</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                  <h3 className="font-medium text-green-900 dark:text-green-300 mb-2">Cost Saving Opportunities</h3>
                  <p className="text-sm text-green-800 dark:text-green-200">Switch to annual billing for ChatGPT to save 20%</p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">Duplicate Subscriptions</h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">Multiple design tools detected. Consider consolidating licenses.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Bulk Payment Management</h2>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                  <h3 className="font-medium text-purple-900 dark:text-purple-300 mb-2">Payment Schedule</h3>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {userTools.map((tool) => (
                        <div key={tool.id} className="flex justify-between items-center">
                          <span className="text-sm text-purple-800 dark:text-purple-200">{tool.tool_id}</span>
                          <Button variant="outline" className="dark:bg-purple-900/20 dark:text-purple-200 dark:hover:bg-purple-800/30">
                            Schedule Payment
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Invoice Management</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                  <h3 className="font-medium text-indigo-900 dark:text-indigo-300 mb-2">Recent Invoices</h3>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {userTools.map((tool) => (
                        <div key={tool.id} className="flex justify-between items-center">
                          <span className="text-sm text-indigo-800 dark:text-indigo-200">{tool.tool_id}</span>
                          <Button variant="ghost" className="dark:text-indigo-200 dark:hover:bg-indigo-800/30">
                            View Invoice
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-100 dark:border-pink-800">
                  <h3 className="font-medium text-pink-900 dark:text-pink-300 mb-2">Consolidated Billing</h3>
                  <p className="text-sm text-pink-800 dark:text-pink-200 mb-4">Generate a single invoice for all subscriptions</p>
                  <Button className="w-full dark:bg-pink-900/50 dark:text-pink-100 dark:hover:bg-pink-800/70">
                    Generate Monthly Report
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
