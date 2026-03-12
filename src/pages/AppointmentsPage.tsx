import { useEffect, useState } from "react";
import { Calendar, Clock, Stethoscope, Loader2, CalendarOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/services/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: "upcoming" | "past" | "cancelled";
  doctor_name: string;
  doctor_specialty: string;
  avatar_initials: string;
  avatar_color: string;
}

const AVATAR_COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-info",
  "bg-warning",
  "bg-destructive",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  } catch {
    return dateStr;
  }
}

function isPast(dateStr: string, timeStr: string): boolean {
  try {
    const dt = new Date(`${dateStr}T${timeStr}`);
    return dt < new Date();
  } catch {
    return false;
  }
}

const AppointmentCard = ({
  apt,
  index,
}: {
  apt: Appointment;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06 }}
    className="overflow-hidden rounded-xl border border-border bg-card shadow-card"
  >
    <div className="flex items-center gap-3 bg-foreground/90 px-4 py-2.5 text-primary-foreground">
      <Calendar className="h-4 w-4 shrink-0" />
      <span className="text-sm font-semibold">{formatDate(apt.appointment_date)}</span>
      <Clock className="ml-2 h-4 w-4 shrink-0" />
      <span className="text-sm font-semibold">{apt.appointment_time}</span>
    </div>
    <div className="p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${apt.avatar_color} text-xs font-bold text-primary-foreground`}
        >
          {apt.avatar_initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">{apt.doctor_name}</p>
          <p className="text-sm text-muted-foreground">{apt.doctor_specialty}</p>
        </div>
      </div>
      {apt.reason && (
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Stethoscope className="h-4 w-4 shrink-0" />
          <span className="truncate">{apt.reason}</span>
        </div>
      )}
    </div>
  </motion.div>
);

const EmptyState = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
    <CalendarOff className="h-9 w-9 text-muted-foreground/40 mb-2" />
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const AppointmentsPage = () => {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: queryError } = await supabase
          .from("appointments")
          .select(`
            id,
            appointment_date,
            appointment_time,
            reason,
            status,
            doctor:profiles!appointments_doctor_id_fkey (
              full_name,
              specialty
            )
          `)
          .order("appointment_date", { ascending: true });

        if (queryError) throw queryError;

        if (!data || data.length === 0) {
          setAppointments([]);
          return;
        }

        const mapped: Appointment[] = data.map((row: any, i: number) => {
          const doctorName = row.doctor?.full_name ?? "Unknown Doctor";
          const status =
            row.status ??
            (isPast(row.appointment_date, row.appointment_time ?? "00:00")
              ? "past"
              : "upcoming");
          return {
            id: row.id,
            appointment_date: row.appointment_date,
            appointment_time: row.appointment_time ?? "",
            reason: row.reason ?? "",
            status,
            doctor_name: doctorName,
            doctor_specialty: row.doctor?.specialty ?? "Specialist",
            avatar_initials: getInitials(doctorName),
            avatar_color: AVATAR_COLORS[i % AVATAR_COLORS.length],
          };
        });

        setAppointments(mapped);
      } catch (err: any) {
        const msg = err?.message ?? "";
        // If it's a missing table or network error, just show empty instead of a red error
        if (
          msg.includes("does not exist") ||
          msg.includes("Failed to fetch") ||
          msg.includes("NetworkError") ||
          msg.includes("relation")
        ) {
          setAppointments([]);
        } else {
          setError(msg || "Could not load appointments.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const past = appointments.filter((a) => a.status === "past" || a.status === "cancelled");

  return (
    <div className="min-h-screen bg-background safe-bottom">
      {/* Header */}
      <div className="gradient-primary px-4 py-5">
        <h1 className="text-xl font-bold text-primary-foreground">
          {t.nav.appointments}
        </h1>
      </div>

      <div className="space-y-4 px-4 pt-5 pb-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading appointments…</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-6 text-center">
            <p className="text-sm font-medium text-destructive">{error}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check your Supabase connection and make sure the appointments table exists.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {/* Upcoming */}
            <motion.div
              key="upcoming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <h2 className="font-semibold text-foreground">Upcoming</h2>
              {upcoming.length === 0 ? (
                <EmptyState label="No upcoming appointments" />
              ) : (
                upcoming.map((apt, i) => (
                  <AppointmentCard key={apt.id} apt={apt} index={i} />
                ))
              )}
            </motion.div>

            {/* Past */}
            <motion.div
              key="past"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-3 mt-6"
            >
              <h2 className="font-semibold text-foreground">Past</h2>
              {past.length === 0 ? (
                <EmptyState label="No past appointments" />
              ) : (
                past.map((apt, i) => (
                  <div key={apt.id} className="opacity-60">
                    <AppointmentCard apt={apt} index={i} />
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
