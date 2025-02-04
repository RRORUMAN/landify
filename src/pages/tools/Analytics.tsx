import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarChart, DollarSign, TrendingUp, Zap } from "lucide-react";

const Analytics = () => {
  const [connectedApps, setConnectedApps] = useState<string[]>([]);
  const [monthlySpend, setMonthlySpend] = useState(0);

  const handleConnectApp = (appName: string) => {
    if (!connectedApps.includes(appName)) {
      setConnectedApps([...connectedApps, appName]);
      // In a real app, we would make an API call to connect the app
      console.log(`Connecting ${appName}...`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your AI tools spending and usage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Spend</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">${monthlySpend}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Tools</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{connectedApps.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Usage Trend</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">+12%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <BarChart className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ROI Score</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">85%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Connect AI Tools</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input 
                type="text" 
                placeholder="Enter tool API key"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Button onClick={() => handleConnectApp("Custom Tool")}>
                Connect
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["ChatGPT", "Claude", "Midjourney", "Copilot"].map((app) => (
                <Button
                  key={app}
                  variant={connectedApps.includes(app) ? "secondary" : "outline"}
                  onClick={() => handleConnectApp(app)}
                  className="w-full justify-start gap-2"
                >
                  <Zap className="h-4 w-4" />
                  {app}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">AI Recommendations</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-400 mb-2">Optimize Spending</h3>
              <p className="text-sm text-blue-800 dark:text-blue-300">Based on your usage patterns, switching to annual billing for ChatGPT could save you 20% monthly.</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-medium text-green-900 dark:text-green-400 mb-2">Tool Suggestion</h3>
              <p className="text-sm text-green-800 dark:text-green-300">Consider trying Anthropic's Claude for tasks requiring complex analysis. It could improve your workflow efficiency.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;