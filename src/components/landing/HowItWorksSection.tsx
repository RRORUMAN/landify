import { ArrowRight, Search, Zap, BarChart3, Shield } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover",
      description: "Find the perfect AI tools for your needs with our smart search",
    },
    {
      icon: Zap,
      title: "Integrate",
      description: "Seamlessly connect your tools with one-click integration",
    },
    {
      icon: BarChart3,
      title: "Optimize",
      description: "Track usage and optimize your AI tool investments",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Enterprise-grade security for your AI infrastructure",
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Four simple steps to transform your AI workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in group-hover:-translate-y-2">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute top-1/2 -right-4 w-6 h-6 text-blue-400 hidden md:block" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;