import { Calendar, Clock, Stethoscope } from "lucide-react";

interface AppointmentCardProps {
  date: string;
  time: string;
  doctorName: string;
  specialty: string;
  reason: string;
  avatarColor?: string;
  avatarInitials?: string;
}

const AppointmentCard = ({
  date,
  time,
  doctorName,
  specialty,
  reason,
  avatarColor = "bg-primary",
  avatarInitials = "DR",
}: AppointmentCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="flex items-center gap-3 bg-foreground/90 px-4 py-2.5 text-primary-foreground">
        <Calendar className="h-4 w-4" />
        <span className="text-sm font-semibold">{date}</span>
        <Clock className="ml-2 h-4 w-4" />
        <span className="text-sm font-semibold">{time}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${avatarColor} text-xs font-bold text-primary-foreground`}
          >
            {avatarInitials}
          </div>
          <div>
            <p className="font-semibold text-foreground">{doctorName}</p>
            <p className="text-sm text-muted-foreground">{specialty}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Stethoscope className="h-4 w-4" />
          <span>{reason}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
