import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultFormInfo } from "../defaults/defaults";
import { RootState } from "../store";
import { IFormInfo } from "../types/types";

const initialState: IFormInfo = defaultFormInfo;

export const formInfoSlice = createSlice({
  name: "formInfo",
  initialState,
  reducers: {
    setFormInfo: (state, action: PayloadAction<Partial<IFormInfo>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetFormInfo: () => {
      return initialState;
    },
  },
});

export const { setFormInfo, resetFormInfo } = formInfoSlice.actions;

export const selectFormInfo = (state: RootState) => state.formInfo;

export const selectStudentTeacher = (state: RootState) =>
  state.formInfo.studentTeacher;

export const selectCheckInfo = (state: RootState) => {
  return {
    location: state.formInfo.location,
    observation: state.formInfo.observation,
  };
};

export default formInfoSlice.reducer;
