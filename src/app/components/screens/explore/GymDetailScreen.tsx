import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, CheckCircle2, User, X, Eye, EyeOff, MessageCircle } from 'lucide-react';
import { ScreenHeader } from '../../layout/ScreenHeader';
import { GYM_COACHES, GYM_ROUTES, TIME_SLOTS, SLOT_BOOKERS } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { Gym, Route, SlotBooker, VenueReview } from '../../../types';
import Modal from '../../layout/Modal';

const AMENITY_ICONS: Record<string, string> = {
  Showers: '🚿', Lockers: '🔒', Cafe: '☕', 'Gear Rental': '👟', 'Yoga Room': '🧘', 'Pro Shop': '🛒',
};

const TABS = ['Info', 'Routes', 'Reviews', 'Coaches', 'Photos'] as const;
type Tab = typeof TABS[number];

// Hold positions [x%, y%] per route on a 100×100 grid (y=0 top, y=100 bottom)
const ROUTE_HOLDS: Record<string, [number, number][]> = {
  r1: [[48,88],[44,68],[52,50],[48,32],[50,12]],
  r2: [[28,88],[42,68],[56,48],[68,28],[74,12]],
  r3: [[50,88],[62,70],[72,52],[60,32],[52,14]],
  r4: [[50,88],[47,60],[53,34],[50,12]],
  r5: [[18,60],[34,50],[52,56],[68,50],[82,62],[68,34],[50,16]],
  r6: [[32,88],[36,68],[40,48],[45,28],[50,12]],
  r7: [[50,88],[48,66],[52,44],[50,22],[50,10]],
  r8: [[30,88],[40,72],[55,56],[62,38],[60,20]],
  r9: [[20,58],[38,52],[56,50],[74,52],[72,32],[56,16]],
  ra: [[50,88],[46,66],[52,44],[48,24],[50,10]],
  rb: [[32,88],[44,70],[58,52],[64,32],[56,14]],
  rc: [[26,88],[40,70],[56,52],[68,36],[70,16]],
};

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

interface GymDetailScreenProps {
  gym: Gym;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
  venueReviews?: VenueReview[];
  userName?: string;
  onCreateCalendarEvent?: (event: {
    date: string;
    type: 'booking' | 'coach';
    gymId: string;
    gymName: string;
    coachName?: string;
    slot: string;
  }) => void;
}

