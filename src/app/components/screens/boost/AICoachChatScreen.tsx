import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, X, Video, Sparkles } from 'lucide-react';
import { ScreenHeader } from '../../layout/ScreenHeader';
import { S } from '../../../constants/styles';
import { Message } from '../../../types';

const AI_INITIAL_MESSAGES: Message[] = [
  { id: 'ai0', text: "Hey there! I'm your AI climbing coach 🤖 Ask me anything about technique, training plans, or get personalized climbing tips!", fromSelf: false, time: 'Now' },
];

const AI_SUGGESTIONS = [
  "Give me a training plan",
  "How do I improve footwork?",
  "Tips for overhangs",
  "Suggest a warm-up",
];

function nowStr(): string {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

const AI_RESPONSES: Record<string, string[]> = {
  'plan': ["Here's a quick training plan for you:\n\n1. Warm-up (10 min) - easy traverses\n2. Project one grade below flash (45 min)\n3. Cool-down (5 min) - light stretching\n\nWant me to expand any section?"],
  'footwork': ["Focus on these 3 things:\n\n1. **Silent feet** - practice downclimbing to the pad\n2. **Inside edging** - more stable on small holds\n3. **Micro-adjustments** - small adjustments before committing\n\nDrill: Deadpoint to the same hold from both sides!"],
  'overhang': ["Overhang tips:\n\n1. Keep your hips close to the wall\n2. engagement from toes, not just arms\n3. Look for positive footholds - they're more useful than you think!"],
  'warmup': ["My recommended warm-up:\n\n1. 5 min cardio (jumping jacks, skipping)\n2. 5 min dynamic stretching\n3. 10 easy boulders\n4. Gradual grade increase\n\nNever skip warm-up - injury risk increases 40% without it!"],
};

interface AICoachChatScreenProps {
  onBack: () => void;
}

export const AICoachChatScreen: React.FC<AICoachChatScreenProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>(AI_INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (overrideText?: string) => {
    const text = (overrideText || input).trim();
    if (!text && !overrideText) return;
    setInput('');
    setMessages(m => [...m, { id: `u${Date.now()}`, text, fromSelf: true, time: nowStr() }]);

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const lower = text.toLowerCase();
      let response = "That's a great question! Keep climbing and you'll improve naturally. Is there anything specific you'd like to work on?";
      
      if (lower.includes('plan') || lower.includes('training')) response = AI_RESPONSES['plan'][0];
      else if (lower.includes('footwork')) response = AI_RESPONSES['footwork'][0];
      else if (lower.includes('overhang') || lower.includes('roof') || lower.includes('angle')) response = AI_RESPONSES['overhang'][0];
      else if (lower.includes('warm') || lower.includes('warmup')) response = AI_RESPONSES['warmup'][0];
      else if (lower.includes('thanks') || lower.includes('great')) response = "You're welcome! Keep crushing it! 🧗 Let me know if you need anything else.";
      
      setMessages(m => [...m, { id: `ai${Date.now()}`, text: response, fromSelf: false, time: nowStr() }]);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] animate-in slide-in-from-right duration-300">
      <ScreenHeader
        onBack={onBack}
        right={
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-purple-500" strokeWidth={2.5} />
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">AI Coach</span>
          </div>
        }
      />

      {/* AI Coach header */}
      <div className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="font-black text-white">AI Coach</p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-indigo-100">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 flex flex-col gap-3">
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 mr-2 shrink-0 self-end flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-500" strokeWidth={2.5} />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick suggestions */}
      {!messages.length && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
          {AI_SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)}
              className="shrink-0 px-3 py-2 bg-white border-2 border-slate-200 rounded-full font-bold text-xs text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="p-4 bg-white border-t-2 border-slate-900">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAnalysis(true)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-teal-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${S.press}`}>
            <Video className="w-5 h-5 text-teal-700" strokeWidth={2.5} />
          </button>
          <div className="flex-1 bg-[#F8FAFC] rounded-2xl flex items-center px-4 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] focus-within:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              type="text"
              placeholder="Ask your AI coach..."
              className="bg-transparent border-none outline-none w-full py-3.5 text-slate-900 font-semibold placeholder:text-slate-400"
            />
          </div>
          <button onClick={() => send()} disabled={!input.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${S.press} transition-colors
              ${input.trim() ? 'bg-slate-900' : 'bg-slate-200'}`}>
            <ArrowUp className={`w-5 h-5 ${input.trim() ? 'text-white' : 'text-slate-400'}`} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Video Analysis Modal */}
      {showAnalysis && (
        <VideoAnalysisModal onClose={() => setShowAnalysis(false)} />
      )}
    </div>
  );
};

function MessageBubble({ msg }: { msg: Message }) {
  return (
    <div className={`flex ${msg.fromSelf ? 'justify-end' : 'justify-start'}`}>
      {!msg.fromSelf && (
        <div className="w-8 h-8 rounded-full bg-indigo-100 mr-2 shrink-0 self-end flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-indigo-500" strokeWidth={2.5} />
        </div>
      )}
      <div className={`max-w-[72%] flex flex-col gap-1 ${msg.fromSelf ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl font-semibold text-sm leading-relaxed whitespace-pre-line
          ${msg.fromSelf
            ? 'bg-slate-900 text-white rounded-br-sm'
            : 'bg-white text-slate-900 rounded-bl-sm border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'}`}>
          {msg.text}
        </div>
        <span className="text-[10px] text-slate-400 font-semibold">{msg.time}</span>
      </div>
    </div>
  );
}

function VideoAnalysisModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [progress, setProgress] = useState(0);
  const boostTabNavigate = () => {
    // Import from App.tsx - this will be handled by parent navigation
    window.location.hash = '#boost';
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl border-t-2 border-slate-900 animate-in slide-in-from-bottom-4 duration-300 max-h-[88%] flex flex-col"
        onClick={e => e.stopPropagation()}>
        <div className="px-5 pt-5 pb-3 flex-shrink-0 flex items-center justify-between">
          <div>
            <h3 className="font-black text-xl text-slate-900">🎥 AI Video Analysis</h3>
            <p className="font-semibold text-slate-400 text-xs mt-0.5">Get professional feedback on your technique</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center">
            <X className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-8 flex flex-col gap-4">
          {step === 'upload' && (
            <>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
                <Video className="w-12 h-12 text-slate-400 mb-3" strokeWidth={1.5} />
                <p className="font-black text-slate-900">Drop your climbing video</p>
                <p className="font-semibold text-slate-400 text-xs mt-1">or click to browse</p>
              </div>
              <button onClick={() => {
                setStep('analyzing');
                const interval = setInterval(() => {
                  setProgress(p => {
                    if (p >= 100) {
                      clearInterval(interval);
                      setStep('result');
                      return 100;
                    }
                    return p + 15;
                  });
                }, 150);
              }} className="w-full py-4 rounded-2xl font-black text-lg bg-indigo-500 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                📤 Upload Video
              </button>
            </>
          )}

          {step === 'analyzing' && (
            <div className="py-8 flex flex-col items-center">
              <p className="font-bold text-slate-600 mb-3">Analyzing your technique...</p>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-2">{progress}%</p>
            </div>
          )}

          {step === 'result' && (
            <div className="flex flex-col gap-4">
              <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-4">
                <p className="font-black text-green-700 text-lg">✓ Analysis Complete!</p>
              </div>
              {[
                { label: 'Footwork', score: 7 },
                { label: 'Body Position', score: 6 },
                { label: 'Route Reading', score: 8 },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="font-bold text-slate-700 w-28">{item.label}</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${item.score * 10}%` }} />
                  </div>
                  <span className="font-black text-slate-900">{item.score}/10</span>
                </div>
              ))}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 mt-1">
                <p className="font-black text-amber-800 text-xs">Next Focus</p>
                <p className="text-sm text-amber-700 mt-0.5">Hip rotation on overhangs - keep hips closer to wall!</p>
              </div>
              <button onClick={onClose} className="w-full py-4 rounded-2xl font-black text-lg bg-slate-900 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                Back to Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AICoachChatScreen;