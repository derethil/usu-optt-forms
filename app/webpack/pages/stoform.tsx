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
  margin: auto;
  text-align: center;

  display: flex;
  justify-content: space-around;
`;

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  rubricData.forEach(section => {
    initialState[section.sectionTitle] = {};
    section.rows.forEach(row => {
      initialState[section.sectionTitle][row.area] = 0;
    });
  });

  return initialState;
}






export const STOForm = () => {
  const rubricData = _rubricData as Section[];
  const [scores, updateScores, resetScores] = useDefaultObjState(getInitialState(rubricData));

  const getSubtotal = (section: string) => {
    const sectionScores = scores[section];

    let sectionTotal = 0;
    Object.keys(sectionScores).map(row => {
      sectionTotal += sectionScores[row];
    });
    return sectionTotal;
  }



  return (
    <PageBaseDiv>
      <FormInformation planningTotal={getSubtotal("Preparation and Planning")} />
      <RubricSTO scores={scores} rubricData={rubricData} updateScores={updateScores} />
    </PageBaseDiv>
  )
}