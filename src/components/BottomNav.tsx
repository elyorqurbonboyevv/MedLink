import { Home, Calendar, Heart, Mail, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: Heart, label: "Health", path: "/health" },
  { icon: Mail, label: "Messages", path: "/messages" },
  { icon: User, label: "Account", path: "/account" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on certain routes
  const hiddenRoutes = ["/search", "/doctor/", "/book/", "/triage", "/dashboard"];
  if (hiddenRoutes.some((r) => location.pathname.startsWith(r))) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
      <div className="flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom,0px)]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-1 flex-col items-center gap-0.5 py-2 transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px left-2 right-2 h-[3px] rounded-b-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <tab.icon
                className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span
                className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
