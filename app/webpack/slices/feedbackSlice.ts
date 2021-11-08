import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultComments, IComments } from "../defaults/defaults";
import { RootState } from "../store/store";

const initialState: IComments = defaultComments;

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedback: (state, action: PayloadAction<Partial<IComments>>) => {
      return { ...state, ...action.payload };
    },
    resetFeedback: () => {
      return initialState;
    },
  },
});

export const { setFeedback, resetFeedback } = feedbackSlice.actions;

export const selectFeedback = (state: RootState) => state.feedback;

export default feedbackSlice.reducer;
