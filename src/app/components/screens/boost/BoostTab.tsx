import React from 'react';
import { COURSES } from '../../../data/mockData';
import { S } from '../../../constants/styles';

interface BoostTabProps {
  onNavigate: (screen: string, data?: unknown) => void;
  switchTab: (tab: string) => void;
  purchasedCourseIds: string[];
  onPurchase: (courseId: string) => void;
}

export const BoostTab: React.FC<BoostTabProps> = ({ onNavigate, switchTab, purchasedCourseIds, onPurchase }) => {
  const freeCourses = COURSES.filter(c => c.type === 'free');
  const paidCourses = COURSES.filter(c => c.type === 'paid');

  const getBgColor = (thumbnail: string) => {
    switch (thumbnail) {
      case '🔥': return 'bg-orange-100';
      case '🧘': return 'bg-blue-100';
      case '💨': return 'bg-sky-100';
      case '💪': return 'bg-red-100';
      case '🖐️': return 'bg-purple-100';
      case '👣': return 'bg-green-100';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="p-5 pb-28 flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Boost ⚡</h1>
        <p className="text-slate-500 text-sm -mt-1 font-bold">Your personal training hub</p>
      </div>

      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 bg-slate-50 text-center">
        <p className="text-2xl mb-1">🤖</p>
        <p className="font-black text-slate-700">Today's Training Plan</p>
        <p className="text-slate-400 text-sm font-medium">AI plan coming soon...</p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-black text-slate-900">Free Training</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar">
          {freeCourses.map(course => (
            <button
              key={course.id}
              onClick={() => onNavigate('courseDetail', course)}
              className={`w-40 shrink-0 bg-white rounded-2xl p-3 flex flex-col gap-3 text-left ${S.border} ${S.shadowSm} ${S.press}`}
            >
              <div className={`w-full h-24 rounded-xl flex items-center justify-center ${getBgColor(course.thumbnail)} ${S.border}`}>
                <span className="text-4xl">{course.thumbnail}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-black text-sm text-slate-900 leading-tight line-clamp-2">{course.title}</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-slate-500">{course.duration}</span>
                  <span className="text-[10px] font-black text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md border-2 border-teal-700">FREE</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-black text-slate-900">Premium Training</h2>
        <div className="flex flex-col gap-3">
          {paidCourses.map(course => {
            const isPurchased = purchasedCourseIds.includes(course.id);
            return (
              <button
                key={course.id}
                onClick={() => onNavigate('courseDetail', course)}
                className={`w-full bg-white rounded-2xl p-3 flex items-center gap-3 text-left ${S.border} ${S.shadowSm} ${S.press}`}
              >
                <div className={`w-16 h-16 shrink-0 rounded-xl flex items-center justify-center ${getBgColor(course.thumbnail)} ${S.border}`}>
                  <span className="text-2xl">{course.thumbnail}</span>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="font-black text-sm text-slate-900 leading-tight">{course.title}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-500">{course.category}</span>
                    <span className="text-xs font-bold text-slate-400">•</span>
                    <span className="text-xs font-bold text-slate-500">{course.duration}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900 bg-amber-100 px-2 py-0.5 rounded-md border-2 border-slate-900">
                      ${course.price?.toFixed(2)}
                    </span>
                    {isPurchased ? (
                      <span className="text-xs">✅</span>
                    ) : (
                      <span className="text-xs">🔒</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 bg-slate-50 text-center">
        <p className="text-2xl mb-1">👨‍🏫</p>
        <p className="font-black text-slate-700">Train with a Coach</p>
        <p className="text-slate-400 text-sm font-medium">Coach section coming soon...</p>
      </div>
    </div>
  );
};
