
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, DollarSign, LayoutGrid, Activity, Calendar, Sparkles, PieChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { getAISavingsAnalysis } from "@/utils/toolAnalytics";
import type { UserTool } from "@/data/types";
import { AIInsightsCard } from "@/components/tools/AIInsightsCard";
import { MetricsGrid } from "@/components/tools/MetricsGrid";
import { CategoryTools } from "@/components/tools/CategoryTools";
import { EmptyToolsState } from "@/components/tools/EmptyToolsState";

const MyTools = () => {
  const [tools, setTools] = useState<UserTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [activeToolsCount, setActiveToolsCount] = useState(0);
  const [nextBillingTotal, setNextBillingTotal] = useState(0);
  const [nextBillingDate, setNextBillingDate] = useState<string | null>(null);
  const [totalSavings, setTotalSavings] = useState(0);
  const [mostUsedCategory, setMostUsedCategory] = useState("");
  const [aiAnalysis, setAIAnalysis] = useState<AIAnalysis | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analysis = await getAISavingsAnalysis();
        setAIAnalysis(analysis);

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
          usage_stats: userTool.usage_stats || {
            total_usage_time: 0,
            last_used: new Date().toISOString(),
            usage_frequency: 0
          }
        }));

        setTools(processedTools);
        
        // Calculate metrics
        const totalMonthly = processedTools.reduce((acc, tool) => acc + (tool.monthly_cost || 0), 0);
        setMonthlySpend(totalMonthly);
        setActiveToolsCount(processedTools.length);
        
        // Calculate most used category
        const categoryCount = processedTools.reduce((acc: Record<string, number>, tool) => {
          acc[tool.category] = (acc[tool.category] || 0) + 1;
          return acc;
        }, {});
        const mostUsed = Object.entries(categoryCount).reduce((a, b) => 
          categoryCount[a[0]] > categoryCount[b[0]] ? a : b
        )[0];
        setMostUsedCategory(mostUsed);
        
        // Find next billing
        const upcomingBillings = processedTools
          .filter(tool => tool.next_billing_date)
          .sort((a, b) => new Date(a.next_billing_date!).getTime() - new Date(b.next_billing_date!).getTime());
        
        if (upcomingBillings.length > 0) {
          setNextBillingDate(upcomingBillings[0].next_billing_date!);
          setNextBillingTotal(upcomingBillings[0].monthly_cost || 0);
        }

        setTotalSavings(analysis?.potential_savings || 0);

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

    fetchData();
  }, [navigate, toast]);

  const metrics = [
    {
      title: "Monthly Spend",
      value: `$${monthlySpend.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      tooltip: "Total monthly cost across all tools"
    },
    {
      title: "AI-Suggested Savings",
      value: `$${totalSavings.toFixed(2)}`,
      icon: Sparkles,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      tooltip: "AI-calculated potential monthly savings based on usage patterns"
    },
    {
      title: "Active Tools",
      value: activeToolsCount.toString(),
      icon: LayoutGrid,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      tooltip: "Number of tools currently in use"
    },
    {
      title: "Next Billing",
      value: nextBillingDate ? `$${nextBillingTotal.toFixed(2)}` : "N/A",
      subtext: nextBillingDate ? format(new Date(nextBillingDate), 'MMM dd, yyyy') : "",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
      tooltip: "Amount due on next billing cycle"
    },
    {
      title: "Most Used Category",
      value: mostUsedCategory || "N/A",
      icon: PieChart,
      color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
      tooltip: "Category with the most tools"
    },
    {
      title: "Usage Efficiency",
      value: `${activeToolsCount > 0 ? Math.round((activeToolsCount / tools.length) * 100) : 0}%`,
      icon: Activity,
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
      tooltip: "Percentage of tools actively used this month"
    }
  ];

  const categories = tools.reduce((acc, tool) => {
    const category = tool.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

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

        {aiAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <AIInsightsCard aiAnalysis={aiAnalysis} activeToolsCount={activeToolsCount} />
          </motion.div>
        )}

        <MetricsGrid metrics={metrics} />

        {tools.length === 0 ? (
          <EmptyToolsState />
        ) : (
          <div className="space-y-8">
            {Object.entries(categories).map(([category, categoryTools]) => (
              <CategoryTools key={category} category={category} tools={categoryTools} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTools;
