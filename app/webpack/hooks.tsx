
import { useState, useRef } from "react";

import { Partial } from "./types";

// Provide an additional function to reset state back to initial value
export const useDefaultState = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    setValue,
    () => setValue(initialValue)
  ]
}

// Update individual values in state object if needed

export const useObjState = <T extends object>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    (updatedValues: Partial<T>) => setValue({ ...value, ...updatedValues }),
  ] as [T, (updatedValues: Partial<T>) => void]
}

export const useDefaultObjState = <T extends object>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    (updatedValues: Partial<T>) => setValue({ ...value, ...updatedValues }),
    () => setValue(initialValue)
  ] as [T, (updatedValues: Partial<T>) => void, () => void]
}

// Boolean-only state
export const useBoolState = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    () => setValue(!value)
  ] as [boolean, () => void]
}

export const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef<NodeJS.Timeout | null>(null);

  // Timer Controls
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer: number) => timer + 1);
    }, 1000);

  }

  const handlePause = () => {
    clearInterval(countRef.current as NodeJS.Timeout);
    setIsPaused(true);
  }

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer: number) => timer + 1);
    }, 1000);
  }

  const handleReset = () => {
    clearInterval(countRef.current as NodeJS.Timeout);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  }

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
}