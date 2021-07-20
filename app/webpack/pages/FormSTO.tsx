import React from "react";
import styled from "styled-components";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import _rubricData from "../../rubrics/studentTeaching.json";

import FormInformation from "../components/FormInformation";
import DataSTO from "../components/DataSTO";
import RubricSTO from "../components/RubricSTO";
import useTimer from "../hooks/useTimer";
import { useDefaultObjState } from "../hooks/hooks";
import { ScoresState, Section } from "../types";
import { defaultData, defaultComments } from "../defaults";
import { FeedbackPage } from "../components/FeedbackPage";


const PageBaseDiv = styled.div`
  margin-left: 45em;
  width: 100%;

  font-family: 'Poppins', sans-serif;
  text-align: left;
`;

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

  const [comments, updateComments] = useDefaultObjState(defaultComments);



  return (
    <PageBaseDiv>
      <FormInformation scores={scores} data1={data1} data2={data2} timer1={timer1} timer2={timer2} />

      <BrowserRouter>
        <div id="tabs">
          <Link to="/rubric">Rubric</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/data1">Data 1</Link>
          <Link to="/data2">Data 2</Link>
        </div>

        <Switch>
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
        </Switch>

      </BrowserRouter>
    </PageBaseDiv>
  )
}