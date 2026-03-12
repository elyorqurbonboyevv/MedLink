import { ArrowLeft, Send, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hello! I'm the DocTec AI Symptom Checker. I'll ask you a few questions to help determine the right level of care.\n\n⚠️ **This is not medical advice.** Always consult a licensed healthcare professional.",
  },
  {
    role: "assistant",
    content: "What is your main symptom or concern today?",
  },
];

const mockResponses: Record<string, string> = {
  headache:
    "How long have you had this headache?\n\n1. Less than 24 hours\n2. 1-3 days\n3. More than a week",
  fever:
    "What is your current temperature? And how long have you had the fever?",
  default:
    "Thank you for sharing that. On a scale of 1-10, how would you rate the severity of your symptoms?",
};

const TriagePage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    // Mock AI response
    const lower = input.toLowerCase();
    let response = mockResponses.default;
    if (lower.includes("headache")) response = mockResponses.headache;
    else if (lower.includes("fever")) response = mockResponses.fever;

    if (step >= 2) {
      response =
        "Based on your responses, I recommend **booking a General Practitioner** appointment. Your symptoms don't appear to require emergency care, but should be evaluated by a doctor within the next few days.\n\n🟢 **Urgency: Low-Medium**\n\nWould you like me to help you find an available GP?";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 800);

    setInput("");
    setStep(step + 1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="gradient-primary px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary-foreground" />
            <h1 className="text-lg font-bold text-primary-foreground">
              AI Symptom Checker
            </h1>
          </div>
        </div>
      </div>

      {/* Disclaimer banner */}
      <div className="bg-warning/10 px-4 py-2">
        <p className="text-xs text-center text-muted-foreground">
          ⚠️ This is not medical advice. Always consult a licensed professional.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`mb-3 max-w-[85%] ${
                msg.role === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-foreground rounded-bl-md shadow-card"
                }`}
              >
                {msg.content.split("\n").map((line, li) => (
                  <p key={li} className={li > 0 ? "mt-1" : ""}>
                    {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your symptoms..."
            className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TriagePage;