export const GymDetailScreen: React.FC<GymDetailScreenProps> = ({ gym, onBack, onNavigate, venueReviews, onCreateCalendarEvent, userName = 'Emma' }) => {
  const resolveAuthor = (name: string) => name.replace(/\{userName\}/g, userName);
  const [tab, setTab] = useState<Tab>('Info');
  const [photoIdx, setPhotoIdx] = useState(0);
  // 'visit' = book the gym, coach name = book that coach, null = closed
  const [bookingTarget, setBookingTarget] = useState<string | null>(null);

  const coaches = GYM_COACHES[gym.id] ?? [];
  const routes  = GYM_ROUTES[gym.id]  ?? [];

  // ---------------------------------------------------------------------------
  // Reviews processing for the Reviews tab
  // ---------------------------------------------------------------------------
  const venueReviewsList = venueReviews ?? [];
  const gymReviews = venueReviewsList.filter(r => r.gymId === gym.id);
  const reviewsCount = gymReviews.length;
  const overallAvg = gymReviews.length > 0
    ? gymReviews.reduce((sum, r) => sum + ((r.environment + r.routeDesign + r.equipment + r.value) / 4), 0) / gymReviews.length
    : 0;
  const envAvg = gymReviews.length > 0 ? gymReviews.reduce((sum, r) => sum + r.environment, 0) / gymReviews.length : 0;
  const routeAvg = gymReviews.length > 0 ? gymReviews.reduce((sum, r) => sum + r.routeDesign, 0) / gymReviews.length : 0;
  const equipAvg = gymReviews.length > 0 ? gymReviews.reduce((sum, r) => sum + r.equipment, 0) / gymReviews.length : 0;
  const valueAvg = gymReviews.length > 0 ? gymReviews.reduce((sum, r) => sum + r.value, 0) / gymReviews.length : 0;

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <ScreenHeader onBack={onBack} transparent />

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-8">
        {/* Hero */}
        <div className="relative w-full h-52 bg-slate-100 -mt-[72px]">
          <img src={gym.image} alt={gym.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-white tracking-tight drop-shadow">{gym.name}</h1>
              {gym.verified && <ShieldCheck className="w-5 h-5 text-teal-300" strokeWidth={2.5} />}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-black text-white text-xs">{gym.rating}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <MapPin className="w-3 h-3 text-white" strokeWidth={2.5} />
                <span className="font-bold text-white text-xs">{gym.distance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Price Banner */}
          <div className={`flex justify-between items-center bg-[#F8FAFC] rounded-2xl p-4 mb-5 ${S.border} ${S.shadowSm}`}>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Day Pass</p>
              <p className="font-black text-2xl text-slate-900">{gym.price}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Shoes Rental</p>
              <p className="font-black text-lg text-slate-900">+$5</p>
            </div>
          </div>

          {/* Tabs */}
          <div className={`flex rounded-2xl overflow-hidden ${S.border} mb-5`}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 font-black text-xs transition-colors
                  ${tab === t ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                {t}
              </button>
            ))}
          </div>

          {/* ── Info ── */}
          {tab === 'Info' && (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-4 bg-[#F0FDF4] border-2 border-slate-200">
                <p className="font-black text-slate-900 mb-1">📍 Address</p>
                <p className="font-semibold text-slate-600 text-sm">{gym.address}</p>
              </div>
              <div>
                <p className="font-black text-slate-900 mb-3">Amenities</p>
                {/* Flat pill style — no shadow, no press effect */}
                <div className="flex flex-wrap gap-2">
                  {gym.amenities.map(a => (
                    <div key={a} className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-xl border border-slate-200">
                      <span className="text-base leading-none">{AMENITY_ICONS[a] ?? '✨'}</span>
                      <span className="font-semibold text-slate-600 text-xs">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Routes ── */}
          {tab === 'Routes' && (
            <div className="flex flex-col gap-3">
              {routes.length === 0 && (
                <p className="text-center text-slate-400 font-bold py-8">No routes listed.</p>
              )}
              {routes.map(r => <RouteCard key={r.id} route={r} />)}
            </div>
          )}

          {/* ── Coaches ── */}
          {tab === 'Coaches' && (
            <div className="flex flex-col gap-3">
              {coaches.map(c => (
                <button key={c.id} onClick={() => onNavigate('coachDetail', c)}
                  className={`flex items-center gap-4 p-4 bg-[#FEF3C7] rounded-2xl ${S.border} ${S.shadow} active:translate-y-1 active:translate-x-1 active:shadow-none text-left w-full`}>
                  <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center ${S.border}`}>
                    <User className="w-6 h-6 text-slate-600" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-slate-900">{c.name}</p>
                    <p className="font-semibold text-slate-500 text-xs">{c.specialty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.price && (
                      <div className={`bg-[#FEF08A] px-2.5 py-1 rounded-lg ${S.border}`}>
                        <span className="font-black text-xs text-slate-900">{c.price}</span>
                      </div>
                    )}
                    <div className={`flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg ${S.border}`}>
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-black text-sm">{c.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Photos ── */}
          {tab === 'Photos' && (
            <div className="flex flex-col gap-3">
              <div className={`w-full h-44 rounded-2xl overflow-hidden ${S.border} ${S.shadowSm}`}>
                <img src={gym.photos[photoIdx]} alt="gym" className="w-full h-full object-cover transition-all duration-300" />
              </div>
              <div className="flex gap-2">
                {gym.photos.map((p, i) => (
                  <button key={i} onClick={() => setPhotoIdx(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all
                      ${i === photoIdx ? 'border-slate-900 scale-105' : 'border-slate-300'}`}>
                    <img src={p} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reviews - read-only tab content */ }
          {tab === 'Reviews' && (
            <div className="flex flex-col gap-3">
              <div className="border-2 border-slate-900 rounded-2xl p-4 bg-amber-50 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black">{overallAvg.toFixed(1)}</span>
                  <span className="text-amber-500 text-xl">★</span>
                  <span className="text-slate-500 text-sm">({reviewsCount} reviews)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    { dim: 'Environment', val: envAvg },
                    { dim: 'Route Design', val: routeAvg },
                    { dim: 'Equipment', val: equipAvg },
                    { dim: 'Value', val: valueAvg },
                  ].map(d => (
                    <div key={d.dim} className="text-sm">
                      <span className="text-slate-500">{d.dim}: </span>
                      <span className="font-bold">{d.val.toFixed(1)} ★</span>
                    </div>
                  ))}
                </div>
              </div>
              {gymReviews.map(r => (
                <div key={r.id} className="border-2 border-slate-900 rounded-2xl p-4 bg-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-slate-900">{resolveAuthor(r.authorName)}</span>
                    <span className="text-xs text-slate-500">{r.date}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-1">
                    <span>Environment: {r.environment}★</span>
                    <span>Route Design: {r.routeDesign}★</span>
                    <span>Equipment: {r.equipment}★</span>
                    <span>Value: {r.value}★</span>
                  </div>
                  {r.text && <p className="mt-1 text-sm text-slate-700">"{r.text}"</p>}
                </div>
              ))}
            </div>
          )}

          {/* Book CTA */}
          <button
            onClick={() => setBookingTarget('visit')}
            className={`w-full mt-6 py-4 rounded-2xl font-black text-xl border-2 border-slate-900
              bg-[#FEF08A] text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]
              hover:bg-slate-900 hover:text-white ${S.press}`}>
            Book a Visit →
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingTarget !== null && (
        <BookingModal
          gymId={gym.id}
          gymName={gym.name}
          target={bookingTarget}
          onClose={() => setBookingTarget(null)}
          onConfirmBooking={({ date, slot, targetName }) => {
            onCreateCalendarEvent?.({
              date,
              slot,
              gymId: gym.id,
              gymName: gym.name,
              type: targetName === 'visit' ? 'booking' : 'coach',
              coachName: targetName === 'visit' ? undefined : targetName,
            });
          }}
          onChatWith={(booker) => {
            setBookingTarget(null);
            onNavigate('chat', {
              id: booker.name,
              name: booker.name,
              image: booker.image,
              level: booker.level,
              trustScore: 90,
              verified: true,
              gym: gym.name,
              hopePartner: '',
              age: 0,
              climbingSince: '',
            });
          }}
        />
      )}
    </div>
  );
};

/* ── Mini Wall Visualization ─────────────────────── */
function RouteCard({ route }: { route: Route }) {
  const holds = ROUTE_HOLDS[route.id] ?? [[50, 85], [50, 50], [50, 15]];

  // Build SVG polyline points string
  const pts = holds.map(([x, y]) => `${x},${y}`).join(' ');

  // Extract fill color from bgColor class (e.g. bg-sky-100 → #e0f2fe)
  const colorMap: Record<string, string> = {
    'bg-sky-100': '#7dd3fc', 'bg-amber-100': '#fcd34d',
    'bg-green-100': '#6ee7b7', 'bg-red-100': '#fca5a5',
    'bg-purple-100': '#d8b4fe', 'bg-slate-100': '#94a3b8',
    'bg-teal-100': '#5eead4', 'bg-orange-100': '#fdba74',
    'bg-pink-100': '#f9a8d4',
  };
  const holdColor = colorMap[route.bgColor] ?? '#94a3b8';

  return (
    <div className={`flex items-center gap-3 p-4 bg-white rounded-2xl ${S.border} ${S.shadowSm}`}>
      {/* Mini Wall */}
      <div className="shrink-0 w-[68px] h-[84px] bg-slate-800 rounded-xl overflow-hidden relative border-2 border-slate-700">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Hold connection line */}
          <polyline
            points={pts}
            fill="none"
            stroke={holdColor}
            strokeWidth="2.5"
            strokeDasharray="5,4"
            strokeOpacity="0.55"
          />
          {/* Holds */}
          {holds.map(([x, y], i) => (
            <g key={i}>
              {i === 0 ? (
                // Start hold — diamond shape
                <polygon
                  points={`${x},${y - 6} ${x + 5},${y} ${x},${y + 6} ${x - 5},${y}`}
                  fill={holdColor}
                  stroke="white"
                  strokeWidth="1.5"
                />
              ) : i === holds.length - 1 ? (
                // Top hold — star / circle with ring
                <>
                  <circle cx={x} cy={y} r="7" fill="none" stroke={holdColor} strokeWidth="2" />
                  <circle cx={x} cy={y} r="4" fill={holdColor} />
                </>
              ) : (
                // Normal hold
                <circle cx={x} cy={y} r="4.5" fill={holdColor} />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Route info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`px-2.5 py-1 rounded-lg ${route.bgColor} border border-slate-200`}>
            <span className={`font-black text-sm ${route.color}`}>{route.grade}</span>
          </span>
          <span className="font-black text-slate-900 text-sm truncate">{route.name}</span>
        </div>
        <p className="font-semibold text-slate-500 text-xs">{route.holds}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{route.type}</span>
          <span className="text-[10px] font-semibold text-slate-400">Set {route.dateSet} · {route.setter}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Booking Modal ─────────────────────────────── */
function BookingModal({ gymId, gymName, target, onClose, onChatWith, onConfirmBooking }: {
  gymId: string;
  gymName: string;
  target: string;
  onClose: () => void;
  onChatWith: (b: SlotBooker) => void;
  onConfirmBooking: (payload: { date: string; slot: string; targetName: string; gymId: string; gymName: string }) => void;
}) {
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot]     = useState<string | null>(null);
  const [ghost, setGhost]   = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const isCoach = target !== 'visit';
  const bookers = (!isCoach && slot) ? (SLOT_BOOKERS[slot] ?? []) : [];

  const isSlotPast = (s: string): boolean => {
    if (dayIdx !== 0) return false;
    const endHour = parseInt(s.split('–')[1]?.split(':')[0] ?? '23');
    return new Date().getHours() >= endHour;
  };

  if (confirmed) {
    return (
      <Modal isOpen={true} onClose={onClose} title="Booking Confirmed">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className={`w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center ${S.border}`}>
            <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={2.5} />
          </div>
          <h3 className="font-black text-2xl text-slate-900">Booking Confirmed!</h3>
          <div className="bg-[#F8FAFC] rounded-2xl p-4 w-full text-left border-2 border-slate-200 flex flex-col gap-2">
            <InfoRow label="Where" value={gymName} />
            {isCoach && <InfoRow label="Coach" value={target} />}
            <InfoRow label="When" value={`${DAYS[dayIdx].label} · ${slot}`} />
            {!isCoach && (
              <InfoRow
                label="Visibility"
                value={ghost ? '🕵️ Ghost Mode' : '👁️ Visible to others'}
              />
            )}
          </div>
          <button onClick={onClose}
            className={`w-full bg-slate-900 text-white font-black py-4 rounded-2xl text-lg ${S.border} ${S.press}`}>
            Done
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-xl text-slate-900">
          {isCoach ? `📅 Book with ${target}` : '📅 Book a Visit'}
        </h3>
        <button onClick={onClose} className={`w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 ${S.press}`}>
          <X className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
        </button>
      </div>

      {/* Date selector */}
      <p className="font-black text-slate-900 mb-2 text-xs uppercase tracking-wider">Date</p>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
        {DAYS.map((d, i) => (
          <button key={i} onClick={() => { setDayIdx(i); setSlot(null); }}
            className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-2xl border-2 transition-all ${S.press}
              ${dayIdx === i
                ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(20,184,166,1)]'
                : 'bg-white text-slate-700 border-slate-200'}`}>
            <span className="font-bold text-[10px] uppercase tracking-wider">{d.dayName}</span>
            <span className="font-black text-xl leading-tight">{d.dayNum}</span>
          </button>
        ))}
      </div>

      {/* Time slots */}
      <p className="font-black text-slate-900 mb-2 text-xs uppercase tracking-wider">Time Slot</p>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {TIME_SLOTS.map(s => {
          const count = !isCoach ? (SLOT_BOOKERS[s] ?? []).length : 0;
          const past = isSlotPast(s);
          return (
            <button key={s}
              onClick={() => !past && setSlot(s)}
              disabled={past}
              className={`flex flex-col items-center py-3 rounded-xl border-2 transition-all
                ${past
                  ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed opacity-50'
                  : slot === s
                    ? `bg-slate-900 text-white border-slate-900 ${S.press}`
                    : `bg-white text-slate-700 border-slate-200 ${S.press}`}`}>
              <span className="font-black text-sm">{s}</span>
              {past
                ? <span className="text-[10px] font-bold mt-0.5 text-slate-300">Passed</span>
                : count > 0 && (
                  <span className={`text-[10px] font-bold mt-0.5 ${slot === s ? 'text-teal-300' : 'text-teal-600'}`}>
                    {count} climber{count > 1 ? 's' : ''} going
                  </span>
                )
              }
            </button>
          );
        })}
      </div>

      {/* Fellow climbers — only for gym visit, not coaches */}
      {!isCoach && slot && (
        <div className="mb-4 animate-in fade-in duration-200">
          <p className="font-black text-slate-900 mb-2 text-xs uppercase tracking-wider">
            {bookers.length > 0 ? `🧗 ${bookers.length} Climber${bookers.length > 1 ? 's' : ''} at This Slot` : '😶 No one booked yet'}
          </p>
          {bookers.map(b => (
            <div key={b.name} className="flex items-center gap-3 p-3 mb-2 bg-[#F8FAFC] rounded-xl border-2 border-slate-100">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 shrink-0">
                <img src={b.image} className="w-full h-full object-cover" alt={b.name} />
              </div>
              <div className="flex-1">
                <p className="font-black text-slate-900 text-sm">{b.name}</p>
                <p className="font-semibold text-slate-500 text-xs">{b.level}</p>
              </div>
              <button
                onClick={() => onChatWith(b)}
                className={`flex items-center gap-1 px-3 py-1.5 bg-[#FEF08A] rounded-xl text-xs font-black ${S.border} ${S.press}`}>
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={2.5} /> Hi!
              </button>
            </div>
          ))}

          {/* Ghost mode toggle */}
          <button onClick={() => setGhost(g => !g)}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 mt-1 transition-all ${S.press}
              ${ghost ? 'bg-slate-900 text-white border-slate-900' : 'bg-[#F8FAFC] text-slate-700 border-slate-200'}`}>
            {ghost ? <EyeOff className="w-5 h-5 shrink-0" /> : <Eye className="w-5 h-5 shrink-0" />}
            <div className="text-left flex-1">
              <p className="font-black text-sm">{ghost ? 'Ghost Mode On' : 'Visible to Others'}</p>
              <p className={`text-xs font-semibold ${ghost ? 'text-slate-400' : 'text-slate-500'}`}>
                {ghost ? "You won't appear in others' booking list." : 'Others at this slot can see you.'}
              </p>
            </div>
            {/* Toggle pill */}
            <div className={`w-11 h-6 rounded-full border-2 flex items-center px-0.5 transition-all
              ${ghost ? 'bg-teal-400 border-teal-400 justify-end' : 'bg-slate-200 border-slate-300 justify-start'}`}>
              <div className="w-4 h-4 bg-white rounded-full shadow" />
            </div>
          </button>
        </div>
      )}

      {/* Confirm */}
      <button
        onClick={() => {
          if (!slot) return;
          onConfirmBooking({
            date: DAYS[dayIdx].label,
            slot,
            targetName: target,
            gymId,
            gymName,
          });
          setConfirmed(true);
        }}
        disabled={!slot}
        className={`w-full py-4 rounded-2xl font-black text-lg border-2 border-slate-900 transition-all ${S.press}
          ${slot
            ? 'bg-[#FEF08A] text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
            : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}>
        {slot ? 'Confirm Booking ✓' : 'Pick a time slot first'}
      </button>
    </Modal>
  );
}

/* ── Shared helpers ─────────────────────────────── */
 

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-bold text-slate-400 text-xs uppercase tracking-wider">{label}</p>
      <p className="font-black text-slate-900 text-sm mt-0.5">{value}</p>
    </div>
  );
}
