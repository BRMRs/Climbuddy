import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export interface AICoachCardProps {
  switchTab: (tab: string) => void;
}

const AICoachCard: React.FC<AICoachCardProps> = ({ switchTab }) => {
  return (
    <div className="rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] bg-gradient-to-br from-indigo-500 to-purple-600 p-5 text-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-black text-lg flex items-center gap-2">
            <Bot className="w-5 h-5" strokeWidth={2} />
            Your AI Training Plan is Ready
          </p>
          <p className="text-indigo-100 text-sm mt-1">See today's personalized training tasks</p>
        </div>
        <Sparkles className="w-6 h-6 text-white/70 flex-shrink-0" strokeWidth={1.5} />
      </div>
      <button
        onClick={() => switchTab('boost')}
        className="w-full bg-white text-indigo-700 font-black py-2.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:translate-x-1 active:shadow-none text-sm"
      >
        View Plan →
      </button>
    </div>
  );
};

export default AICoachCard;
