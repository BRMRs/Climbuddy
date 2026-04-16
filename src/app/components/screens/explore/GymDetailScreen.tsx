import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, CheckCircle2, User } from 'lucide-react';
import { ScreenHeader } from '../../layout/ScreenHeader';
import { GYM_COACHES } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { Gym } from '../../../types';

const AMENITY_ICONS: Record<string, string> = {
  Showers: '🚿', Lockers: '🔒', Cafe: '☕', 'Gear Rental': '👟', 'Yoga Room': '🧘', 'Pro Shop': '🛒',
};

const TABS = ['Info', 'Coaches', 'Photos'] as const;
type Tab = typeof TABS[number];

interface GymDetailScreenProps {
  gym: Gym;
  onBack: () => void;
}

export const GymDetailScreen: React.FC<GymDetailScreenProps> = ({ gym, onBack }) => {
  const [tab, setTab] = useState<Tab>('Info');
  const [booked, setBooked] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const coaches = GYM_COACHES[gym.id] ?? [];

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <ScreenHeader onBack={onBack} transparent />

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
        {/* Hero Image */}
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
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 font-black text-sm transition-colors
                  ${tab === t ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {tab === 'Info' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <div className={`rounded-2xl p-4 bg-[#F0FDF4] ${S.border} ${S.shadowSm}`}>
                <p className="font-black text-slate-900 mb-1">📍 Address</p>
                <p className="font-semibold text-slate-600 text-sm">{gym.address}</p>
              </div>
              <div>
                <p className="font-black text-slate-900 mb-3">Amenities</p>
                <div className="grid grid-cols-3 gap-2">
                  {gym.amenities.map(a => (
                    <div key={a} className={`flex flex-col items-center gap-1 p-3 bg-white rounded-xl ${S.border} ${S.shadowSm}`}>
                      <span className="text-xl">{AMENITY_ICONS[a] ?? '✨'}</span>
                      <span className="font-bold text-slate-700 text-xs text-center leading-tight">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'Coaches' && (
            <div className="flex flex-col gap-3 animate-in fade-in duration-200">
              {coaches.length === 0 && (
                <p className="text-center text-slate-400 font-bold py-8">No coaches listed.</p>
              )}
              {coaches.map(c => (
                <div key={c.name} className={`flex items-center gap-4 p-4 bg-[#FEF3C7] rounded-2xl ${S.border} ${S.shadowSm}`}>
                  <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center ${S.border}`}>
                    <User className="w-6 h-6 text-slate-600" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-slate-900">{c.name}</p>
                    <p className="font-semibold text-slate-500 text-xs">{c.specialty}</p>
                  </div>
                  <div className={`flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg ${S.border}`}>
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-black text-sm">{c.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Photos' && (
            <div className="flex flex-col gap-3 animate-in fade-in duration-200">
              {/* Main Photo */}
              <div className={`w-full h-44 rounded-2xl overflow-hidden ${S.border} ${S.shadowSm}`}>
                <img
                  src={gym.photos[photoIdx]}
                  alt="gym"
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2">
                {gym.photos.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIdx(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === photoIdx ? 'border-slate-900 scale-105' : 'border-slate-300'}`}
                  >
                    <img src={p} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Book CTA */}
          <button
            onClick={() => setBooked(true)}
            className={`w-full mt-6 py-4 rounded-2xl font-black text-xl border-2 border-slate-900 transition-all ${S.press}
              ${booked
                ? 'bg-teal-500 text-white shadow-[4px_4px_0px_0px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2'
                : 'bg-[#FEF08A] text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-900 hover:text-white'}`}
          >
            {booked ? <><CheckCircle2 className="w-6 h-6" /> Visit Booked!</> : 'Book a Visit →'}
          </button>
        </div>
      </div>
    </div>
  );
};
