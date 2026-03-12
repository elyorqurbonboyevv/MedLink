import { User, Settings, Shield, Bell, HelpCircle, LogOut } from "lucide-react";

const AccountPage = () => {
  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="gradient-primary px-4 py-5">
        <h1 className="text-xl font-bold text-primary-foreground">Account</h1>
      </div>

      {/* User Card */}
      <div className="mx-4 -mt-3 flex items-center gap-4 rounded-lg bg-card p-4 shadow-card">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground">
          EK
        </div>
        <div>
          <p className="font-semibold text-foreground">Elyor Kurbonboev</p>
          <p className="text-sm text-muted-foreground">Public insurance</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-4 space-y-1 px-4">
        {[
          { icon: User, label: "Personal information" },
          { icon: Shield, label: "Insurance & Payment" },
          { icon: Bell, label: "Notifications" },
          { icon: Settings, label: "Settings" },
          { icon: HelpCircle, label: "Help & Support" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted"
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">{item.label}</span>
          </button>
        ))}
        <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-destructive transition-colors hover:bg-destructive/10">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
