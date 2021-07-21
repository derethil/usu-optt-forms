
import { useState } from "react";

import { Partial } from "../types";

// Provide an additional function to reset state back to initial value
export const useDefaultState = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    setValue,
    () => setValue(initialValue)
  ]
}

// Boolean-only state
export const useBoolState = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    () => setValue(!value)
  ] as [boolean, () => void]
}

export const useIncrement = (initialValue: number) => {
  const [value, setValue] = useState(initialValue);

  const incrementValue = () => setValue(value + 1);
  return { value, incrementValue }
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