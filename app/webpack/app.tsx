import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import _rubricData from "../rubrics/studentTeaching.json";

import FormInformation from "./components/FormInformation";
import DataSTO from "./components/DataSTO";
import RubricSTO from "./components/RubricSTO";
import { FeedbackPage } from "./components/FeedbackPage";
import useTimer from "./hooks/useTimer";

import { useDefaultObjState } from "./hooks/hooks";
import { ScoresState, Section } from "./types";
import { defaultData, defaultComments, defaultFormInfo } from "./defaults";
import { PageBaseDiv } from "./styledComponents/style";
import { NotFound } from "./pages/NotFound";

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  rubricData.forEach(section => {
    initialState[section.sectionTitle] = {};
    section.rows.forEach(row => {
      initialState[section.sectionTitle][row.area] = String(row.options[row.options.length - 1].score);
    });
  });

  return initialState;
}


export const FormSTO = () => {
  const rubricData = _rubricData as Section[];

  const [formInfo, updateFormInfo, resetFormInfo] = useDefaultObjState(defaultFormInfo);

  const [scores, updateScores, resetScores] = useDefaultObjState(getInitialState(rubricData));

  const updateScore = (section: string, row: string, updatedScore: string) => {
    updateScores({
      [section]: {
        ...scores[section],
        [row]: updatedScore
      }
    });
  }

  const [data1, setData1, resetData1] = useDefaultObjState(defaultData);
  const [data2, setData2, resetData2] = useDefaultObjState(defaultData);

  const timer1 = useTimer();
  const timer2 = useTimer();

  const [comments, updateComments, resetComments] = useDefaultObjState(defaultComments());

  const resetAll = (): void => {
    resetScores();
    resetData1();
    resetData2();
    timer1.handleReset();
    timer2.handleReset();
    resetFormInfo();
    resetComments();
  }



  return (
    <PageBaseDiv>
      <BrowserRouter>
        <div id="tabs">
          <Link to="/">Home</Link>
          <Link to="/rubric">Rubric</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/data1">Data 1</Link>
          <Link to="/data2">Data 2</Link>
        </div>

        <Switch>
          <Route exact path="/">
            <FormInformation
              formInfo={formInfo}
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
            <RubricSTO scores={scores} rubricData={rubricData} updateScore={updateScore} />
          </Route>

          <Route path="/data1">
            <DataSTO data={data1} setData={setData1} timer={timer1} />
          </Route>

          <Route path="/data2">
            <DataSTO data={data2} setData={setData2} timer={timer2} />
          </Route>

          <Route path="/feedback">
            <FeedbackPage comments={comments} updateComments={updateComments} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>

      </BrowserRouter>
    </PageBaseDiv>
  )
}

const RootComponent = () => {
  return <FormSTO />
}

const entry = document.getElementById("app-root");
ReactDom.render(<RootComponent />, entry);