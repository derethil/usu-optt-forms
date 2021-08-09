// TIMER LOCALSTORAGE UTILS
import { ITimer } from "../types";

export const setTimerStorage = (key: string, time: number) => {
  window.localStorage.setItem(key, String(time));
};

export const getTimerStorage = (key: string) => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : 0;
};

export const resetTimerStorage = async (key: string) => {
  window.localStorage.removeItem(key);
};

export const formatTime = (timer: number): string => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};
