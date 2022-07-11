import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultStudentTeachingRubricData } from "../defaults/defaultData";
import { RootState } from "../store";
import { IStudentTeachingRubric } from "../types/dataTypes";

const initialState: IStudentTeachingRubric = defaultStudentTeachingRubricData;

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<Partial<IStudentTeachingRubric>>) => {
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
