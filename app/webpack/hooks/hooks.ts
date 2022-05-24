import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { selectFeedback } from "../slices/feedbackSlice";
import { selectFormInfo } from "../slices/formInfoSlice";
import { selectNotebookChecks } from "../slices/notebookChecksSlice";
import { selectQuestions } from "../slices/questionsSlice";
import { selectRubric } from "../slices/rubricSlice";
import { timer1, timer2, timer3 } from "../slices/timersSlice";
import type { RootState, AppDispatch } from "../store";
import { IData } from "../types/types";

import {
  data1 as dataReducer1,
  data2 as dataReducer2,
} from "../slices/dataSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSelectAll = (): IData => {
  return {
    formInfo: useAppSelector(selectFormInfo),
    feedback: useAppSelector(selectFeedback),
    checks: useAppSelector(selectNotebookChecks),
    data1: useAppSelector(dataReducer1.selector),
    data2: useAppSelector(dataReducer2.selector),
    timerState1: useAppSelector(timer1.selector),
    timerState2: useAppSelector(timer2.selector),
    timerState3: useAppSelector(timer3.selector),
    rubricScores: useAppSelector(selectRubric),
    questions: useAppSelector(selectQuestions),
  };
};
