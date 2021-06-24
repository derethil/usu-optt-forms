
import { useState } from "react";

import { Partial, RecursivePartial } from "./types";

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
    (updatedValues: RecursivePartial<T>) => setValue({ ...value, ...updatedValues }),
  ] as [T, (updatedValues: RecursivePartial<T>) => void]
}

export const useDefaultObjState = <T extends object>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    (updatedValues: RecursivePartial<T>) => setValue({ ...value, ...updatedValues }),
    () => setValue(initialValue)
  ] as [T, (updatedValues: RecursivePartial<T>) => void, () => void]
}

// Boolean-only state
export const useBoolState = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    () => setValue(!value)
  ] as [boolean, () => void]
}