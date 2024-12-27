import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";
import Components from "@/pages/Components";
import Dashboard from "@/pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/components" element={<Components />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
};

export default App;