import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Shield,
  Search,
  Wrench,
  Brain,
  ChartBar,
  ArrowUpRight,
  Users,
  LineChart,
  BarChart3,
  PieChart,
  CheckCircle2,
  Star,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-primary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
            TRUSTED BY 10,000+ COMPANIES
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
            Discover & Manage Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Tools
            </span>{" "}
            Effortlessly
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The most comprehensive AI tool discovery platform. Find, compare, and implement
            the perfect AI solutions for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl w-full sm:w-auto animate-fade-in"
              onClick={() => navigate("/auth")}
            >
              Get Started Free <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-200 text-primary hover:bg-gray-50 px-8 py-6 text-lg rounded-xl w-full sm:w-auto"
              onClick={scrollToFeatures}
            >
              See Features <ArrowUpRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Users" },
              { number: "500+", label: "AI Tools" },
              { number: "98%", label: "Success Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-purple-50 text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
              HOW IT WORKS
            </span>
            <h2 className="text-4xl font-bold mt-6 mb-4 text-primary">
              Three Simple Steps to AI Success
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and transform your workflow with AI tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "1. Discover",
                description: "Browse our curated collection of premium AI tools",
              },
              {
                icon: Brain,
                title: "2. Compare",
                description: "Get personalized recommendations based on your needs",
              },
              {
                icon: Wrench,
                title: "3. Implement",
                description: "Seamlessly integrate the perfect tools into your workflow",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-blue-50 p-3 rounded-xl w-fit mb-6">
                  <step.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
              FEATURES
            </span>
            <h2 className="text-4xl font-bold mt-6 mb-4 text-primary">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you find and manage the perfect AI tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Smart Search",
                description: "Advanced filtering system with AI-powered recommendations",
              },
              {
                icon: Brain,
                title: "AI Recommendations",
                description: "Get personalized suggestions based on your unique needs",
              },
              {
                icon: Shield,
                title: "Verified Tools",
                description: "Every tool is thoroughly vetted for quality and reliability",
              },
              {
                icon: Wrench,
                title: "Easy Integration",
                description: "Seamlessly implement tools with step-by-step guides",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together efficiently with shared workspaces",
              },
              {
                icon: ChartBar,
                title: "Analytics Dashboard",
                description: "Track and optimize your AI tool usage with detailed insights",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl w-fit mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-green-50 text-green-600 px-4 py-1 rounded-full text-sm font-medium">
              ANALYTICS
            </span>
            <h2 className="text-4xl font-bold mt-6 mb-4 text-primary">
              Data-Driven Insights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Make informed decisions with comprehensive analytics and reporting
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BarChart3, title: "Usage Metrics", color: "from-blue-400 to-blue-600" },
              { icon: LineChart, title: "Growth Trends", color: "from-purple-400 to-purple-600" },
              { icon: PieChart, title: "ROI Analysis", color: "from-green-400 to-green-600" },
            ].map((chart, index) => (
              <div
                key={chart.title}
                className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-gradient-to-r ${chart.color} p-4 rounded-xl w-fit mx-auto mb-6`}>
                  <chart.icon className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-center mb-4">{chart.title}</h4>
                <div className="h-32 bg-gray-50 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-yellow-50 text-yellow-600 px-4 py-1 rounded-full text-sm font-medium">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl font-bold mt-6 mb-4 text-primary">
              Trusted by Industry Leaders
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our customers are saying about their experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CTO at TechCorp",
                content: "Relevence has transformed how we discover and implement AI tools. The ROI has been incredible.",
              },
              {
                name: "Michael Chen",
                role: "Marketing Director",
                content: "The AI recommendations are spot-on. We've saved countless hours in our tool selection process.",
              },
              {
                name: "Emily Williams",
                role: "Product Manager",
                content: "The analytics dashboard gives us invaluable insights into our AI tool usage and effectiveness.",
              },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Signals Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-8">Trusted by Leading Companies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-12 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-primary">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already using Relevence to find and implement
            the perfect AI tools. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate("/auth")}
            >
              Get Started Now <Zap className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-200 text-primary hover:bg-gray-50 px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate("/pricing")}
            >
              View Pricing <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;