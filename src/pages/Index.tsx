import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import { Leaf, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    title: "Quality Assurance",
    description: "Every product is verified and quality-checked by our expert team.",
    icon: ShieldCheck,
  },
  {
    title: "Global Network",
    description: "Connect with verified buyers and sellers from around the world.",
    icon: Users,
  },
  {
    title: "Sustainable Trade",
    description: "Supporting environmentally conscious agricultural practices.",
    icon: Leaf,
  },
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex flex-col min-h-[calc(100vh-64px)]">
          <div className="flex-1 flex items-center justify-center w-full py-12 md:py-20">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-2xl tracking-tight font-extrabold text-foreground sm:text-3xl md:text-3xl">
                  <span className="block">The Global B2B Marketplace for</span>
                  <span className="block text-primary">Agricultural Products</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Connect directly with verified buyers and sellers worldwide.
                  Trade agricultural products efficiently and securely.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Button asChild className="w-full sm:w-auto" size="lg">
                      <Link to="/signup">Get Started</Link>
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button asChild variant="outline" className="w-full sm:w-auto" size="lg">
                      <Link to="/components">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-secondary py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                  Why Choose Cropio?
                </h2>
                <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
                  We provide a secure and efficient platform for agricultural trade.
                </p>
              </div>

              <div className="mt-10">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.title} className="relative">
                      <div className="bg-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="absolute -top-4 left-4">
                          <div className="rounded-full bg-primary p-3">
                            <feature.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-base text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;