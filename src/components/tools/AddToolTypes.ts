
export const PRICING_OPTIONS = ["Free", "Paid", "Custom", "Contact Sales", "Enterprise"] as const;
export type PricingOption = typeof PRICING_OPTIONS[number];

export const BILLING_CYCLES = ["monthly", "annual", "lifetime"] as const;
export type BillingCycle = typeof BILLING_CYCLES[number];

export interface AddToolFormData {
  name: string;
  description: string;
  category: string;
  visitUrl: string;
  notes: string;
  price: string;
  billingCycle: BillingCycle;
  pricing: PricingOption;
}
