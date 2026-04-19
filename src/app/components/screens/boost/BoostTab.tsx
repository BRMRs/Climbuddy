import React, { useState } from 'react';
import { COURSES, DAILY_PLAN, COACH_COURSES } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { DailyTask } from '../../../types';

interface BoostTabProps {
  onNavigate: (screen: string, data?: unknown) => void;
  switchTab: (tab: string) => void;
  purchasedCourseIds: string[];
  onPurchase: (courseId: string) => void;
}

export const BoostTab: React.FC<BoostTabProps> = ({ onNavigate, switchTab, purchasedCourseIds, onPurchase }) => {
  const [tasks, setTasks] = useState<DailyTask[]>(DAILY_PLAN);
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

      {/* Today's Training Plan Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">🤖 Today's Plan</h2>
          <span className="text-sm text-slate-500">{tasks.filter(t => t.completed).length}/{tasks.length} done</span>
        </div>
        
        {/* Progress bar */}
        <div className="h-2 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all"
            style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
          />
        </div>

        {/* Task cards */}
        {tasks.map(task => {
          const isPaid = task.type === 'paid';
          const isLocked = isPaid && !purchasedCourseIds.includes(task.courseId ?? '');
          return (
            <div
              key={task.id}
              className={`border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-2xl p-4 bg-white flex items-start gap-3 ${task.completed ? 'opacity-60' : ''}`}
            >
              {/* Checkbox */}
              <button
                onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                className={`mt-0.5 w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center flex-shrink-0 ${task.completed ? 'bg-green-500' : 'bg-white'}`}
              >
                {task.completed && <span className="text-white text-xs">✓</span>}
              </button>
              
              {/* Task content — tappable area */}
              <button
                className="flex-1 text-left"
                onClick={() => {
                  if (task.courseId) onNavigate('courseDetail', [...COURSES, ...COACH_COURSES].find(c => c.id === task.courseId));
                }}
              >
                <p className={`font-bold text-slate-900 text-sm ${task.completed ? 'line-through text-slate-400' : ''}`}>
                  {isLocked && '🔒 '}{task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400">{task.duration}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${
                    task.type === 'free' ? 'bg-green-50 text-green-700 border-green-200' :
                    task.type === 'paid' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-purple-50 text-purple-700 border-purple-200'
                  }`}>
                    {task.type === 'free' ? 'FREE' : task.type === 'paid' ? 'PRO' : 'COACH'}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
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
