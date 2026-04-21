import React, { useState, useEffect, useRef } from 'react';
import { S } from '../../constants/styles';

interface SpotlightTourProps {
  onComplete: () => void;
  switchTab: (tab: string) => void;
}

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const STEPS = [
  {
    target: 'bottom-nav',
    title: 'Your Navigation Hub',
    body: 'These 4 tabs are your home base. Explore gyms, find partners, boost your training, and track your journey.',
    tooltipPosition: 'above' as const,
  },
  {
    target: 'search-bar',
    title: 'Find Nearby Gyms',
    body: 'Search for climbing gyms by name or style. Filter by Beginner, Bouldering, Lead, or Near Me.',
    tooltipPosition: 'below' as const,
  },
  {
    target: 'getting-started-banner',
    title: 'New to Climbing?',
    body: 'Tap here for safety tips, gear basics, and gym etiquette. Perfect for your first session!',
    tooltipPosition: 'below' as const,
  },
  {
    target: 'tab-partners',
    title: 'Find Your Partner',
    body: 'Swipe to match with climbing partners at your level. Chat and plan sessions together!',
    tooltipPosition: 'above' as const,
  },
  {
    target: 'tab-boost',
    title: 'Level Up Your Training',
    body: 'Access AI coaching, daily training plans, and premium courses to accelerate your progress.',
    tooltipPosition: 'above' as const,
  },
];

export const SpotlightTour: React.FC<SpotlightTourProps> = ({ onComplete, switchTab }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStep = STEPS[stepIndex];

  useEffect(() => {
    switchTab('gyms');
    
    const timer = setTimeout(() => {
      calculateSpotlight();
    }, 100);
    return () => clearTimeout(timer);
  }, [stepIndex, switchTab]);

  const calculateSpotlight = () => {
    const el = document.querySelector(`[data-onboarding="${STEPS[stepIndex].target}"]`);
    const container = containerRef.current;
    if (!el || !container) return;
    
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const PADDING = 8;
    setSpotlightRect({
      top: elRect.top - containerRect.top - PADDING,
      left: elRect.left - containerRect.left - PADDING,
      width: elRect.width + PADDING * 2,
      height: elRect.height + PADDING * 2,
    });
  };

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(i => i + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/75 pointer-events-auto" />
      
      {spotlightRect && (
        <div
          className="absolute rounded-xl"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
            boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.75)',
            backgroundColor: 'transparent',
            zIndex: 61,
            pointerEvents: 'none',
          }}
        />
      )}
      
      {spotlightRect && (
        <div
          className="absolute"
          style={{
            left: Math.max(12, Math.min(spotlightRect.left, 390 - 300 - 12)),
            width: 300,
            zIndex: 62,
            pointerEvents: 'auto',
            ...(currentStep.tooltipPosition === 'above'
              ? { top: Math.max(8, spotlightRect.top - 148) }
              : { top: Math.min(spotlightRect.top + spotlightRect.height + 8, 844 - 180) }),
          }}
        >
          <div className={`bg-white rounded-2xl ${S.border} ${S.shadow} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Step {stepIndex + 1} of {STEPS.length}
              </span>
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">{currentStep.title}</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4">{currentStep.body}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={onComplete}
                className="text-slate-400 text-sm font-semibold underline"
              >
                Skip tour
              </button>
              <button
                onClick={goNext}
                className={`bg-slate-900 text-white font-black text-sm px-5 py-2.5 rounded-xl ${S.border} shadow-[2px_2px_0px_0px_rgba(20,184,166,1)] ${S.press}`}
              >
                {stepIndex < STEPS.length - 1 ? 'Next →' : 'Done! 🎉'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
