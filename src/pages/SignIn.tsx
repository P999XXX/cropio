import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import SignInCard from "@/components/auth/SignInCard";
import SignInMobile from "@/components/auth/SignInMobile";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={false}>
        <Navbar />
      </SidebarProvider>
      <div className="container relative min-h-[calc(100vh-var(--header-height))] items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="hidden md:block">
              <SignInCard />
            </div>
            <div className="md:hidden">
              <SignInMobile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;