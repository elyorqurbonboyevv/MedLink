import { ArrowLeft, Star, Share2, MapPin, User, Clock, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock doctor data
  const doctor = {
    name: "Dr. Maren Leugering",
    specialty: "Dermatologist",
    location: "Georg-Gröning-Straße 57",
    city: "28209 Bremen",
    practice: "Dermatologische Gemeinschaftspraxis am St. Joseph Stift",
    bio: "Liebe Patientin, lieber Patient, ich freue mich, Sie in meiner Praxis in Bremen begrüßen zu dürfen.",
    tags: ["Cosmetic–esthetic dermatology", "Dry skin", "Esthetic dermatology"],
    moreTagsCount: 8,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pb-8 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-3">
            <button className="text-primary-foreground">
              <Star className="h-5 w-5" />
            </button>
            <button className="text-primary-foreground">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Avatar */}
        <div className="mt-6 flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-light">
            <User className="h-12 w-12 text-primary" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-primary-foreground">
            {doctor.name}
          </h1>
          <p className="mt-1 text-primary-foreground/80">{doctor.specialty}</p>
        </div>
      </div>

      {/* Book Button */}
      <div className="px-4 -mt-5">
        <button
          onClick={() => navigate(`/book/${id}`)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-semibold text-primary-foreground shadow-card transition-shadow hover:shadow-card-hover"
        >
          <Calendar className="h-5 w-5" />
          BOOK AN APPOINTMENT
        </button>
      </div>

      {/* Locations */}
      <section className="mx-4 mt-5 rounded-lg bg-card p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Locations</h2>
          </div>
          <button className="text-sm font-medium text-primary">View more</button>
        </div>
        <p className="mt-2 font-medium text-primary">{doctor.practice}</p>
        <p className="mt-1 text-sm text-foreground">{doctor.location}</p>
        <p className="text-sm text-foreground">{doctor.city}</p>
      </section>

      {/* Profile */}
      <section className="mx-4 mt-4 rounded-lg bg-card p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Profile</h2>
          </div>
          <button className="text-sm font-medium text-primary">View more</button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{doctor.bio}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {doctor.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            +{doctor.moreTagsCount}
          </span>
        </div>
      </section>

      {/* Opening hours */}
      <section className="mx-4 mt-4 mb-8 rounded-lg bg-card p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Opening hours and contact</h2>
          </div>
          <button className="text-sm font-medium text-primary">View more</button>
        </div>
      </section>
    </div>
  );
};

export default DoctorProfile;
