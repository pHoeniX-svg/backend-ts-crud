import { ChangeEvent } from 'react';
import { useLocalStorage } from '~src/hooks';

type HookReturnType<T> = [
  T,
  () => void,
  {
    state: T;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }
];

const useInput = <T>(key: string, initialValue: T): HookReturnType<T> => {
  const [state, setState] = useLocalStorage<T>(key, initialValue);

  const reset = () => setState(initialValue);

  const attributeObject = {
    state,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value as unknown as T);
    },
  };

  return [state, reset, attributeObject];
};

export { useInput };
