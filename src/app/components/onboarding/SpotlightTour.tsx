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
    target: 'tab-explore',
    title: 'Explore',
    body: 'Find climbing gyms near you.',
    tooltipPosition: 'above' as const,
    isBottomNav: true,
  },
  {
    target: 'tab-partners',
    title: 'Matches',
    body: 'Find climbing partners.',
    tooltipPosition: 'above' as const,
    isBottomNav: true,
  },
  {
    target: 'tab-boost',
    title: 'Boost',
    body: 'Training plans & skills.',
    tooltipPosition: 'above' as const,
    isBottomNav: true,
  },
  {
    target: 'tab-journey',
    title: 'Journey',
    body: 'Track your progress.',
    tooltipPosition: 'above' as const,
    isBottomNav: true,
  },
  {
    target: 'getting-started-banner',
    title: 'Getting Started',
    body: 'Learn climbing safety basics and gear essentials.',
    tooltipPosition: 'below' as const,
  },
];

const W = 390;
const H = 844;
const R = 12;

export const SpotlightTour: React.FC<SpotlightTourProps> = ({ onComplete, switchTab }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStep = STEPS[stepIndex];

  useEffect(() => {
    switchTab('gyms');
    const timer = setTimeout(() => calculateSpotlight(), 150);
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

  const getTooltipTop = () => {
    if (!spotlightRect) return 8;
    const TOOLTIP_HEIGHT = 148;
    if (currentStep.isBottomNav) {
      return Math.max(8, spotlightRect.top - TOOLTIP_HEIGHT - 38);
    }
    if (currentStep.tooltipPosition === 'above') {
      return Math.max(8, spotlightRect.top - TOOLTIP_HEIGHT);
    }
    return Math.min(spotlightRect.top + spotlightRect.height + 8, H - 180);
  };

  const clipPath = spotlightRect
    ? `M0,0 H${W} V${H} H0 Z M${spotlightRect.left + R},${spotlightRect.top} H${spotlightRect.left + spotlightRect.width - R} Q${spotlightRect.left + spotlightRect.width},${spotlightRect.top} ${spotlightRect.left + spotlightRect.width},${spotlightRect.top + R} V${spotlightRect.top + spotlightRect.height - R} Q${spotlightRect.left + spotlightRect.width},${spotlightRect.top + spotlightRect.height} ${spotlightRect.left + spotlightRect.width - R},${spotlightRect.top + spotlightRect.height} H${spotlightRect.left + R} Q${spotlightRect.left},${spotlightRect.top + spotlightRect.height} ${spotlightRect.left},${spotlightRect.top + spotlightRect.height - R} V${spotlightRect.top + R} Q${spotlightRect.left},${spotlightRect.top} ${spotlightRect.left + R},${spotlightRect.top} Z`
    : `M0,0 H${W} V${H} H0 Z`;

  return (
    <div ref={containerRef} className="absolute inset-0 z-[60] overflow-hidden">
      <svg
        className="absolute inset-0 pointer-events-none"
        width={W}
        height={H}
        style={{ zIndex: 61 }}
      >
        <path
          d={clipPath}
          fill="rgba(15, 23, 42, 0.75)"
          fillRule="evenodd"
        />
      </svg>

      {spotlightRect && (
        <div
          className="absolute"
          style={{
            left: Math.max(12, Math.min(spotlightRect.left, W - 300 - 12)),
            top: getTooltipTop(),
            width: 300,
            zIndex: 62,
            pointerEvents: 'auto',
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
