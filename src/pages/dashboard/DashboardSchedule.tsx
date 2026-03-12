import { useState } from "react";
import { ChevronLeft, ChevronRight, Video, Clock } from "lucide-react";
import { motion } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = Array.from({ length: 9 }, (_, i) => `${i + 8}:00`);

const appointments: Record<string, { time: string; patient: string; reason: string; hasVideo?: boolean }[]> = {
  Mon: [
    { time: "09:00", patient: "Anna Schmidt", reason: "Skin check-up" },
    { time: "10:30", patient: "Thomas Müller", reason: "Acne follow-up", hasVideo: true },
    { time: "14:00", patient: "Sarah Koch", reason: "Cosmetic consultation" },
  ],
  Tue: [
    { time: "09:30", patient: "Felix Braun", reason: "Eczema treatment" },
    { time: "11:00", patient: "Maria Weber", reason: "Mole examination" },
    { time: "15:00", patient: "Lukas Fischer", reason: "Psoriasis follow-up" },
    { time: "16:00", patient: "Emma Becker", reason: "General dermatology", hasVideo: true },
  ],
  Wed: [
    { time: "08:00", patient: "Elyor Kurbonboev", reason: "Dermatitis consultation" },
    { time: "10:00", patient: "Julia Hartmann", reason: "Acne treatment" },
  ],
  Thu: [
    { time: "09:00", patient: "Max Richter", reason: "Skin allergy" },
    { time: "11:30", patient: "Laura Schneider", reason: "Follow-up", hasVideo: true },
    { time: "14:00", patient: "Peter Wagner", reason: "Dry skin consultation" },
    { time: "15:30", patient: "Sophia Klein", reason: "Cosmetic procedure" },
  ],
  Fri: [
    { time: "09:00", patient: "Daniel Hoffmann", reason: "Rash evaluation" },
    { time: "13:00", patient: "Nina Bauer", reason: "Mole mapping" },
  ],
};

const DashboardSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Tue");
  const dayAppointments = appointments[selectedDay] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-border bg-card p-2 hover:bg-muted transition-colors">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-semibold text-foreground">Week of March 10, 2026</span>
          <button className="rounded-lg border border-border bg-card p-2 hover:bg-muted transition-colors">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`flex-1 rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
              selectedDay === day
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            {day}
            <span className="ml-1 text-xs opacity-70">
              ({(appointments[day] || []).length})
            </span>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="divide-y divide-border">
          {hours.map((hour) => {
            const apt = dayAppointments.find((a) => a.time === hour);
            return (
              <div key={hour} className="flex min-h-[64px]">
                <div className="flex w-20 shrink-0 items-start justify-end border-r border-border pr-3 pt-3">
                  <span className="text-xs font-medium text-muted-foreground">{hour}</span>
                </div>
                <div className="flex-1 p-2">
                  {apt && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground text-sm">{apt.patient}</p>
                        {apt.hasVideo && (
                          <div className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-secondary">
                            <Video className="h-3 w-3" />
                            <span className="text-[10px] font-medium">Video</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{apt.reason}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>15 min</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardSchedule;
