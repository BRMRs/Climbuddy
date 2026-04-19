import React from 'react';
import { S } from '../../../constants/styles';

export interface ProfileCardProps {
  name: string;
  portrait: string;
  level: string;
  progressPercent: number;
  routes: number;
  sessions: number;
  calories: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, portrait, level, progressPercent, routes, sessions, calories }) => {
  return (
    <div className={`bg-white rounded-3xl p-5 flex flex-col gap-4 ${S.border} ${S.shadow}`}>
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-full overflow-hidden ${S.border} ${S.shadowSm}`}>
          <img src={portrait} className="w-full h-full object-cover" alt={name} />
        </div>
        <div className="flex-1">
          <p className="font-black text-2xl text-slate-900">{name}</p>
          <p className="font-bold text-slate-500 text-xs uppercase tracking-wider">Beginner · Climbing since 2024</p>
        </div>
        <div className="text-right">
          <p className="font-black text-3xl text-slate-900">{level}</p>
          <p className="font-bold text-slate-400 text-xs">Current max</p>
        </div>
      </div>

      {/* Level progress */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="font-bold text-slate-500 text-xs">Progress to V3</span>
          <span className="font-black text-slate-900 text-xs">{progressPercent}%</span>
        </div>
        <div className={`w-full h-3 bg-slate-100 rounded-full overflow-hidden ${S.border}`}>
          <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" style={{ width: `${progressPercent}%`, transition: 'width 1s ease-in-out' }} />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t-2 border-dashed border-slate-200">
        {[ [routes, 'Routes'], [sessions, 'Sessions'], [calories, 'Calories'] ].map(([val, label]) => (
          <div key={label} className="text-center">
            <p className="font-black text-xl text-slate-900">{val}</p>
            <p className="font-bold text-slate-400 text-xs">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
