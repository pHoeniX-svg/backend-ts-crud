import { useLocalStorage } from './useLocalStorage';

type ReturnType<T> = [boolean | T, (value: T) => void];

const useToggle = <T>(key: string, initialValue: T): ReturnType<T> => {
  const [state, setState] = useLocalStorage<boolean | T>(key, initialValue);

  const toggle = (value: T) => {
    setState((prev) => {
      return typeof value === 'boolean' ? value : !prev;
    });
  };

  return [state, toggle];
};

export { useToggle };
