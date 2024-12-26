import { ArrowRight, Shield, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "All suppliers are thoroughly vetted and certified",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with suppliers and buyers worldwide",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Real-time price trends and market analysis",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-3xl">
              <span className="block">The Global B2B Marketplace for</span>
              <span className="block text-primary">Agricultural Products</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect directly with verified suppliers and buyers worldwide. 
              Streamline your agricultural trade with our secure platform.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center animate-fade-in">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Why Choose Cropio?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides everything you need to succeed in agricultural trade
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="relative animate-fade-in">
                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="absolute -top-4 left-4">
                      <div className="rounded-full bg-primary p-3">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;