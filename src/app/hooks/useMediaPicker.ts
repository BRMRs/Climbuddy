import { useRef, useState, useCallback } from 'react';

export type MediaType = 'image' | 'video';
export type CaptureMode = 'camera' | 'gallery';

export interface UseMediaPickerResult {
  url: string | null;
  file: File | null;
  trigger: (mode: CaptureMode) => void;
  reset: () => void;
}

export function useMediaPicker(type: MediaType): UseMediaPickerResult {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const ensureInput = useCallback(() => {
    if (inputRef.current) return inputRef.current;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image' ? 'image/*' : 'video/*';
    input.style.display = 'none';
    input.addEventListener('change', () => {
      const f = input.files?.[0];
      if (!f) return;
      setUrl(prev => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(f); });
      setFile(f);
      input.value = '';
    });
    document.body.appendChild(input);
    inputRef.current = input;
    return input;
  }, [type]);

  const trigger = useCallback((mode: CaptureMode) => {
    const input = ensureInput();
    if (mode === 'camera') {
      input.setAttribute('capture', 'environment');
    } else {
      input.removeAttribute('capture');
    }
    input.click();
  }, [ensureInput]);

  const reset = useCallback(() => {
    setUrl(prev => { if (prev) URL.revokeObjectURL(prev); return null; });
    setFile(null);
  }, []);

  return { url, file, trigger, reset };
}
