import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DoctorCard from "@/components/DoctorCard";

const mockDoctors = [
  {
    id: "1",
    name: "Dr. Maren Leugering",
    specialty: "Dermatologist",
    location: "Georg-Gröning-Straße 57, 28209 Bremen",
    nextAvailability: "Thursday 11 June",
    avatarInitials: "ML",
    avatarColor: "bg-info",
  },
  {
    id: "2",
    name: "Dr. med. Friederike Janssen",
    specialty: "Urologist",
    location: "Hamburger Straße 12, 20095 Hamburg",
    nextAvailability: "Monday 14 April",
    avatarInitials: "FJ",
    avatarColor: "bg-primary",
  },
  {
    id: "3",
    name: "Praxis Schweizer Eck",
    specialty: "Group practice",
    location: "Zermatter Straße 25, 28325 Bremen",
    nextAvailability: "Thursday 11 June",
    avatarInitials: "SE",
    avatarColor: "bg-secondary",
  },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = mockDoctors.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary px-4 pb-5 pt-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">Search</h1>
        </div>
      </div>

      {/* Search input */}
      <div className="px-4 pt-4">
        <label className="mb-1 text-sm font-medium text-foreground">
          Name, specialty, practice
        </label>
        <div className="mt-1 flex items-center gap-2 rounded-lg border-2 border-primary/40 bg-card px-3 py-2.5 focus-within:border-primary">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 pt-4">
        {["Availability", "Public", "More Filters"].map((filter, i) => (
          <button
            key={filter}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              i === 1
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="px-4 pt-4">
        <p className="mb-1 text-sm font-semibold text-foreground">
          {filtered.length} results
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          Find practitioners and book an appointment online
        </p>
        <div className="space-y-3 pb-6">
          {filtered.map((doc) => (
            <DoctorCard key={doc.id} {...doc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
