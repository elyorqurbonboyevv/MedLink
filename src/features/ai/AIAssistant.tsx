import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, ChevronRight, Phone, Video, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIAssistant({ onClose, onQuickBook, isTab = false }: any) {
  const [messages, setMessages] = useState([
    { id: '1', role: 'ai', content: "Hello! I'm your DocTec AI. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = { id: (Date.now()+1).toString(), role: 'ai', content: "I've received your message. Please complete your profile to enable full AI features." };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="bg-[#0055A4] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={20} />
          <span className="font-bold">DocTec AI</span>
        </div>
      </header>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
        <input 
          className="flex-1 border rounded-full px-4 py-2 outline-none" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-[#0055A4] text-white p-2 rounded-full">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}