import { useState, useRef } from "react";
import { useLocalStorage } from "./localStorage";

const useTimer = (key?: string, initialState = 0) => {
  const [time, setTimer] =
    key ? useLocalStorage(key, initialState) : useState(initialState);


  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const countRef = useRef<NodeJS.Timeout | null>(null);

  // Timer Controls
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer: number) => timer + 1);
    }, 1000);

  }

  const handlePause = () => {
    clearInterval(countRef.current as NodeJS.Timeout);
    setIsPaused(true);
  }

  const handleResume = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer: number) => timer + 1);
    }, 1000);
  }

  const handleReset = () => {
    clearInterval(countRef.current as NodeJS.Timeout);
    setIsActive(false);
    setIsPaused(true);
    setTimer(initialState);
  }

  return { time, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
}




export default useTimer;