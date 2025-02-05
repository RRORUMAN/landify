import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ROICalculatorSection from "@/components/landing/ROICalculatorSection";
import SuccessMetricsSection from "@/components/landing/SuccessMetricsSection";
import DashboardTreeSection from "@/components/landing/DashboardTreeSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800 text-primary relative">
      {/* Global background pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.02]">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[40rem] w-[40rem] border border-black/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 3 + 1})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <SuccessMetricsSection />
        <DashboardTreeSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ROICalculatorSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Landing;