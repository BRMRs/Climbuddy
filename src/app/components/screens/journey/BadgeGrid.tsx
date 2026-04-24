import React, { useState } from 'react';
import { S } from '../../../constants/styles';
import { Badge } from '../../../types';
import { Award, ChevronDown, ChevronUp, Mountain, CheckCircle2, Users, Flame, Star, Zap, Film, GraduationCap, Trophy, Map, PenLine, Sunrise, Lock } from 'lucide-react';

export interface BadgeGridProps {
  badges: Badge[];
  onSelectBadge?: (b: Badge) => void;
  selectedBadge?: Badge | null;
}

const INITIAL_DISPLAY_COUNT = 6;

const BADGE_ICON_MAP: Record<string, React.FC<any>> = {
  Mountain, CheckCircle2, Users, Flame, Star, Zap, Film, GraduationCap, Trophy, Map, PenLine, Sunrise,
};

export function BadgeIcon({ name, className }: { name: string; className?: string }) {
  const Icon = BADGE_ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} strokeWidth={1.75} />;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges, onSelectBadge, selectedBadge }) => {
  const [expanded, setExpanded] = useState(false);
  const unlockedCount = badges.filter(b => b.unlocked).length;
  const displayBadges = expanded ? badges : badges.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = badges.length > INITIAL_DISPLAY_COUNT;

  return (
    <div className={`bg-[#FFFBEB] rounded-3xl p-5 ${S.border} ${S.shadow}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" strokeWidth={3} />
          <h2 className="font-black text-slate-900 text-lg">Badges</h2>
        </div>
        <span className="text-xs font-bold text-slate-500">{unlockedCount}/{badges.length} Unlocked</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {displayBadges.map(b => {
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
              <BadgeIcon name={b.icon} className="w-6 h-6 text-slate-800" />
              <span className={`font-black text-[10px] text-center mt-1 leading-tight ${b.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                {b.label}
              </span>
            </button>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-4 flex items-center justify-center gap-1 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          {expanded ? (
            <>Show Less <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>Show All {badges.length} Badges <ChevronDown className="w-4 h-4" /></>
          )}
        </button>
      )}
    </div>
  );
};

export default BadgeGrid;
