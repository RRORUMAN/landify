
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/tools";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Link, Trash2, Info, DollarSign, Tag, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import type { UserTool } from "@/data/types";

const AddTool = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userTools, setUserTools] = useState<UserTool[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subscriptionType: "",
    visitUrl: "",
    notes: "",
    price: "",
    billingCycle: "monthly",
  });

  useEffect(() => {
    fetchUserTools();
  }, []);

  const fetchUserTools = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: tools, error } = await supabase
        .from("user_tools")
        .select("*, tool:tools(*)")
        .eq("user_id", user.id);

      if (error) throw error;

      setUserTools(tools as UserTool[]);
    } catch (error) {
      console.error("Error fetching tools:", error);
      toast({
        title: "Error fetching tools",
        description: "There was an error loading your tools.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add tools.",
          variant: "destructive",
        });
        return;
      }

      // First create or get the tool in the tools table
      const { data: toolData, error: toolError } = await supabase
        .from("tools")
        .upsert({
          id: formData.name.toLowerCase().replace(/\s+/g, '-'),
          name: formData.name,
          description: formData.description,
          category: formData.category,
          visit_url: formData.visitUrl,
          logo: "https://placeholder.co/100", // Default placeholder logo
          rating: 0,
          reviews: 0,
          pricing: formData.subscriptionType,
          tags: [],
          featured: false,
        })
        .select()
        .single();

      if (toolError) throw toolError;

      // Then create the user-tool relationship
      const { error: userToolError } = await supabase
        .from("user_tools")
        .insert({
          user_id: user.id,
          tool_id: toolData.id,
          subscription_status: formData.subscriptionType,
          notes: formData.notes,
          monthly_cost: parseFloat(formData.price) || 0,
          billing_cycle: formData.billingCycle,
          subscription_details: {
            category: formData.category,
            description: formData.description,
            url: formData.visitUrl,
            price: parseFloat(formData.price) || 0,
            billing_cycle: formData.billingCycle,
          },
        });

      if (userToolError) throw userToolError;

      toast({
        title: "Tool added successfully",
        description: "Your tool has been added to your collection.",
      });
      
      setFormData({
        name: "",
        description: "",
        category: "",
        subscriptionType: "",
        visitUrl: "",
        notes: "",
        price: "",
        billingCycle: "monthly",
      });
      
      fetchUserTools();
    } catch (error) {
      console.error("Error adding tool:", error);
      toast({
        title: "Error adding tool",
        description: "There was an error adding your tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (toolId: string) => {
    try {
      const { error } = await supabase
        .from("user_tools")
        .delete()
        .eq("id", toolId);

      if (error) throw error;

      toast({
        title: "Tool removed",
        description: "The tool has been removed from your collection.",
      });

      fetchUserTools();
    } catch (error) {
      console.error("Error deleting tool:", error);
      toast({
        title: "Error removing tool",
        description: "There was an error removing the tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getTotalMonthlySpend = () => {
    return userTools.reduce((total, tool) => {
      const price = tool.monthly_cost || 0;
      const multiplier = tool.billing_cycle === 'annual' ? 1/12 : 1;
      return total + (price * multiplier);
    }, 0);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Tools</h1>
        <p className="text-gray-600 dark:text-gray-300">Track and manage your AI tool collection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add New Tool</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Tool Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter tool name"
                  className="border-gray-200 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="pl-10 border-gray-200 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Billing Cycle
                </label>
                <select
                  value={formData.billingCycle}
                  onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                  className="w-full rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white"
                >
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                  <option value="lifetime">Lifetime</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Tool Website
                </label>
                <div className="relative">
                  <Link className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="url"
                    value={formData.visitUrl}
                    onChange={(e) => setFormData({ ...formData, visitUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="pl-10 border-gray-200 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Subscription Type
                </label>
                <select
                  value={formData.subscriptionType}
                  onChange={(e) => setFormData({ ...formData, subscriptionType: e.target.value })}
                  className="w-full rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select subscription type</option>
                  <option value="free">Free</option>
                  <option value="freemium">Freemium</option>
                  <option value="paid">Paid</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Description & Notes
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add any notes about how you use this tool..."
                className="border-gray-200 dark:border-gray-600 dark:bg-gray-700"
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Tool
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics Overview</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Monthly Spend: ${getTotalMonthlySpend().toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                    <Tag className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400">Active Tools</p>
                    <p className="text-xl font-semibold text-green-700 dark:text-green-300">
                      {userTools.length}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Active Sessions</p>
                    <p className="text-xl font-semibold text-purple-700 dark:text-purple-300">
                      {userTools.reduce((acc, tool) => acc + (tool.active_sessions || 0), 0)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {userTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {tool.tool?.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Tag className="h-4 w-4" />
                            <span>{tool.tool?.category}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <DollarSign className="h-4 w-4" />
                            <span>${tool.monthly_cost}/mo</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span>{tool.subscription_status}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(tool.tool?.visit_url, '_blank')}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/20"
                          >
                            Visit
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(tool.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-none">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">Pro Tip</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                  Track your tool costs by adding pricing information. Visit the Analytics page to view detailed spending insights.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddTool;
