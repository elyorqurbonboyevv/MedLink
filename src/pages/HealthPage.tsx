import { Heart, Activity, FileText, Shield } from "lucide-react";

const HealthPage = () => {
  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="gradient-primary px-4 py-5">
        <h1 className="text-xl font-bold text-primary-foreground">Health</h1>
      </div>
      <div className="space-y-4 px-4 pt-5">
        {[
          { icon: Heart, label: "Health Profile", desc: "Complete your health profile", color: "text-destructive" },
          { icon: Activity, label: "Health Reminders", desc: "Personalized preventive care", color: "text-secondary" },
          { icon: FileText, label: "Medical Documents", desc: "Your prescriptions and reports", color: "text-primary" },
          { icon: Shield, label: "Insurance", desc: "Manage insurance information", color: "text-info" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-4 rounded-lg border border-border bg-card p-4 text-left shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <div>
              <p className="font-semibold text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HealthPage;
