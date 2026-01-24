import { useEffect, useState } from 'react';

interface UseProgressBarProps {
  isLoading: boolean;
  duration?: number; // Total estimated duration in ms
}

export const useProgressBar = ({ isLoading, duration = 5000 }: UseProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // Jump to 100% when loading completes
      setProgress(100);
      return;
    }

    // Reset progress when loading starts
    setProgress(0);

    const intervals: ReturnType<typeof setInterval>[] = [];

    // Phase 1: Quick progress to 70% (first 1 second)
    const phase1Interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 70) {
          clearInterval(phase1Interval);
          return prev;
        }
        return prev + 2; // Fast increment
      });
    }, 30);
    intervals.push(phase1Interval);

    // Phase 2: Slower progress from 70% to 90% (next 2 seconds)
    const phase2Timeout = setTimeout(() => {
      const phase2Interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(phase2Interval);
            return prev;
          }
          return prev + 0.5; // Slower increment
        });
      }, 100);
      intervals.push(phase2Interval);
    }, 1000);

    // Phase 3: Very slow progress from 90% to 98% (remaining time)
    const phase3Timeout = setTimeout(() => {
      const phase3Interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 98) {
            clearInterval(phase3Interval);
            return prev;
          }
          return prev + 0.1; // Very slow increment
        });
      }, 200);
      intervals.push(phase3Interval);
    }, 3000);

    // Cleanup function
    return () => {
      intervals.forEach(interval => clearInterval(interval));
      clearTimeout(phase2Timeout);
      clearTimeout(phase3Timeout);
    };
  }, [isLoading, duration]);

  return progress;
};
