import { useEffect, useRef, useState } from 'react';

export const useSessionTimer = (active: boolean) => {
  const [duration, setDuration] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (active) {
      startTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setDuration(
            Math.floor((Date.now() - startTimeRef.current) / 1000)
          );
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  return duration;
};