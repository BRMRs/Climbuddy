import { useState, useEffect } from 'react';

interface OnboardingState {
  welcomeCompleted: boolean;
  tourCompleted: boolean;
}

const STORAGE_KEY = 'climbuddy_onboarding';

function loadState(): OnboardingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<OnboardingState>;
      return {
        welcomeCompleted: parsed.welcomeCompleted === true,
        tourCompleted: parsed.tourCompleted === true,
      };
    }
  } catch {
    
  }
  return { welcomeCompleted: false, tourCompleted: false };
}

function saveState(state: OnboardingState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    
  }
}

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>(loadState);

  // Persist to localStorage on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const completeWelcome = () => {
    setState(prev => ({ ...prev, welcomeCompleted: true }));
  };

  const skipWelcome = () => {
    setState(prev => ({ ...prev, welcomeCompleted: true }));
  };

  const completeTour = () => {
    setState(prev => ({ ...prev, tourCompleted: true }));
  };

  const skipTour = () => {
    setState(prev => ({ ...prev, tourCompleted: true }));
  };

  const resetOnboarding = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      
    }
    setState({ welcomeCompleted: false, tourCompleted: false });
  };

  return {
    // Derived state
    showWelcome: !state.welcomeCompleted,
    showTour: state.welcomeCompleted && !state.tourCompleted,
    // Actions
    completeWelcome,
    skipWelcome,
    completeTour,
    skipTour,
    resetOnboarding,
  };
}
