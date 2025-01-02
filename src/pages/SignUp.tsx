import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import SignUpMobile from "@/components/auth/SignUpMobile";
import SignUpCard from "@/components/auth/SignUpCard";

const SignUp = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <div className="flex-1">
          <Navbar />
          <main className="container relative mx-auto flex min-h-[calc(100vh-theme(spacing.header))] items-center justify-center px-4 py-16">
            <div className="w-full">
              <div className="mx-auto w-full max-w-[400px] space-y-6 lg:hidden">
                <SignUpMobile />
              </div>
              <div className="hidden lg:block">
                <SignUpCard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SignUp;