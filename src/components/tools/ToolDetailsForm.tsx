
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/tools";
import { PRICING_OPTIONS, type PricingOption, type BillingCycle, BILLING_CYCLES } from "./AddToolTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ToolDetailsFormProps {
  formData: {
    name: string;
    description: string;
    category: string;
    visitUrl: string;
    notes: string;
    price: string;
    billingCycle: BillingCycle;
    pricing: PricingOption;
  };
  setFormData: (data: any) => void;
}

export const ToolDetailsForm = ({ formData, setFormData }: ToolDetailsFormProps) => {
  const isPaidTool = !["Free", "Custom"].includes(formData.pricing);

  return (
    <div className="space-y-6">
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
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Pricing Type *
        </label>
        <Select
          value={formData.pricing}
          onValueChange={(value) => setFormData({ ...formData, pricing: value as PricingOption })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select pricing type" />
          </SelectTrigger>
          <SelectContent>
            {PRICING_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Select
          value={formData.billingCycle}
          onValueChange={(value) => setFormData({ ...formData, billingCycle: value as BillingCycle })}
          disabled={!isPaidTool}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select billing cycle" />
          </SelectTrigger>
          <SelectContent>
            {BILLING_CYCLES.map((cycle) => (
              <SelectItem key={cycle} value={cycle}>
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Tool Website *
        </label>
        <Input
          type="url"
          value={formData.visitUrl}
          onChange={(e) => setFormData({ ...formData, visitUrl: e.target.value })}
          placeholder="https://example.com"
          required
        />
      </div>

      <div>
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
  );
};
