import { ArrowRight, Shield, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "All suppliers are thoroughly vetted and certified for quality assurance",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with trusted suppliers and buyers from around the world",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Access real-time market trends, pricing data, and industry analysis",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        
        {/* Hero Section */}
        <div className="pt-24 pb-20 sm:pt-32 sm:pb-24 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 animate-fade-in">
              <h1 className="text-3xl tracking-tight font-extrabold text-foreground sm:text-4xl md:text-5xl">
                <span className="block mb-2">The Global B2B Marketplace for</span>
                <span className="block text-primary">Agricultural Products</span>
              </h1>
              <p className="mt-3 mx-auto text-lg text-muted-foreground sm:text-xl md:mt-5 md:text-2xl max-w-4xl">
                Connect directly with verified suppliers and buyers worldwide. 
                Streamline your agricultural trade with our secure platform.
              </p>
              <div className="mt-8 sm:flex sm:justify-center md:mt-10">
                <div className="rounded-md shadow-lg">
                  <Link
                    to="/signup"
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-xl"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-secondary w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center space-y-4 animate-fade-in">
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                Why Choose Cropio?
              </h2>
              <p className="mt-4 text-xl text-muted-foreground lg:mx-auto max-w-2xl">
                Our platform provides everything you need to succeed in agricultural trade
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title} 
                    className="relative animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="bg-card rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="absolute -top-6 left-6">
                        <div className="rounded-full bg-primary p-4 shadow-lg">
                          <feature.icon className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                        <p className="text-lg text-muted-foreground">{feature.description}</p>
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