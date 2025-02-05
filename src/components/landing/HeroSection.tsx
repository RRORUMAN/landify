import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800/30 overflow-hidden">
      <div className="container mx-auto px-4 py-32 relative">
        {/* Background Grid Animation */}
        <div className="absolute inset-0 grid grid-cols-8 gap-4 opacity-10 pointer-events-none">
          {[...Array(64)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="aspect-square bg-blue-500/20 rounded-lg"
            />
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto space-y-8 relative z-10"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Your AI Tool Discovery Platform</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white"
          >
            Find the Perfect AI Tools for Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent animate-gradient">
              Business
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Discover, compare, and manage AI tools all in one place. Save time and money with personalized recommendations and analytics for your AI stack.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center mt-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-6 text-lg rounded-xl w-full sm:w-auto group transition-all duration-300 hover:scale-105 mb-4 relative overflow-hidden"
              onClick={() => navigate("/auth")}
            >
              <span className="relative z-10">Start Discovering AI Tools</span>
              <motion.div
                className="absolute inset-0 bg-white opacity-20"
                animate={{
                  x: ["100%", "-100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
              />
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
            </Button>
            <motion.span 
              variants={itemVariants}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Free forever • No credit card required
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;