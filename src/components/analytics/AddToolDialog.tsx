
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus } from "lucide-react";
import type { Tool } from "@/data/types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format, addMonths } from "date-fns";

interface AddToolDialogProps {
  availableTools: Tool[];
}

export const AddToolDialog = ({ availableTools }: AddToolDialogProps) => {
  const [selectedToolId, setSelectedToolId] = useState("");
  const [newToolCost, setNewToolCost] = useState("");
  const [newToolBillingCycle, setNewToolBillingCycle] = useState("monthly");
  const { toast } = useToast();

  const handleAddTool = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add tools",
          variant: "destructive"
        });
        return;
      }

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
          next_billing_date: format(addMonths(new Date(), 1), 'yyyy-MM-dd'),
          subscription_status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Tool added",
        description: "Successfully added to your dashboard",
      });

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" /> Add Tool
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
  );
};
