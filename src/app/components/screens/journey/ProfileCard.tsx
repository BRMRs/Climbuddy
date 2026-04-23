import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';
import { S } from '../../../constants/styles';

export interface ProfileCardProps {
  name: string;
  portrait: string;
  level: string;
  progressPercent: number;
  routes: number;
  sessions: number;
  calories: number;
  onNameChange?: (name: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, portrait, level, progressPercent, routes, sessions, calories, onNameChange }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    setDraft(name);
  }, [name]);

  const confirm = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== name) {
      onNameChange?.(trimmed);
    } else {
      setDraft(name);
    }
    setEditing(false);
  };

  return (
    <div className={`bg-white rounded-3xl p-5 flex flex-col gap-4 ${S.border} ${S.shadow}`}>
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-full overflow-hidden ${S.border} ${S.shadowSm}`}>
          <img src={portrait} className="w-full h-full object-cover" alt={name} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {editing ? (
              <input
                ref={inputRef}
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') confirm(); if (e.key === 'Escape') { setDraft(name); setEditing(false); } }}
                className="font-black text-2xl text-slate-900 bg-transparent border-b-2 border-slate-900 outline-none w-full leading-tight"
                maxLength={20}
              />
            ) : (
              <p className="font-black text-2xl text-slate-900 truncate">{name}</p>
            )}
            {onNameChange && (
              editing ? (
                <button
                  onClick={confirm}
                  className={`shrink-0 w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center ${S.press}`}
                >
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className={`shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center ${S.press}`}
                >
                  <Pencil className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
                </button>
              )
            )}
          </div>
          <p className="font-bold text-slate-500 text-xs uppercase tracking-wider">Beginner · Climbing since 2024</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-black text-3xl text-slate-900">{level}</p>
          <p className="font-bold text-slate-400 text-xs">Current max</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="font-bold text-slate-500 text-xs">Progress to V3</span>
          <span className="font-black text-slate-900 text-xs">{progressPercent}%</span>
        </div>
        <div className={`w-full h-3 bg-slate-100 rounded-full overflow-hidden ${S.border}`}>
          <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" style={{ width: `${progressPercent}%`, transition: 'width 1s ease-in-out' }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1 border-t-2 border-dashed border-slate-200">
        {[ [routes, 'Routes'], [sessions, 'Sessions'], [calories, 'Calories'] ].map(([val, label]) => (
          <div key={label as string} className="text-center">
            <p className="font-black text-xl text-slate-900">{val}</p>
            <p className="font-bold text-slate-400 text-xs">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
