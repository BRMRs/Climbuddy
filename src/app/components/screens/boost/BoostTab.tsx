import React from 'react';
import { Zap } from 'lucide-react';

interface BoostTabProps {
  onNavigate: (screen: string, data?: unknown) => void;
  switchTab: (tab: string) => void;
  purchasedCourseIds: string[];
  onPurchase: (courseId: string) => void;
}

export const BoostTab: React.FC<BoostTabProps> = ({ onNavigate, switchTab, purchasedCourseIds, onPurchase }) => {
  return (
    <div className="p-5 pb-28 flex flex-col gap-5 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mt-3">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Boost ⚡</h1>
      </div>

      <p className="text-slate-500 text-sm">Your training center</p>

      <div className={`bg-white rounded-2xl p-5 ${'border border-slate-900 shadow'}`}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-green-600" />
          <span className="font-black text-slate-900">Boost placeholder</span>
        </div>
        <p className="text-slate-600 text-sm">This tab is a placeholder for future Boost features.</p>
        <div className="mt-3 text-xs text-slate-600">Purchased: {purchasedCourseIds.length} item{purchasedCourseIds.length !== 1 ? 's' : ''}</div>
      </div>
    </div>
  );
};
