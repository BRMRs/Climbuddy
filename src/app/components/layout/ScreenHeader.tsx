import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { S } from '../../constants/styles';

interface ScreenHeaderProps {
  title?: string;
  onBack: () => void;
  right?: React.ReactNode;
  transparent?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack, right, transparent }) => {
  return (
    <div className={`h-[72px] flex items-center px-4 shrink-0 relative z-10 ${transparent ? '' : 'bg-white border-b-2 border-slate-900'}`}>
      <button
        onClick={onBack}
        className={`w-11 h-11 flex items-center justify-center bg-white rounded-full ${S.border} ${S.shadowSm} ${S.press}`}
      >
        <ArrowLeft className="w-5 h-5 text-slate-900" strokeWidth={3} />
      </button>
      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
      )}
      {right && <div className="absolute right-4">{right}</div>}
    </div>
  );
};
