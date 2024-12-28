import {
  LayoutDashboard,
  Settings,
  HelpCircle,
  Headset,
} from "lucide-react";

export const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
];

export const bottomMenuItems = [
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: HelpCircle, label: "FAQ", path: "/dashboard/faq" },
  { icon: Headset, label: "Support", path: "/dashboard/support" },
];