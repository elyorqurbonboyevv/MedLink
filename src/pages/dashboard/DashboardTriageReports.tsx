import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TriageReport {
  id: string;
  patient: string;
  date: string;
  urgency: "Low" | "Medium" | "High";
  specialty: string;
  summary: string;
  aiQuestions: { q: string; a: string }[];
  recommendation: string;
  status: "pending" | "reviewed";
}

const reports: TriageReport[] = [
  {
    id: "1",
    patient: "Anna Schmidt",
    date: "March 10, 2026",
    urgency: "Low",
    specialty: "Dermatology",
    summary: "Mild rash on forearms, 3 days duration. No fever or other systemic symptoms.",
    aiQuestions: [
      { q: "What is your main symptom?", a: "A rash on both forearms" },
      { q: "How long have you had this?", a: "About 3 days" },
      { q: "Any fever or pain?", a: "No, just mild itching" },
      { q: "Have you changed soaps or detergents?", a: "Yes, new laundry detergent last week" },
      { q: "Any previous skin conditions?", a: "No" },
    ],
    recommendation: "Book a General Practitioner or Dermatologist within the next week. Likely contact dermatitis from new detergent.",
    status: "pending",
  },
  {
    id: "2",
    patient: "Felix Braun",
    date: "March 9, 2026",
    urgency: "Medium",
    specialty: "Dermatology",
    summary: "Recurring eczema flare-up, worse than previous episodes. Current treatment (topical steroid) not effective.",
    aiQuestions: [
      { q: "What is your main symptom?", a: "Eczema flare-up, very itchy and red" },
      { q: "Severity on scale 1-10?", a: "7 — it's spreading to new areas" },
      { q: "Current treatment?", a: "Hydrocortisone cream, not helping" },
      { q: "Any triggers you can identify?", a: "Stress from work, possibly diet changes" },
      { q: "Duration of current flare?", a: "About 10 days" },
    ],
    recommendation: "Schedule Dermatologist appointment within 3–5 days. May need stronger topical or systemic treatment.",
    status: "pending",
  },
  {
    id: "3",
    patient: "Maria Weber",
    date: "March 8, 2026",
    urgency: "Low",
    specialty: "Dermatology",
    summary: "New mole noticed on upper back. No changes in existing moles. No family history of melanoma.",
    aiQuestions: [
      { q: "What is your concern?", a: "A new mole on my upper back" },
      { q: "When did you notice it?", a: "About 2 weeks ago" },
      { q: "Has it changed in size or color?", a: "I'm not sure, it's hard to see" },
      { q: "Any family history of skin cancer?", a: "No" },
      { q: "Any itching or bleeding?", a: "No" },
    ],
    recommendation: "Book a Dermatologist for routine mole examination. No urgent concern based on responses.",
    status: "reviewed",
  },
  {
    id: "4",
    patient: "Lukas Fischer",
    date: "March 7, 2026",
    urgency: "Medium",
    specialty: "Dermatology",
    summary: "Psoriasis patient — new joint pain developing. Possible psoriatic arthritis.",
    aiQuestions: [
      { q: "Main concern today?", a: "My psoriasis is flaring and my joints hurt" },
      { q: "Which joints are affected?", a: "Fingers and right knee" },
      { q: "How long has the joint pain lasted?", a: "About 3 weeks, getting worse" },
      { q: "Current medications?", a: "Topical treatments only" },
      { q: "Morning stiffness?", a: "Yes, about 30 minutes each morning" },
    ],
    recommendation: "Urgent Dermatologist/Rheumatologist referral. Symptoms suggest psoriatic arthritis requiring systemic treatment.",
    status: "reviewed",
  },
];

const DashboardTriageReports = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "reviewed">("all");

  const filtered = reports.filter((r) => filter === "all" || r.status === filter);
  const selected = reports.find((r) => r.id === selectedId);

  const urgencyStyle = (u: string) =>
    u === "High"
      ? "bg-destructive/10 text-destructive"
      : u === "Medium"
      ? "bg-warning/10 text-warning"
      : "bg-secondary/10 text-secondary";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Triage Reports</h1>
        <p className="mt-1 text-muted-foreground">AI-generated symptom assessments from patients</p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 rounded-lg bg-warning/10 border border-warning/20 p-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-warning mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <strong>Disclaimer:</strong> These AI triage reports are decision-support tools only. They do not constitute medical advice or diagnosis. Always apply clinical judgment.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "pending", "reviewed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            {f} {f !== "all" && `(${reports.filter((r) => r.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Report List */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedId(report.id)}
              className={`w-full rounded-xl border p-4 text-left transition-all ${
                selectedId === report.id
                  ? "border-primary bg-primary/5 shadow-card"
                  : "border-border bg-card hover:shadow-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">{report.patient}</p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${urgencyStyle(report.urgency)}`}>
                  {report.urgency}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{report.summary}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{report.date}</span>
                <span className="flex items-center gap-1">
                  {report.status === "reviewed" ? (
                    <><CheckCircle className="h-3 w-3 text-secondary" /> Reviewed</>
                  ) : (
                    <><Clock className="h-3 w-3 text-warning" /> Pending</>
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Report Detail */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">{selected.patient}</h2>
                      <p className="text-sm text-muted-foreground">{selected.date}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${urgencyStyle(selected.urgency)}`}>
                    Urgency: {selected.urgency}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Summary</h3>
                  <p className="mt-2 text-foreground">{selected.summary}</p>
                </div>

                <div className="mt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    AI Triage Interview
                  </h3>
                  <div className="mt-3 space-y-3">
                    {selected.aiQuestions.map((item, i) => (
                      <div key={i} className="rounded-lg bg-muted/50 p-3">
                        <p className="text-sm font-medium text-primary">{item.q}</p>
                        <p className="mt-1 text-sm text-foreground">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    AI Recommendation
                  </h3>
                  <div className="mt-2 rounded-lg border border-secondary/30 bg-secondary/5 p-3">
                    <p className="text-sm text-foreground">{selected.recommendation}</p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-card-hover">
                    Mark as Reviewed
                  </button>
                  <button className="flex-1 rounded-lg border border-border py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                    Add Clinical Notes
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20">
                <FileText className="h-12 w-12 text-muted-foreground/40" />
                <p className="mt-3 text-muted-foreground">Select a report to view details</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DashboardTriageReports;
