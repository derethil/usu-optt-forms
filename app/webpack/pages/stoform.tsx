import React from "react";
import styled from "styled-components";

import { FormInformation } from "../components/formInformation";
import { RubricSTO } from "../components/rubricsto";

import { useDefaultObjState } from "../hooks";

import { Section, ScoresState } from "../types";

import _rubricData from "../../rubrics/studentTeaching.json";

const PageBaseDiv = styled.div`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  text-align: left;

  display: flex;
  justify-content: flex-end;
`;

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  rubricData.forEach(section => {
    initialState[section.sectionTitle] = {};
    section.rows.forEach(row => {
      initialState[section.sectionTitle][row.area] = "0";
    });
  });

  return initialState;
}


export const STOForm = () => {
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

  return (
    <PageBaseDiv>
      <FormInformation scores={scores} />
      <RubricSTO scores={scores} rubricData={rubricData} updateScore={updateScore} />
    </PageBaseDiv>
  )
}