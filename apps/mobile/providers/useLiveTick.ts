import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

/** Tick so live minutes and optimistic scores re-render while the app is foregrounded. */
export function useLiveTick(intervalMs = 8_000): number {
  const [now, setNow] = useState(() => Date.now());
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const id = setInterval(() => {
      if (appState.current === 'active') setNow(Date.now());
    }, intervalMs);
    const sub = AppState.addEventListener('change', (state) => {
      appState.current = state;
      if (state === 'active') setNow(Date.now());
    });
    return () => {
      clearInterval(id);
      sub.remove();
    };
  }, [intervalMs]);

  return now;
}
