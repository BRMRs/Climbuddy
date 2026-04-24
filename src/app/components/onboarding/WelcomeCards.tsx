import React, { useState } from 'react';
import { S } from '../../constants/styles';
import { ArrowLeft, ArrowRight, Mountain, MapPin, Zap, Rocket } from 'lucide-react';

interface WelcomeCardsProps {
  onComplete: () => void;
  onGettingStarted: () => void;
}

const PAGES = [
  {
    bg: 'bg-white',
    Icon: Mountain,
    iconColor: 'text-teal-600',
    title: 'Welcome to Climbuddy',
    subtitle: 'Your complete climbing companion.',
    body: 'Find nearby gyms, match with climbing partners, follow AI training plans, and track every step of your journey.',
  },
  {
    bg: 'bg-[#E0E7FF]',
    Icon: MapPin,
    iconColor: 'text-indigo-600',
    title: 'Discover & Connect',
    subtitle: 'Find gyms and partners near you.',
    body: 'Browse verified climbing gyms, filter by style or skill level, and match with climbing partners who share your vibe.',
  },
  {
    bg: 'bg-[#FEF3C7]',
    Icon: Zap,
    iconColor: 'text-amber-500',
    title: 'Train & Grow',
    subtitle: 'AI coaching meets personal tracking.',
    body: 'Get daily training plans from your AI coach, unlock premium courses, and watch your journey unfold session by session.',
  },
  {
    bg: 'bg-slate-900',
    Icon: Rocket,
    iconColor: 'text-white',
    title: 'Ready to Start?',
    subtitle: '',
    body: 'Your climbing adventure begins now.',
  },
];

export const WelcomeCards: React.FC<WelcomeCardsProps> = ({ onComplete, onGettingStarted }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const isLast = pageIndex === 3;

  const goNext = () => setPageIndex(i => Math.min(i + 1, 3));
  const goPrev = () => setPageIndex(i => Math.max(i - 1, 0));

  const currentPage = PAGES[pageIndex];

  return (
    <div className="absolute inset-0 z-[60] flex flex-col">
      {!isLast && (
        <button 
          onClick={onComplete} 
          className={`absolute top-10 right-5 z-10 font-black text-slate-900 text-sm px-4 py-2 bg-white rounded-full ${S.border} ${S.shadowSm} ${S.press}`}
        >
          Skip
        </button>
      )}

      <div className={`flex-1 flex flex-col items-center justify-center px-8 gap-6 transition-colors duration-300 ${currentPage.bg}`}>
        <div className="animate-in fade-in duration-300 flex flex-col items-center text-center" key={pageIndex}>
          <div className="mb-4 w-24 h-24 flex items-center justify-center">
            <currentPage.Icon className={`w-20 h-20 ${currentPage.iconColor}`} strokeWidth={1.25} />
          </div>
          <h1 className={`text-3xl font-black mb-2 ${isLast ? 'text-white' : 'text-slate-900'}`}>
            {currentPage.title}
          </h1>
          {currentPage.subtitle && (
            <p className={`font-semibold text-lg mb-3 ${isLast ? 'text-slate-300' : 'text-slate-600'}`}>
              {currentPage.subtitle}
            </p>
          )}
          <p className={`text-sm leading-relaxed font-medium ${isLast ? 'text-slate-400' : 'text-slate-500'}`}>
            {currentPage.body}
          </p>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 px-6 py-5 flex items-center justify-between border-t-2 transition-colors duration-300 ${isLast ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-900'}`}>
        
        {!isLast ? (
          <>
            <button 
              onClick={goPrev}
              disabled={pageIndex === 0}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${S.border} transition-all ${pageIndex === 0 ? 'opacity-50 cursor-not-allowed bg-slate-100' : `bg-white ${S.shadow} ${S.press}`}`}
            >
              <ArrowLeft className="w-6 h-6 text-slate-900" strokeWidth={3} />
            </button>

            <div className="flex items-center gap-2">
              {PAGES.map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-full transition-all duration-300 ${i === pageIndex ? 'w-3 h-3 bg-slate-900' : 'w-2 h-2 bg-slate-300'}`}
                />
              ))}
            </div>

            <button 
              onClick={goNext}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${S.border} bg-[#FEF08A] transition-all ${S.shadow} ${S.press}`}
            >
              <ArrowRight className="w-6 h-6 text-slate-900" strokeWidth={3} />
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center gap-4 animate-in fade-in duration-300">
            <button 
              onClick={onComplete}
              className={`w-full py-4 bg-[#FEF08A] text-slate-900 font-black text-xl rounded-2xl border-2 border-[#FEF08A] ${S.shadow} ${S.press}`}
            >
              Let's Go!
            </button>
            <button 
              onClick={onGettingStarted}
              className="text-slate-400 text-sm underline font-semibold hover:text-slate-300 transition-colors"
            >
              First, check out climbing basics →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
