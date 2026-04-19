import React from 'react';
import { Course } from '../../../types';
import { S } from '../../../constants/styles';

interface CourseDetailScreenProps {
  course: Course;
  onBack: () => void;
  isPurchased: boolean;
  onPurchase: (courseId: string) => void;
}

export const CourseDetailScreen: React.FC<CourseDetailScreenProps> = ({
  course,
  onBack,
  isPurchased,
  onPurchase,
}) => {
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

  const handlePurchase = () => {
    if (course.type === 'paid' && !isPurchased) {
      onPurchase(course.id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] animate-in slide-in-from-right-4 duration-300">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between bg-white border-b-2 border-slate-900 z-10">
        <button
          onClick={onBack}
          className={`px-4 py-2 bg-white rounded-xl font-black text-sm ${S.border} ${S.shadowSm} ${S.press}`}
        >
          ← Back
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-28 flex flex-col gap-6">
        <div className={`h-[200px] rounded-3xl flex items-center justify-center ${getBgColor(course.thumbnail)} ${S.border} ${S.shadow}`}>
          <span className="text-6xl">{course.thumbnail}</span>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-black text-slate-900 leading-tight">{course.title}</h1>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${S.border} bg-white text-slate-900`}>
              {course.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${S.border} bg-slate-100 text-slate-600`}>
              {course.duration}
            </span>
          </div>
          <p className="text-slate-600 font-medium leading-relaxed mt-2">
            {course.description}
          </p>
        </div>

        <div className={`h-32 bg-slate-200 rounded-2xl flex items-center justify-center ${S.border}`}>
          <span className="text-4xl text-slate-400">▶</span>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-5 bg-white border-t-2 border-slate-900 pb-10">
        {course.type === 'free' || isPurchased ? (
          <button className={`w-full py-4 rounded-xl font-black text-lg bg-teal-400 text-slate-900 ${S.border} ${S.shadow} ${S.press}`}>
            ▶ Start Course
          </button>
        ) : (
          <button
            onClick={handlePurchase}
            className={`w-full py-4 rounded-xl font-black text-lg bg-amber-400 text-slate-900 ${S.border} ${S.shadow} ${S.press}`}
          >
            🔒 Purchase for ${course.price?.toFixed(2)}
          </button>
        )}
      </div>
    </div>
  );
};
