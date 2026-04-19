import React from 'react';
import { S } from '../../../constants/styles';
import { SessionLog } from '../../../types';

export interface SessionRow {
  date: string;
  routes: number;
  level: string;
  calories: number;
}

export interface SessionHistoryProps {
  sessions: SessionLog[];
  onOpenLogModal?: () => void;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, onOpenLogModal }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-black text-lg text-slate-900">Recent Sessions</h2>
        <button
          onClick={onOpenLogModal}
          className={`text-xs font-black px-3 py-2 bg-slate-900 text-white rounded-xl ${S.border} ${S.shadowSm} ${S.press}`}
        >
          + Log Session
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {sessions.map((s, i) => (
          <div key={i} className={`flex items-center justify-between bg-white p-4 rounded-2xl ${S.border} ${S.shadowSm}`}>
            <div>
              <p className="font-black text-slate-900">{s.date}</p>
              <p className="font-semibold text-slate-500 text-xs">{s.level} · {s.routes} routes</p>
            </div>
            <div className="text-right">
              <p className="font-black text-orange-500">{s.calories} cal</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionHistory;
