import React, { useState } from 'react';
import { CalendarEvent, VenueReview } from '../../../types';
import { S } from '../../../constants/styles';
import { GYMS_DATA } from '../../../data/mockData';
import Modal from '../../layout/Modal';

interface CalendarSectionProps {
  calendarEvents: CalendarEvent[];
  onWriteReview?: (event: CalendarEvent) => void;
  addReview?: (review: VenueReview) => void;
  markEventReviewed?: (eventId: string) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  calendarEvents,
  onWriteReview,
  addReview,
  markEventReviewed,
}) => {
  // Default to April 2026 for testing since mock data is in April
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); 
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [reviewingEvent, setReviewingEvent] = useState<CalendarEvent | null>(null);
  const [ratings, setRatings] = useState({ environment: 0, routeDesign: 0, equipment: 0, value: 0 });
  const [reviewText, setReviewText] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay(); // 0=Sun

  const today = new Date();
  const isToday = (day: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthShort = monthNames[month];

  const eventsForDay = (day: number) => {
    const dateStr = `${monthShort} ${day}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDay }, (_, i) => i);

  const getGymName = (event: CalendarEvent) => {
    if (event.gymName) return event.gymName;
    if (event.gymId) {
      const gym = GYMS_DATA.find(g => g.id === event.gymId);
      return gym ? gym.name : event.gymId;
    }
    return 'Unknown Gym';
  };

  const closeReviewModal = () => {
    setReviewingEvent(null);
    setRatings({ environment: 0, routeDesign: 0, equipment: 0, value: 0 });
    setReviewText('');
  };

  const submitReview = () => {
    if (!reviewingEvent || ratings.environment === 0) return;

    const newReview: VenueReview = {
      id: `vr-${Date.now()}`,
      gymId: reviewingEvent.gymId ?? '',
      authorName: 'Emma',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      environment: ratings.environment,
      routeDesign: ratings.routeDesign || ratings.environment,
      equipment: ratings.equipment || ratings.environment,
      value: ratings.value || ratings.environment,
      text: reviewText || undefined,
    };

    addReview?.(newReview);
    markEventReviewed?.(reviewingEvent.id);
    closeReviewModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={`bg-white rounded-2xl p-4 ${S.border} ${S.shadow}`}>
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))} 
            className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-50 font-bold ${S.border} ${S.press}`}
          >
            ◀
          </button>
          <h3 className="text-lg font-black">{monthNames[month]} {year}</h3>
          <button 
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))} 
            className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-50 font-bold ${S.border} ${S.press}`}
          >
            ▶
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center text-xs font-bold text-slate-400">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {blanks.map(b => (
            <div key={`blank-${b}`} className="w-8 h-8" />
          ))}
          {days.map(day => {
            const dayEvents = eventsForDay(day);
            const isSelected = selectedDay === day;
            const todayClass = isToday(day) ? 'ring-2 ring-slate-900 bg-slate-900 text-white' : '';
            const selectedClass = isSelected && !isToday(day) ? 'bg-slate-100' : '';
            const normalClass = !isToday(day) && !isSelected ? 'hover:bg-slate-50 cursor-pointer' : 'cursor-pointer';

            return (
              <div 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className="flex flex-col items-center justify-start h-10"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${todayClass} ${selectedClass} ${normalClass}`}>
                  {day}
                </div>
                <div className="flex gap-0.5 justify-center mt-0.5 h-1.5">
                  {dayEvents.map((e, i) => {
                    if (i > 2) return null; // Max 3 dots
                    let dotColor = 'bg-slate-400';
                    if (e.type === 'booking') dotColor = 'bg-teal-500';
                    if (e.type === 'social') dotColor = 'bg-orange-500';
                    return <div key={i} className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <h4 className="font-black text-slate-900 px-1">Events for {monthNames[month]} {selectedDay}</h4>
          {eventsForDay(selectedDay).length > 0 ? (
            eventsForDay(selectedDay).map(event => (
              <div key={event.id} className={`bg-white rounded-2xl p-3 flex flex-col gap-2 ${S.border} ${S.shadow}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {event.type === 'booking' && <span className="text-lg">🏠</span>}
                    {event.type === 'social' && <span className="text-lg">👥</span>}
                    {event.type === 'personal' && <span className="text-lg">📝</span>}
                    <span className="font-bold text-slate-900">
                      {event.type === 'booking' && getGymName(event)}
                      {event.type === 'social' && event.partnerName}
                      {event.type === 'personal' && 'Personal Note'}
                    </span>
                  </div>
                  {event.type === 'social' && (
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                      🔄 Synced
                    </span>
                  )}
                </div>
                
                {event.type === 'personal' && event.note && (
                  <p className="text-sm font-medium text-slate-600 ml-7">{event.note}</p>
                )}

                {event.type === 'booking' && event.isExpired && !event.isReviewed && (
                  <button 
                    onClick={() => {
                      onWriteReview?.(event);
                      setReviewingEvent(event);
                    }}
                    className={`mt-1 ml-7 bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-xl self-start ${S.press}`}
                  >
                    Write Review
                  </button>
                )}

                {event.type === 'booking' && event.isExpired && event.isReviewed && (
                  <span className="mt-1 ml-7 text-green-600 text-sm font-bold flex items-center gap-1">
                    Reviewed ✓
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm font-semibold text-center py-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              No climbs planned
            </p>
          )}
        </div>
      )}

      {reviewingEvent && (
        <Modal
          isOpen={true}
          onClose={closeReviewModal}
          title={`Review: ${reviewingEvent.gymName ?? 'Gym'}`}
        >
          <div className="flex flex-col gap-4">
            {(['environment', 'routeDesign', 'equipment', 'value'] as const).map(dim => {
              const labels: Record<string, string> = {
                environment: '🌿 Environment',
                routeDesign: '🧗 Route Design',
                equipment: '🔧 Equipment',
                value: '💰 Value',
              };

              return (
                <div key={dim} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">{labels[dim]}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatings(r => ({ ...r, [dim]: star }))}
                        className={`text-xl ${ratings[dim] >= star ? 'text-amber-400' : 'text-slate-200'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1">Comment (optional)</label>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value.slice(0, 200))}
                placeholder="Share your experience..."
                className="w-full border-2 border-slate-900 rounded-xl p-3 text-sm resize-none h-20 focus:outline-none"
              />
              <p className="text-xs text-slate-400 text-right">{reviewText.length}/200</p>
            </div>

            <button
              type="button"
              onClick={submitReview}
              disabled={ratings.environment === 0}
              className="w-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:translate-x-1 active:shadow-none bg-teal-400 text-slate-900 font-black py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Review
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalendarSection;
