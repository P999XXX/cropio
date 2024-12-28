import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  Headset,
} from "lucide-react";

export const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Team", path: "/dashboard/team" },
];

export const bottomMenuItems = [
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: HelpCircle, label: "FAQ", path: "/dashboard/faq" },
  { icon: Headset, label: "Support", path: "/dashboard/support" },
];