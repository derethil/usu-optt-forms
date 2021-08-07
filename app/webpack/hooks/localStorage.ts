import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;

    } catch (error) {
      console.error(error);
      return initialValue;
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue])

  const resetValue = () => {
    setStoredValue(initialValue);
  }

  return [storedValue, setStoredValue, resetValue];
}

export const useObjLocalStorage = <T extends object>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);

  const setValue = (value: Partial<T>) => {
    setStoredValue({ ...storedValue, ...value });
  }

  const resetValue = () => {
    setStoredValue(initialValue);
  }

  return [storedValue, setValue, resetValue];
}