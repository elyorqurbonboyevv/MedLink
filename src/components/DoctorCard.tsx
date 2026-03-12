import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  location: string;
  nextAvailability?: string;
  avatarColor?: string;
  avatarInitials?: string;
}

const DoctorCard = ({
  id,
  name,
  specialty,
  location,
  nextAvailability,
  avatarColor = "bg-primary",
  avatarInitials = "DR",
}: DoctorCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/doctor/${id}`)}
      className="w-full rounded-lg border border-border bg-card p-4 text-left shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${avatarColor} text-sm font-bold text-primary-foreground`}
        >
          {avatarInitials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-primary">{name}</p>
          <p className="text-sm text-muted-foreground">{specialty}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>{location}</span>
      </div>
      {nextAvailability && (
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">Next availability</p>
          <span className="mt-1 inline-block rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
            {nextAvailability}
          </span>
        </div>
      )}
    </button>
  );
};

export default DoctorCard;
