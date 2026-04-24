import React, { useState } from 'react';
import { Camera, X, Home, Users, GraduationCap, Clock, MapPin, Check, Leaf, Mountain, Wrench, Banknote, Briefcase, BookOpen, Shield, Dumbbell, Target, MessageSquare, Star } from 'lucide-react';
import { CalendarEvent, VenueReview, CoachReview, PartnerReview } from '../../../types';
import { S } from '../../../constants/styles';
import { GYMS_DATA } from '../../../data/mockData';
import Modal from '../../layout/Modal';
import { MediaPickerSheet } from '../../ui/MediaPickerSheet';
import { useMediaPicker } from '../../../hooks/useMediaPicker';

interface CalendarSectionProps {
  calendarEvents: CalendarEvent[];
  onWriteReview?: (event: CalendarEvent) => void;
  addReview?: (review: VenueReview) => void;
  addCoachReview?: (review: CoachReview) => void;
  addPartnerReview?: (review: PartnerReview) => void;
  markEventReviewed?: (eventId: string) => void;
  userName?: string;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  calendarEvents,
  onWriteReview,
  addReview,
  addCoachReview,
  addPartnerReview,
  markEventReviewed,
  userName = 'Emma',
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [reviewingEvent, setReviewingEvent] = useState<CalendarEvent | null>(null);
  const [reviewMode, setReviewMode] = useState<'venue' | 'coach' | 'partner'>('venue');
  const [venueRatings, setVenueRatings] = useState({ environment: 0, routeDesign: 0, equipment: 0, value: 0 });
  const [coachRatings, setCoachRatings] = useState({ professionalism: 0, teachingSkill: 0, communication: 0, valueForMoney: 0 });
  const [partnerRatings, setPartnerRatings] = useState({ reliability: 0, safety: 0, encouragement: 0, skillMatch: 0, communication: 0 });
  const [reviewText, setReviewText] = useState('');
  const [reviewPhotos, setReviewPhotos] = useState<string[]>([]);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const { url: latestPhotoUrl, trigger: triggerPhoto } = useMediaPicker('image');

