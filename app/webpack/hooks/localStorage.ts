import { useState } from "react";

export const useLocalStorage = <T extends any>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;

    } catch (error) {
      console.log(error);
      return initialValue;
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

    } catch (error) {
      console.log(error);
    }
  }

  const resetValue = () => {
    setStoredValue(initialValue);
  }

  return [storedValue, setValue, resetValue];
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