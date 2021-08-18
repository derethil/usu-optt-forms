import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import _rubricData from "../rubrics/studentTeaching.json";

import FormHome from "./pages/FormHome";
import Data from "./pages/Data";
import RubricSTO from "./pages/Rubric";
import FeedbackPage from "./pages/FeedbackPage";
import Navbar from "./routing/Navbar";
import NotFound from "./pages/NotFound";
import useTimer from "./hooks/useTimer";

import { useObjLocalStorage } from "./hooks/localStorage";
import { ScoresState, Section } from "./types";
import { defaultData, defaultComments, defaultFormInfo } from "./defaults";
import { PageContainer, PageHeader, Title } from "./styledComponents/style";

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  rubricData.forEach((section) => {
    initialState[section.sectionTitle] = {};
    section.rows.forEach((row) => {
      initialState[section.sectionTitle][row.area] = String(
        row.options[row.options.length - 1].score
      );
    });
  });

  return initialState;
};

export const FormSTO = () => {
  const rubricData = _rubricData as Section[];

  const [formInfo, updateFormInfo, resetFormInfo] = useObjLocalStorage(
    "formInfo",
    defaultFormInfo
  );

  const [scores, updateScores, resetScores] = useObjLocalStorage(
    "scores",
    getInitialState(rubricData)
  );

  const updateScore = (section: string, row: string, updatedScore: string) => {
    updateScores({
      [section]: {
        ...scores[section],
        [row]: updatedScore,
      },
    });
  };

  const [data1, setData1, resetData1] = useObjLocalStorage(
    "data1",
    defaultData
  );
  const [data2, setData2, resetData2] = useObjLocalStorage(
    "data2",
    defaultData
  );

  const timer1 = useTimer("timer1");
  const timer2 = useTimer("timer2");

  const [comments, updateComments, resetComments] = useObjLocalStorage(
    "comments",
    defaultComments()
  );

  const resetAll = (): void => {
    resetScores();
    resetData1();
    resetData2();
    timer1.handleReset();
    timer2.handleReset();
    resetFormInfo();
    resetComments();
  };

  return (
    <PageContainer>
      <BrowserRouter>
        <PageHeader>
          <Title>Student Teaching Observation Form</Title>
        </PageHeader>

        <Navbar studentTeacher={formInfo.studentTeacher} />

        <Switch>
          <Route exact path="/">
            <FormHome
              formInfo={formInfo}
              comments={comments}
              scores={scores}
              data1={data1}
              data2={data2}
              timer1={timer1}
              timer2={timer2}
              resetAll={resetAll}
              updateFormInfo={updateFormInfo}
            />
          </Route>

          <Route path="/rubric">
            <RubricSTO
              scores={scores}
              rubricData={rubricData}
              updateScore={updateScore}
            />
          </Route>

          <Route path="/data1">
            <Data
              data={data1}
              setData={setData1}
              timer={timer1}
              timerKey="timer1"
              title="Data 1"
              resetCallback={resetData1}
            />
          </Route>

          <Route path="/data2">
            <Data
              data={data2}
              setData={setData2}
              timer={timer2}
              timerKey="timer2"
              title="Data 2"
              resetCallback={resetData2}
            />
          </Route>

          <Route path="/feedback">
            <FeedbackPage comments={comments} updateComments={updateComments} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </PageContainer>
  );
};

const RootComponent = () => {
  return <FormSTO />;
};

const entry = document.getElementById("app-root");
ReactDom.render(<RootComponent />, entry);
