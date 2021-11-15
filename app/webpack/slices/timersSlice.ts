import {
  CaseReducerActions,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { useRef } from "react";
import { defaultComments, IComments } from "../defaults/defaults";
import { RootState } from "../store";

export interface ITimerState {
  value: number;
  isActive: boolean;
  isPaused: boolean;
}

export type ITimerActions = CaseReducerActions<{
  start: (state: WritableDraft<ITimerState>) => void;
  pause: (state: WritableDraft<ITimerState>) => void;
  resume: (state: WritableDraft<ITimerState>) => void;
  reset: () => void;
  increment: (state: WritableDraft<ITimerState>) => void;
}>;

const initialState: ITimerState = { value: 0, isActive: false, isPaused: true };

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

const timerSlice1 = createTimerSlice("timer1");
const timerSlice2 = createTimerSlice("timer2");
const timerSlice3 = createTimerSlice("timer3");

export const timerReducer1 = timerSlice1.reducer;
export const timerReducer2 = timerSlice2.reducer;
export const timerReducer3 = timerSlice3.reducer;

const timerActions1: ITimerActions = timerSlice1.actions;
const selectTimer1 = timerSlice1.selectTimer;

const timerActions2: ITimerActions = timerSlice2.actions;
const selectTimer2 = timerSlice2.selectTimer;

const timerActions3: ITimerActions = timerSlice3.actions;
const selectTimer3 = timerSlice3.selectTimer;

export interface ITimer {
  selector: (state: RootState) => typeof initialState;
  actions: ITimerActions;
}

export const timer1: ITimer = {
  selector: selectTimer1,
  actions: timerActions1,
};

export const timer2: ITimer = {
  selector: selectTimer2,
  actions: timerActions2,
};

export const timer3: ITimer = {
  selector: selectTimer3,
  actions: timerActions3,
};
