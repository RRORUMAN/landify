
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tool } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Plus, ArrowLeft, DollarSign, LayoutGrid, Activity, 
  Calendar, Zap, PieChart, TrendingUp, AlertTriangle,
  ChevronRight, Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAISavingsAnalysis, type AIAnalysis } from "@/utils/toolAnalytics";
import { Badge } from "@/components/ui/badge";

interface UserTool extends Tool {
  monthly_cost: number;
  billing_cycle: string;
  next_billing_date?: string;
  subscription_status?: string;
  usage_stats?: {
    total_usage_time: number;
    last_used: string;
    usage_frequency: number;
  };
}

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
        // Fetch AI analysis
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

        // Use AI-suggested savings if available
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
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/50 dark:to-blue-900/50 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <h2 className="text-lg font-semibold">AI Insights</h2>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Based on your usage patterns, we've identified potential optimizations
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-purple-100 text-purple-600 border-purple-200">
                    Updated {format(new Date(aiAnalysis.recommendations.analysis_date), 'MMM dd, yyyy')}
                  </Badge>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Potential Monthly Savings</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-green-600 mt-2">${aiAnalysis.potential_savings.toFixed(2)}</p>
                  </Card>
                  <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Current Utilization</span>
                      <Activity className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                      {Math.round((activeToolsCount / aiAnalysis.recommendations.total_tools) * 100)}%
                    </p>
                  </Card>
                  <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Optimization Score</span>
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-600 mt-2">
                      {Math.round((aiAnalysis.potential_savings / aiAnalysis.total_spend) * 100)}%
                    </p>
                  </Card>
                </div>
                <Button
                  variant="link"
                  className="mt-4 text-purple-600 hover:text-purple-700 p-0"
                  onClick={() => navigate("/tools/optimization")}
                >
                  View detailed analysis <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

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
                          <p className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
                          <p className="text-2xl font-semibold mt-1">{metric.value}</p>
                          {metric.subtext && (
                            <p className="text-sm text-gray-500 mt-1">{metric.subtext}</p>
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

        {tools.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Tools Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start building your collection by adding some tools.</p>
            <Button
              onClick={() => navigate("/tools/add")}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" /> Browse Tools
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {Object.entries(categories).map(([category, categoryTools]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category}
                  <span className="text-gray-500 text-lg ml-2">
                    ({categoryTools.length} tools)
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ToolCard key={tool.id} tool={tool} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTools;
