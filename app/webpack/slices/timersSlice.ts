import {
  CaseReducerActions,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { useRef } from "react";
import { defaultComments, IComments } from "../defaults/defaults";
import { RootState } from "../store";

export interface ITimer {
  value: number;
  isActive: boolean;
  isPaused: boolean;
}

export type ITimerActions = CaseReducerActions<{
  start: (state: WritableDraft<ITimer>) => void;
  pause: (state: WritableDraft<ITimer>) => void;
  resume: (state: WritableDraft<ITimer>) => void;
  reset: () => void;
  increment: (state: WritableDraft<ITimer>) => void;
}>;

const initialState: ITimer = { value: 0, isActive: false, isPaused: true };

function createTimerSlice(sliceName: string) {
  let countRef = undefined;

  const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
      start: (state) => {
        state.isActive = true;
        state.isPaused = false;
      },
      pause: (state) => {
        state.isPaused = true;
      },
      resume: (state) => {
        state.isPaused = false;
      },
      reset: (state) => {
        return initialState;
      },
      increment: (state) => {
        state.value += 1;
      },
    },
  });

  const selectTimer: (state: RootState) => typeof initialState = (
    state: RootState
  ) => {
    return (state as any)[sliceName];
  };

  return {
    slice,
    reducer: slice.reducer,
    actions: slice.actions,
    selectTimer,
  };
}

const timer1 = createTimerSlice("timer1");
const timer2 = createTimerSlice("timer2");
const timer3 = createTimerSlice("timer3");

export const timerActions1: ITimerActions = timer1.actions;
export const selectTimer1 = timer1.selectTimer;

export const timerActions2: ITimerActions = timer2.actions;
export const selectTimer2 = timer2.selectTimer;

export const timerActions3: ITimerActions = timer3.actions;
export const selectTimer3 = timer3.selectTimer;

export const timerReducer1 = timer1.reducer;
export const timerReducer2 = timer2.reducer;
export const timerReducer3 = timer3.reducer;
