import { ArrowLeft, Search, MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoctorCard from "@/components/DoctorCard";
import { supabase } from "@/services/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  nextAvailability?: string;
  avatarInitials: string;
  avatarColor: string;
}

const MOCK_DOCTORS: Doctor[] = [
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
    specialty: "General Practitioner",
    location: "Zermatter Straße 25, 28325 Bremen",
    nextAvailability: "Thursday 11 June",
    avatarInitials: "SE",
    avatarColor: "bg-secondary",
  },
  {
    id: "4",
    name: "Dr. Amir Karimov",
    specialty: "Cardiologist",
    location: "Tashkent City, Uzbekistan",
    nextAvailability: "Tuesday 16 April",
    avatarInitials: "AK",
    avatarColor: "bg-destructive",
  },
  {
    id: "5",
    name: "Dr. Nilufar Rashidova",
    specialty: "Dentist",
    location: "Mirzo Ulugbek, Tashkent",
    nextAvailability: "Wednesday 17 April",
    avatarInitials: "NR",
    avatarColor: "bg-warning",
  },
];

const COLORS = ["bg-primary", "bg-secondary", "bg-info", "bg-warning", "bg-destructive"];

const SPECIALTIES = [
  "Dermatologist",
  "Cardiologist",
  "General Practitioner",
  "Urologist",
  "Dentist",
  "Neurologist",
  "Pediatrician",
];

const SearchPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, specialty, location, insurance_type")
          .eq("role", "doctor");

        if (error || !data || data.length === 0) {
          setDoctors(MOCK_DOCTORS);
        } else {
          const mapped: Doctor[] = data.map((d, i) => ({
            id: d.id,
            name: d.full_name ?? "Unknown Doctor",
            specialty: d.specialty ?? "General Practitioner",
            location: d.location ?? "Location not specified",
            avatarInitials: (d.full_name ?? "DR")
              .split(" ")
              .map((w: string) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
            avatarColor: COLORS[i % COLORS.length],
          }));
          setDoctors(mapped);
        }
      } catch {
        setDoctors(MOCK_DOCTORS);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filtered = doctors.filter((d) => {
    const matchesQuery =
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase()) ||
      d.location.toLowerCase().includes(query.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || d.specialty === selectedSpecialty;
    return matchesQuery && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary px-4 pb-5 pt-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">{t.search.title}</h1>
        </div>

        {/* Search Input in hero */}
        <div className="flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2.5 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground text-xs shrink-0">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Specialty Chips */}
      <div className="flex gap-2 overflow-x-auto px-4 pt-4 pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedSpecialty(null)}
          className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            !selectedSpecialty
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:bg-muted"
          }`}
        >
          {t.search.allSpecialties}
        </button>
        {SPECIALTIES.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(selectedSpecialty === spec ? null : spec)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedSpecialty === spec
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="px-4 pt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">{t.search.loading}</p>
          </div>
        ) : (
          <>
            <p className="mb-1 text-sm font-semibold text-foreground">
              {filtered.length} {t.search.results}
            </p>
            <p className="mb-4 text-sm text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {t.search.subtitle}
            </p>

            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center text-muted-foreground"
                >
                  <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">{t.search.noResults}</p>
                </motion.div>
              ) : (
                <div className="space-y-3 pb-6">
                  {filtered.map((doc, i) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <DoctorCard {...doc} />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
