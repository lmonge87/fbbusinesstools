import { useEffect, useState } from 'react';

const PREFIX = 'fbtools-';

export function useSessionStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = sessionStorage.getItem(prefixedKey);

      return jsonValue ? JSON.parse(jsonValue) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    sessionStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
