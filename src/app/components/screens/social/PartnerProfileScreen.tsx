import React from 'react';
import { ShieldCheck, Star, MessageCircle } from 'lucide-react';
import { ScreenHeader } from '../../layout/ScreenHeader';
import { S } from '../../../constants/styles';
import { Partner, PartnerRating } from '../../../types';
import { PARTNER_RATINGS, MOCK_REVIEWS } from '../../../data/mockData';

interface PartnerProfileScreenProps {
  partner: Partner;
  onBack: () => void;
  onChat?: () => void;
  onMatch?: () => void;
}

export const PartnerProfileScreen: React.FC<PartnerProfileScreenProps> = ({
  partner, onBack, onChat,
}) => {
  const rating = PARTNER_RATINGS[partner.id] ?? {
    reliability: 4, safety: 4, encouragement: 4, skillMatch: 4, communication: 4,
    totalReviews: 0, creditScore: 80,
  };
  const reviews = MOCK_REVIEWS[partner.id] ?? [];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] animate-in slide-in-from-right duration-300">
      <ScreenHeader onBack={onBack} transparent />

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-4">
        {/* Hero */}
        <div className="relative w-full h-52 -mt-[72px]">
          <img src={partner.image} className="w-full h-full object-cover" alt={partner.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-white">{partner.name}</h1>
              <span className="text-white/80 font-bold text-lg">{partner.age}</span>
              {partner.verified && <ShieldCheck className="w-5 h-5 text-teal-300" strokeWidth={2.5} />}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-2.5 py-1 rounded-full">
                {partner.level}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                🧗 Since {partner.climbingSince}
              </span>
              {partner.styles?.map(s => (
                <span key={s} className="bg-teal-400/30 backdrop-blur-sm text-white text-xs font-black px-2.5 py-1 rounded-full border border-teal-300/40">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Trust & Credit */}
          <div className="flex gap-3">
            <div className={`flex-1 bg-white rounded-2xl p-4 ${S.border} ${S.shadowSm} text-center`}>
              <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-1">Trust Score</p>
              <p className="font-black text-3xl text-slate-900">{partner.trustScore}</p>
              <p className="text-slate-400 text-xs font-semibold">/100</p>
            </div>
            <div className={`flex-1 rounded-2xl p-4 ${S.border} ${S.shadowSm} text-center ${
              rating.creditScore >= 90 ? 'bg-[#D1FAE5]' :
              rating.creditScore >= 75 ? 'bg-[#FEF3C7]' : 'bg-[#FEE2E2]'
            }`}>
              <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-1">Credit Score</p>
              <p className="font-black text-3xl text-slate-900">{rating.creditScore}</p>
              <p className={`text-xs font-black ${
                rating.creditScore >= 90 ? 'text-green-600' :
                rating.creditScore >= 75 ? 'text-amber-600' : 'text-red-500'
              }`}>
                {rating.creditScore >= 90 ? '⭐ Excellent' :
                 rating.creditScore >= 75 ? '✔ Good' : '⚠ Fair'}
              </p>
            </div>
            <div className={`flex-1 bg-white rounded-2xl p-4 ${S.border} ${S.shadowSm} text-center`}>
              <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-1">Reviews</p>
              <p className="font-black text-3xl text-slate-900">{rating.totalReviews}</p>
              <div className="flex items-center justify-center gap-0.5 mt-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-2.5 h-2.5 ${i <= Math.round((rating.reliability+rating.safety+rating.encouragement+rating.skillMatch+rating.communication)/5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className={`bg-white rounded-2xl p-4 ${S.border} ${S.shadowSm}`}>
            <p className="font-black text-slate-900 mb-2 text-sm">💬 About</p>
            <p className="font-semibold text-slate-600 text-sm leading-relaxed">{partner.hopePartner}</p>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                📍 {partner.gym}
              </span>
            </div>
          </div>

          {/* Radar Chart */}
          <div className={`bg-white rounded-2xl p-5 ${S.border} ${S.shadowSm}`}>
            <p className="font-black text-slate-900 mb-4 text-sm">📊 Partner Ratings</p>
            <div className="flex justify-center">
              <RadarChart rating={rating} />
            </div>
            {/* Dimension breakdown */}
            <div className="flex flex-col gap-2 mt-4">
              {RADAR_DIMS.map(d => (
                <div key={d.key} className="flex items-center gap-3">
                  <span className="text-sm w-5 text-center">{d.emoji}</span>
                  <span className="font-semibold text-slate-600 text-xs w-20">{d.label}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-400 rounded-full transition-all"
                      style={{ width: `${(rating[d.key] / 5) * 100}%` }}
                    />
                  </div>
                  <span className="font-black text-slate-900 text-xs w-6 text-right">{rating[d.key].toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-black text-slate-900 text-sm">⭐ Recent Reviews</p>
              {reviews.map((r, i) => (
                <div key={i} className={`bg-white rounded-2xl p-4 ${S.border} ${S.shadowSm}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-black text-xs text-slate-600">
                      {r.from[0]}
                    </div>
                    <span className="font-black text-slate-900 text-sm">{r.from}</span>
                    <span className="ml-auto font-semibold text-slate-400 text-xs">{r.date}</span>
                  </div>
                  <p className="font-semibold text-slate-600 text-sm leading-relaxed">"{r.text}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Chat Button */}
      {onChat && (
        <div className="shrink-0 px-5 py-4 bg-white border-t-2 border-slate-100">
          <button
            onClick={onChat}
            className={`w-full flex items-center justify-center gap-2 bg-[#FEF08A] text-slate-900 font-black text-base py-3.5 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] ${S.press}`}
          >
            <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
            Chat
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Radar Dimensions ─────────────────────── */
const RADAR_DIMS = [
  { key: 'reliability'   as const, emoji: '⏰', label: 'Reliable'  },
  { key: 'safety'        as const, emoji: '🛡️', label: 'Safety'    },
  { key: 'encouragement' as const, emoji: '💪', label: 'Supportive'},
  { key: 'skillMatch'    as const, emoji: '🎯', label: 'Skill Fit' },
  { key: 'communication' as const, emoji: '💬', label: 'Comms'     },
];

/* ── Radar Chart SVG ─────────────────────── */
function RadarChart({ rating }: { rating: PartnerRating }) {
  const cx = 130, cy = 125, r = 72;
  const n = 5;

  function pts(scale: number) {
    return Array.from({ length: n }, (_, i) => {
      const a = (2 * Math.PI * i / n) - Math.PI / 2;
      return { x: cx + r * scale * Math.cos(a), y: cy + r * scale * Math.sin(a) };
    });
  }

  const outer  = pts(1);
  const scores = RADAR_DIMS.map(({ key }, i) => {
    const a = (2 * Math.PI * i / n) - Math.PI / 2;
    const v = rating[key] / 5;
    return { x: cx + r * v * Math.cos(a), y: cy + r * v * Math.sin(a) };
  });
  const labels = pts(1.38);

  const toPath = (v: {x:number;y:number}[]) =>
    v.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z';

  const anchors = ['middle', 'start', 'start', 'end', 'end'] as const;

  return (
    <svg viewBox="-20 -20 400 310" className="w-full max-w-[260px]" overflow="visible">
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map(s => (
        <path key={s} d={toPath(pts(s))} fill="none"
          stroke="#e2e8f0" strokeWidth={s === 1 ? 1.5 : 0.8}
          strokeDasharray={s < 1 ? '3,3' : undefined} />
      ))}
      {/* Spokes */}
      {outer.map((v, i) => (
        <line key={i} x1={cx} y1={cy} x2={v.x} y2={v.y} stroke="#e2e8f0" strokeWidth="0.8" />
      ))}
      {/* Score fill */}
      <path d={toPath(scores)} fill="rgba(20,184,166,0.22)" stroke="#0d9488" strokeWidth="2" />
      {/* Score dots */}
      {scores.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#0d9488" stroke="white" strokeWidth="2" />
      ))}
      {/* Labels */}
      {RADAR_DIMS.map((d, i) => (
        <text key={i}
          x={labels[i].x} y={labels[i].y}
          textAnchor={anchors[i]} dominantBaseline="middle"
          fontSize="10" fontWeight="700" fill="#475569"
        >
          {d.emoji} {d.label}
        </text>
      ))}
    </svg>
  );
}