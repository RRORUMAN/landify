
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ToolDetailsForm } from "@/components/tools/ToolDetailsForm";
import type { AddToolFormData } from "@/components/tools/AddToolTypes";

const AddTool = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AddToolFormData>({
    name: "",
    description: "",
    category: "",
    visitUrl: "",
    notes: "",
    price: "",
    billingCycle: "monthly",
    pricing: "Free",
  });

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
      const isPaidTool = !["Free", "Custom"].includes(formData.pricing);

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
          <ToolDetailsForm formData={formData} setFormData={setFormData} />

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
