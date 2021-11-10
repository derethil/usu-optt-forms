import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultNotebookCheck } from "../defaults/defaults";
import { RootState } from "../store";
import { INotebookCheck } from "../types/dataTypes";
import { Location } from "../types/types";
import getNotebookCheck from "../utils/notebookCheckUtils";
import { setFormInfo, setLocationOrObservation } from "./formInfoSlice";

const initialState: INotebookCheck = defaultNotebookCheck;

type ActionType = PayloadAction<{
  score: number;
  index: number;
  key: keyof INotebookCheck;
}>;

export const notebookChecksSlice = createSlice({
  name: "notebookChecks",
  initialState,
  reducers: {
    setNotebookChecks: (state, action: ActionType) => {
      const { score, index, key } = action.payload;
      state[key][index] = { content: state[key][index].content, score };
    },
    setCurrentChecks: (state, action: PayloadAction<INotebookCheck>) => {
      return { ...action.payload };
    },
    resetNotebookChecks: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLocationOrObservation, (state, action) => {
      console.log("Am I being ran?");
      const { location, observation } = action.payload;

      const numbered = getNotebookCheck(
        location === Location.logan,
        observation
      );
      const final = getNotebookCheck(location === Location.logan);

      return { numbered, final };
    });
  },
});

export const { setNotebookChecks, setCurrentChecks, resetNotebookChecks } =
  notebookChecksSlice.actions;

export const selectNotebookChecks = (state: RootState) => state.notebookChecks;

export default notebookChecksSlice.reducer;
