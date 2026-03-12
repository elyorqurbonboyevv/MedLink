import { Search, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const patients = [
  { id: "1", name: "Anna Schmidt", age: 34, insurance: "Public", lastVisit: "March 8, 2026", condition: "Mild dermatitis", initials: "AS" },
  { id: "2", name: "Thomas Müller", age: 28, insurance: "Private", lastVisit: "March 5, 2026", condition: "Acne vulgaris", initials: "TM" },
  { id: "3", name: "Elyor Kurbonboev", age: 31, insurance: "Public", lastVisit: "March 3, 2026", condition: "Contact dermatitis", initials: "EK" },
  { id: "4", name: "Maria Weber", age: 45, insurance: "Public", lastVisit: "Feb 28, 2026", condition: "Suspicious mole", initials: "MW" },
  { id: "5", name: "Felix Braun", age: 22, insurance: "Public", lastVisit: "Feb 20, 2026", condition: "Eczema", initials: "FB" },
  { id: "6", name: "Sarah Koch", age: 39, insurance: "Private", lastVisit: "Feb 15, 2026", condition: "Cosmetic consultation", initials: "SK" },
  { id: "7", name: "Lukas Fischer", age: 52, insurance: "Public", lastVisit: "Feb 10, 2026", condition: "Psoriasis", initials: "LF" },
  { id: "8", name: "Emma Becker", age: 27, insurance: "Public", lastVisit: "Jan 30, 2026", condition: "General dermatology", initials: "EB" },
];

const DashboardPatients = () => {
  const [query, setQuery] = useState("");
  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.condition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Patients</h1>
        <span className="text-sm text-muted-foreground">{patients.length} total</span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 focus-within:border-primary transition-colors">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patients..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Patient List */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_80px_100px_140px_160px_80px] gap-4 border-b border-border bg-muted/50 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Patient</span>
          <span>Age</span>
          <span>Insurance</span>
          <span>Last Visit</span>
          <span>Condition</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex flex-col md:grid md:grid-cols-[1fr_80px_100px_140px_160px_80px] gap-2 md:gap-4 md:items-center px-5 py-3 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {p.initials}
                </div>
                <span className="font-medium text-foreground">{p.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{p.age}</span>
              <span className={`text-xs font-medium rounded-full px-2 py-0.5 w-fit ${
                p.insurance === "Private" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"
              }`}>
                {p.insurance}
              </span>
              <span className="text-sm text-muted-foreground">{p.lastVisit}</span>
              <span className="text-sm text-foreground">{p.condition}</span>
              <div className="flex gap-1">
                <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPatients;