  React.useEffect(() => {
    if (latestPhotoUrl && reviewPhotos.length < 3) {
      setReviewPhotos(prev => [...prev, latestPhotoUrl]);
    }
  }, [latestPhotoUrl]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay(); // 0=Sun

  const today = new Date();
  const isToday = (day: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const isEventPast = (event: CalendarEvent): boolean => {
    const monthIdx = monthNames.indexOf(event.date.split(' ')[0]);
    const dayNum = parseInt(event.date.split(' ')[1]);
    if (monthIdx === -1 || isNaN(dayNum)) return event.isExpired;
    const eventDate = new Date(today.getFullYear(), monthIdx, dayNum);
    if (event.slot) {
      const endHour = parseInt(event.slot.split('–')[1]?.split(':')[0] ?? '23');
      eventDate.setHours(endHour, 0, 0, 0);
    } else {
      eventDate.setHours(23, 59, 59, 999);
    }
    return eventDate < today;
  };

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
    setReviewMode('venue');
    setVenueRatings({ environment: 0, routeDesign: 0, equipment: 0, value: 0 });
    setCoachRatings({ professionalism: 0, teachingSkill: 0, communication: 0, valueForMoney: 0 });
    setPartnerRatings({ reliability: 0, safety: 0, encouragement: 0, skillMatch: 0, communication: 0 });
    setReviewText('');
    setReviewPhotos([]);
  };

  const submitVenueReview = () => {
    if (!reviewingEvent || venueRatings.environment === 0) return;

    const newReview: VenueReview = {
      id: `vr-${Date.now()}`,
      gymId: reviewingEvent.gymId ?? '',
      authorName: userName,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      environment: venueRatings.environment,
      routeDesign: venueRatings.routeDesign || venueRatings.environment,
      equipment: venueRatings.equipment || venueRatings.environment,
      value: venueRatings.value || venueRatings.environment,
      text: reviewText || undefined,
      photos: reviewPhotos.length > 0 ? [...reviewPhotos] : undefined,
    };

    addReview?.(newReview);
    markEventReviewed?.(reviewingEvent.id);
    closeReviewModal();
  };

  const submitCoachReview = () => {
    if (!reviewingEvent || !reviewingEvent.coachName || coachRatings.professionalism === 0) return;

    const newReview: CoachReview = {
      id: `cr-${Date.now()}`,
      coachId: reviewingEvent.coachName,
      authorName: userName,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      professionalism: coachRatings.professionalism,
      teachingSkill: coachRatings.teachingSkill || coachRatings.professionalism,
      communication: coachRatings.communication || coachRatings.professionalism,
      valueForMoney: coachRatings.valueForMoney || coachRatings.professionalism,
      text: reviewText || undefined,
      photos: reviewPhotos.length > 0 ? [...reviewPhotos] : undefined,
    };

    addCoachReview?.(newReview);
    closeReviewModal();
  };

  const submitPartnerReview = () => {
    if (!reviewingEvent || !reviewingEvent.partnerName || partnerRatings.reliability === 0) return;

    const newReview: PartnerReview = {
      id: `pr-${Date.now()}`,
      partnerId: reviewingEvent.partnerName,
      partnerName: reviewingEvent.partnerName,
      authorName: userName,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      reliability: partnerRatings.reliability,
      safety: partnerRatings.safety || partnerRatings.reliability,
      encouragement: partnerRatings.encouragement || partnerRatings.reliability,
      skillMatch: partnerRatings.skillMatch || partnerRatings.reliability,
      communication: partnerRatings.communication || partnerRatings.reliability,
      text: reviewText || undefined,
      photos: reviewPhotos.length > 0 ? [...reviewPhotos] : undefined,
    };

    addPartnerReview?.(newReview);
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
                    if (i > 2) return null;
                    const dotColor =
                      e.type === 'booking' ? 'bg-teal-500' :
                      e.type === 'social' ? 'bg-orange-500' :
                      e.type === 'coach' ? 'bg-purple-500' :
                      'bg-slate-400';
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
            eventsForDay(selectedDay).map(event => {
              const cardBorder =
                event.type === 'booking' ? 'border-teal-500' :
                event.type === 'social' ? 'border-orange-500' :
                event.type === 'coach' ? 'border-purple-500' :
                'border-slate-400';
              return (
                <div key={event.id} className={`bg-white rounded-2xl p-3 flex flex-col gap-2 ${S.border} ${S.shadow} ${cardBorder}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {event.type === 'booking' && <Home className="w-4 h-4 text-teal-600" strokeWidth={2} />}
                      {event.type === 'social' && <Users className="w-4 h-4 text-orange-500" strokeWidth={2} />}
                      {event.type === 'coach' && <GraduationCap className="w-4 h-4 text-purple-600" strokeWidth={2} />}
                      <span className="font-bold text-slate-900">
                        {event.type === 'booking' && 'Solo Session'}
                        {event.type === 'social' && event.partnerName}
                        {event.type === 'coach' && event.coachName}
                      </span>
                    </div>
                    <span className={`text-xs font-black px-2 py-1 rounded-full border ${
                      event.type === 'booking' ? 'bg-teal-50 text-teal-700 border-teal-200' :
                      event.type === 'social' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      event.type === 'coach' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {event.type === 'booking' && 'Solo'}
                      {event.type === 'social' && 'Partner'}
                      {event.type === 'coach' && 'Coach'}
                    </span>
                  </div>

                  <div className="ml-7 flex flex-col gap-2">
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-1 flex-wrap">
                      <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} /> {event.slot || 'Time TBD'} · <MapPin className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} /> {getGymName(event)}
                    </p>

                    {isEventPast(event) && !event.isReviewed && (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            onWriteReview?.(event);
                            setReviewingEvent(event);
                            setReviewMode('venue');
                          }}
                          className={`bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-xl ${S.press}`}
                        >
                          Review Gym
                        </button>

                        {event.type === 'social' && event.partnerName && (
                          <button
                            onClick={() => {
                              setReviewingEvent(event);
                              setReviewMode('partner');
                            }}
                            className={`bg-orange-500 text-white text-xs font-bold py-2 px-3 rounded-xl ${S.press}`}
                          >
                            Review Partner
                          </button>
                        )}

                        {event.type === 'coach' && event.coachName && (
                          <button
                            onClick={() => {
                              setReviewingEvent(event);
                              setReviewMode('coach');
                            }}
                            className={`bg-purple-600 text-white text-xs font-bold py-2 px-3 rounded-xl ${S.press}`}
                          >
                            Review Coach
                          </button>
                        )}
                      </div>
                    )}

                    {isEventPast(event) && event.isReviewed && (
                      <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                        Reviewed <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-slate-400 text-sm font-semibold text-center py-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              No climbs planned
            </p>
          )}
        </div>
      )}

      {reviewingEvent && reviewMode === 'venue' && (
        <Modal
          isOpen={true}
          onClose={closeReviewModal}
          title={`Review Venue: ${reviewingEvent.gymName ?? getGymName(reviewingEvent)}`}
        >
          {showPhotoPicker && (
            <MediaPickerSheet
              isOpen={showPhotoPicker}
              onClose={() => setShowPhotoPicker(false)}
              onPick={(mode) => triggerPhoto(mode)}
              title="Add Photo"
            />
          )}
          <div className="flex flex-col gap-4">
            {(['environment', 'routeDesign', 'equipment', 'value'] as const).map(dim => {
              const labels: Record<string, React.ReactNode> = {
                environment: <span className="flex items-center gap-1"><Leaf className="w-3.5 h-3.5 text-green-500" strokeWidth={2} /> Environment</span>,
                routeDesign: <span className="flex items-center gap-1"><Mountain className="w-3.5 h-3.5 text-teal-600" strokeWidth={2} /> Route Design</span>,
                equipment:   <span className="flex items-center gap-1"><Wrench className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} /> Equipment</span>,
                value:       <span className="flex items-center gap-1"><Banknote className="w-3.5 h-3.5 text-amber-600" strokeWidth={2} /> Value</span>,
              };

              return (
                <div key={dim} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">{labels[dim]}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setVenueRatings(r => ({ ...r, [dim]: star }))}
                        className="p-0.5"
                      >
                        <Star className={`w-5 h-5 ${venueRatings[dim] >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}`} strokeWidth={0} />
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

            <ReviewPhotoRow
              photos={reviewPhotos}
              onAdd={() => setShowPhotoPicker(true)}
              onRemove={(i) => setReviewPhotos(prev => prev.filter((_, idx) => idx !== i))}
            />

            <button
              type="button"
              onClick={submitVenueReview}
              disabled={venueRatings.environment === 0}
              className="w-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:translate-x-1 active:shadow-none bg-teal-400 text-slate-900 font-black py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Review
            </button>
          </div>
        </Modal>
      )}

      {reviewingEvent && reviewMode === 'coach' && reviewingEvent.coachName && (
        <Modal
          isOpen={true}
          onClose={closeReviewModal}
          title={`Review Coach: ${reviewingEvent.coachName}`}
        >
          {showPhotoPicker && (
            <MediaPickerSheet
              isOpen={showPhotoPicker}
              onClose={() => setShowPhotoPicker(false)}
              onPick={(mode) => triggerPhoto(mode)}
              title="Add Photo"
            />
          )}
          <div className="flex flex-col gap-4">
            {(['professionalism', 'teachingSkill', 'communication', 'valueForMoney'] as const).map(dim => {
              const labels: Record<string, React.ReactNode> = {
                professionalism: <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} /> Professionalism</span>,
                teachingSkill:   <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2} /> Teaching Skill</span>,
                communication:   <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-teal-500" strokeWidth={2} /> Communication</span>,
                valueForMoney:   <span className="flex items-center gap-1"><Banknote className="w-3.5 h-3.5 text-amber-600" strokeWidth={2} /> Value for Money</span>,
              };

              return (
                <div key={dim} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">{labels[dim]}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCoachRatings(r => ({ ...r, [dim]: star }))}
                        className="p-0.5"
                      >
                        <Star className={`w-5 h-5 ${coachRatings[dim] >= star ? 'fill-purple-400 text-purple-400' : 'text-slate-200 fill-slate-200'}`} strokeWidth={0} />
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
                placeholder="Share your experience with this coach..."
                className="w-full border-2 border-slate-900 rounded-xl p-3 text-sm resize-none h-20 focus:outline-none"
              />
              <p className="text-xs text-slate-400 text-right">{reviewText.length}/200</p>
            </div>

            <ReviewPhotoRow
              photos={reviewPhotos}
              onAdd={() => setShowPhotoPicker(true)}
              onRemove={(i) => setReviewPhotos(prev => prev.filter((_, idx) => idx !== i))}
            />

            <button
              type="button"
              onClick={submitCoachReview}
              disabled={coachRatings.professionalism === 0}
              className="w-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:translate-x-1 active:shadow-none bg-purple-400 text-slate-900 font-black py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Coach Review
            </button>
          </div>
        </Modal>
      )}

      {reviewingEvent && reviewMode === 'partner' && reviewingEvent.partnerName && (
        <Modal
          isOpen={true}
          onClose={closeReviewModal}
          title={`Review Partner: ${reviewingEvent.partnerName}`}
        >
          {showPhotoPicker && (
            <MediaPickerSheet
              isOpen={showPhotoPicker}
              onClose={() => setShowPhotoPicker(false)}
              onPick={(mode) => triggerPhoto(mode)}
              title="Add Photo"
            />
          )}
          <div className="flex flex-col gap-4">
            {(['reliability', 'safety', 'encouragement', 'skillMatch', 'communication'] as const).map(dim => {
              const labels: Record<string, React.ReactNode> = {
                reliability:   <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} /> Reliability</span>,
                safety:        <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-blue-500" strokeWidth={2} /> Safety Awareness</span>,
                encouragement: <span className="flex items-center gap-1"><Dumbbell className="w-3.5 h-3.5 text-orange-500" strokeWidth={2} /> Encouragement</span>,
                skillMatch:    <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5 text-teal-600" strokeWidth={2} /> Skill Match</span>,
                communication: <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-purple-500" strokeWidth={2} /> Communication</span>,
              };

              return (
                <div key={dim} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">{labels[dim]}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setPartnerRatings(r => ({ ...r, [dim]: star }))}
                        className="p-0.5"
                      >
                        <Star className={`w-5 h-5 ${partnerRatings[dim] >= star ? 'fill-orange-400 text-orange-400' : 'text-slate-200 fill-slate-200'}`} strokeWidth={0} />
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
                placeholder="Share your experience with this partner..."
                className="w-full border-2 border-slate-900 rounded-xl p-3 text-sm resize-none h-20 focus:outline-none"
              />
              <p className="text-xs text-slate-400 text-right">{reviewText.length}/200</p>
            </div>

            <ReviewPhotoRow
              photos={reviewPhotos}
              onAdd={() => setShowPhotoPicker(true)}
              onRemove={(i) => setReviewPhotos(prev => prev.filter((_, idx) => idx !== i))}
            />

            <button
              type="button"
              onClick={submitPartnerReview}
              disabled={partnerRatings.reliability === 0}
              className="w-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:translate-x-1 active:shadow-none bg-orange-400 text-slate-900 font-black py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Partner Review
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const ReviewPhotoRow: React.FC<{
  photos: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}> = ({ photos, onAdd, onRemove }) => (
  <div>
    <label className="text-sm font-bold text-slate-700 block mb-2">Photos (optional, up to 3)</label>
    <div className="flex gap-2 flex-wrap">
      {photos.map((url, i) => (
        <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-900">
          <img src={url} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="absolute top-0.5 right-0.5 w-5 h-5 bg-slate-900/70 rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3 text-white" strokeWidth={3} />
          </button>
        </div>
      ))}
      {photos.length < 3 && (
        <button
          type="button"
          onClick={onAdd}
          className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-slate-500 hover:text-slate-600 transition-colors"
        >
          <Camera className="w-5 h-5" strokeWidth={2} />
          <span className="text-xs font-bold">Add</span>
        </button>
      )}
    </div>
  </div>
);

export default CalendarSection;
