import React from 'react';
import { S } from '../../../constants/styles';
import { Badge } from '../../../types';
import { Award } from 'lucide-react';

export interface BadgeGridProps {
  badges: Badge[];
  onSelectBadge?: (b: Badge) => void;
  selectedBadge?: Badge | null;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges, onSelectBadge, selectedBadge }) => {
  return (
    <div className={`bg-[#FFFBEB] rounded-3xl p-5 ${S.border} ${S.shadow}`}>
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-amber-500" strokeWidth={3} />
        <h2 className="font-black text-slate-900 text-lg">Badges</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {badges.map(b => {
          const isSelected = selectedBadge?.id === b.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelectBadge?.(b)}
              className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${S.press}
                ${b.unlocked
                  ? 'bg-[#FEF08A] border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                  : 'bg-slate-100 border-slate-300 opacity-50 grayscale'}`}
              aria-pressed={isSelected}
            >
              <span className="text-2xl">{b.icon}</span>
              <span className={`font-black text-[10px] text-center mt-1 leading-tight ${b.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                {b.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeGrid;
