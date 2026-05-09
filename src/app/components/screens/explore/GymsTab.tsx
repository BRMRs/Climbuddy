import React, { useState, useMemo } from 'react';
import { MapPin, Search, ShieldCheck, Star, X, Mountain } from 'lucide-react';
import { GYMS_DATA } from '../../../data/mockData';
import { S } from '../../../constants/styles';
import { Gym } from '../../../types';

const ALL_FILTERS = ['All', 'Beginner', 'Bouldering', 'Lead', 'Near Me'];

interface GymsTabProps {
  onNavigate: (screen: string, data?: any) => void;
  switchTab?: (tab: any) => void;
}

export const GymsTab: React.FC<GymsTabProps> = ({ onNavigate, switchTab }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    return GYMS_DATA.filter(gym => {
      const matchesQuery =
        gym.name.toLowerCase().includes(query.toLowerCase()) ||
        gym.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Near Me' && parseFloat(gym.distance) <= 2) ||
        gym.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  return (
    <div className="p-5 pb-28 flex flex-col gap-5 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex items-center gap-2 mt-3">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Explore</h1>
        <MapPin className="w-7 h-7 text-teal-600 fill-teal-100" strokeWidth={2.5} />
      </div>

      {/* Search Bar */}
      <div data-onboarding="search-bar" className={`flex items-center gap-3 bg-white rounded-2xl px-4 py-3 ${S.border} ${S.shadowSm}`}>
        <Search className="w-5 h-5 text-slate-400 shrink-0" strokeWidth={2.5} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search gyms or styles..."
          className="bg-transparent outline-none w-full font-semibold text-slate-900 placeholder:text-slate-400"
        />
        {query && (
          <button onClick={() => setQuery('')}>
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {ALL_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-black border-2 border-slate-900 uppercase tracking-wider transition-all ${S.press}
              ${activeFilter === f
                ? 'bg-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(20,184,166,1)]'
                : 'bg-white text-slate-600 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* New to Climbing Banner */}
      <button
        data-onboarding="getting-started-banner"
        onClick={() => onNavigate('gettingStarted')}
        className={`bg-[#E0E7FF] rounded-2xl p-4 flex items-center gap-4 ${S.border} ${S.shadowSm} ${S.press} text-left`}
      >
        <Mountain className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
        <div>
          <p className="font-black text-slate-900 text-base">New to Climbing?</p>
          <p className="text-slate-600 font-semibold text-xs leading-tight mt-0.5">
            Read our Getting Started guide →
          </p>
        </div>
      </button>

      {/* Gym List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-lg text-slate-900">
            {filtered.length} Gym{filtered.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 mb-3 mx-auto" strokeWidth={1.5} />
            <p className="font-black text-slate-500">No gyms match your search.</p>
          </div>
        )}

        {filtered.map(gym => (
          <GymCard key={gym.id} gym={gym} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};

function GymCard({ gym, onNavigate }: { gym: Gym; onNavigate: (s: string, d?: any) => void }) {
  return (
    <button
      onClick={() => onNavigate('gymDetail', gym)}
      className={`w-full bg-white rounded-3xl overflow-hidden text-left ${S.border} ${S.shadow} ${S.shadowHover} ${S.press}`}
    >
      {/* Photo */}
      <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
        <img src={gym.image} alt={gym.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white px-2 py-1 rounded-lg border-2 border-slate-900">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" strokeWidth={2.5} />
          <span className="font-black text-xs">{gym.rating}</span>
        </div>
        {gym.verified && (
          <div className="absolute top-3 left-3 bg-teal-500 rounded-full p-1 border-2 border-white">
            <ShieldCheck className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <span className="font-extrabold text-lg text-slate-900 leading-tight">{gym.name}</span>
          <span className="font-bold text-slate-500 text-sm shrink-0 ml-2">{gym.distance}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {gym.tags.map((tag, i) => (
              <span key={i} className={S.chip + (tag === 'Beginner Friendly' ? ' bg-teal-100 text-teal-800' : ' text-slate-600')}>
                {tag}
              </span>
            ))}
          </div>
          <span className="font-black text-sm text-slate-900 shrink-0 ml-2">{gym.price}</span>
        </div>
      </div>
    </button>
  );
}
