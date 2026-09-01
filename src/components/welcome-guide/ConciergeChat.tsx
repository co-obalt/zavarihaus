import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, MessageSquare, Instagram, Facebook, Shield, Sparkles, Clock, Check } from 'lucide-react';
import { SOCIAL_LINKS, SAFETY_INFO, CONCIERGE_ANSWERS, PROPERTY_INFO } from './data';

interface Message {
  id: string;
  sender: 'guest' | 'concierge';
  text: string;
  timestamp: string;
}

export default function ConciergeChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      text: "Welcome to Zavari Haus! I am your 24/7 Digital Concierge. How can I assist with your stay today? Tap any quick inquiry below or type your question.",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { label: '📶 Wifi password', query: 'Wifi password' },
    { label: '🧹 Housekeeping', query: 'Housekeeping' },
    { label: '⏰ Check-out times', query: 'Check-out times' },
    { label: '🔑 Lift Passcode', query: 'Lift passcode' },
    { label: '❄️ AC climate', query: 'AC climate instructions' },
    { label: '🧺 Laundry & ironing', query: 'Laundry and ironing' },
    { label: '🚭 Smoking policy', query: 'Smoking policy' },
    { label: '🗼 Eiffel Tower', query: 'Eiffel Tower distance' }
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const guestTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const guestMsg: Message = {
      id: Math.random().toString(),
      sender: 'guest',
      text: textToSend,
      timestamp: guestTime
    };

    setMessages(prev => [...prev, guestMsg]);
    setInputValue('');
    setIsTyping(true);

    // Process answer based on keywords
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      const normalized = lower.replace(/[^a-z0-9]/g, '');
      let responseText = "Thank you for reaching out! For immediate operational assistance, custom administrative inquiries, or direct coordination with our reception staff, please click the 'WhatsApp Desk' button above or contact management directly at 0311 4545993.";

      for (const [key, answer] of Object.entries(CONCIERGE_ANSWERS)) {
        const normKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (lower.includes(key.toLowerCase()) || (normKey.length > 2 && normalized.includes(normKey))) {
          responseText = answer;
          break;
        }
      }

      const conciergeTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const conciergeMsg: Message = {
        id: Math.random().toString(),
        sender: 'concierge',
        text: responseText,
        timestamp: conciergeTime
      };

      setMessages(prev => [...prev, conciergeMsg]);
      setIsTyping(false);
    }, 900);
  };

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div id="concierge-section" className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h2 className="font-serif text-2xl font-medium text-stone-900">Digital Concierge & Support</h2>
        <p className="text-xs text-stone-500 font-light mt-1">
          Whether you need daily housekeeping, laundry coordination, or safety updates, our reception staff are available to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Chat Interface (Col 1-3) */}
        <div className="lg:col-span-3 flex flex-col h-[550px] rounded-xl border border-gold-200 bg-white shadow-sm overflow-hidden">
          
          {/* Chat Header */}
          <div className="bg-stone-900 text-stone-100 p-4 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-full bg-gold-950 border border-gold-500/50 flex items-center justify-center text-gold-400">
                <Sparkles className="h-4.5 w-4.5" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-stone-900" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold leading-tight">Zavari Concierge Desk</h3>
                <span className="text-[10px] text-stone-400 font-light font-mono">Guest Assistance & Reception</span>
              </div>
            </div>
            
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold px-3 py-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <MessageSquare className="h-3.5 w-3.5" /> WhatsApp Desk
            </a>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 bg-stone-50/60 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'guest' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'guest'
                    ? 'bg-stone-900 text-white rounded-tr-none'
                    : 'bg-white text-stone-800 border border-stone-100 shadow-sm rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap font-light">{msg.text}</p>
                </div>
                <span className="text-[9px] text-stone-400 mt-1 font-mono">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start mr-auto max-w-[85%]">
                <div className="bg-white border border-stone-100 shadow-sm rounded-2xl rounded-tl-none p-3 text-xs text-stone-500">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick recommendations panel */}
          <div className="p-3 border-t border-stone-100 bg-white overflow-x-auto">
            <div className="flex gap-2 whitespace-nowrap pb-1">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.query)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-gold-50 border border-stone-200/60 hover:border-gold-200 rounded-full text-[11px] font-medium text-stone-700 transition-all shrink-0 cursor-pointer"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 border-t border-stone-100 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about wifi, check-out, AC instructions..."
              className="flex-1 text-xs border border-stone-200 rounded-lg py-2.5 px-3.5 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white p-2.5 rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>

        {/* Support & Safety Contacts Panel (Col 4-5) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Security & Suburban Setting */}
          <div className="rounded-xl border border-gold-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-gold-600" /> Security & Safety
            </h3>
            
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              {SAFETY_INFO.securityText}
            </p>

            <div className="border-t border-stone-100 pt-4 space-y-4">
              
              {/* Emergency Contact */}
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-wider uppercase text-stone-400">
                  {SAFETY_INFO.contacts.emergency.label}
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${SAFETY_INFO.contacts.emergency.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-bold text-stone-900 font-mono hover:text-gold-600 transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="h-3.5 w-3.5 text-gold-600" />
                    {SAFETY_INFO.contacts.emergency.phone}
                  </a>
                  <span className="rounded-full bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wide">
                    {SAFETY_INFO.contacts.emergency.available}
                  </span>
                </div>
              </div>

              {/* Administrative Line */}
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-wider uppercase text-stone-400">
                  {SAFETY_INFO.contacts.concierge.label}
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-stone-900 font-mono hover:text-emerald-600 transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                    {SOCIAL_LINKS.whatsappRaw}
                  </a>
                  <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wide">
                    WhatsApp Active
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Social connections */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
            <h4 className="font-serif text-base font-semibold text-stone-900">Connect with us online</h4>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Tag your stays, post photos of your curated suite, or message us for localized dining advice.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border border-stone-200 hover:border-gold-300 hover:bg-gold-50/20 py-2.5 px-4 rounded-lg text-xs font-semibold text-stone-800 transition-all cursor-pointer"
              >
                <Instagram className="h-4 w-4 text-pink-600" /> Instagram
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border border-stone-200 hover:border-gold-300 hover:bg-gold-50/20 py-2.5 px-4 rounded-lg text-xs font-semibold text-stone-800 transition-all cursor-pointer"
              >
                <Facebook className="h-4 w-4 text-blue-600" /> Facebook
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
