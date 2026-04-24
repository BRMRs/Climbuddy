import React, { useState } from 'react';
import { ScreenHeader } from '../../layout/ScreenHeader';
import { S } from '../../../constants/styles';
import { GYMS_DATA } from '../../../data/mockData';
import { CheckCircle2, ClipboardList, Rocket } from 'lucide-react';

const LEVELS = ['V0–V1', 'V2–V3', 'V4–V5', 'V6+'];

interface AddPartnerScreenProps {
  onBack: () => void;
}

export const AddPartnerScreen: React.FC<AddPartnerScreenProps> = ({ onBack }) => {
  const [level, setLevel] = useState('');
  const [gym, setGym] = useState('');
  const [bio, setBio] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!level) e.level = 'Please select your level.';
    if (!gym) e.gym = 'Please select a gym.';
    if (bio.trim().length < 10) e.bio = 'Write at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] animate-in fade-in duration-300">
        <ScreenHeader title="Post Ad" onBack={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-5 text-center">
          <div className={`w-20 h-20 bg-[#D1FAE5] rounded-full flex items-center justify-center ${S.border} ${S.shadow}`}>
            <CheckCircle2 className="w-10 h-10 text-green-600" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Ad Posted!</h2>
          <p className="font-semibold text-slate-500 leading-relaxed">
            Your partner-wanted post is now live. Other climbers can see it in their feed.
          </p>
          <div className={`w-full bg-white rounded-2xl p-5 text-left ${S.border} ${S.shadowSm}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-black text-slate-900 text-lg flex items-center gap-1.5"><ClipboardList className="w-5 h-5" strokeWidth={2} /> Your Post</span>
            </div>
            <p className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-1">Level</p>
            <p className="font-black text-slate-900 mb-3">{level}</p>
            <p className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-1">Gym</p>
            <p className="font-black text-slate-900 mb-3">{gym}</p>
            <p className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-1">About Me</p>
            <p className="font-semibold text-slate-700 text-sm leading-relaxed">{bio}</p>
          </div>
          <button onClick={onBack} className={`w-full bg-slate-900 text-white font-black text-lg py-4 rounded-2xl ${S.border} ${S.shadow} ${S.press}`}>
            Back to Partners
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] animate-in slide-in-from-bottom-4 duration-300">
      <ScreenHeader title="Post a Partner Ad" onBack={onBack} />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-10">
        <div className={`bg-[#FFEDD5] rounded-3xl p-6 flex flex-col gap-6 ${S.border} ${S.shadow}`}>

          {/* Level Selector */}
          <div className="flex flex-col gap-2">
            <label className="font-black text-slate-900 text-base">My Climbing Level</label>
            <div className="grid grid-cols-2 gap-2">
              {LEVELS.map(l => (
                <button
                  key={l}
                  onClick={() => { setLevel(l); setErrors(e => ({ ...e, level: '' })); }}
                  className={`py-3 rounded-xl font-black text-sm border-2 transition-all ${S.press}
                    ${level === l
                      ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(20,184,166,1)]'
                      : 'bg-white text-slate-700 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            {errors.level && <p className="text-red-500 font-bold text-xs">{errors.level}</p>}
          </div>

          {/* Gym Selector */}
          <div className="flex flex-col gap-2">
            <label className="font-black text-slate-900 text-base">Preferred Gym</label>
            <select
              value={gym}
              onChange={e => { setGym(e.target.value); setErrors(err => ({ ...err, gym: '' })); }}
              className={S.input + ' appearance-none'}
            >
              <option value="">Choose a gym...</option>
              {GYMS_DATA.map(g => (
                <option key={g.id} value={g.name}>{g.name}</option>
              ))}
            </select>
            {errors.gym && <p className="text-red-500 font-bold text-xs">{errors.gym}</p>}
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-black text-slate-900 text-base">About You</label>
              <span className={`text-xs font-bold ${bio.length > 120 ? 'text-red-500' : 'text-slate-400'}`}>
                {bio.length}/150
              </span>
            </div>
            <textarea
              value={bio}
              onChange={e => { if (e.target.value.length <= 150) { setBio(e.target.value); setErrors(err => ({ ...err, bio: '' })); } }}
              placeholder="e.g. Weekend climber, need a patient partner who enjoys projecting V2–V3…"
              rows={4}
              className={S.input + ' resize-none'}
            />
            {errors.bio && <p className="text-red-500 font-bold text-xs">{errors.bio}</p>}
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full bg-slate-900 text-white font-black text-xl py-4 rounded-2xl border-2 border-slate-900 ${S.shadow} ${S.press} hover:bg-slate-800`}
          >
            <span className="flex items-center justify-center gap-2"><Rocket className="w-5 h-5" strokeWidth={2} /> Post to Board</span>
          </button>
        </div>
      </div>
    </div>
  );
};
