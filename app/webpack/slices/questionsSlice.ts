import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultSTRData } from "../defaults/defaultData";
import { RootState } from "../store";
import { ISTRubric } from "../types/dataTypes";

const initialState: ISTRubric = defaultSTRData;

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<Partial<ISTRubric>>) => {
      return { ...state, ...action.payload };
    },
    resetQuestions: () => {
      return initialState;
    },
  },
});

export const { setQuestion, resetQuestions } = questionsSlice.actions;

export const selectQuestions = (state: RootState) => state.questions;

export default questionsSlice.reducer;
