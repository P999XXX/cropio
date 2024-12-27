import {
  LayoutDashboard,
  Users,
  Award,
  Nut,
  ChartCandlestick,
  ArrowLeftRight,
  List,
  RefreshCw,
  CreditCard,
  Star,
  Settings,
  HelpCircle,
  Headset,
} from "lucide-react";

export const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Team", path: "/dashboard/team" },
  { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
  { icon: Nut, label: "Products", path: "/dashboard/products" },
  { icon: ChartCandlestick, label: "Market", path: "/dashboard/market" },
  { icon: ArrowLeftRight, label: "Trading", path: "/dashboard/trading" },
  { icon: List, label: "Orders", path: "/dashboard/orders" },
  { icon: RefreshCw, label: "Returns", path: "/dashboard/returns" },
  { icon: CreditCard, label: "Payments", path: "/dashboard/payments" },
  { icon: Star, label: "Reviews", path: "/dashboard/reviews" },
];

export const bottomMenuItems = [
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: HelpCircle, label: "FAQ", path: "/dashboard/faq" },
  { icon: Headset, label: "Support", path: "/dashboard/support" },
];