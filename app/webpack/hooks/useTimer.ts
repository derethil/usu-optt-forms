import { useState, useRef } from "react";

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
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

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
}

export default useTimer;