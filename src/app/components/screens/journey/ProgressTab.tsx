import React, { useState, useEffect } from 'react';
import { TrendingUp, Settings, Heart, Sparkles, Award, Video, CheckCircle2, X } from 'lucide-react';
import { PORTRAITS, BADGES } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { Badge } from '../../../types';

const SESSIONS = [
  { date: 'Apr 14', routes: 8, level: 'V1–V2', calories: 320 },
  { date: 'Apr 10', routes: 5, level: 'V0–V1', calories: 210 },
  { date: 'Apr 7',  routes: 6, level: 'V1',    calories: 250 },
];

export const ProgressTab: React.FC<{ onNavigate: (s: string, d?: any) => void; switchTab?: (tab: any) => void; }> = ({}) => {
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

  return (
    <div className="p-5 pb-28 flex flex-col gap-5 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Journey</h1>
          <TrendingUp className="w-7 h-7 text-rose-500" strokeWidth={3} />
        </div>
        <button className={`bg-white rounded-xl p-2.5 ${S.border} ${S.shadowSm} ${S.press}`}>
          <Settings className="w-5 h-5 text-slate-700" strokeWidth={2.5} />
        </button>
      </div>

      {/* Profile Card */}
      <div className={`bg-white rounded-3xl p-5 flex flex-col gap-4 ${S.border} ${S.shadow}`}>
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full overflow-hidden ${S.border} ${S.shadowSm}`}>
            <img src={PORTRAITS.emma} className="w-full h-full object-cover" alt="Emma" />
          </div>
          <div className="flex-1">
            <p className="font-black text-2xl text-slate-900">Emma</p>
            <p className="font-bold text-slate-500 text-xs uppercase tracking-wider">Beginner · Climbing since 2024</p>
          </div>
          <div className="text-right">
            <p className="font-black text-3xl text-slate-900">V2</p>
            <p className="font-bold text-slate-400 text-xs">Current max</p>
          </div>
        </div>

        {/* Level progress */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-bold text-slate-500 text-xs">Progress to V3</span>
            <span className="font-black text-slate-900 text-xs">68%</span>
          </div>
          <div className={`w-full h-3 bg-slate-100 rounded-full overflow-hidden ${S.border}`}>
            <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" style={{ width: '68%', transition: 'width 1s ease-in-out' }} />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t-2 border-dashed border-slate-200">
          {[['19', 'Routes'], ['3', 'Sessions'], ['580', 'Calories']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="font-black text-xl text-slate-900">{val}</p>
              <p className="font-bold text-slate-400 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className={`bg-[#FFFBEB] rounded-3xl p-5 ${S.border} ${S.shadow}`}>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" strokeWidth={3} />
          <h2 className="font-black text-slate-900 text-lg">Badges</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {badges.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBadge(b)}
              className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${S.press}
                ${b.unlocked
                  ? 'bg-[#FEF08A] border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                  : 'bg-slate-100 border-slate-300 opacity-50 grayscale'}`}
            >
              <span className="text-2xl">{b.icon}</span>
              <span className={`font-black text-[10px] text-center mt-1 leading-tight ${b.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                {b.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Health Data */}
      <div className={`bg-white rounded-3xl p-5 ${S.border} ${S.shadow}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className={`w-5 h-5 ${hrColor} fill-current`} strokeWidth={2.5} />
            <h2 className="font-black text-slate-900 text-lg">Live Stats</h2>
          </div>
          <span className="text-xs font-bold text-slate-500 px-2 py-1 border-2 border-slate-900 rounded-full">⌚ Watch</span>
        </div>
        <div className="flex justify-around">
          <div className="text-center">
            <p className={`font-black text-4xl ${hrColor}`}>{heartRate}</p>
            <p className="font-bold text-slate-400 text-xs mt-1">BPM</p>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="text-center">
            <p className="font-black text-4xl text-orange-500">320</p>
            <p className="font-bold text-slate-400 text-xs mt-1">Cal</p>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="text-center">
            <p className="font-black text-4xl text-indigo-500">48</p>
            <p className="font-bold text-slate-400 text-xs mt-1">Min</p>
          </div>
        </div>
      </div>

      {/* AI Coach */}
      <div className={`bg-[#EEF2FF] rounded-3xl p-5 ${S.border} ${S.shadow}`}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-indigo-600 fill-indigo-200" strokeWidth={2.5} />
          <h2 className="font-black text-slate-900 text-lg">AI Coach</h2>
        </div>
        <p className="font-semibold text-slate-600 text-sm mb-3 leading-relaxed">
          Plateauing on V2s? Upload your climbing video for professional technique feedback.
        </p>
        <button
          onClick={() => { setShowAIModal(true); simulateUpload(); }}
          className={`w-full bg-white py-3 rounded-xl font-black text-indigo-700 flex items-center justify-center gap-2 ${S.border} ${S.shadowSm} ${S.press}`}
        >
          <Video className="w-5 h-5" strokeWidth={3} /> Upload Route Video
        </button>
      </div>

      {/* Session History */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-black text-lg text-slate-900">Recent Sessions</h2>
          <button
            onClick={() => setShowLogModal(true)}
            className={`text-xs font-black px-3 py-2 bg-slate-900 text-white rounded-xl ${S.border} ${S.shadowSm} ${S.press}`}
          >
            + Log Session
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {SESSIONS.map((s, i) => (
            <div key={i} className={`flex items-center justify-between bg-white p-4 rounded-2xl ${S.border} ${S.shadowSm}`}>
              <div>
                <p className="font-black text-slate-900">{s.date}</p>
                <p className="font-semibold text-slate-500 text-xs">{s.level} · {s.routes} routes</p>
              </div>
              <div className="text-right">
                <p className="font-black text-orange-500">{s.calories} cal</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <Modal onClose={() => setSelectedBadge(null)}>
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
      {showLogModal && <LogSessionModal onClose={() => setShowLogModal(false)} />}

      {/* AI Upload Modal */}
      {showAIModal && (
        <Modal onClose={() => { setShowAIModal(false); setUploading(false); setUploadProgress(0); }}>
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

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`w-full max-w-[390px] bg-white rounded-t-3xl p-6 ${S.border} animate-in slide-in-from-bottom-4 duration-300`}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-slate-400" />
        </button>
        {children}
      </div>
    </div>
  );
}

function LogSessionModal({ onClose }: { onClose: () => void }) {
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
          onClick={() => { if (routes && level && minutes) setSaved(true); }}
          className={`w-full bg-slate-900 text-white font-black text-lg py-3.5 rounded-2xl ${S.border} ${S.press}`}
        >
          Save Session 💾
        </button>
      </div>
    </Modal>
  );
}
