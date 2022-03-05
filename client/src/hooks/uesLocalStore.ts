import { useEffect, useState } from 'react';

type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const useLocalStore = <T>(
  key: string,
  initialValue?: T
): ReturnType<T> => {
  const [state, setState] = useState<T>(() => {
    if (!initialValue) return;

    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      const e = error as Error;
      console.warn(`Error: Reading localStorage key “${key}”:`, e);
      return initialValue;
    }
  });

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        const e = error as Error;
        console.warn(`Error: Setting localStorage key “${key}”:`, e);
      }
    }
  }, [state, key]);

  return [state, setState];
};
