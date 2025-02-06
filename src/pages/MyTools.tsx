
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tool } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, DollarSign, LayoutGrid, Users, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { format, addMonths } from "date-fns";

interface UserTool extends Tool {
  monthly_cost: number;
  billing_cycle: string;
  next_billing_date?: string;
  subscription_status?: string;
}

const MyTools = () => {
  const [tools, setTools] = useState<UserTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [activeToolsCount, setActiveToolsCount] = useState(0);
  const [nextBillingTotal, setNextBillingTotal] = useState(0);
  const [nextBillingDate, setNextBillingDate] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserTools = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }

        const { data: userTools, error } = await supabase
          .from("user_tools")
          .select(`
            *,
            tool:tools(*)
          `)
          .eq("user_id", user.id);

        if (error) throw error;

        const processedTools = userTools.map((userTool: any) => ({
          ...userTool.tool,
          monthly_cost: userTool.monthly_cost || 0,
          billing_cycle: userTool.billing_cycle,
          next_billing_date: userTool.next_billing_date,
          subscription_status: userTool.subscription_status,
        }));

        setTools(processedTools);
        
        // Calculate metrics
        const totalMonthly = processedTools.reduce((acc, tool) => acc + (tool.monthly_cost || 0), 0);
        setMonthlySpend(totalMonthly);
        setActiveToolsCount(processedTools.length);
        
        // Find next billing
        const upcomingBillings = processedTools
          .filter(tool => tool.next_billing_date)
          .sort((a, b) => new Date(a.next_billing_date!).getTime() - new Date(b.next_billing_date!).getTime());
        
        if (upcomingBillings.length > 0) {
          setNextBillingDate(upcomingBillings[0].next_billing_date!);
          setNextBillingTotal(upcomingBillings[0].monthly_cost || 0);
        }

      } catch (error) {
        console.error("Error fetching tools:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch your tools. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserTools();
  }, [navigate, toast]);

  const metrics = [
    {
      title: "Monthly Spend",
      value: `$${monthlySpend.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Tools",
      value: activeToolsCount.toString(),
      icon: LayoutGrid,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Next Billing",
      value: nextBillingDate ? `$${nextBillingTotal.toFixed(2)}` : "N/A",
      subtext: nextBillingDate ? format(new Date(nextBillingDate), 'MMM dd, yyyy') : "",
      icon: Calendar,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Monthly Savings",
      value: "$0.00",
      subtext: "Potential savings available",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Tools</h1>
          </div>
          <Button
            onClick={() => navigate("/tools/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Tools
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title} className="p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-semibold mt-1">{metric.value}</p>
                  {metric.subtext && (
                    <p className="text-sm text-gray-500 mt-1">{metric.subtext}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index} 
                className="h-[300px] bg-white dark:bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Tools Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start building your collection by adding some tools.</p>
            <Button
              onClick={() => navigate("/tools/add")}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Browse Tools
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool}
                subscription={{
                  cost: tool.monthly_cost,
                  billing: tool.billing_cycle,
                  status: tool.subscription_status,
                  nextBilling: tool.next_billing_date,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTools;
