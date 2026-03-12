import AppointmentCard from "@/components/AppointmentCard";

const AppointmentsPage = () => {
  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="gradient-primary px-4 py-5">
        <h1 className="text-xl font-bold text-primary-foreground">Appointments</h1>
      </div>
      <div className="space-y-4 px-4 pt-5">
        <h2 className="font-semibold text-foreground">Upcoming</h2>
        <AppointmentCard
          date="Tuesday, 14 April"
          time="16:00"
          doctorName="Dr. med. Friederike Janssen"
          specialty="Urologist"
          reason="Fertility consultation"
          avatarInitials="FJ"
        />
        <AppointmentCard
          date="Friday, 18 April"
          time="09:30"
          doctorName="Dr. Maren Leugering"
          specialty="Dermatologist"
          reason="Skin check-up"
          avatarInitials="ML"
          avatarColor="bg-info"
        />
        <h2 className="mt-4 font-semibold text-foreground">Past</h2>
        <div className="rounded-lg border border-border bg-card p-4 opacity-60">
          <p className="text-sm text-muted-foreground">
            Monday, 10 March — Dr. Schmidt, General Practitioner
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
