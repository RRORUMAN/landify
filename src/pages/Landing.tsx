import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ROICalculatorSection from "@/components/landing/ROICalculatorSection";
import SuccessMetricsSection from "@/components/landing/SuccessMetricsSection";
import IntegrationsSection from "@/components/landing/IntegrationsSection";
import DashboardTreeSection from "@/components/landing/DashboardTreeSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-primary">
      <HeroSection />
      <SuccessMetricsSection />
      <DashboardTreeSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ROICalculatorSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Landing;