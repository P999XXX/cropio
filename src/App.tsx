import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Components from "./pages/Components";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardTeam from "./pages/dashboard/DashboardTeam";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardFAQ from "./pages/dashboard/DashboardFAQ";
import DashboardSupport from "./pages/dashboard/DashboardSupport";
import DashboardSubscriptions from "./pages/dashboard/DashboardSubscriptions";
import { Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/components",
    element: <Components />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout><Outlet /></DashboardLayout>,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "team",
        element: <DashboardTeam />,
      },
      {
        path: "subscriptions",
        element: <DashboardSubscriptions />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
      {
        path: "faq",
        element: <DashboardFAQ />,
      },
      {
        path: "support",
        element: <DashboardSupport />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;