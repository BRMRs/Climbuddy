import React from 'react';
import { S } from '../../constants/styles';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string; // optional override, defaults to max-h-[70vh]
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxHeight }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="absolute inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
      />
      <div
        data-modal-content
        onClick={(e) => e.stopPropagation()}
        className={`absolute inset-x-0 bottom-[80px] z-50 rounded-t-3xl bg-white ${S.border} border-t-2 border-slate-900 shadow-[0px_-4px_0px_0px_rgba(15,23,42,1)] animate-in slide-in-from-bottom-4`}
      >
        {title && (
          <div className="flex items-center justify-between p-5 pb-3 border-b-2 border-slate-900">
            <h2 className="text-xl font-black text-slate-900">{title}</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-900" aria-label="Close modal">✕</button>
          </div>
        )}
        <div className={`p-5 ${maxHeight ? `overflow-y-auto ${maxHeight}` : ''}`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
