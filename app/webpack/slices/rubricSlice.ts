import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import currentForm, { formOptions } from "../currentForm";
import FormData from "../FormData";
import { RootState } from "../store";
import { ScoresState, Section, Option, RubricScore } from "../types/types";
import { findMaxScore } from "../utils/utils";

interface JSONOption {
  content: string | string[];
  score: string | number;
  continued?: boolean;
  default?: boolean;
}

function getInitialScore(score: any): string {
  if (Array.isArray(score)) {
    const joined = score.join("//");
    return joined.includes("//") ? joined : "//" + joined;
  } else if (typeof score === "number") {
    return String(score);
  } else {
    return score;
  }
}

const getInitialState = (rubricData: Section[]) => {
  let initialState: ScoresState = {};

  if (currentForm !== formOptions.studentTeachingRubric) {
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
  newScore: string | string[];
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
      let { section, row, newScore } = action.payload;

      if (Array.isArray(newScore)) {
        newScore = "//".concat(newScore.join("//"));
      }

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

export const { setRubricScore, setRubricComment, resetRubric } = rubricSlice.actions;

export const selectRubric = (state: RootState) => {
  let rubric: ScoresState = {};

  Object.entries(state.rubric).forEach(([areaTitle, area]) => {
    rubric[areaTitle] = {};

    Object.entries(area).forEach(([rowTitle, row]) => {
      let scoreStr = row.score as string;

      if (scoreStr.includes("//")) {
        let score = scoreStr.split("//").filter((el) => el);
        rubric[areaTitle][rowTitle] = { ...row, score };
      } else {
        rubric[areaTitle][rowTitle] = row;
      }
    });
  });

  return rubric;
};

export default rubricSlice.reducer;
