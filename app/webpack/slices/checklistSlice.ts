import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultChecklistData } from "../defaults/defaults";
import { RootState } from "../store";
import { IPracticumChecklist } from "../types/dataTypes";

const initialState: IPracticumChecklist = defaultChecklistData;

const TextOnlyStr = ["lessonInfo", "additionalInfo"] as const;

type TextOnly = typeof TextOnlyStr[number];
type ScoreOptionKey = keyof Omit<IPracticumChecklist, TextOnly>;
type TextOnlyKey = keyof Pick<IPracticumChecklist, TextOnly>;

type setCommentAction = PayloadAction<{
  key: ScoreOptionKey;
  comment: string;
}>;

type setScoreAction = PayloadAction<{
  key: ScoreOptionKey;
  score: string | number;
}>;

type setTextAction = PayloadAction<{
  key: TextOnlyKey;
  text: string;
}>;

export const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    setChecklistComment: (state, action: setCommentAction) => {
      const { key, comment } = action.payload;
      return { ...state, [key]: { score: state[key].score, comment } };
    },
    setChecklistScore: (state, action: setScoreAction) => {
      const { key, score } = action.payload;
      return { ...state, [key]: { comment: state[key].comment, score } };
    },
    setChecklistText: (state, action: setTextAction) => {
      const { key, text } = action.payload;
      return { ...state, [key]: text };
    },
    resetChecklist: () => {
      return initialState;
    },
  },
});

export const {
  setChecklistComment,
  setChecklistScore,
  setChecklistText,
  resetChecklist,
} = checklistSlice.actions;

export const selectChecklist = (state: RootState) => state.checklist;

export default checklistSlice.reducer;

export const isTextOnly = (x: any): x is TextOnly => TextOnlyStr.includes(x);

export const isScoreOption = (x: any): x is ScoreOptionKey =>
  !TextOnlyStr.includes(x);
