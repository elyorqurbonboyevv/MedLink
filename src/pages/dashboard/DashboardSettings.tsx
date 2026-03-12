import { User, Bell, Shield, Clock } from "lucide-react";

const DashboardSettings = () => {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      {[
        {
          icon: User,
          title: "Profile Information",
          desc: "Manage your name, specialty, and practice details",
          fields: [
            { label: "Full Name", value: "Dr. Maren Leugering" },
            { label: "Specialty", value: "Dermatology" },
            { label: "Practice", value: "Dermatologische Gemeinschaftspraxis am St. Joseph Stift" },
          ],
        },
        {
          icon: Clock,
          title: "Availability",
          desc: "Set your working hours and appointment duration",
          fields: [
            { label: "Working Hours", value: "Mon–Fri, 08:00–17:00" },
            { label: "Appointment Duration", value: "15 minutes" },
            { label: "Break", value: "12:00–13:00" },
          ],
        },
        {
          icon: Bell,
          title: "Notifications",
          desc: "Configure how you receive alerts",
          fields: [
            { label: "New Triage Reports", value: "Email + Push" },
            { label: "Appointment Reminders", value: "30 min before" },
            { label: "Patient Messages", value: "Push notification" },
          ],
        },
        {
          icon: Shield,
          title: "Security",
          desc: "Two-factor authentication and session management",
          fields: [
            { label: "Two-Factor Auth", value: "Enabled" },
            { label: "Session Timeout", value: "30 minutes" },
          ],
        },
      ].map((section) => (
        <div key={section.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <section.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{section.title}</h2>
              <p className="text-sm text-muted-foreground">{section.desc}</p>
            </div>
          </div>
          <div className="space-y-3">
            {section.fields.map((field) => (
              <div key={field.label} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <span className="text-sm text-muted-foreground">{field.label}</span>
                <span className="text-sm font-medium text-foreground">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSettings;
