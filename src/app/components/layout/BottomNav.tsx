import React from 'react';
import { Triangle, MessageCircle, TrendingUp, Zap } from 'lucide-react';
import { TabType } from '../../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="h-[96px] bg-white border-t-[3px] border-slate-900 shrink-0 flex justify-around items-center px-4 z-30 pb-6 pt-2">
      <button 
        onClick={() => setActiveTab('gyms')} 
        className="flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95 gap-1 flex-1"
        data-tab="gyms"
      >
        <Triangle className={`w-7 h-7 transition-colors ${activeTab === 'gyms' ? 'text-teal-600 fill-teal-600' : 'text-slate-400'}`} strokeWidth={activeTab === 'gyms' ? 3 : 2.5} fill={activeTab === 'gyms' ? 'currentColor' : 'none'} />
        <span className={`text-[10px] font-black uppercase tracking-wider ${activeTab === 'gyms' ? 'text-slate-900' : 'text-slate-400'}`}>Explore</span>
      </button>
      <button 
        onClick={() => setActiveTab('partners')} 
        className="flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95 gap-1 flex-1"
        data-tab="partners"
      >
        <MessageCircle className={`w-7 h-7 transition-colors ${activeTab === 'partners' ? 'text-orange-500 fill-orange-500' : 'text-slate-400'}`} strokeWidth={activeTab === 'partners' ? 3 : 2.5} fill={activeTab === 'partners' ? 'currentColor' : 'none'} />
        <span className={`text-[10px] font-black uppercase tracking-wider ${activeTab === 'partners' ? 'text-slate-900' : 'text-slate-400'}`}>Matches</span>
      </button>
      <button 
        onClick={() => setActiveTab('boost')} 
        className="flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95 gap-1 flex-1" 
        data-tab="boost"
      >
        <Zap className={`w-7 h-7 transition-colors ${activeTab === 'boost' ? 'text-green-600 fill-green-600' : 'text-slate-400'}`} strokeWidth={activeTab === 'boost' ? 3 : 2.5} fill={activeTab === 'boost' ? 'currentColor' : 'none'} />
        <span className={`text-[10px] font-black uppercase tracking-wider ${activeTab === 'boost' ? 'text-slate-900' : 'text-slate-400'}`}>Boost</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('progress')} 
        className="flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95 gap-1 flex-1"
        data-tab="progress"
      >
        <TrendingUp className={`w-7 h-7 transition-colors ${activeTab === 'progress' ? 'text-rose-500' : 'text-slate-400'}`} strokeWidth={activeTab === 'progress' ? 3 : 2.5} />
        <span className={`text-[10px] font-black uppercase tracking-wider ${activeTab === 'progress' ? 'text-slate-900' : 'text-slate-400'}`}>Journey</span>
      </button>
    </div>
  );
};
