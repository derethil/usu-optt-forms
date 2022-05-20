import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import currentForm, { formOptions } from "../currentForm";
import FormData from "../FormData";
import { RootState } from "../store";
import { ScoresState, Section } from "../types/types";
import { findMaxScore } from "../utils/utils";

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  if (currentForm !== formOptions.STRubric) {
    rubricData.forEach((section) => {
      initialState[section.sectionTitle] = {};
      section.rows.forEach((row) => {
        let minScore: number | string = Math.min(
          ...row.options.map((e) => Number(e.score))
        );

        if (isNaN(minScore) && Array.isArray(row.options[0].content)) {
          row.options.reverse();
          minScore = row.options[0].content.join("//");
        }

        const initialScore = row.options.map((e) => e.score).includes("Yes")
          ? "Yes"
          : String(minScore);

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
      let maxScore = findMaxScore(row);
      initialState[section.sectionTitle][row.area] = {
        score: "0",
        maxScore: String(maxScore),
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
