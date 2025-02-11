
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, DollarSign, Star, Shield, Zap } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Early Access",
      price: "€0",
      description: "Limited time offer - Get full access for free",
      features: [
        "Full access to all features",
        "Unlimited tool recommendations",
        "Advanced AI-powered search",
        "Custom categories",
        "Export functionality",
        "Priority support",
        "Detailed analytics dashboard",
      ],
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      buttonText: "Get Started Free",
      popular: true,
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            EARLY ACCESS
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-gray-900">
            Get Full Access For Free
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We're currently in early access - Sign up now to get all premium features at no cost.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl p-8 relative transition-all hover:scale-105 duration-300 bg-white border-2 border-blue-100 shadow-xl"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" /> Early Access Offer
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {plan.icon}
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {plan.description}
              </p>
              <p className="text-4xl font-bold mb-2 text-gray-900">
                {plan.price}
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full py-6 text-lg transition-colors bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                onClick={() => navigate("/auth")}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Trusted by Industry Leaders
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that trust our platform for their tool discovery needs
          </p>
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

        <div className="mt-20 text-center bg-gray-50 rounded-2xl p-8">
          <Shield className="w-8 h-8 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Enterprise Solutions
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Need a custom solution? We offer tailored plans for large enterprises with specific requirements.
          </p>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg shadow-lg"
            onClick={() => navigate("/contact")}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
