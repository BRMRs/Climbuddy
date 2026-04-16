import React, { useState, useRef } from 'react';
import { MessageCircle, ShieldCheck, MapPin, Plus, X, Heart } from 'lucide-react';
import { PARTNERS_DATA } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { Partner } from '../../../types';

interface PartnersTabProps {
  onNavigate: (screen: string, data?: any) => void;
}

export const PartnersTab: React.FC<PartnersTabProps> = ({ onNavigate }) => {
  const [queue, setQueue] = useState<Partner[]>([...PARTNERS_DATA]);
  const [passed, setPassed] = useState<string[]>([]);
  const [matched, setMatched] = useState<Partner | null>(null);

  // Drag state
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const current = queue[0];

  const dismiss = (liked: boolean) => {
    if (!current) return;
    if (liked) {
      setMatched(current);
    } else {
      setPassed(p => [...p, current.id]);
    }
    setDragX(0);
    setQueue(q => q.slice(1));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragX(e.clientX - startX.current);
  };
  const onPointerUp = () => {
    setDragging(false);
    if (dragX > 80) dismiss(true);
    else if (dragX < -80) dismiss(false);
    else setDragX(0);
  };

  const rotation = dragX * 0.06;
  const likeOpacity = Math.min(dragX / 60, 1);
  const passOpacity = Math.min(-dragX / 60, 1);

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
    <div className="p-5 pb-28 flex flex-col gap-5 animate-in fade-in duration-300 relative">

      {/* Header */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Find Partners</h1>
          <MessageCircle className="w-7 h-7 text-orange-500 fill-orange-100" strokeWidth={2.5} />
        </div>
        <button className={`bg-[#FFEDD5] rounded-xl px-3 py-2 font-black text-slate-900 text-xs flex items-center gap-1.5 ${S.border} ${S.shadowSm} ${S.press}`}>
          <span>⚙️</span> Prefs
        </button>
      </div>

      {/* Card Stack */}
      {current ? (
        <div className="relative w-full" style={{ height: 420 }}>
          {/* Background card */}
          {queue[1] && (
            <div className={`absolute inset-x-0 top-3 mx-2 rounded-[2.5rem] bg-white ${S.border}`} style={{ height: 390 }} />
          )}

          {/* Main swipeable card */}
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
            {/* LIKE overlay */}
            <div className="absolute top-6 left-6 z-10 px-3 py-1 border-[3px] border-green-500 rounded-xl rotate-[-15deg]"
              style={{ opacity: likeOpacity }}>
              <span className="font-black text-green-500 text-xl tracking-widest">MATCH!</span>
            </div>
            {/* PASS overlay */}
            <div className="absolute top-6 right-6 z-10 px-3 py-1 border-[3px] border-red-400 rounded-xl rotate-[15deg]"
              style={{ opacity: passOpacity }}>
              <span className="font-black text-red-400 text-xl tracking-widest">PASS</span>
            </div>

            {/* Avatar */}
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
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">
                    Trust Score: {current.trustScore}/100
                  </span>
                </div>
              </div>

              <div className={`w-full bg-[#F8FAFC] rounded-2xl p-3.5 ${S.border} ${S.shadowSm}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-black text-xs text-slate-500 uppercase tracking-wider">Level</span>
                  <span className="font-black text-slate-900">{current.level}</span>
                </div>
                <p className="font-semibold text-slate-700 text-sm leading-relaxed">{current.hopePartner}</p>
              </div>

              <div className={`flex items-center gap-2 self-start bg-[#CCFBF1] px-3 py-1.5 rounded-xl ${S.border}`}>
                <MapPin className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                <span className="font-extrabold text-teal-800 text-xs">{current.gym}</span>
              </div>

              <p className="text-slate-400 font-semibold text-xs mt-1">👈 Drag to pass · Drag to match 👉</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <span className="text-5xl">🎉</span>
          <p className="font-black text-slate-900 text-xl">You've seen everyone!</p>
          <p className="font-semibold text-slate-500 text-sm">Check back later for new climbers.</p>
          <button onClick={() => setQueue([...PARTNERS_DATA])} className={`bg-slate-900 text-white font-black px-6 py-3 rounded-2xl ${S.border} ${S.shadow} ${S.press}`}>
            Start Over
          </button>
        </div>
      )}

      {/* Action Buttons */}
      {current && (
        <div className="flex justify-center gap-6 mt-2">
          <button
            onClick={() => dismiss(false)}
            className={`w-16 h-16 rounded-full bg-white flex items-center justify-center ${S.border} ${S.shadow} ${S.press} hover:bg-red-50`}
          >
            <X className="w-7 h-7 text-red-400" strokeWidth={3} />
          </button>
          <button
            onClick={() => dismiss(true)}
            className={`w-16 h-16 rounded-full bg-[#FEF08A] flex items-center justify-center ${S.border} ${S.shadow} ${S.press} hover:bg-green-100`}
          >
            <Heart className="w-7 h-7 text-green-500 fill-green-500" strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => onNavigate('addPartner')}
        className={`absolute bottom-6 right-5 w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center border-2 border-white ${S.shadow} ${S.press}`}
      >
        <Plus className="w-7 h-7 text-white" strokeWidth={3} />
      </button>
    </div>
  );
};

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
        <div className={`w-24 h-24 rounded-full overflow-hidden border-4 border-[#FEF08A] shadow-[0_0_20px_rgba(254,240,138,0.4)]`}>
          <img src="https://images.unsplash.com/photo-1546872041-03da29ccc3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" className="w-full h-full object-cover" alt="You" />
        </div>
        <div className={`w-24 h-24 rounded-full overflow-hidden border-4 border-[#FEF08A] shadow-[0_0_20px_rgba(254,240,138,0.4)]`}>
          <img src={partner.image} className="w-full h-full object-cover" alt={partner.name} />
        </div>
      </div>
      <button
        onClick={onChat}
        className={`w-full bg-[#FEF08A] text-slate-900 font-black text-lg py-4 rounded-2xl border-2 border-[#FEF08A] ${S.press}`}
      >
        Start Chatting 💬
      </button>
      <button onClick={onContinue} className="text-slate-400 font-bold text-sm underline">
        Keep Browsing
      </button>
    </div>
  );
}
