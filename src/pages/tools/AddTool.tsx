
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/tools";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import type { UserTool } from "@/data/types";

const PRICING_OPTIONS = ["Free", "Paid", "Custom", "Contact Sales", "Enterprise"] as const;
type PricingOption = typeof PRICING_OPTIONS[number];

const BILLING_CYCLES = ["monthly", "annual", "lifetime"] as const;
type BillingCycle = typeof BILLING_CYCLES[number];

const AddTool = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    visitUrl: "",
    notes: "",
    price: "",
    billingCycle: "monthly" as BillingCycle,
    pricing: PRICING_OPTIONS[0] as PricingOption,
  });

  const isPaidTool = !["Free", "Custom"].includes(formData.pricing);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add tools.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Create a tool ID from the name
      const toolId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      // First create or get the tool in the tools table
      const { data: toolData, error: toolError } = await supabase
        .from("tools")
        .upsert({
          id: toolId,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          visit_url: formData.visitUrl,
          logo: "https://placeholder.co/100", // Default placeholder logo
          rating: 0,
          reviews: 0,
          pricing: formData.pricing,
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
          monthly_cost: isPaidTool ? parseFloat(formData.price) || 0 : 0,
          billing_cycle: formData.billingCycle,
          subscription_details: {
            category: formData.category,
            description: formData.description,
            url: formData.visitUrl,
            price: isPaidTool ? parseFloat(formData.price) || 0 : 0,
            billing_cycle: formData.billingCycle,
            pricing_type: formData.pricing,
          },
        });

      if (userToolError) throw userToolError;

      toast({
        title: "Tool added successfully",
        description: "Your tool has been added to your collection.",
      });
      
      navigate("/my-tools");
    } catch (error) {
      console.error("Error adding tool:", error);
      toast({
        title: "Error adding tool",
        description: "There was an error adding your tool. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Tool</h1>
        <p className="text-gray-600 dark:text-gray-300">Track and manage your AI tool collection</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Tool Name *
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
                Category *
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
                Pricing Type *
              </label>
              <select
                value={formData.pricing}
                onChange={(e) => setFormData({ ...formData, pricing: e.target.value as PricingOption })}
                className="w-full rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white"
                required
              >
                {PRICING_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {isPaidTool && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Your Cost
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
                    required={isPaidTool}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Billing Cycle
              </label>
              <select
                value={formData.billingCycle}
                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as BillingCycle })}
                className="w-full rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white"
                disabled={!isPaidTool}
              >
                {BILLING_CYCLES.map((cycle) => (
                  <option key={cycle} value={cycle}>
                    {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Tool Website *
              </label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/my-tools")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Adding Tool..." : "Add Tool"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddTool;
