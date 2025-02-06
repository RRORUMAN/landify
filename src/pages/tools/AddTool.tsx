
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/tools";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import type { UserTool } from "@/data/types";

const AddTool = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userTools, setUserTools] = useState<UserTool[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
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
          pricing: "free",
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
        visitUrl: "",
        notes: "",
        price: "",
        billingCycle: "monthly",
      });
      
      fetchUserTools();
      navigate("/my-tools");
    } catch (error) {
      console.error("Error adding tool:", error);
      toast({
        title: "Error adding tool",
        description: "There was an error adding your tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Tool</h1>
        <p className="text-gray-600 dark:text-gray-300">Track and manage your AI tool collection</p>
      </div>

      <Card className="p-6">
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
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="pl-8"
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
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Description & Notes
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add any notes about how you use this tool..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/my-tools")}
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
    </div>
  );
};

export default AddTool;
