import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

import "./App.css";
import Navbar from "./components/Navbar";
import ThemeHandler from "./components/ThemeHandler";
import { AppRoutes } from "./AppRoutes";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Your effect logic here
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" enableSystem>
        <SidebarProvider>
          <BrowserRouter>
            <ThemeHandler>
              <div className="min-h-screen bg-background font-sans antialiased">
                <Navbar />
                <AppRoutes />
                <Toaster richColors closeButton position="top-right" />
              </div>
            </ThemeHandler>
          </BrowserRouter>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
