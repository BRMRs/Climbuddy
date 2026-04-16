import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { ScreenHeader } from '../../layout/ScreenHeader';
import { S } from '../../../constants/styles';
import { Message, Partner } from '../../../types';

const AUTO_REPLIES: Record<string, string[]> = {
  default: [
    "That sounds great! When are you free this week? 😊",
    "I usually go on weekends. Does Saturday morning work?",
    "Awesome! I'll see you at the gym 🧗‍♀️",
    "Let me know if you need any tips for the beginner routes!",
    "Peak Bouldering has really nice V2s right now, you'll love them.",
  ],
};

const INITIAL_MESSAGES: Message[] = [
  { id: 'm0', text: "Hey Emma! Ready to conquer some beginner routes this weekend? 🧗", fromSelf: false, time: '10:21' },
];

function now(): string {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

let replyIdx = 0;

interface ChatScreenProps {
  partner: Partner;
  onBack: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ partner, onBack }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');

    const userMsg: Message = { id: `u${Date.now()}`, text, fromSelf: true, time: now() };
    setMessages(m => [...m, userMsg]);

    // Simulated reply
    setTyping(true);
    setTimeout(() => {
      const replies = AUTO_REPLIES.default;
      const reply: Message = {
        id: `r${Date.now()}`,
        text: replies[replyIdx % replies.length],
        fromSelf: false,
        time: now(),
      };
      replyIdx++;
      setTyping(false);
      setMessages(m => [...m, reply]);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] animate-in slide-in-from-right duration-300">
      <ScreenHeader
        onBack={onBack}
        right={
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-green-500" strokeWidth={2.5} />
            <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Safe Match</span>
          </div>
        }
      />

      {/* Partner header */}
      <div className={`px-5 py-3 bg-white border-b-2 border-slate-900 flex items-center gap-3`}>
        <div className={`w-10 h-10 rounded-full overflow-hidden ${S.border}`}>
          <img src={partner.image} className="w-full h-full object-cover" alt={partner.name} />
        </div>
        <div>
          <p className="font-black text-slate-900">{partner.name}</p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-slate-500">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 flex flex-col gap-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.fromSelf ? 'justify-end' : 'justify-start'}`}>
            {!msg.fromSelf && (
              <div className={`w-8 h-8 rounded-full overflow-hidden mr-2 shrink-0 self-end ${S.border}`}>
                <img src={partner.image} className="w-full h-full object-cover" alt="" />
              </div>
            )}
            <div className={`max-w-[72%] flex flex-col gap-1 ${msg.fromSelf ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-3 rounded-2xl font-semibold text-sm leading-relaxed
                ${msg.fromSelf
                  ? 'bg-slate-900 text-white rounded-br-sm'
                  : `bg-white text-slate-900 rounded-bl-sm ${S.border} ${S.shadowSm}`}`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">{msg.time}</span>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className={`w-8 h-8 rounded-full overflow-hidden mr-2 shrink-0 self-end ${S.border}`}>
              <img src={partner.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className={`px-4 py-3 rounded-2xl bg-white ${S.border} ${S.shadowSm}`}>
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className={`p-4 bg-white border-t-2 border-slate-900`}>
        <div className="flex items-center gap-3">
          <div className={`flex-1 bg-[#F8FAFC] rounded-2xl flex items-center px-4 ${S.border} ${S.shadowSm} focus-within:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all`}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              type="text"
              placeholder="Message..."
              className="bg-transparent border-none outline-none w-full py-3.5 text-slate-900 font-semibold placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={send}
            disabled={!input.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${S.border} ${S.shadowSm} ${S.press} transition-colors
              ${input.trim() ? 'bg-slate-900' : 'bg-slate-200'}`}
          >
            <ArrowUp className={`w-5 h-5 ${input.trim() ? 'text-white' : 'text-slate-400'}`} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};
