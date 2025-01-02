import { ArrowRight, Shield, Globe, TrendingUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Advanced security measures and verified suppliers ensure safe transactions",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with trusted agricultural partners worldwide",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Real-time market data and analytics to make informed decisions",
    },
  ];

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative min-h-[calc(100vh-3.8rem)] flex items-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(155,135,245,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
          
          <div className="relative w-full py-16 md:py-24">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-8 animate-fade-in max-w-6xl mx-auto">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
                    <span className="block">Revolutionizing</span>
                    <span className="block mt-2 bg-gradient-to-r from-primary to-[#9b87f5] bg-clip-text text-transparent">
                      Agricultural Trade
                    </span>
                  </h1>
                  <p className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                    Connect directly with verified suppliers and buyers worldwide.
                    Transform your agricultural business with our secure platform.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                  <Button
                    asChild
                    size="lg"
                    className="text-base h-12 px-8 animate-fade-in"
                  >
                    <Link to="/signup">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base h-12 px-8 animate-fade-in"
                    asChild
                  >
                    <Link to="/signin">
                      Sign In
                    </Link>
                  </Button>
                </div>

                <button
                  onClick={scrollToFeatures}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 animate-bounce"
                >
                  <span className="sr-only">Scroll to features</span>
                  <ChevronDown className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="w-full bg-secondary/50 py-24">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Why Choose Cropio?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform provides everything you need to succeed in agricultural trade
              </p>
            </div>

            <div className="mt-16 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title} 
                    className="relative animate-fade-in group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="bg-background rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="absolute -top-6 left-6">
                        <div className="rounded-full bg-primary p-4 shadow-lg group-hover:bg-[#9b87f5] transition-colors duration-300">
                          <feature.icon className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;