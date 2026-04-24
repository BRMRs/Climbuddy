import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PORTRAITS, BADGES, MY_PREFERENCES } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { Badge, SessionLog, CalendarEvent, VenueReview, CoachReview, PartnerReview } from '../../../types';
import ProfileCard from './ProfileCard';
import BadgeGrid from './BadgeGrid';
import HealthStats from './HealthStats';
import AICoachCard from './AICoachCard';
import SessionHistory from './SessionHistory';
import { CalendarSection } from './CalendarSection';
import Modal from '../../layout/Modal';

export const ProgressTab: React.FC<{
  onNavigate: (screen: string, data?: unknown) => void;
  onResetOnboarding?: () => void;
  switchTab?: (tab: any) => void;
  sessions: SessionLog[];
  calendarEvents: CalendarEvent[];
  addSession: (session: SessionLog) => void;
  addReview: (review: VenueReview) => void;
  addCoachReview?: (review: CoachReview) => void;
  addPartnerReview?: (review: PartnerReview) => void;
  markEventReviewed: (eventId: string) => void;
  userName?: string;
  onUserNameChange?: (name: string) => void;
  userPortrait?: string;
  onPortraitChange?: (url: string) => void;
}> = ({ onNavigate, switchTab, sessions, calendarEvents, addSession, addReview, addCoachReview, addPartnerReview, markEventReviewed, onResetOnboarding, userName = 'Emma', onUserNameChange, userPortrait, onPortraitChange }) => {
  const [heartRate, setHeartRate] = useState(142);
  const [badges, setBadges] = useState<Badge[]>(BADGES);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showGuideConfirm, setShowGuideConfirm] = useState(false);

  // Animated heart rate
  useEffect(() => {
    const id = setInterval(() => {
      setHeartRate(h => Math.max(128, Math.min(165, h + Math.floor(Math.random() * 9) - 4)));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const hrColor = heartRate > 155 ? 'text-red-500' : heartRate > 140 ? 'text-orange-500' : 'text-rose-500';

  // Local log modal actions use parent-provided addSession via callback
  const handleAddSession = (session: SessionLog) => {
    addSession(session);
  };

  return (
    <div className="p-5 pb-28 flex flex-col gap-5 animate-in fade-in duration-300">
      {/* My Journey Header with re-trigger button */}
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Journey</h1>
            <p className="text-slate-500 text-sm font-bold">Track your climbing progress</p>
          </div>
          {onResetOnboarding && (
            <button
              onClick={() => setShowGuideConfirm(true)}
              className={`bg-[#E0E7FF] rounded-xl px-3 py-2 font-black text-slate-900 text-xs flex items-center gap-1.5 ${S.border} ${S.shadowSm} ${S.press}`}
            >
              <span>❓</span> Guide
            </button>
          )}
        </div>
      </div>

      {/* Thin orchestrator renders sub-components */}
      {/* Profile Card */}
      <ProfileCard
        name={userName}
        portrait={userPortrait ?? PORTRAITS.emma}
        level="V2"
        progressPercent={68}
        routes={19}
        sessions={3}
        calories={580}
        styles={MY_PREFERENCES.myStyles}
        onNameChange={onUserNameChange}
        onPortraitChange={onPortraitChange}
      />

      {/* Calendar Section */}
      <CalendarSection
        calendarEvents={calendarEvents}
        addReview={addReview}
        addCoachReview={addCoachReview}
        addPartnerReview={addPartnerReview}
        markEventReviewed={markEventReviewed}
        userName={userName}
      />

      {/* Live Health Data */}
      <HealthStats heartRate={heartRate} duration={48} calories={320} hrColor={hrColor} />

      {/* AI Coach */}
      <AICoachCard switchTab={switchTab ?? (() => {})} />

      {/* Badges */}
      <BadgeGrid badges={badges} onSelectBadge={setSelectedBadge} selectedBadge={selectedBadge} />

      {/* Session History */}
      <SessionHistory sessions={sessions} addSession={handleAddSession} />

      <Modal isOpen={showGuideConfirm} onClose={() => setShowGuideConfirm(false)} title="Replay Tutorial?">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-5xl">🧗</span>
          <p className="font-semibold text-slate-600 text-sm leading-relaxed">
            This will restart the new user tutorial from the beginning. You'll be walked through all the key features of Climbuddy again.
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setShowGuideConfirm(false)}
              className={`flex-1 py-2.5 rounded-xl font-black text-sm text-slate-700 bg-slate-100 ${S.border} ${S.press}`}
            >
              Cancel
            </button>
            <button
              onClick={() => { setShowGuideConfirm(false); onResetOnboarding?.(); }}
              className={`flex-1 py-2.5 rounded-xl font-black text-sm text-white bg-slate-900 ${S.border} ${S.press}`}
            >
              Let's Go
            </button>
          </div>
        </div>
      </Modal>

      {selectedBadge && (
        <Modal isOpen={true} onClose={() => setSelectedBadge(null)} title={selectedBadge.label}>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-6xl">{selectedBadge.icon}</span>
            <h3 className="font-black text-2xl text-slate-900">{selectedBadge.label}</h3>
            <p className="font-semibold text-slate-600 text-sm">{selectedBadge.desc}</p>
            {selectedBadge.unlocked ? (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-green-600 font-black">
                  <CheckCircle2 className="w-5 h-5" />
                  Unlocked!
                </div>
                <p className="text-xs text-gray-500">Unlocked on April 19, 2026</p>
              </div>
            ) : (
              <p className="font-bold text-slate-400 text-sm">🔒 Keep climbing to unlock this badge.</p>
            )}
          </div>
        </Modal>
      )}

    </div>
  );
};

export default ProgressTab;
