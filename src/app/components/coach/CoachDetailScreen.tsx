import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Calendar, Star, MapPin, Award, CheckCircle2, X } from 'lucide-react';
import { ScreenHeader } from '../layout/ScreenHeader';
import { S } from '../../constants/styles';
import { Coach, Course } from '../../types';
import { COURSES, COACH_COURSES, GYMS_DATA, TIME_SLOTS } from '../../data/mockData';

function nowStr(): string {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getNextDays(n: number) {
  const today = new Date();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayNum: d.getDate(),
      dayName: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });
}
const DAYS = getNextDays(7);

interface CoachDetailScreenProps {
  coach: Coach;
  onBack: () => void;
  onChat: () => void;
  onBook: (coach: Coach) => void;
  onNavigate: (screen: string, data?: unknown) => void;
}

export const CoachDetailScreen: React.FC<CoachDetailScreenProps> = ({ coach, onBack, onChat, onBook, onNavigate }) => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<{gymName: string; date: string; slot: string} | null>(null);
  
  const coachCourses = COACH_COURSES
    .filter(cc => cc.coachId === coach.id)
    .map(cc => COURSES.find(c => c.id === cc.courseId))
    .filter((c): c is Course => c !== undefined);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] animate-in slide-in-from-right duration-300">
      <ScreenHeader onBack={onBack} />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="bg-gradient-to-b from-indigo-500 to-purple-600 p-5 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white flex items-center justify-center font-black text-white text-3xl">
              {coach.name.charAt(0)}
            </div>
            <div>
              <p className="font-black text-2xl">{coach.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" strokeWidth={2.5} />
                <span className="font-bold text-white">{coach.rating}</span>
              </div>
              <p className="text-indigo-100 text-sm mt-1">{coach.specialty}</p>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="px-5 -mt-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <p className="font-black text-slate-900 text-xl">{coachCourses.length}</p>
              <p className="font-bold text-slate-500 text-xs">Courses</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <p className="font-black text-slate-900 text-xl">{coach.frequentGyms.length}</p>
              <p className="font-bold text-slate-500 text-xs">Gyms</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        {coach.bio && (
          <div className="px-5 mt-4">
            <div className="bg-white rounded-2xl p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <p className="font-semibold text-slate-600 text-sm leading-relaxed">{coach.bio}</p>
            </div>
          </div>
        )}

        {/* Frequent Gyms */}
        <div className="px-5 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-slate-900" strokeWidth={2.5} />
            <h3 className="font-black text-slate-900">Frequent Gyms</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {coach.frequentGyms.map((gymId, i) => {
              const gym = GYMS_DATA.find(g => g.id === gymId);
              return (
                <div key={i} className="shrink-0 flex items-center gap-2 bg-white rounded-full px-3 py-2 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  <span className="font-bold text-xs text-slate-900">{gym?.name || gymId}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specialty Styles */}
        <div className="px-5 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-slate-900" strokeWidth={2.5} />
            <h3 className="font-black text-slate-900">Specialty Styles</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {coach.styles.map((style, i) => (
              <span key={i} className="px-3 py-1.5 bg-purple-100 text-purple-700 font-bold text-xs rounded-full border-2 border-purple-300">
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Qualifications (Radar-like chart) */}
        <div className="px-5 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-slate-900" strokeWidth={2.5} />
            <h3 className="font-black text-slate-900">Qualifications</h3>
          </div>
          {coach.qualifications?.map((q, i) => (
            <div key={i} className="flex items-center gap-3 mb-2">
              <span className="font-bold text-slate-700 w-24 text-xs">{q.label}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${q.score * 10}%` }} />
              </div>
              <span className="font-black text-slate-900 text-xs">{q.score}/10</span>
            </div>
          ))}
        </div>

        {/* Published Courses */}
        {coachCourses.length > 0 && (
          <div className="px-5 mt-4 pb-24">
            <h3 className="font-black text-slate-900 mb-3">Published Courses</h3>
            <div className="flex flex-col gap-3">
              {coachCourses.map(course => (
                <button
                  key={course.id}
                  onClick={() => onNavigate('courseDetail', course)}
                  className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 border-2 border-slate-900 flex items-center justify-center text-xl">
                    {course.thumbnail}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-black text-slate-900 text-sm">{course.title}</p>
                    <p className="font-semibold text-slate-400 text-xs">{course.duration}</p>
                  </div>
                  {course.price && (
                    <span className="font-black text-amber-600 text-sm">${course.price}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom action buttons */}
      <div className="p-4 bg-white border-t-2 border-slate-900 flex gap-3">
        <button
          onClick={onChat}
          className={`flex-1 py-4 rounded-2xl font-black text-slate-900 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] ${S.press} flex items-center justify-center gap-2`}>
          <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
          Chat
        </button>
        <button
          onClick={() => setShowBookModal(true)}
          className={`flex-1 py-4 rounded-2xl font-black text-white bg-slate-900 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] ${S.press} flex items-center justify-center gap-2`}>
          <Calendar className="w-5 h-5" strokeWidth={2.5} />
          Book Time
        </button>
      </div>

      {/* Booking Modal */}
      {showBookModal && (
        <BookingModal coach={coach} onClose={() => setShowBookModal(false)} />
      )}
    </div>
  );
};

function BookingModal({ coach, onClose }: { coach: Coach; onClose: () => void }) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [selectedGym, setSelectedGym] = useState<string | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);

  const validGyms = coach.frequentGyms.map(id => GYMS_DATA.find(g => g.id === id)).filter(Boolean);

  const handleBook = () => {
    if (!selectedGym || !slot) return;
    const gym = GYMS_DATA.find(g => g.id === selectedGym);
    if (gym) {
      setBookingInfo({
        gymName: gym.name,
        date: DAYS[dayIdx].label,
        slot: slot
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl border-t-2 border-slate-900 animate-in slide-in-from-bottom-4 duration-300 max-h-[88%] flex flex-col"
        onClick={e => e.stopPropagation()}>
        <div className="px-5 pt-5 pb-3 flex-shrink-0 flex items-center justify-between">
          <div>
            <h3 className="font-black text-xl text-slate-900">📅 Book {coach.name}</h3>
            <p className="font-semibold text-slate-400 text-xs mt-0.5">
              {step === 0 ? 'Select gym' : step === 1 ? 'Choose time' : 'Confirm'}[]
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center">
            <X className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex gap-2 px-5 mb-4">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-slate-900' : 'bg-slate-200'}`} />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-8 flex flex-col gap-4">
          {step === 0 && validGyms.length > 0 && (
            <>
              <p className="font-black text-slate-900 text-xs uppercase tracking-wider">Select a Gym</p>
              {validGyms.map(gym => gym && (
                <button key={gym.id} onClick={() => setSelectedGym(gym.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${S.press}
                    ${selectedGym === gym.id ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`}>
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-200 shrink-0">
                    <img src={gym.image} className="w-full h-full object-cover" alt={gym.name} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-black text-base ${selectedGym === gym.id ? 'text-white' : 'text-slate-900'}`}>
                      {gym.name}
                    </p>
                    <p className={`font-semibold text-xs mt-0.5 ${selectedGym === gym.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {gym.distance} · {gym.price}
                    </p>
                  </div>
                  {selectedGym === gym.id && <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0" strokeWidth={2.5} />}
                </button>
              ))}
              <button onClick={() => selectedGym && setStep(1)} disabled={!selectedGym}
                className={`w-full py-4 rounded-2xl font-black text-lg border-2 transition-all ${S.press}
                  ${selectedGym ? 'bg-[#FEF08A] text-slate-900 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}>
                Next →
              </button>
            </>
          )}

          {step === 1 && (
            <>
              <p className="font-black text-slate-900 text-xs uppercase tracking-wider">Date</p>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {DAYS.map((d, i) => (
                  <button key={i} onClick={() => { setDayIdx(i); setSlot(null); }}
                    className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-2xl border-2 transition-all ${S.press}
                      ${dayIdx === i ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(20,184,166,1)]' : 'bg-white text-slate-700 border-slate-200'}`}>
                    <span className="font-bold text-[10px] uppercase tracking-wider">{d.dayName}</span>
                    <span className="font-black text-xl leading-tight">{d.dayNum}</span>
                  </button>
                ))}
              </div>

              <p className="font-black text-slate-900 text-xs uppercase tracking-wider">Time Slot</p>
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map(s => (
                  <button key={s} onClick={() => setSlot(s)}
                    className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${S.press}
                      ${slot === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'}`}>
                    {s}
                  </button>
                ))}
              </div>
              <button onClick={() => slot && setStep(2)} disabled={!slot}
                className={`w-full py-4 rounded-2xl font-black text-lg border-2 transition-all ${S.press}
                  ${slot ? 'bg-[#FEF08A] text-slate-900 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}>
                Next →
              </button>
            </>
          )}

          {step === 2 && selectedGym && slot && (
            <>
              <div className="bg-[#F8FAFC] rounded-2xl p-5 border-2 border-slate-900 flex flex-col gap-3">
                <p className="font-black text-slate-900 text-sm uppercase tracking-wider mb-1">Confirm Booking</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">Coach</span>
                  <span className="font-black text-slate-900 text-sm">{coach.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">Gym</span>
                  <span className="font-black text-slate-900 text-sm">{GYMS_DATA.find(g => g.id === selectedGym)?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">Date</span>
                  <span className="font-black text-slate-900 text-sm">{DAYS[dayIdx].label}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">Time</span>
                  <span className="font-black text-slate-900 text-sm">{slot}</span>
                </div>
              </div>
              <button onClick={handleBook}
                className="w-full py-4 rounded-2xl font-black text-xl bg-slate-900 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                Confirm Booking
              </button>
            </>
          )}
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && bookingInfo && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] mx-5 animate-in zoom-in duration-200">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg">Booking Confirmed!</p>
                <p className="font-semibold text-slate-500 text-xs mt-1">
                  {coach.name} at {bookingInfo.gymName}
                </p>
                <p className="font-semibold text-slate-400 text-xs">
                  {bookingInfo.date} · {bookingInfo.slot}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoachDetailScreen;