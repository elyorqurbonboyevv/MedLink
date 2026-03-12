import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const steps = [
  {
    question: "Who is this appointment for?",
    options: [
      { label: "Elyor KURBONBOEV (me)", sub: "Public insurance", selected: true },
    ],
    hasAddRelative: true,
  },
  {
    question: "Have you visited a practitioner at this facility in the past?",
    options: [{ label: "Yes" }, { label: "No" }],
  },
  {
    question: "What is the reason for your visit?",
    options: [
      { label: "General consultation" },
      { label: "Follow-up" },
      { label: "Skin check-up" },
      { label: "Other" },
    ],
  },
];

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const current = steps[step];

  const handleSelect = (idx: number) => {
    setSelected(idx);
    // Auto-advance after short delay
    setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1);
        setSelected(null);
      } else {
        navigate("/appointments");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (step > 0 ? setStep(step - 1) : navigate(-1))}
            className="text-primary-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-primary-foreground/80">Make an appointment</p>
              <p className="font-semibold text-primary-foreground">
                Dermatologische Gemeinschafts...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step Progress */}
      <div className="flex gap-1 px-4 pt-3">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="px-4 pt-6">
        <h2 className="text-xl font-bold text-foreground">{current.question}</h2>

        <div className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border">
          {current.options.map((opt, idx) => (
            <button
              key={opt.label}
              onClick={() => handleSelect(idx)}
              className={`flex w-full items-center gap-3 p-4 text-left transition-colors ${
                selected === idx ? "bg-primary-light" : "bg-card hover:bg-muted"
              }`}
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected === idx ? "border-primary bg-primary" : "border-border"
                }`}
              >
                {selected === idx && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{opt.label}</p>
                {"sub" in opt && (
                  <p className="text-sm text-muted-foreground">{opt.sub}</p>
                )}
              </div>
            </button>
          ))}
          {current.hasAddRelative && (
            <button className="flex w-full items-center gap-3 p-4 text-left text-primary hover:bg-muted">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-light text-primary">
                +
              </div>
              <span className="font-medium">Add a relative</span>
            </button>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mx-4 mt-6 rounded-lg bg-warning/10 p-3">
        <p className="text-xs text-muted-foreground">
          ⚠️ <strong>Disclaimer:</strong> This is not medical advice. Always
          consult a licensed healthcare professional for medical decisions.
        </p>
      </div>
    </div>
  );
};

export default BookAppointment;
