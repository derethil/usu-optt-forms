import React from "react";
import styled from "styled-components";

import { FormInformation } from "../components/FormInformation";
import { RubricSTO } from "../components/RubricSTO";
import { DataSTO } from "../components/DataSTO";
import { Tabs } from "../components/tabs";

import { useDefaultObjState } from "../hooks";
import { Section, ScoresState } from "../types";
import { TabsContainer } from "../styledComponents/style";

import _rubricData from "../../rubrics/studentTeaching.json";

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

  return (
    <PageBaseDiv>
      <FormInformation scores={scores} />

      <Tabs default="rubric">

        <TabsContainer className="tabs">
          <Tabs.Tab label="rubric">Rubric</Tabs.Tab>
          <Tabs.Tab label="data1">Record Data 1</Tabs.Tab>
        </TabsContainer>


        <Tabs.Panel label="rubric">
          <RubricSTO scores={scores} rubricData={rubricData} updateScore={updateScore} />
        </Tabs.Panel>

        <Tabs.Panel label="data1">
          <DataSTO />
        </Tabs.Panel>


      </Tabs>
    </PageBaseDiv>
  )
}