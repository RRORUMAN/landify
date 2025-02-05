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
        {/* Animated Background Grid */}
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
              className="aspect-square bg-accent/20 rounded-lg"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium neo-blur"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              Your AI Tool Discovery Platform
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white"
          >
            Find the Perfect AI Tools for Your{" "}
            <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-gradient">
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
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Button
                size="lg"
                className="relative overflow-hidden bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-6 text-lg rounded-xl w-full sm:w-auto transition-all duration-500 ease-out transform hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                onClick={() => navigate("/auth")}
              >
                <span className="relative z-10 flex items-center">
                  Start Discovering AI Tools
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/40 to-accent/60"
                  initial={{ x: "100%" }}
                  animate={{ x: "-100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                  style={{
                    opacity: 0.2,
                  }}
                />
              </Button>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-accent/80 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            </motion.div>
            <motion.span 
              variants={itemVariants}
              className="text-sm text-gray-500 dark:text-gray-400 mt-4"
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