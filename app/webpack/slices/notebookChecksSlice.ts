import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultNotebookCheck } from "../defaults/defaults";
import { RootState } from "../store";
import { INotebookCheck } from "../types/dataTypes";

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
});

export const { setNotebookChecks, setCurrentChecks, resetNotebookChecks } =
  notebookChecksSlice.actions;

export const selectNotebookChecks = (state: RootState) => state.notebookChecks;

export default notebookChecksSlice.reducer;
