import React, { useState, useEffect } from 'react';
import { TrendingUp, Settings, Heart, Sparkles, Award, Video, CheckCircle2, X } from 'lucide-react';
import { PORTRAITS, BADGES } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { Badge, SessionLog, CalendarEvent, VenueReview } from '../../../types';
import ProfileCard from './ProfileCard';
import BadgeGrid from './BadgeGrid';
import HealthStats from './HealthStats';
import AICoachCard from './AICoachCard';
import SessionHistory from './SessionHistory';
import { CalendarSection } from './CalendarSection';
import Modal from '../../layout/Modal';

export const ProgressTab: React.FC<{
  onNavigate: (screen: string, data?: unknown) => void;
  switchTab?: (tab: any) => void;
  sessions: SessionLog[];
  calendarEvents: CalendarEvent[];
  addSession: (session: SessionLog) => void;
  addReview: (review: VenueReview) => void;
  markEventReviewed: (eventId: string) => void;
}> = ({ onNavigate, switchTab, sessions, calendarEvents, addSession, addReview, markEventReviewed }) => {
  const [heartRate, setHeartRate] = useState(142);
  const [badges, setBadges] = useState<Badge[]>(BADGES);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Animated heart rate
  useEffect(() => {
    const id = setInterval(() => {
      setHeartRate(h => Math.max(128, Math.min(165, h + Math.floor(Math.random() * 9) - 4)));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const hrColor = heartRate > 155 ? 'text-red-500' : heartRate > 140 ? 'text-orange-500' : 'text-rose-500';

  const simulateUpload = () => {
    if (uploading) return;
    setUploading(true);
    setUploadProgress(0);
    const id = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) { clearInterval(id); return 100; }
        return p + Math.floor(Math.random() * 18) + 5;
      });
    }, 300);
  };

  // Local log modal actions use parent-provided addSession via callback
  const handleAddSession = (session: SessionLog) => {
    addSession(session);
  };

  return (
    <div className="p-5 pb-28 flex flex-col gap-5 animate-in fade-in duration-300">

      {/* Thin orchestrator renders sub-components */}
      {/* Profile Card */}
      <ProfileCard
        name="Emma"
        portrait={PORTRAITS.emma}
        level="V2"
        progressPercent={68}
        routes={19}
        sessions={3}
        calories={580}
      />

      {/* Live Health Data */}
      <HealthStats heartRate={heartRate} duration={48} calories={320} hrColor={hrColor} />

      {/* AI Coach */}
      <AICoachCard onUpload={() => { setShowAIModal(true); simulateUpload(); }} />

      {/* Calendar Section */}
      <CalendarSection
        calendarEvents={calendarEvents}
        addReview={addReview}
        markEventReviewed={markEventReviewed}
      />

      {/* Badges */}
      <BadgeGrid badges={badges} onSelectBadge={setSelectedBadge} selectedBadge={selectedBadge} />

      {/* Session History */}
      <SessionHistory sessions={sessions} onOpenLogModal={() => setShowLogModal(true)} />

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <Modal isOpen={true} onClose={() => setSelectedBadge(null)} title={selectedBadge.label}>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-6xl">{selectedBadge.icon}</span>
            <h3 className="font-black text-2xl text-slate-900">{selectedBadge.label}</h3>
            <p className="font-semibold text-slate-600 text-sm">{selectedBadge.desc}</p>
            {selectedBadge.unlocked
              ? <div className="flex items-center gap-2 text-green-600 font-black"><CheckCircle2 className="w-5 h-5" /> Unlocked!</div>
              : <p className="font-bold text-slate-400 text-sm">🔒 Keep climbing to unlock this badge.</p>}
          </div>
        </Modal>
      )}

      {/* Log Session Modal */}
      {showLogModal && <LogSessionModal onClose={() => setShowLogModal(false)} addSession={handleAddSession} />}

      {/* AI Upload Modal */}
  {showAIModal && (
        <Modal isOpen={true} onClose={() => { setShowAIModal(false); setUploading(false); setUploadProgress(0); }} title="AI Analysis">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600 fill-indigo-200" strokeWidth={2.5} />
              <h3 className="font-black text-xl text-slate-900">AI Analysis</h3>
            </div>
            {uploadProgress < 100 ? (
              <>
                <p className="font-semibold text-slate-500 text-sm">Uploading your video...</p>
                <div className={`w-full h-3 bg-slate-100 rounded-full overflow-hidden ${S.border}`}>
                  <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(uploadProgress, 100)}%` }} />
                </div>
                <p className="font-black text-indigo-600 text-center">{Math.min(uploadProgress, 100)}%</p>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-green-600 font-black">
                  <CheckCircle2 className="w-5 h-5" /> Analysis Complete!
                </div>
                {[
                  ['👟', 'Footwork', 'You\'re using your toes correctly on slopers. Work on smearing technique.'],
                  ['💪', 'Body Position', 'Great hip rotation on overhangs. Keep your hips close to the wall.'],
                  ['🎯', 'Next Focus', 'Try flagging on balance moves — it will help you on V3s.'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className={`bg-[#F0F9FF] rounded-2xl p-4 ${S.border} ${S.shadowSm}`}>
                    <p className="font-black text-slate-900 mb-1">{icon} {title}</p>
                    <p className="font-semibold text-slate-600 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

 

function LogSessionModal({ onClose, addSession }: { onClose: () => void; addSession?: (session: SessionLog) => void }) {
  const [routes, setRoutes] = useState('');
  const [level, setLevel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <Modal onClose={onClose}>
        <div className="flex flex-col items-center gap-4 text-center py-4">
          <span className="text-5xl">🔥</span>
          <h3 className="font-black text-2xl text-slate-900">Session Logged!</h3>
          <p className="font-semibold text-slate-500 text-sm">Keep up the great work, Emma!</p>
          <button onClick={onClose} className={`w-full bg-slate-900 text-white font-black py-3 rounded-2xl ${S.border} ${S.press}`}>
            Done
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <h3 className="font-black text-xl text-slate-900 mb-4">Log a Session</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-1.5 block">Routes Sent</label>
          <input type="number" value={routes} onChange={e => setRoutes(e.target.value)} placeholder="e.g. 8" className={S.input} />
        </div>
        <div>
          <label className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-1.5 block">Highest Level</label>
          <input type="text" value={level} onChange={e => setLevel(e.target.value)} placeholder="e.g. V2" className={S.input} />
        </div>
        <div>
          <label className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-1.5 block">Duration (mins)</label>
          <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="e.g. 60" className={S.input} />
        </div>
        <button
          onClick={() => { if (routes && level && minutes) {
            // Create a new session object and notify parent through callback
            const date = new Date().toISOString().slice(0,10);
            const newSession: SessionLog = {
              date,
              routes: Number(routes),
              level,
              duration: Number(minutes),
              heartRate: 0,
              calories: 0,
              notes: '',
            } as SessionLog;
            addSession?.(newSession);
            setSaved(true);
          }} }
          className={`w-full bg-slate-900 text-white font-black text-lg py-3.5 rounded-2xl ${S.border} ${S.press}`}
        >
          Save Session 💾
        </button>
      </div>
    </Modal>
  );
}

export default ProgressTab;
