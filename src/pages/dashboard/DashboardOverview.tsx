import { Calendar, Users, FileText, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Today's Appointments", value: "8", icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
  { label: "Active Patients", value: "142", icon: Users, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Pending Triage", value: "3", icon: FileText, color: "text-warning", bg: "bg-warning/10" },
  { label: "Avg. Wait Time", value: "12 min", icon: Clock, color: "text-info", bg: "bg-info/10" },
];

const todayAppointments = [
  { time: "09:00", patient: "Anna Schmidt", reason: "Skin check-up", status: "completed" },
  { time: "09:30", patient: "Thomas Müller", reason: "Acne follow-up", status: "completed" },
  { time: "10:00", patient: "Elyor Kurbonboev", reason: "Dermatitis consultation", status: "in-progress" },
  { time: "10:30", patient: "Maria Weber", reason: "Mole examination", status: "upcoming" },
  { time: "11:00", patient: "Felix Braun", reason: "Eczema treatment", status: "upcoming" },
  { time: "14:00", patient: "Sarah Koch", reason: "Cosmetic consultation", status: "upcoming" },
  { time: "15:00", patient: "Lukas Fischer", reason: "Psoriasis follow-up", status: "upcoming" },
  { time: "16:00", patient: "Emma Becker", reason: "General dermatology", status: "upcoming" },
];

const pendingTriage = [
  { patient: "Anna Schmidt", urgency: "Low", specialty: "Dermatology", summary: "Mild rash on forearms, 3 days duration. No fever." },
  { patient: "Felix Braun", urgency: "Medium", specialty: "Dermatology", summary: "Recurring eczema flare-up. Previous treatment ineffective." },
  { patient: "Maria Weber", urgency: "Low", specialty: "Dermatology", summary: "New mole noticed, requests examination." },
];

const DashboardOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Good morning, Dr. Leugering</h1>
        <p className="mt-1 text-muted-foreground">Here's your day at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-4 shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold text-foreground">Today's Schedule</h2>
            <button
              onClick={() => navigate("/dashboard/schedule")}
              className="text-sm font-medium text-primary hover:underline"
            >
              View full schedule
            </button>
          </div>
          <div className="divide-y divide-border">
            {todayAppointments.map((apt) => (
              <div key={apt.time} className="flex items-center gap-4 px-5 py-3">
                <span className="w-14 shrink-0 text-sm font-medium text-muted-foreground">{apt.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{apt.patient}</p>
                  <p className="text-sm text-muted-foreground truncate">{apt.reason}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  apt.status === "completed"
                    ? "bg-secondary/10 text-secondary"
                    : apt.status === "in-progress"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {apt.status === "in-progress" ? "In Progress" : apt.status === "completed" ? "Done" : apt.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Triage Reports */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold text-foreground">Pending Triage</h2>
            <button
              onClick={() => navigate("/dashboard/triage-reports")}
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-border">
            {pendingTriage.map((item) => (
              <div key={item.patient} className="px-5 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{item.patient}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.urgency === "Medium"
                      ? "bg-warning/10 text-warning"
                      : "bg-secondary/10 text-secondary"
                  }`}>
                    {item.urgency}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
