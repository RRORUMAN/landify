import { Shield, Lock, Key, FileCheck } from "lucide-react";

const SecuritySection = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and security protocols to protect your data",
    },
    {
      icon: Lock,
      title: "SOC 2 Compliance",
      description: "Certified security controls and processes",
    },
    {
      icon: Key,
      title: "Access Control",
      description: "Granular permissions and role-based access",
    },
    {
      icon: FileCheck,
      title: "Data Privacy",
      description: "GDPR and CCPA compliant data handling",
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
            Security
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-black">
            Enterprise-Ready Security
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your data security is our top priority
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;