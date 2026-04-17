import React, { useState, useRef } from 'react';
import { ScreenHeader } from '../../layout/ScreenHeader';
import { S } from '../../../constants/styles';
import { CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    icon: '🛡️',
    title: 'Safety First',
    color: 'bg-[#FEE2E2]',
    items: [
      'Always warm up for at least 10 minutes — stretch fingers, wrists, and shoulders.',
      'Learn the falling technique: bend your knees, tuck your chin, and roll sideways.',
      'Never climb directly above another climber — falling can cause serious injury.',
      'Check your harness, knot, and belay device every single session.',
    ],
  },
  {
    icon: '👟',
    title: 'Gear Basics',
    color: 'bg-[#FEF3C7]',
    items: [
      'Rent shoes for your first few sessions before buying your own pair.',
      'A chalk bag keeps your hands dry and improves grip on harder holds.',
      'Wear close-fitting athletic clothes that allow a full range of motion.',
      'Remove all jewellery before climbing — rings can catch on holds and cause injury.',
    ],
  },
  {
    icon: '🧗',
    title: 'Your First Climb',
    color: 'bg-[#D1FAE5]',
    items: [
      'Start with V0–V1 bouldering problems. Colored tape marks the holds for each route.',
      'Trust your feet! New climbers over-rely on arms and burn out fast. Legs are stronger.',
      'Read the route before you start — look for rest positions and plan 2–3 moves ahead.',
      'It\'s OK to fall on crash pads — that\'s what they\'re for. Fall safely, climb boldly.',
    ],
  },
  {
    icon: '🤝',
    title: 'Gym Etiquette',
    color: 'bg-[#E0E7FF]',
    items: [
      'Brush your holds after you\'re done — chalk buildup makes holds slippery for others.',
      'Don\'t give unsolicited beta (tips) unless someone explicitly asks.',
      'Rotate on popular problems — step off the wall between attempts.',
      'Cheer others on — the climbing community is one of the most welcoming in sport!',
    ],
  },
];

interface GettingStartedScreenProps {
  onBack: () => void;
}

export const GettingStartedScreen: React.FC<GettingStartedScreenProps> = ({ onBack }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [readSet, setReadSet] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const allRead = readSet.size >= STEPS.length;

  const toggle = (i: number) => {
    const opening = openIdx !== i;
    setOpenIdx(opening ? i : null);
    if (opening) {
      setReadSet(prev => new Set([...prev, i]));
      setTimeout(() => {
        const el = itemRefs.current[i];
        if (el && scrollRef.current) {
          scrollRef.current.scrollTo({ top: el.offsetTop - 12, behavior: 'smooth' });
        }
      }, 40);
    }
  };

  if (done) return <ReadyScreen onBack={onBack} />;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] animate-in slide-in-from-right duration-300">
      <ScreenHeader title="Getting Started" onBack={onBack} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar px-5 pt-4 pb-12 flex flex-col gap-5">

        <p className="font-semibold text-slate-600 text-sm leading-relaxed">
          Welcome to climbing, Emma! 🎉 Open every section below before your first session.
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          {STEPS.map((_, i) => (
            <div key={i} className="flex-1 h-2.5 rounded-full border-2 border-slate-900 overflow-hidden">
              <div className={`h-full transition-all duration-300 ${readSet.has(i) ? 'w-full bg-slate-900' : 'w-0'}`} />
            </div>
          ))}
          <span className="text-xs font-black text-slate-500 ml-1 shrink-0">{readSet.size}/{STEPS.length}</span>
        </div>

        {/* Accordion */}
        {STEPS.map((step, i) => (
          <div
            key={i}
            ref={el => { itemRefs.current[i] = el; }}
            className={`${S.border} ${S.shadow} rounded-2xl`}
          >
            {/* Tab header */}
            <button
              onClick={() => toggle(i)}
              className={`w-full flex items-center gap-4 px-5 py-5 ${step.color} text-left
                ${openIdx === i ? 'rounded-t-2xl' : 'rounded-2xl'}`}
            >
              <span className="text-3xl shrink-0">{step.icon}</span>
              <span className="font-black text-slate-900 text-[17px] flex-1 leading-snug">{step.title}</span>
              <div className="flex items-center gap-2 shrink-0">
                {readSet.has(i) && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                )}
                <span className={`font-black text-slate-700 text-2xl w-6 text-center leading-none transition-transform duration-200 inline-block
                  ${openIdx === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </div>
            </button>

            {/* Expanded body — NO overflow-hidden so all items are visible */}
            {openIdx === i && (
              <div className="bg-white px-5 pt-6 pb-7 rounded-b-2xl border-t-2 border-slate-900 flex flex-col gap-6">
                {step.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.color} ${S.border}`}>
                      <span className="text-slate-900 font-black text-sm">{j + 1}</span>
                    </div>
                    <p className="font-medium text-slate-700 text-[15px] leading-[1.75] flex-1 pt-0.5">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Confirm button */}
        <button
          onClick={() => allRead && setDone(true)}
          disabled={!allRead}
          className={`w-full py-4 rounded-2xl font-black text-xl border-2 border-slate-900 transition-all duration-300 ${S.press}
            ${allRead
              ? 'bg-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(20,184,166,1)]'
              : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}
        >
          {allRead ? "I'm Ready! ✅" : `Open all ${STEPS.length} sections to continue`}
        </button>
      </div>
    </div>
  );
};

/* ── Ready Screen ─────────────────────────────── */
function ReadyScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-900 animate-in fade-in duration-500 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-0 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-7 relative">

        {/* Trophy */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-[#FEF08A] flex items-center justify-center shadow-[0_0_50px_rgba(254,240,138,0.45)] border-4 border-[#FEF08A]">
            <span className="text-7xl select-none">🏆</span>
          </div>
          <div className="absolute -top-2 -right-2 w-9 h-9 bg-teal-400 rounded-full border-2 border-slate-900 flex items-center justify-center shadow-lg">
            <span className="text-base">✨</span>
          </div>
          <div className="absolute -bottom-1 -left-3 w-7 h-7 bg-rose-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
            <span className="text-xs">🔥</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-[2.6rem] font-black text-white leading-tight tracking-tight">
            You're Ready<br />to Climb!
          </h1>
          <p className="text-slate-400 font-semibold mt-3 text-sm leading-relaxed">
            You've completed the Getting Started guide.<br />
            The wall is waiting for you, Emma. 🧗
          </p>
        </div>

        {/* Achievements */}
        <div className="flex flex-col gap-2.5 w-full">
          {[
            ['🛡️', 'Safety certified'],
            ['👟', 'Gear knowledge unlocked'],
            ['🧗', 'First climb ready'],
            ['🤝', 'Community member'],
          ].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 border border-white/20 backdrop-blur-sm">
              <span className="text-xl">{icon}</span>
              <span className="font-bold text-white text-sm flex-1">{label}</span>
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" strokeWidth={2.5} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onBack}
          className={`w-full py-4 bg-[#FEF08A] text-slate-900 font-black text-xl rounded-2xl border-2 border-[#FEF08A] shadow-[0_0_24px_rgba(254,240,138,0.3)] ${S.press}`}
        >
          Find a Gym Nearby →
        </button>
        <button onClick={onBack} className="text-slate-500 font-semibold text-sm underline -mt-3">
          Back to Explore
        </button>
      </div>
    </div>
  );
}
