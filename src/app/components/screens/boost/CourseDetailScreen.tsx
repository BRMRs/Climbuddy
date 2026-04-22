import React, { useState } from 'react';
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
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handleStartCourse = () => {
    setShowDemoModal(true);
  };

  const handlePurchaseClick = () => {
    setShowPurchaseModal(true);
  };

  const handleConfirmPurchase = () => {
    if (course.type === 'paid' && !isPurchased) {
      onPurchase(course.id);
      setShowPurchaseModal(false);
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
        <div className={`h-[200px] rounded-3xl overflow-hidden ${S.border} ${S.shadow}`}>
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
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
          <button 
            onClick={handleStartCourse}
            className={`w-full py-4 rounded-xl font-black text-lg bg-teal-400 text-slate-900 ${S.border} ${S.shadow} ${S.press}`}
          >
            ▶ Start Course
          </button>
        ) : (
          <button
            onClick={handlePurchaseClick}
            className={`w-full py-4 rounded-xl font-black text-lg bg-amber-400 text-slate-900 ${S.border} ${S.shadow} ${S.press}`}
          >
            🔒 Purchase for ${course.price?.toFixed(2)}
          </button>
        )}
      </div>

      {showDemoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6 max-w-md w-full animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-black text-slate-900 mb-3">Demo Notice</h2>
            <p className="text-slate-700 font-medium leading-relaxed mb-6">
              This is a demo application. We currently don't have proper video licensing for course content. 
              If you're willing to provide video content or licensing, please contact us!
            </p>
            <button
              onClick={() => setShowDemoModal(false)}
              className={`w-full py-3 rounded-xl font-black bg-teal-400 text-slate-900 ${S.border} ${S.shadow} ${S.press}`}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6 max-w-md w-full animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-black text-slate-900 mb-3">Unlock Course</h2>
            <p className="text-slate-700 font-medium leading-relaxed mb-2">
              <span className="font-black">{course.title}</span>
            </p>
            <p className="text-slate-600 font-medium mb-6">
              Price: <span className="text-2xl font-black text-slate-900">${course.price?.toFixed(2)}</span>
            </p>
            <p className="text-sm text-slate-500 mb-6">
              This is a demo - no actual payment required. Click confirm to unlock this course.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className={`flex-1 py-3 rounded-xl font-black bg-slate-200 text-slate-700 ${S.border} ${S.shadowSm} ${S.press}`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                className={`flex-1 py-3 rounded-xl font-black bg-amber-400 text-slate-900 ${S.border} ${S.shadow} ${S.press}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
