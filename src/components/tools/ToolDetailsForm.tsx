
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/tools";
import { PRICING_OPTIONS, type PricingOption, type BillingCycle, BILLING_CYCLES } from "./AddToolTypes";

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
