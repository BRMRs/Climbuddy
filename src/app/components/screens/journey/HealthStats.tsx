import React from 'react';
import { Heart } from 'lucide-react';
import { S } from '../../../constants/styles';

export interface HealthStatsProps {
  heartRate: number;
  duration: number; // minutes
  calories: number;
  hrColor?: string;
}

const HealthStats: React.FC<HealthStatsProps> = ({ heartRate, duration, calories, hrColor = 'text-rose-500' }) => {
  return (
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
          <p className="font-black text-4xl text-orange-500">{calories}</p>
          <p className="font-bold text-slate-400 text-xs mt-1">Cal</p>
        </div>
        <div className="w-px bg-slate-200" />
        <div className="text-center">
          <p className="font-black text-4xl text-indigo-500">{duration}</p>
          <p className="font-bold text-slate-400 text-xs mt-1">Min</p>
        </div>
      </div>
    </div>
  );
};

export default HealthStats;
