/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';

type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const getLocalValue = <T>(key: string, initialValue?: T): T => {
  // for SSRs Next.js
  if (typeof window === 'undefined') return initialValue as T;

  try {
    // return result of a function
    if (initialValue instanceof Function) return initialValue();
    // value already present in store
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (error) {
    const e = error as Error;
    console.warn(`Error: Reading localStorage key “${key}”:`, e);
    return initialValue as T;
  }
};

const useLocalStorage = <T>(key: string, initialValue?: T): ReturnType<T> => {
  const [state, setState] = useState<T>(() => {
    return getLocalValue(key, initialValue);
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

export { useLocalStorage };
