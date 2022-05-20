import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import currentForm, { formOptions } from "../currentForm";
import FormData from "../FormData";
import { RootState } from "../store";
import { ScoresState, Section, Option } from "../types/types";
import { findMaxScore } from "../utils/utils";

interface JSONOption {
  content: string | string[];
  score: string | number;
  continued?: boolean;
  default?: boolean;
}

function getInitialScore(score: any): string {
  if (Array.isArray(score)) {
    return score.join("//");
  } else if (typeof score === "number") {
    return String(score);
  } else {
    return score;
  }
}

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  if (currentForm !== formOptions.STRubric) {
    rubricData.forEach((section) => {
      initialState[section.sectionTitle] = {};
      section.rows.forEach((row) => {
        const initialOption = row.options.find((e) => e.default === true)!;

        let score;
        if (initialOption.score === undefined) {
          score = getInitialScore(initialOption.content);
        } else {
          score = getInitialScore(initialOption.score);
        }

        initialState[section.sectionTitle][row.area] = {
          score: score,
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
