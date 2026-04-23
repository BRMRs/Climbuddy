import React from 'react';
import { Camera, Image, X } from 'lucide-react';
import { S } from '../../constants/styles';
import type { CaptureMode } from '../../hooks/useMediaPicker';

interface MediaPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onPick: (mode: CaptureMode) => void;
  title?: string;
}

export const MediaPickerSheet: React.FC<MediaPickerSheetProps> = ({
  isOpen,
  onClose,
  onPick,
  title = 'Add Photo',
}) => {
  if (!isOpen) return null;

  const handlePick = (mode: CaptureMode) => {
    onClose();
    onPick(mode);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-end bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-full bg-white rounded-t-3xl ${S.border} shadow-[0px_-4px_0px_0px_rgba(15,23,42,1)] animate-in slide-in-from-bottom-4 duration-200 pb-6`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <p className="font-black text-slate-900 text-lg">{title}</p>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center ${S.press}`}
          >
            <X className="w-4 h-4 text-slate-500" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex flex-col gap-3 px-5">
          <button
            onClick={() => handlePick('camera')}
            className={`flex items-center gap-4 p-4 bg-white rounded-2xl ${S.border} ${S.shadow} ${S.press}`}
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5 text-indigo-600" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <p className="font-black text-slate-900 text-sm">Take Photo / Video</p>
              <p className="font-semibold text-slate-400 text-xs">Open camera</p>
            </div>
          </button>

          <button
            onClick={() => handlePick('gallery')}
            className={`flex items-center gap-4 p-4 bg-white rounded-2xl ${S.border} ${S.shadow} ${S.press}`}
          >
            <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
              <Image className="w-5 h-5 text-teal-600" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <p className="font-black text-slate-900 text-sm">Choose from Gallery</p>
              <p className="font-semibold text-slate-400 text-xs">Pick from your library</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
