import React, { useState } from 'react';
import { ScreenHeader } from '../../layout/ScreenHeader';
import { S } from '../../../constants/styles';

const STEPS = [
  {
    icon: '🛡️',
    title: 'Safety First',
    color: 'bg-[#FEE2E2]',
    items: [
      'Always warm up for 10 mins before climbing.',
      'Learn the "falling technique" — bend your knees, roll sideways.',
      'Never climb directly above another climber.',
      'Check your harness and gear every session.',
    ],
  },
  {
    icon: '👟',
    title: 'Gear Basics',
    color: 'bg-[#FEF3C7]',
    items: [
      'Rent shoes at first — find your fit before buying.',
      'Chalk bag keeps your hands dry for better grip.',
      'Comfortable athletic clothes that allow full movement.',
      'No loose jewellery — rings can catch on holds.',
    ],
  },
  {
    icon: '🧗',
    title: 'Your First Climb',
    color: 'bg-[#D1FAE5]',
    items: [
      'Start with V0–V1 bouldering problems (colored tape = difficulty).',
      'Use your legs, not just arms — trust your feet!',
      'Read the route before you start — plan 2–3 moves ahead.',
      'It\'s OK to fall on pads. Fall safely, climb boldly.',
    ],
  },
  {
    icon: '🤝',
    title: 'Gym Etiquette',
    color: 'bg-[#E0E7FF]',
    items: [
      'Brush your holds when you\'re done.',
      'Don\'t give unsolicited beta (advice) unless asked.',
      'Rotate on popular problems — wait your turn.',
      'Cheer others on — the climbing community is welcoming!',
    ],
  },
];

interface GettingStartedScreenProps {
  onBack: () => void;
}

export const GettingStartedScreen: React.FC<GettingStartedScreenProps> = ({ onBack }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] animate-in slide-in-from-right duration-300">
      <ScreenHeader title="Getting Started" onBack={onBack} />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 flex flex-col gap-4 pb-10">
        <p className="font-semibold text-slate-600 text-sm leading-relaxed">
          Welcome to climbing, Emma! 🎉 Here's everything you need to know for your first session.
        </p>

        {STEPS.map((step, i) => (
          <div key={i} className={`rounded-2xl overflow-hidden ${S.border} ${S.shadowSm}`}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className={`w-full flex items-center gap-4 p-4 ${step.color} text-left`}
            >
              <span className="text-2xl">{step.icon}</span>
              <span className="font-black text-slate-900 text-base flex-1">{step.title}</span>
              <span className={`font-black text-slate-900 text-xl transition-transform duration-200 ${openIdx === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {openIdx === i && (
              <div className="bg-white p-4 flex flex-col gap-2 animate-in fade-in duration-200">
                {step.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-[10px] font-black">{j + 1}</span>
                    </div>
                    <p className="font-semibold text-slate-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className={`bg-slate-900 rounded-2xl p-5 text-center ${S.border} ${S.shadow}`}>
          <p className="text-2xl mb-2">🏆</p>
          <p className="font-black text-white text-base">You're ready to climb!</p>
          <p className="font-semibold text-slate-400 text-sm mt-1">Find a gym nearby and book your first session.</p>
        </div>
      </div>
    </div>
  );
};
