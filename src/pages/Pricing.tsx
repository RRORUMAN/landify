import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "€0",
      features: [
        "3 recommended tools per category",
        "Basic search functionality",
        "Access to all categories",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "€19.99",
      features: [
        "10 recommended tools per category",
        "AI-powered recommendations",
        "Advanced search filters",
        "Priority support",
      ],
      buttonText: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "€49.99",
      features: [
        "20 recommended tools per category",
        "Save and manage your tools",
        "Custom tool collections",
        "Team collaboration features",
        "Premium support",
      ],
      buttonText: "Start Business Trial",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-primary pt-24">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="bg-brand-blue text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            PRICING
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-primary">
            Choose the Perfect Plan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Start free and upgrade as your needs grow. No hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 relative transition-all hover:scale-105 duration-300 ${
                plan.popular
                  ? "bg-brand-blue border-2 border-blue-400"
                  : "bg-white border border-gray-200 hover:border-blue-200 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" /> Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-primary">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-primary">
                {plan.price}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full py-6 text-lg transition-colors ${
                  plan.popular
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-brand-blue text-primary border border-gray-200"
                }`}
                onClick={() => navigate("/auth")}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            Trusted by Leading Companies Worldwide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center max-w-4xl mx-auto mt-8">
            {[
              { name: "Microsoft", color: "#00A4EF" },
              { name: "Palantir", color: "#101113" },
              { name: "Datadog", color: "#632CA6" },
              { name: "Snowflake", color: "#29B5E8" },
              { name: "Apple", color: "#555555" },
              { name: "Amazon", color: "#FF9900" },
            ].map((company) => (
              <div
                key={company.name}
                className="flex items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className="text-lg font-bold"
                  style={{ color: company.color }}
                >
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;