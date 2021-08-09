import { useState } from "react";

// Provide an additional function to reset state back to initial value
export const useDefaultState = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  return [value, setValue, () => setValue(initialValue)];
};

// Update individual values in state object if needed

export const useDefaultObjState = <T extends object>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    (updatedValues: Partial<T>) => setValue({ ...value, ...updatedValues }),
    () => setValue(initialValue),
  ] as [T, (updatedValues: Partial<T>) => void, () => void];
};
