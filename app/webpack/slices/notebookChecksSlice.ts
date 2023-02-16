import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultNotebookCheck } from "../defaults/defaults";
import { RootState } from "../store";
import { INotebookCheck } from "../types/dataTypes";
import { Location } from "../types/types";
import getNotebookCheck, { ObservationKey } from "../utils/notebookCheckUtils";
import { setFormInfo, setLocationOrObservation } from "./formInfoSlice";

const initialState: INotebookCheck = defaultNotebookCheck;

type ActionType = PayloadAction<{
  score: string;
  isNA: boolean;
  index: number;
}>;

export const notebookChecksSlice = createSlice({
  name: "notebookChecks",
  initialState,
  reducers: {
    setNotebookChecks: (state, action: ActionType) => {
      const { score, index, isNA } = action.payload;
      state[index] = { ...state[index], score, isNA };
    },
    resetNotebookChecks: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLocationOrObservation, (state, action) => {
      const { location, observation } = action.payload;

      const notebookCheck = getNotebookCheck(location, observation as ObservationKey);

      return notebookCheck;
    });
  },
});

export const { setNotebookChecks, resetNotebookChecks } = notebookChecksSlice.actions;

export const selectNotebookChecks = (state: RootState) => state.notebookChecks;

export default notebookChecksSlice.reducer;
