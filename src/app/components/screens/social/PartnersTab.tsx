import React, { useState, useRef, useEffect } from 'react';
import { AlignJustify, ShieldCheck, X, Heart, CheckCircle2, CreditCard, Clock } from 'lucide-react';
import { PARTNERS_DATA, GYMS_DATA, TIME_SLOTS, MY_PREFERENCES, MY_RATINGS, CHAT_HISTORY, PARTNER_RATINGS } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { Partner, MyPreferences, ChatHistoryItem } from '../../../types';

interface PartnersTabProps {
  onNavigate: (screen: string, data?: any) => void;
  switchTab?: (tab: any) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LEVELS  = ['V0–V1', 'V1–V2', 'V2–V3', 'V3–V4', 'V4–V5', 'V5–V6', 'V6+'];
const STYLES  = ['Boulder', 'Lead', 'Top Rope'];
const AVAILS  = ['Weekday mornings', 'Weekday evenings', 'Weekend mornings', 'Weekend afternoons'];

function toggleArr(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
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

// ─── Main Component ────────────────────────────────────────────────────────────

export const PartnersTab: React.FC<PartnersTabProps> = ({ onNavigate, switchTab }) => {
  const [queue,   setQueue]   = useState<Partner[]>([...PARTNERS_DATA]);
  const [matched, setMatched] = useState<Partner | null>(null);

  // Sheets
  const [showPrefs,   setShowPrefs]   = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Local prefs state (copy from mock so user can edit)
  const [prefs, setPrefs] = useState<MyPreferences>({ ...MY_PREFERENCES });

  // Chat history with review capability
  const [history,  setHistory]  = useState<ChatHistoryItem[]>([...CHAT_HISTORY]);
  const [reviewing, setReviewing] = useState<ChatHistoryItem | null>(null);

  // Drag
  const [dragX,    setDragX]    = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const didDrag = useRef(false);

  const current = queue[0];

  const dismiss = (liked: boolean) => {
    if (!current) return;
    if (liked) setMatched(current);
    setDragX(0);
    setQueue(q => q.slice(1));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    didDrag.current = false;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 6) didDrag.current = true;
    setDragX(dx);
  };
  const onPointerUp = () => {
    setDragging(false);
    if (!didDrag.current && current) {
      setDragX(0);
      onNavigate('partnerProfile', current);
      return;
    }
    if (dragX > 80) dismiss(true);
    else if (dragX < -80) dismiss(false);
    else setDragX(0);
  };

  const rotation    = dragX * 0.06;
  const likeOpacity = Math.min(dragX / 60, 1);
  const passOpacity = Math.min(-dragX / 60, 1);

  // ── Match flow ──
  if (matched) {
    return (
      <MatchScreen
        partner={matched}
        onChat={() => { setMatched(null); onNavigate('chat', matched); }}
        onContinue={() => setMatched(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-5 pb-6 flex flex-col gap-5 animate-in fade-in duration-300">

          {/* Header */}
          <div className="flex justify-between items-center mt-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Find Partners</h1>
            <button
              onClick={() => setShowPrefs(true)}
              className={`bg-[#FFEDD5] rounded-xl px-3 py-2 font-black text-slate-900 text-xs flex items-center gap-1.5 ${S.border} ${S.shadowSm} ${S.press}`}
            >
              <span>⚙️</span> Prefs
            </button>
          </div>

          {/* Card Stack */}
          {current ? (
            <div className="relative w-full" style={{ height: 470 }}>
              {queue[1] && (
                <div className={`absolute inset-x-0 top-3 mx-2 rounded-[2.5rem] bg-white ${S.border}`} style={{ height: 440 }} />
              )}
              <div
                className={`absolute inset-0 bg-white rounded-[2.5rem] cursor-grab active:cursor-grabbing select-none ${S.border} ${S.shadow}`}
                style={{
                  transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
                  transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              >
                <div className="absolute top-6 left-6 z-10 px-3 py-1 border-[3px] border-green-500 rounded-xl rotate-[-15deg]"
                  style={{ opacity: likeOpacity }}>
                  <span className="font-black text-green-500 text-xl tracking-widest">MATCH!</span>
                </div>
                <div className="absolute top-6 right-6 z-10 px-3 py-1 border-[3px] border-red-400 rounded-xl rotate-[15deg]"
                  style={{ opacity: passOpacity }}>
                  <span className="font-black text-red-400 text-xl tracking-widest">PASS</span>
                </div>

                <div className="flex flex-col items-center pt-8 px-6 gap-3">
                  <div className={`w-24 h-24 rounded-full overflow-hidden ${S.border} shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]`}>
                    <img src={current.image} className="w-full h-full object-cover" alt={current.name} />
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-black text-2xl text-slate-900">{current.name}</span>
                      <span className="font-bold text-slate-400 text-lg">{current.age}</span>
                      {current.verified && <ShieldCheck className="w-5 h-5 text-blue-500" strokeWidth={2.5} />}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">
                        Trust: {current.trustScore}/100
                      </span>
                      {PARTNER_RATINGS[current.id] && (
                        <span className="font-bold text-slate-500 text-xs">·  Credit: {PARTNER_RATINGS[current.id].creditScore}</span>
                      )}
                    </div>
                  </div>
                  <div className={`w-full bg-[#F8FAFC] rounded-2xl p-3.5 ${S.border} ${S.shadowSm}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-black text-xs text-slate-500 uppercase tracking-wider">Level</span>
                      <span className="font-black text-slate-900">{current.level}</span>
                    </div>
                    <p className="font-semibold text-slate-700 text-sm leading-relaxed">{current.hopePartner}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 self-start bg-[#CCFBF1] px-3 py-1.5 rounded-xl ${S.border}`}>
                    <span className="text-xs">📍</span>
                    <span className="font-extrabold text-teal-800 text-xs">{current.gym}</span>
                  </div>
                  <p className="text-slate-400 font-semibold text-xs mt-1">
                    👈 Drag to pass · Tap to view profile · Drag to match 👉
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <span className="text-5xl">🎉</span>
              <p className="font-black text-slate-900 text-xl">You've seen everyone!</p>
              <p className="font-semibold text-slate-500 text-sm">Check back later for new climbers.</p>
              <button
                onClick={() => setQueue([...PARTNERS_DATA])}
                className={`bg-slate-900 text-white font-black px-6 py-3 rounded-2xl ${S.border} ${S.shadow} ${S.press}`}
              >
                Start Over
              </button>
            </div>
          )}

          {/* Action Buttons */}
          {current && (
            <div className="flex justify-center gap-6 mt-2">
              <button onClick={() => dismiss(false)}
                className={`w-16 h-16 rounded-full bg-white flex items-center justify-center ${S.border} ${S.shadow} ${S.press} hover:bg-red-50`}>
                <X className="w-7 h-7 text-red-400" strokeWidth={3} />
              </button>
              <button onClick={() => dismiss(true)}
                className={`w-16 h-16 rounded-full bg-[#FEF08A] flex items-center justify-center ${S.border} ${S.shadow} ${S.press} hover:bg-green-100`}>
                <Heart className="w-7 h-7 text-green-500 fill-green-500" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>


      {/* Floating chat history button — bottom right */}
      {(() => {
        const totalUnread = history.reduce((s, h) => s + h.unread, 0);
        return (
          <button
            onClick={() => {
              // Clear all unread immediately when opening — solves remount-reset bug
              setHistory(h => h.map(item => ({ ...item, unread: 0 })));
              setShowHistory(true);
            }}
            className={`absolute bottom-4 right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center ${S.border} ${S.shadowSm} ${S.press} hover:bg-slate-50`}
            aria-label="Chat History"
          >
            <AlignJustify className="w-5 h-5 text-slate-600" strokeWidth={2} />
            {totalUnread > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {totalUnread}
              </span>
            )}
          </button>
        );
      })()}

      {/* Overlays */}
      {showPrefs   && <PrefsSheet   prefs={prefs} setPrefs={setPrefs} onClose={() => setShowPrefs(false)} />}
      {showHistory && (
        <ChatHistorySheet
          history={history}
          onClose={() => setShowHistory(false)}
          onChat={p => {
            setShowHistory(false);
            onNavigate('chat', p);
          }}
          onReview={item => { setShowHistory(false); setReviewing(item); }}
        />
      )}
      {reviewing && (
        <ReviewSheet
          item={reviewing}
          partner={PARTNERS_DATA.find(p => p.id === reviewing.partnerId)!}
          onClose={() => setReviewing(null)}
          onSubmit={() => {
            setHistory(h => h.map(x =>
              x.partnerId === reviewing!.partnerId
                ? { ...x, sessionStatus: 'completed_reviewed' }
                : x
            ));
            setReviewing(null);
          }}
        />
      )}
    </div>
  );
};

// ─── Match Screen ───────────────────────────────────────────────────────────────

function MatchScreen({ partner, onChat, onContinue }: {
  partner: Partner; onChat: () => void; onContinue: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-900 animate-in fade-in duration-300 p-6 gap-6">
      <div className="text-center">
        <p className="text-5xl mb-3">🎉</p>
        <h2 className="text-3xl font-black text-white tracking-tight">It's a Match!</h2>
        <p className="text-slate-400 font-semibold mt-2">You and {partner.name} liked each other.</p>
      </div>
      <div className="flex gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#FEF08A] shadow-[0_0_20px_rgba(254,240,138,0.4)]">
          <img src="https://images.unsplash.com/photo-1546872041-03da29ccc3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" className="w-full h-full object-cover" alt="You" />
        </div>
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#FEF08A] shadow-[0_0_20px_rgba(254,240,138,0.4)]">
          <img src={partner.image} className="w-full h-full object-cover" alt={partner.name} />
        </div>
      </div>
      <p className="text-slate-400 font-semibold text-xs text-center px-4">
        Chat first to get to know each other. You can propose climbing session directly from the chat.
      </p>
      <button onClick={onChat}
        className={`w-full bg-[#FEF08A] text-slate-900 font-black text-lg py-4 rounded-2xl border-2 border-[#FEF08A] ${S.press}`}>
        Start Chatting 💬
      </button>
      <button onClick={onContinue} className="text-slate-500 font-bold text-sm">
        Keep Browsing
      </button>
    </div>
  );
}

// ─── Plan Together Sheet (gym → slot → pay → wait → confirmed) ────────────────

function PlanSheet({ partner, onClose, onConfirmed }: {
  partner: Partner; onClose: () => void; onConfirmed: () => void;
}) {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [gymId, setGymId]   = useState<string | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot]     = useState<string | null>(null);
  const [emmasPaid, setEmmasPaid] = useState(false);

  // Simulate partner paying 2s after Emma pays
  useEffect(() => {
    if (emmasPaid && step === 3) {
      const t = setTimeout(() => setStep(4), 2200);
      return () => clearTimeout(t);
    }
  }, [emmasPaid, step]);

  const selectedGym = GYMS_DATA.find(g => g.id === gymId);

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-slate-900/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`w-full bg-white rounded-t-3xl ${S.border} animate-in slide-in-from-bottom-4 duration-300 max-h-[92%] flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {/* Step indicator */}
        <div className="px-5 pt-5 pb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-xl text-slate-900">
              {['Pick a Gym', 'Choose Time', 'Confirm & Pay', '⏳ Waiting...', '🎉 Confirmed!'][step]}
            </h3>
            {step < 3 && (
              <button onClick={onClose} className={`w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center ${S.press}`}>
                <X className="w-4 h-4 text-slate-600" />
              </button>
            )}
          </div>
          {/* Step dots */}
          <div className="flex gap-2">
            {[0,1,2,3,4].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-slate-900' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-8 flex flex-col gap-5">

          {/* Step 0: Gym selection */}
          {step === 0 && (
            <>
              <p className="font-semibold text-slate-500 text-sm">Where do you want to climb together?</p>
              <div className="flex flex-col gap-3">
                {GYMS_DATA.map(gym => (
                  <button key={gym.id} onClick={() => setGymId(gym.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${S.press}
                      ${gymId === gym.id ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200'}`}>
                    <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-200 shrink-0">
                      <img src={gym.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-black text-base ${gymId === gym.id ? 'text-white' : 'text-slate-900'}`}>{gym.name}</p>
                      <p className={`font-semibold text-xs mt-0.5 ${gymId === gym.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {gym.distance} · {gym.price}
                      </p>
                    </div>
                    {gymId === gym.id && <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0" strokeWidth={2.5} />}
                  </button>
                ))}
              </div>
              <button onClick={() => gymId && setStep(1)} disabled={!gymId}
                className={`w-full py-4 rounded-2xl font-black text-lg border-2 border-slate-900 transition-all ${S.press}
                  ${gymId ? 'bg-[#FEF08A] text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}>
                Next: Pick Time →
              </button>
            </>
          )}

          {/* Step 1: Date + slot */}
          {step === 1 && (
            <>
              <p className="font-semibold text-slate-500 text-sm">Climbing at <strong>{selectedGym?.name}</strong></p>
              <div>
                <p className="font-black text-slate-900 mb-2 text-xs uppercase tracking-wider">Date</p>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {DAYS.map((d, i) => (
                    <button key={i} onClick={() => { setDayIdx(i); setSlot(null); }}
                      className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-2xl border-2 transition-all ${S.press}
                        ${dayIdx === i ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(20,184,166,1)]' : 'bg-white text-slate-700 border-slate-200'}`}>
                      <span className="font-bold text-[10px] uppercase tracking-wider">{d.dayName}</span>
                      <span className="font-black text-xl leading-tight">{d.dayNum}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-black text-slate-900 mb-2 text-xs uppercase tracking-wider">Time Slot</p>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map(s => (
                    <button key={s} onClick={() => setSlot(s)}
                      className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${S.press}
                        ${slot === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => slot && setStep(2)} disabled={!slot}
                className={`w-full py-4 rounded-2xl font-black text-lg border-2 border-slate-900 transition-all ${S.press}
                  ${slot ? 'bg-[#FEF08A] text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}>
                Next: Confirm →
              </button>
            </>
          )}

          {/* Step 2: Summary + payment */}
          {step === 2 && (
            <>
              <div className={`bg-[#F8FAFC] rounded-2xl p-4 ${S.border} flex flex-col gap-2`}>
                <PlanRow label="With"  value={partner.name} />
                <PlanRow label="Gym"   value={selectedGym?.name ?? ''} />
                <PlanRow label="Date"  value={`${DAYS[dayIdx].label} · ${slot}`} />
                <PlanRow label="Entry" value={selectedGym?.price ?? ''} />
              </div>
              <div className={`rounded-2xl p-4 bg-[#FFFBEB] ${S.border}`}>
                <p className="font-black text-slate-900 mb-1 text-sm">💳 Payment</p>
                <p className="font-semibold text-slate-500 text-xs leading-relaxed">
                  Both partners must pay their own entry fee. Your booking is only confirmed once both payments are received.
                </p>
              </div>
              <button onClick={() => { setEmmasPaid(true); setStep(3); }}
                className={`w-full py-4 rounded-2xl font-black text-xl ${S.border} ${S.shadow} ${S.press} bg-slate-900 text-white flex items-center justify-center gap-3`}>
                <CreditCard className="w-6 h-6" /> Pay {selectedGym?.price ?? '$25'}
              </button>
            </>
          )}

          {/* Step 3: Waiting for partner */}
          {step === 3 && (
            <div className="flex flex-col items-center gap-5 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center animate-pulse">
                <Clock className="w-8 h-8 text-amber-600" strokeWidth={2.5} />
              </div>
              <p className="font-black text-xl text-slate-900">Your payment is in 🎉</p>
              <p className="font-semibold text-slate-500 text-sm">
                Waiting for <strong>{partner.name}</strong> to confirm their payment...
              </p>
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i*0.2}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Both confirmed */}
          {step === 4 && (
            <div className="flex flex-col items-center gap-5 py-6 text-center">
              <div className={`w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center ${S.border}`}>
                <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={2.5} />
              </div>
              <p className="font-black text-2xl text-slate-900">Session Confirmed!</p>
              <p className="font-semibold text-slate-500 text-sm">
                Both you and <strong>{partner.name}</strong> have paid. See you at the wall! 🧗
              </p>
              <div className={`w-full bg-[#F8FAFC] rounded-2xl p-4 ${S.border} flex flex-col gap-2 text-left`}>
                <PlanRow label="Partner" value={partner.name} />
                <PlanRow label="Gym"     value={selectedGym?.name ?? ''} />
                <PlanRow label="When"    value={`${DAYS[dayIdx].label} · ${slot}`} />
                <PlanRow label="Status"  value="✅ Fully Confirmed" />
              </div>
              <button onClick={onConfirmed}
                className={`w-full bg-slate-900 text-white font-black py-4 rounded-2xl text-lg ${S.border} ${S.press}`}>
                Done 🎉
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Preferences Sheet ──────────────────────────────────────────────────────────

function PrefsSheet({ prefs, setPrefs, onClose }: {
  prefs: MyPreferences;
  setPrefs: React.Dispatch<React.SetStateAction<MyPreferences>>;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 bg-white animate-in slide-in-from-right duration-300 flex flex-col">
      {/* Header */}
      <div className={`px-5 pt-10 pb-4 border-b-2 border-slate-900 flex items-center gap-4 bg-white`}>
        <button onClick={onClose} className={`w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center ${S.press}`}>
          <X className="w-4 h-4 text-slate-700" strokeWidth={2.5} />
        </button>
        <h2 className="font-black text-xl text-slate-900">⚙️ Preferences</h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-5 flex flex-col gap-6 pb-10">

        {/* ── My Profile ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-teal-400 rounded-full" />
            <h3 className="font-black text-slate-900">My Profile</h3>
            <span className="text-xs font-semibold text-slate-400">(how others see you)</span>
          </div>

          {/* My level */}
          <p className="font-black text-slate-700 text-xs uppercase tracking-wider mb-2">My Level</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {LEVELS.map(l => (
              <button key={l} onClick={() => setPrefs(p => ({ ...p, myLevel: l }))}
                className={`px-3 py-1.5 rounded-full border-2 font-black text-xs transition-all ${S.press}
                  ${prefs.myLevel === l ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300'}`}>
                {l}
              </button>
            ))}
          </div>

          {/* My styles */}
          <p className="font-black text-slate-700 text-xs uppercase tracking-wider mb-2">My Climbing Styles</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {STYLES.map(s => (
              <button key={s} onClick={() => setPrefs(p => ({ ...p, myStyles: toggleArr(p.myStyles, s) }))}
                className={`px-3 py-1.5 rounded-full border-2 font-black text-xs transition-all ${S.press}
                  ${prefs.myStyles.includes(s) ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-slate-600 border-slate-300'}`}>
                {s}
              </button>
            ))}
          </div>

          {/* My availability */}
          <p className="font-black text-slate-700 text-xs uppercase tracking-wider mb-2">My Availability</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {AVAILS.map(a => (
              <button key={a} onClick={() => setPrefs(p => ({ ...p, myAvailability: toggleArr(p.myAvailability, a) }))}
                className={`px-3 py-1.5 rounded-xl border-2 font-semibold text-xs transition-all ${S.press}
                  ${prefs.myAvailability.includes(a) ? 'bg-amber-400 text-slate-900 border-amber-400' : 'bg-white text-slate-600 border-slate-300'}`}>
                {a}
              </button>
            ))}
          </div>

          {/* My stats radar */}
          <div className={`bg-[#F8FAFC] rounded-2xl p-4 ${S.border}`}>
            <p className="font-black text-slate-900 text-xs uppercase tracking-wider mb-3">📊 Your Partner Ratings</p>
            <div className="flex justify-center">
              <MyRadarChart />
            </div>
            <div className="flex justify-between mt-3">
              <div className="text-center">
                <p className="font-black text-2xl text-slate-900">{MY_RATINGS.creditScore}</p>
                <p className="font-semibold text-slate-400 text-xs">Credit Score</p>
              </div>
              <div className="text-center">
                <p className="font-black text-2xl text-slate-900">{MY_RATINGS.totalReviews}</p>
                <p className="font-semibold text-slate-400 text-xs">Reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Partner Preferences ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-orange-400 rounded-full" />
            <h3 className="font-black text-slate-900">Partner Preferences</h3>
            <span className="text-xs font-semibold text-slate-400">(who you want to climb with)</span>
          </div>

          {/* Want level */}
          <p className="font-black text-slate-700 text-xs uppercase tracking-wider mb-2">Desired Level Range</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {LEVELS.map(l => (
              <button key={l} onClick={() => setPrefs(p => ({ ...p, wantLevel: l }))}
                className={`px-3 py-1.5 rounded-full border-2 font-black text-xs transition-all ${S.press}
                  ${prefs.wantLevel === l ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300'}`}>
                {l}
              </button>
            ))}
          </div>

          {/* Want styles */}
          <p className="font-black text-slate-700 text-xs uppercase tracking-wider mb-2">Preferred Styles</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {STYLES.map(s => (
              <button key={s} onClick={() => setPrefs(p => ({ ...p, wantStyles: toggleArr(p.wantStyles, s) }))}
                className={`px-3 py-1.5 rounded-full border-2 font-black text-xs transition-all ${S.press}
                  ${prefs.wantStyles.includes(s) ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-slate-600 border-slate-300'}`}>
                {s}
              </button>
            ))}
          </div>

          {/* Want availability */}
          <p className="font-black text-slate-700 text-xs uppercase tracking-wider mb-2">Preferred Availability</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {AVAILS.map(a => (
              <button key={a} onClick={() => setPrefs(p => ({ ...p, wantAvailability: toggleArr(p.wantAvailability, a) }))}
                className={`px-3 py-1.5 rounded-xl border-2 font-semibold text-xs transition-all ${S.press}
                  ${prefs.wantAvailability.includes(a) ? 'bg-amber-400 text-slate-900 border-amber-400' : 'bg-white text-slate-600 border-slate-300'}`}>
                {a}
              </button>
            ))}
          </div>
        </section>

        <button onClick={onClose}
          className={`w-full py-4 rounded-2xl font-black text-lg bg-slate-900 text-white ${S.border} ${S.shadow} ${S.press}`}>
          Save Preferences ✓
        </button>
      </div>
    </div>
  );
}

// ─── Chat History Sheet ─────────────────────────────────────────────────────────

function ChatHistorySheet({ history, onClose, onChat, onReview }: {
  history: ChatHistoryItem[];
  onClose: () => void;
  onChat: (p: Partner) => void;
  onReview: (item: ChatHistoryItem) => void;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-end bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`w-full bg-white rounded-t-3xl ${S.border} animate-in slide-in-from-bottom-4 duration-300 max-h-[80%] flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b-2 border-slate-100 flex-shrink-0">
          <h3 className="font-black text-xl text-slate-900">💬 Chat History</h3>
          <button onClick={onClose} className={`w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center ${S.press}`}>
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 flex flex-col gap-3">
          {history.length === 0 && (
            <p className="text-center text-slate-400 font-bold py-8">No chats yet.</p>
          )}
          {history.map(item => {
            const partner = PARTNERS_DATA.find(p => p.id === item.partnerId);
            if (!partner) return null;
            return (
              <div key={item.partnerId} className={`rounded-2xl ${S.border} ${S.shadowSm} overflow-hidden bg-white`}>
                {/* Session badge */}
                {item.sessionStatus === 'upcoming' && (
                  <div className="bg-teal-50 border-b-2 border-teal-200 px-4 py-2 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-600" strokeWidth={2.5} />
                    <span className="font-black text-teal-700 text-xs">
                      Upcoming · {item.sessionDate} · {item.sessionSlot} · {item.sessionGym}
                    </span>
                  </div>
                )}
                {item.sessionStatus === 'completed_unreviewed' && (
                  <div className="bg-amber-50 border-b-2 border-amber-200 px-4 py-2 flex items-center gap-2">
                    <span className="text-amber-600 text-xs font-black">⭐ Session done! Leave a review?</span>
                    <button
                      onClick={() => onReview(item)}
                      className={`ml-auto px-3 py-1 bg-amber-400 text-slate-900 font-black text-xs rounded-lg ${S.press} border border-amber-500`}
                    >
                      Review
                    </button>
                  </div>
                )}
                {item.sessionStatus === 'completed_reviewed' && (
                  <div className="bg-green-50 border-b-2 border-green-200 px-4 py-2">
                    <span className="text-green-700 text-xs font-black">✅ Reviewed · {item.sessionDate}</span>
                  </div>
                )}
                {/* Chat row */}
                <button
                  onClick={() => onChat(partner)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className={`w-12 h-12 rounded-full overflow-hidden ${S.border} shrink-0`}>
                    <img src={partner.image} className="w-full h-full object-cover" alt={partner.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-slate-900">{partner.name}</p>
                      {partner.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" strokeWidth={2.5} />}
                    </div>
                    <p className="font-semibold text-slate-500 text-xs truncate">{item.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-xs font-semibold text-slate-400">{item.time}</span>
                    {item.unread > 0 && (
                      <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                        {item.unread}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Review Sheet ───────────────────────────────────────────────────────────────

const REVIEW_DIMS = [
  { key: 'reliability',   label: 'Reliable & On Time',  emoji: '⏰' },
  { key: 'safety',        label: 'Safety Awareness',    emoji: '🛡️' },
  { key: 'encouragement', label: 'Encouraging',         emoji: '💪' },
  { key: 'skillMatch',    label: 'Skill Level Match',   emoji: '🎯' },
  { key: 'communication', label: 'Easy to Communicate', emoji: '💬' },
] as const;

function ReviewSheet({ item, partner, onClose, onSubmit }: {
  item: ChatHistoryItem; partner: Partner;
  onClose: () => void; onSubmit: () => void;
}) {
  type Dim = typeof REVIEW_DIMS[number]['key'];
  const [scores, setScores] = useState<Record<Dim, number>>({
    reliability: 0, safety: 0, encouragement: 0, skillMatch: 0, communication: 0,
  });
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const allRated = Object.values(scores).every(s => s > 0);

  if (submitted) {
    return (
      <ReviewOverlay onClose={onSubmit}>
        <div className="flex flex-col items-center gap-4 text-center py-4">
          <div className={`w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center ${S.border}`}>
            <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={2.5} />
          </div>
          <p className="font-black text-2xl text-slate-900">Thanks for reviewing!</p>
          <p className="font-semibold text-slate-500 text-sm">Your feedback helps the community.</p>
          <button onClick={onSubmit} className={`w-full bg-slate-900 text-white font-black py-4 rounded-2xl ${S.border} ${S.press}`}>
            Done
          </button>
        </div>
      </ReviewOverlay>
    );
  }

  return (
    <ReviewOverlay onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-black text-xl text-slate-900">Rate {partner.name}</h3>
          <p className="font-semibold text-slate-400 text-xs">{item.sessionDate} · {item.sessionGym}</p>
        </div>
        <div className={`w-11 h-11 rounded-full overflow-hidden ${S.border}`}>
          <img src={partner.image} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-5">
        {REVIEW_DIMS.map(dim => (
          <div key={dim.key}>
            <div className="flex items-center gap-2 mb-2">
              <span>{dim.emoji}</span>
              <span className="font-black text-slate-900 text-sm">{dim.label}</span>
            </div>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setScores(sc => ({ ...sc, [dim.key]: s }))}
                  className={`flex-1 py-2 rounded-xl border-2 font-black text-sm transition-all ${S.press}
                    ${scores[dim.key] >= s ? 'bg-amber-400 border-amber-400 text-slate-900' : 'bg-white border-slate-200 text-slate-400'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-2xl overflow-hidden ${S.border} mb-5`}>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Leave a comment (optional)..."
          rows={3}
          className="w-full p-4 text-sm font-semibold text-slate-700 placeholder:text-slate-400 outline-none resize-none bg-[#F8FAFC]"
        />
      </div>

      <button onClick={() => allRated && setSubmitted(true)} disabled={!allRated}
        className={`w-full py-4 rounded-2xl font-black text-lg border-2 border-slate-900 transition-all ${S.press}
          ${allRated ? 'bg-[#FEF08A] text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}>
        {allRated ? 'Submit Review ✓' : 'Rate all dimensions first'}
      </button>
    </ReviewOverlay>
  );
}

function ReviewOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`w-full bg-white rounded-t-3xl p-5 pb-10 ${S.border} animate-in slide-in-from-bottom-4 duration-300 max-h-[92%] overflow-y-auto custom-scrollbar`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Radar Chart for "My Stats" in Prefs ──────────────────────────────────────

const RADAR_DIMS_PREFS = [
  { key: 'reliability'   as keyof typeof MY_RATINGS, emoji: '⏰', label: 'Reliable'   },
  { key: 'safety'        as keyof typeof MY_RATINGS, emoji: '🛡️', label: 'Safety'     },
  { key: 'encouragement' as keyof typeof MY_RATINGS, emoji: '💪', label: 'Supportive' },
  { key: 'skillMatch'    as keyof typeof MY_RATINGS, emoji: '🎯', label: 'Skill Fit'  },
  { key: 'communication' as keyof typeof MY_RATINGS, emoji: '💬', label: 'Comms'      },
];

function MyRadarChart() {
  const cx = 120, cy = 115, r = 72, n = 5;

  function pts(scale: number) {
    return Array.from({ length: n }, (_, i) => {
      const a = (2 * Math.PI * i / n) - Math.PI / 2;
      return { x: cx + r * scale * Math.cos(a), y: cy + r * scale * Math.sin(a) };
    });
  }

  const outer  = pts(1);
  const scores = RADAR_DIMS_PREFS.map(({ key }, i) => {
    const a = (2 * Math.PI * i / n) - Math.PI / 2;
    const v = (MY_RATINGS[key] as number) / 5;
    return { x: cx + r * v * Math.cos(a), y: cy + r * v * Math.sin(a) };
  });
  const labels = pts(1.42);
  const toPath = (v: {x:number;y:number}[]) =>
    v.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z';
  const anchors = ['middle', 'start', 'start', 'end', 'end'] as const;

  return (
    <svg viewBox="0 0 240 230" className="w-full max-w-[200px]">
      {[0.25,0.5,0.75,1].map(s => (
        <path key={s} d={toPath(pts(s))} fill="none" stroke="#e2e8f0"
          strokeWidth={s===1?1.5:0.8} strokeDasharray={s<1?'3,3':undefined} />
      ))}
      {outer.map((v,i) => (
        <line key={i} x1={cx} y1={cy} x2={v.x} y2={v.y} stroke="#e2e8f0" strokeWidth="0.8" />
      ))}
      <path d={toPath(scores)} fill="rgba(251,146,60,0.22)" stroke="#f97316" strokeWidth="2" />
      {scores.map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#f97316" stroke="white" strokeWidth="2" />
      ))}
      {RADAR_DIMS_PREFS.map((d,i) => (
        <text key={i} x={labels[i].x} y={labels[i].y}
          textAnchor={anchors[i]} dominantBaseline="middle"
          fontSize="9" fontWeight="700" fill="#475569">
          {d.emoji} {d.label}
        </text>
      ))}
    </svg>
  );
}

// ─── Shared small helpers ──────────────────────────────────────────────────────

function PlanRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">{label}</span>
      <span className="font-black text-slate-900 text-sm">{value}</span>
    </div>
  );
}
