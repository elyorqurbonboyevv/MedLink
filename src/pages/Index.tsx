import { Search, ChevronRight, AlertTriangle, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppointmentCard from "@/components/AppointmentCard";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen safe-bottom">
      {/* Hero */}
      <div className="gradient-hero px-5 pb-10 pt-12 text-primary-foreground">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-3xl font-extrabold leading-tight"
        >
          Live a<br />healthier life
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => navigate("/search")}
          className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-card px-6 py-3 font-semibold text-foreground shadow-card transition-shadow hover:shadow-card-hover"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          SEARCH
        </motion.button>
        {/* Doctor Dashboard Link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/dashboard")}
          className="mx-auto mt-3 flex items-center gap-1.5 text-sm text-primary-foreground/80 underline underline-offset-2 hover:text-primary-foreground"
        >
          <Stethoscope className="h-3.5 w-3.5" />
          Open Doctor Dashboard
        </motion.button>
      </div>

      {/* AI Triage CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mx-4 -mt-5 mb-6"
      >
        <button
          onClick={() => navigate("/triage")}
          className="flex w-full items-center gap-3 rounded-lg bg-secondary/10 p-4 text-left transition-colors hover:bg-secondary/15"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
            <AlertTriangle className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">I feel unwell</p>
            <p className="text-sm text-muted-foreground">
              AI Symptom Checker — get triaged in minutes
            </p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
        </button>
      </motion.div>

      {/* Upcoming Appointments */}
      <section className="px-4">
        <h2 className="mb-3 text-lg font-bold text-foreground">
          Upcoming appointments
        </h2>
        <div className="space-y-3">
          <AppointmentCard
            date="Tuesday, 14 April"
            time="16:00"
            doctorName="Dr. med. Friederike Janssen"
            specialty="Urologist"
            reason="Fertility consultation"
            avatarColor="bg-primary"
            avatarInitials="FJ"
          />
          <AppointmentCard
            date="Friday, 18 April"
            time="09:30"
            doctorName="Dr. Maren Leugering"
            specialty="Dermatologist"
            reason="Skin check-up"
            avatarColor="bg-info"
            avatarInitials="ML"
          />
        </div>
      </section>

      {/* Health Profile CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mx-4 mt-6 rounded-lg bg-primary-light p-4"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-foreground">
              Complete your health profile
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              2 minutes to get personalized health reminders
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/health")}
          className="mt-3 w-full rounded-lg border border-primary/20 py-2 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          Start
        </button>
      </motion.section>

      {/* My Practitioners */}
      <section className="mt-6 px-4 pb-4">
        <h2 className="mb-3 text-lg font-bold text-foreground">
          My practitioners
        </h2>
        <p className="mb-2 text-sm font-medium text-primary">History</p>
        <div className="space-y-3">
          {[
            {
              name: "Dr. Maren Leugering",
              specialty: "Dermatologist",
              city: "Bremen",
              initials: "ML",
              color: "bg-info",
            },
            {
              name: "Dr. med. Friederike Janssen",
              specialty: "Urologist",
              city: "Hamburg",
              initials: "FJ",
              color: "bg-primary",
            },
          ].map((doc) => (
            <button
              key={doc.name}
              onClick={() => navigate(`/doctor/1`)}
              className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${doc.color} text-xs font-bold text-primary-foreground`}
              >
                {doc.initials}
              </div>
              <div>
                <p className="font-semibold text-primary">{doc.name}</p>
                <p className="text-sm text-muted-foreground">
                  {doc.specialty}
                </p>
                <p className="text-sm text-muted-foreground">{doc.city}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
