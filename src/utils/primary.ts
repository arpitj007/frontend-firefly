import { useEffect, useState } from "react";

export const NOOP = (): null => null;

export function useDebounce(value: string, delay = 200): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(setDebouncedValue, delay, value);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
