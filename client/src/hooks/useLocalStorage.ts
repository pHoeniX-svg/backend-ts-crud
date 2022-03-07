/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';

type HookReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const getLocalValue = <T>(key: string, initialValue?: T): T => {
  // for SSRs Next.js
  if (typeof window === 'undefined') return initialValue as T;

  // if a value is already store
  const localValue = JSON.parse(localStorage.getItem(key)!);
  if (localValue) return localValue;

  // return result of a function
  if (initialValue instanceof Function) return initialValue();

  return initialValue as T;
};

const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): HookReturnType<T> => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export { useLocalStorage };
