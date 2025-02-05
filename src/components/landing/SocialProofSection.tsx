import { motion } from "framer-motion";

const SocialProofSection = () => {
  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "$2M+", label: "Cost Saved" },
    { value: "500+", label: "AI Tools" },
    { value: "98%", label: "Success Rate" },
  ];

  const logos = [
    "Microsoft",
    "Google",
    "Amazon",
    "Meta",
    "Adobe",
    "Salesforce",
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join thousands of companies optimizing their AI investments
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 animate-text">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-xl font-bold text-gray-400 dark:text-gray-500"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProofSection;