import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import currentForm, { formOptions } from "../currentForm";
import FormData from "../FormData";
import { RootState } from "../store";
import { ScoresState, Section } from "../types/types";

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  if (currentForm !== formOptions.STRubric) {
    rubricData.forEach((section) => {
      initialState[section.sectionTitle] = {};
      section.rows.forEach((row) => {
        const initialScore =
          row.options[0].score === "Yes"
            ? "Yes"
            : String(row.options[row.options.length - 1].score);

        initialState[section.sectionTitle][row.area] = {
          score: initialScore,
          comment: "",
        };
      });
    });
    return initialState;
  }

  rubricData.forEach((section, idx) => {
    initialState[section.sectionTitle] = {};

    section.rows.forEach((row) => {
      initialState[section.sectionTitle][row.area] = {
        score: "0",
        maxScore: String(row.options[0].score),
        comment: "",
      };
    });
  });

  return initialState;
};

const initialState: ScoresState = getInitialState(FormData[currentForm].rubric);

interface UpdateScoreType {
  section: string;
  row: string;
  newScore: string;
  newComment: string;
}

export const rubricSlice = createSlice({
  name: "rubric",
  initialState,
  reducers: {
    setRubricScore: (
      state,
      action: PayloadAction<Omit<UpdateScoreType, "newComment">>
    ) => {
      const { section, row, newScore } = action.payload;
      state[section][row].score = newScore;
    },
    setRubricComment: (
      state,
      action: PayloadAction<Omit<UpdateScoreType, "newScore">>
    ) => {
      const { section, row, newComment } = action.payload;
      state[section][row].comment = newComment;
    },
    resetRubric: () => {
      return initialState;
    },
  },
});

export const { setRubricScore, setRubricComment, resetRubric } =
  rubricSlice.actions;

export const selectRubric = (state: RootState) => state.rubric;

export default rubricSlice.reducer;
