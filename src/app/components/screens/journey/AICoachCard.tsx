import React from 'react';
import { Sparkles, Video } from 'lucide-react';
import { S } from '../../../constants/styles';

export interface AICoachCardProps {
  onUpload: () => void;
}

const AICoachCard: React.FC<AICoachCardProps> = ({ onUpload }) => {
  return (
    <div className={`bg-[#EEF2FF] rounded-3xl p-5 ${S.border} ${S.shadow}`}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h2 className="font-black text-slate-900 text-lg">AI Coach</h2>
      </div>
      <p className="font-semibold text-slate-600 text-sm mb-3 leading-relaxed">
        Plateauing on V2s? Upload your climbing video for professional technique feedback.
      </p>
      <button
        onClick={onUpload}
        className={`w-full bg-white py-3 rounded-xl font-black text-indigo-700 flex items-center justify-center gap-2 ${S.border} ${S.shadowSm} ${S.press}`}
      >
        <Video className="w-5 h-5" strokeWidth={3} /> Upload Route Video
      </button>
    </div>
  );
};

export default AICoachCard;
