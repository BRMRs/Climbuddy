import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, ShieldCheck, CalendarPlus, CheckCircle2, X, MapPin, Calendar, Clock } from 'lucide-react';
import { ScreenHeader } from '../../layout/ScreenHeader';
import { S } from '../../../constants/styles';
import { Message, Partner, MeetingProposal } from '../../../types';
import { GYMS_DATA, TIME_SLOTS } from '../../../data/mockData';

const AUTO_REPLIES: string[] = [
  "That sounds great! When are you free this week?",
  "I usually go on weekends. Does Saturday morning work?",
  "Awesome! I'll see you at the gym!",
  "Let me know if you need any tips for the beginner routes!",
  "Peak Bouldering has really nice V2s right now, you'll love them.",
];

const INITIAL_MESSAGES: Message[] = [
  { id: 'm0', text: "Hey {userName}! Ready to conquer some beginner routes this weekend?", fromSelf: false, time: '10:21' },
];

function nowStr(): string {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getNextDays(n: number) {
  const today = new Date();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      label:   d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayNum:  d.getDate(),
      dayName: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });
}
const DAYS = getNextDays(7);

let replyIdx = 0;

interface ChatScreenProps {
  partner: Partner;
  onBack: () => void;
  initialMessages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
  onMeetingAccepted?: (proposal: MeetingProposal) => void;
  onLastMessage?: (lastMessage: string, time: string) => void;
  userName?: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  partner,
  onBack,
  initialMessages,
  onMessagesChange,
  onMeetingAccepted,
  onLastMessage,
  userName = 'Emma',
}) => {
  const resolveText = (text: string, fromSelf: boolean) =>
    fromSelf ? text : text.replace(/\{userName\}/g, userName);

  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessages && initialMessages.length > 0) return initialMessages;
    return INITIAL_MESSAGES;
  });
  const [input,    setInput]    = useState('');
  const [typing,   setTyping]   = useState(false);
  const [showPropose, setShowPropose] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    onMessagesChange?.(messages);
  }, [messages, onMessagesChange]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(m => [...m, { id: `u${Date.now()}`, text, fromSelf: true, time: nowStr() }]);
    onLastMessage?.(text, nowStr());

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, {
        id: `r${Date.now()}`,
        text: AUTO_REPLIES[replyIdx++ % AUTO_REPLIES.length],
        fromSelf: false, time: nowStr(),
      }]);
      onLastMessage?.(AUTO_REPLIES[(replyIdx - 1 + AUTO_REPLIES.length) % AUTO_REPLIES.length], nowStr());
    }, 1200 + Math.random() * 800);
  };

  // Called by ProposeMeetingSheet when Emma confirms a proposal
  const sendProposal = (proposal: MeetingProposal) => {
    const proposalId = `p${Date.now()}`;
    setShowPropose(false);

    // Emma's proposal message
    setMessages(m => [...m, {
      id: proposalId,
      text: '',
      fromSelf: true,
      time: nowStr(),
      meetingProposal: proposal,
    }]);
    onLastMessage?.('Sent a climb invite', nowStr());

    // Simulate partner seeing it and accepting after ~2s
    setTyping(true);
    setTimeout(() => {
      // Update proposal status to accepted
      setMessages(m => m.map(msg =>
        msg.id === proposalId
          ? { ...msg, meetingProposal: { ...msg.meetingProposal!, status: 'accepted' } }
          : msg
      ));
      setTyping(false);
      // Partner's acceptance message
      setMessages(m => [...m, {
        id: `acc${Date.now()}`,
        text: `🎉 I'm in! See you at ${proposal.gym} on ${proposal.date} (${proposal.slot}). Can't wait! 🧗`,
        fromSelf: false,
        time: nowStr(),
      }]);
      onLastMessage?.(`Confirmed: ${proposal.gym} · ${proposal.date} · ${proposal.slot}`, nowStr());
      onMeetingAccepted?.(proposal);
    }, 2000);
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

        {/* Partner/Coach header bar */}
      <div className="px-5 py-3 bg-white border-b-2 border-slate-900 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full overflow-hidden ${S.border}`}>
          <img src={partner.image} className="w-full h-full object-cover" alt={partner.name} />
        </div>
        <div className="flex-1">
          <p className="font-black text-slate-900">{partner.name}</p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-slate-500">
              Online{(partner as any).level ? ` · ${(partner as any).level}` : ''}
            </span>
          </div>
        </div>
        {/* Propose meeting CTA - only for Partners, not Coaches */}
        {(partner as any).level && (
          <button
            onClick={() => setShowPropose(true)}
            className={`flex items-center gap-1.5 px-3 py-2 bg-[#FEF08A] rounded-xl font-black text-xs text-slate-900 ${S.border} ${S.shadowSm} ${S.press}`}
          >
            <CalendarPlus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Climb Date
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 flex flex-col gap-3">
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            msg={{ ...msg, text: resolveText(msg.text, msg.fromSelf) }}
            partnerImg={partner.image}
            partnerName={partner.name}
          />
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className={`w-8 h-8 rounded-full overflow-hidden mr-2 shrink-0 self-end ${S.border}`}>
              <img src={partner.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className={`px-4 py-3 rounded-2xl bg-white ${S.border} ${S.shadowSm}`}>
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t-2 border-slate-900">
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
          <button onClick={send} disabled={!input.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${S.border} ${S.shadowSm} ${S.press} transition-colors
              ${input.trim() ? 'bg-slate-900' : 'bg-slate-200'}`}>
            <ArrowUp className={`w-5 h-5 ${input.trim() ? 'text-white' : 'text-slate-400'}`} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Propose Meeting Sheet */}
      {showPropose && (
        <ProposeMeetingSheet
          partnerName={partner.name}
          onClose={() => setShowPropose(false)}
          onSend={sendProposal}
        />
      )}
    </div>
  );
};

/* ── Message Bubble ─────────────────────────────── */
function MessageBubble({ msg, partnerImg, partnerName }: {
  msg: Message; partnerImg: string; partnerName: string;
}) {
  if (msg.meetingProposal) {
    return (
      <div className={`flex ${msg.fromSelf ? 'justify-end' : 'justify-start'}`}>
        {!msg.fromSelf && (
          <div className={`w-8 h-8 rounded-full overflow-hidden mr-2 shrink-0 self-end ${S.border}`}>
            <img src={partnerImg} className="w-full h-full object-cover" alt="" />
          </div>
        )}
        <div className="max-w-[80%] flex flex-col gap-1">
          <ProposalCard proposal={msg.meetingProposal} fromSelf={msg.fromSelf} partnerName={partnerName} />
          <span className={`text-[10px] text-slate-400 font-semibold ${msg.fromSelf ? 'text-right' : 'text-left'}`}>
            {msg.time}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${msg.fromSelf ? 'justify-end' : 'justify-start'}`}>
      {!msg.fromSelf && (
        <div className={`w-8 h-8 rounded-full overflow-hidden mr-2 shrink-0 self-end ${S.border}`}>
          <img src={partnerImg} className="w-full h-full object-cover" alt="" />
        </div>
      )}
      <div className={`max-w-[72%] flex flex-col gap-1 ${msg.fromSelf ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl font-semibold text-sm leading-relaxed
          ${msg.fromSelf
            ? 'bg-slate-900 text-white rounded-br-sm'
            : `bg-white text-slate-900 rounded-bl-sm ${S.border} ${S.shadowSm}`}`}>
          {msg.text}
        </div>
        <span className="text-[10px] text-slate-400 font-semibold">{msg.time}</span>
      </div>
    </div>
  );
}

/* ── Proposal Card ─────────────────────────────── */
function ProposalCard({ proposal, fromSelf, partnerName }: {
  proposal: MeetingProposal; fromSelf: boolean; partnerName: string;
}) {
  const isAccepted = proposal.status === 'accepted';
  const isPending  = proposal.status === 'pending';

  return (
    <div className={`rounded-2xl overflow-hidden border-2 w-64 ${
      isAccepted ? 'border-green-500' : 'border-slate-900'
    }`}>
      {/* Header band */}
      <div className={`px-4 py-2.5 flex items-center gap-2 ${
        isAccepted ? 'bg-green-500' : 'bg-slate-900'
      }`}>
        {isAccepted
          ? <CheckCircle2 className="w-4 h-4 text-white shrink-0" strokeWidth={2.5} />
          : <CalendarPlus className="w-4 h-4 text-[#FEF08A] shrink-0" strokeWidth={2.5} />}
        <span className="font-black text-white text-xs flex-1">
          {fromSelf
            ? isAccepted ? 'Climb Confirmed' : 'Invite Sent'
            : `${partnerName} invited you to climb`}
        </span>
        {isPending && (
          <span className="bg-white/20 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">Pending</span>
        )}
      </div>
      {/* Body */}
      <div className="px-4 py-3 bg-white flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
          <span className="font-black text-slate-900 text-sm">{proposal.gym}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
          <span className="font-semibold text-slate-600 text-sm">{proposal.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
          <span className="font-semibold text-slate-600 text-sm">{proposal.slot}</span>
        </div>
        {isAccepted && (
          <div className="mt-1 pt-2 border-t border-slate-100 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" strokeWidth={2.5} />
            <span className="font-black text-green-600 text-xs">Both confirmed</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Propose Meeting Sheet ───────────────────────── */
function ProposeMeetingSheet({ partnerName, onClose, onSend }: {
  partnerName: string;
  onClose: () => void;
  onSend: (p: MeetingProposal) => void;
}) {
  const [step,   setStep]   = useState<0 | 1 | 2>(0);
  const [gymId,  setGymId]  = useState<string | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot,   setSlot]   = useState<string | null>(null);

  const selectedGym = GYMS_DATA.find(g => g.id === gymId);

  const handleSend = () => {
    if (!selectedGym || !slot) return;
    onSend({
      gym:    selectedGym.name,
      gymId:  selectedGym.id,
      date:   DAYS[dayIdx].label,
      slot,
      status: 'pending',
    });
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`w-full bg-white rounded-t-3xl ${S.border} animate-in slide-in-from-bottom-4 duration-300 max-h-[88%] flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-black text-xl text-slate-900 flex items-center gap-2"><Calendar className="w-5 h-5 text-slate-700" strokeWidth={2} /> Climb with {partnerName}</h3>
              <p className="font-semibold text-slate-400 text-xs mt-0.5">
                {['Pick a gym', 'Choose time', 'Confirm & send'][step]}
              </p>
            </div>
            <button onClick={onClose}
              className={`w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center ${S.press}`}>
              <X className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
            </button>
          </div>
          {/* Step dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-slate-900' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-8 flex flex-col gap-4">

          {/* Step 0: Pick gym */}
          {step === 0 && (
            <>
              {GYMS_DATA.map(gym => (
                <button key={gym.id} onClick={() => setGymId(gym.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${S.press}
                    ${gymId === gym.id ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`}>
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-200 shrink-0">
                    <img src={gym.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-black text-base ${gymId === gym.id ? 'text-white' : 'text-slate-900'}`}>
                      {gym.name}
                    </p>
                    <p className={`font-semibold text-xs mt-0.5 ${gymId === gym.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {gym.distance} · {gym.price}
                    </p>
                  </div>
                  {gymId === gym.id && <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0" strokeWidth={2.5} />}
                </button>
              ))}
              <button onClick={() => gymId && setStep(1)} disabled={!gymId}
                className={`w-full py-4 rounded-2xl font-black text-lg border-2 transition-all ${S.press}
                  ${gymId ? 'bg-[#FEF08A] text-slate-900 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}>
                Next →
              </button>
            </>
          )}

          {/* Step 1: Date + slot */}
          {step === 1 && (
            <>
              <p className="font-black text-slate-900 text-xs uppercase tracking-wider">Date</p>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {DAYS.map((d, i) => (
                  <button key={i} onClick={() => { setDayIdx(i); setSlot(null); }}
                    className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-2xl border-2 transition-all ${S.press}
                      ${dayIdx === i ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(20,184,166,1)]' : 'bg-white text-slate-700 border-slate-200'}`}>
                    <span className="font-bold text-[10px] uppercase tracking-wider">{d.dayName}</span>
                    <span className="font-black text-xl leading-tight">{d.dayNum}</span>
                  </button>
                ))}
              </div>

              <p className="font-black text-slate-900 text-xs uppercase tracking-wider">Time Slot</p>
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map(s => (
                  <button key={s} onClick={() => setSlot(s)}
                    className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${S.press}
                      ${slot === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'}`}>
                    {s}
                  </button>
                ))}
              </div>
              <button onClick={() => slot && setStep(2)} disabled={!slot}
                className={`w-full py-4 rounded-2xl font-black text-lg border-2 transition-all ${S.press}
                  ${slot ? 'bg-[#FEF08A] text-slate-900 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}>
                Next →
              </button>
            </>
          )}

          {/* Step 2: Confirm & send */}
          {step === 2 && selectedGym && slot && (
            <>
              <div className={`bg-[#F8FAFC] rounded-2xl p-5 ${S.border} flex flex-col gap-3`}>
                <p className="font-black text-slate-900 text-sm uppercase tracking-wider mb-1">Confirm Climb Date</p>
                <SummaryRow label="Gym"  value={selectedGym.name} />
                <SummaryRow label="Date" value={DAYS[dayIdx].label} />
                <SummaryRow label="Time" value={slot} />
                <SummaryRow label="With" value={partnerName} />
              </div>
              <div className={`bg-[#FFFBEB] rounded-2xl p-4 ${S.border}`}>
                <p className="font-semibold text-slate-600 text-xs leading-relaxed">
                  Once sent, <strong>{partnerName}</strong> will receive your climb invite. The session is confirmed when they accept.
                </p>
              </div>
              <button onClick={handleSend}
                className={`w-full py-4 rounded-2xl font-black text-xl bg-slate-900 text-white ${S.border} ${S.shadow} ${S.press}`}>
                Send Climb Invite →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">{label}</span>
      <span className="font-black text-slate-900 text-sm">{value}</span>
    </div>
  );
}
