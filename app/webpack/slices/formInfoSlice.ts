import { createSlice } from "@reduxjs/toolkit";
import { defaultFormInfo } from "../defaults/defaults";
import { RootState } from "../store/store";
import { IFormInfo } from "../types/types";

const initialState: IFormInfo = defaultFormInfo;

export const formInfoSlice = createSlice({
  name: "formInfo",
  initialState,
  reducers: {
    setFormInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setFormInfo } = formInfoSlice.actions;
export const selectFormInfo = (state: RootState) => state.formInfo;

export default formInfoSlice.reducer;
