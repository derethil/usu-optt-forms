// TIMER LOCALSTORAGE UTILS
import { ITimer } from "./types";

export const setTimerStorage = (key: string, time: number) => {
  window.localStorage.setItem(key, String(time));
}

export const getTimerStorage = (key: string) => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : 0;
}

export const resetTimerStorage = async (key: string) => {
  window.localStorage.removeItem(key);
}