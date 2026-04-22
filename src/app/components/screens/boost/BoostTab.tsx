import React, { useState } from 'react';
import { COURSES, COACH_COURSES, GYM_COACHES } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { DailyTask, Coach } from '../../../types';

interface BoostTabProps {
  onNavigate: (screen: string, data?: unknown) => void;
  switchTab?: (tab: any) => void;
  purchasedCourseIds: string[];
  onPurchase: (courseId: string) => void;
  tasks: DailyTask[];
  onToggleTask: (taskId: string) => void;
}

export const BoostTab: React.FC<BoostTabProps> = ({ onNavigate, switchTab, purchasedCourseIds, onPurchase, tasks, onToggleTask }) => {
  const [showAllPremium, setShowAllPremium] = useState(false);
  const freeCourses = COURSES.filter(c => c.type === 'free');
  const paidCourses = COURSES.filter(c => c.type === 'paid');
  const visiblePaidCourses = showAllPremium ? paidCourses : paidCourses.slice(0, 2);
  const allCoaches = Object.values(GYM_COACHES).flat();

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
                  onClick={() => onToggleTask(task.id)}
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

      {/* AI Coach Chat */}
      <button
        onClick={() => onNavigate('aiCoachChat')}
        className="w-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-2xl p-4 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center gap-4 active:translate-y-1 active:translate-x-1 active:shadow-none"
      >
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-3xl">🤖</span>
        </div>
        <div className="flex-1 text-left">
          <p className="font-black text-white text-lg">AI Coach Chat</p>
          <p className="text-indigo-100 text-xs font-semibold">Ask anything, get climbing tips</p>
        </div>
        <span className="text-white text-2xl">→</span>
      </button>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-black text-slate-900">Free Training</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar">
          {freeCourses.map(course => (
            <button
              key={course.id}
              onClick={() => onNavigate('courseDetail', course)}
              className={`w-40 shrink-0 bg-white rounded-2xl p-3 flex flex-col gap-3 text-left ${S.border} ${S.shadowSm} ${S.press}`}
            >
              <div className="w-full h-24 rounded-xl overflow-hidden border-2 border-slate-900">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">Premium Training</h2>
          <span className="text-xs font-bold text-slate-400">{paidCourses.length} courses</span>
        </div>
        <div className="flex flex-col gap-3">
          {visiblePaidCourses.map(course => {
            const isPurchased = purchasedCourseIds.includes(course.id);
            return (
              <button
                key={course.id}
                onClick={() => onNavigate('courseDetail', course)}
                className={`w-full bg-white rounded-2xl p-3 flex items-center gap-3 text-left ${S.border} ${S.shadowSm} ${S.press}`}
              >
                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 border-slate-900">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
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
        {paidCourses.length > 2 && (
          <button
            onClick={() => setShowAllPremium(v => !v)}
            className={`w-full py-2.5 rounded-xl text-sm font-black text-slate-600 border-2 border-slate-200 bg-white ${S.press}`}
          >
            {showAllPremium ? `Show less ↑` : `Show all ${paidCourses.length} courses ↓`}
          </button>
        )}
      </div>

{/* Train with a Coach Section */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-black text-slate-900">👨‍🏫 Train with a Coach</h2>
        
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
          {allCoaches.map(coach => (
            <button
              key={coach.id}
              onClick={() => onNavigate('coachDetail', coach)}
              className="flex-shrink-0 w-28 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-2xl p-3 bg-white flex flex-col items-center gap-2 active:translate-y-1 active:translate-x-1 active:shadow-none"
            >
<div className="w-12 h-12 rounded-full border-2 border-slate-900 overflow-hidden">
                {coach.image ? (
                  <img src={coach.image} alt={coach.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-teal-100 flex items-center justify-center font-black text-teal-700 text-lg">
                    {coach.name.charAt(0)}
                  </div>
                )}
              </div>
              <p className="font-black text-slate-900 text-xs text-center">{coach.name}</p>
              <p className="text-slate-500 text-[10px] text-center leading-tight">{coach.specialty}</p>
              <div className="flex items-center gap-1">
                <span className="text-amber-500 text-xs">★</span>
                <span className="text-xs font-bold text-slate-700">{coach.rating}</span>
              </div>
              {coach.price && (
                <span className="text-[10px] font-black text-slate-900 bg-[#FEF08A] border border-slate-900 px-1.5 py-0.5 rounded-md">
                  {coach.price}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Coach Courses sub-section */}
        <h3 className="text-base font-black text-slate-700 mt-1">Coach Courses</h3>
        <div className="flex flex-col gap-3">
          {COACH_COURSES.map(cc => {
            const course = COURSES.find(c => c.id === cc.courseId);
            const coach = allCoaches.find(c => c.id === cc.coachId);
            if (!course) return null;
            return (
              <button
                key={cc.id}
                onClick={() => onNavigate('courseDetail', course)}
                className="border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-2xl p-4 bg-white flex items-center gap-3 active:translate-y-1 active:translate-x-1 active:shadow-none text-left w-full"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-900 flex-shrink-0">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-900 text-sm">{course.title}</p>
                  {coach && (
                    <span className="inline-block text-xs bg-teal-100 text-teal-700 border border-teal-300 rounded-full px-2 py-0.5 mt-1 font-bold">
                      👤 {coach.name}
                    </span>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{course.duration}</span>
                    {course.price && <span className="text-xs font-black text-amber-600">${course.price}</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
