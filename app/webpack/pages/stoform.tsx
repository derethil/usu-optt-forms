import React from "react";
import styled from "styled-components";

import { FormInformation } from "../components/formInformation";
import { RubricSTO } from "../components/rubricsto";

import { useDefaultObjState } from "../hooks";

import { Section, ScoresState } from "../types";

import _rubricData from "../../rubrics/studentTeaching.json";

const PageBaseDiv = styled.div`
  margin-left: 45em;
  width: 100%;
  display: flex;

  font-family: 'Poppins', sans-serif;
  text-align: left;

  /* justify-content: flex-end; */
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