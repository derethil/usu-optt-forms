import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ITimerState {
  value: number;
  isActive: boolean;
  isPaused: boolean;
  unmountTime?: number;
}

const initialState: ITimerState = { value: 0, isActive: false, isPaused: true };

function createTimerSlice(sliceName: string) {
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
      reset: () => {
        return initialState;
      },
      increment: (state) => {
        state.value += 1;
      },
      setUnmountTime: (state, action: PayloadAction<number>) => {
        state.unmountTime = action.payload;
      },
      resetUnmountTime: (state) => {
        state.unmountTime = undefined;
      },
      setValue: (state, action: PayloadAction<number>) => {
        state.value = action.payload;
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

export interface ITimer {
  selector: typeof timerSlice1.selectTimer;
  actions: typeof timerSlice1.actions;
}

export const timer1: ITimer = {
  selector: timerSlice1.selectTimer,
  actions: timerSlice1.actions,
};

export const timer2: ITimer = {
  selector: timerSlice2.selectTimer,
  actions: timerSlice2.actions,
};

export const timer3: ITimer = {
  selector: timerSlice3.selectTimer,
  actions: timerSlice3.actions,
};
