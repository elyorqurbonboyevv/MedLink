import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
}

const mockResponses: Record<string, string> = {
  headache: "How long have you had this headache? I can help assess whether you should see a neurologist or your GP.",
  fever: "What is your current temperature? Fevers above 39°C for more than 3 days typically warrant a doctor visit.",
  cough: "Is your cough dry or productive? How long has it persisted? I'll help you decide on the right specialist.",
  pain: "Can you describe the location and intensity of the pain on a scale of 1–10?",
  default: "Thank you for sharing that. On a scale of 1–10, how severe are your symptoms? This helps me recommend the right level of care.",
};

const TypingIndicator = () => (
  <div className="flex items-end gap-1 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="h-2 w-2 rounded-full bg-primary/50"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

export default function AIAssistant({ onClose, onQuickBook, isTab = false }: {
  onClose?: () => void;
  onQuickBook?: () => void;
  isTab?: boolean;
}) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: t.ai.greeting },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    inputRef.current?.focus();

    const lower = userMsg.content.toLowerCase();
    const responseKey = Object.keys(mockResponses).find(k => lower.includes(k)) ?? 'default';
    const responseText = mockResponses[responseKey];

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseText,
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="gradient-primary px-4 py-3.5 flex items-center gap-3 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-white text-sm leading-tight">{t.ai.title}</p>
          <p className="text-white/70 text-xs">AI Symptom Checker</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-white/80 text-xs font-medium">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 mr-2 mt-1">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-card border border-border text-foreground rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-sm shadow-sm">
                <TypingIndicator />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <div className="px-4 pb-2 shrink-0">
        <p className="text-center text-[10px] text-muted-foreground">
          ⚠️ Not medical advice. Always consult a licensed healthcare professional.
        </p>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="shrink-0 border-t border-border bg-card px-4 py-3 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.ai.placeholder}
          className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
        />
        <motion.button
          type="submit"
          disabled={!input.trim() || isTyping}
          whileTap={{ scale: 0.92 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm disabled:opacity-40 transition-opacity"
        >
          {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </motion.button>
      </form>
    </div>
  );
}
