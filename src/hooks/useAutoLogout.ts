import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext.tsx';

interface UseAutoLogoutOptions {
  timeoutMs?: number; // default: 15 minutes (900,000 ms)
  onTimeout?: () => void;
}

const DEFAULT_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

export function useAutoLogout({
  timeoutMs = DEFAULT_TIMEOUT_MS,
  onTimeout
}: UseAutoLogoutOptions = {}) {
  const { user, isAuthenticated, logout, triggerSessionExpiry } = useAuth();
  const lastActivityRef = useRef<number>(Date.now());
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // Only track inactivity if the user is authenticated
    if (!isAuthenticated || !user) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const resetActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart', 'visibilitychange'];
    events.forEach((evt) => {
      window.addEventListener(evt, resetActivity, { passive: true });
    });

    // Check every 30 seconds for inactivity
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= timeoutMs) {
        console.warn(`[Vedic Auth] Session expired after ${Math.round(elapsed / 60000)} minutes of inactivity.`);
        if (triggerSessionExpiry) {
          triggerSessionExpiry();
        } else {
          logout();
        }
        if (onTimeout) {
          onTimeout();
        }
      }
    }, 30000);

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, resetActivity);
      });
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isAuthenticated, user, timeoutMs, logout, triggerSessionExpiry, onTimeout]);
}
