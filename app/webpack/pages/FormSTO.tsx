import React from "react";
import styled from "styled-components";

import FormInformation from "../components/FormInformation";
import RubricSTO from "../components/RubricSTO";
import DataSTO from "../components/DataSTO";
import Tabs from "../components/tabs";

import { useDefaultObjState } from "../hooks/hooks";
import { Section, ScoresState } from "../types";
import { TabsContainer } from "../styledComponents/style";

import _rubricData from "../../rubrics/studentTeaching.json";

const PageBaseDiv = styled.div`
  margin-left: 45em;
  width: 100%;

  font-family: 'Poppins', sans-serif;
  text-align: left;
`;

const defaultData = {
  cues: {
    individual: 0,
    group: 0
  },
  praise: {
    general: 0,
    academic: 0,
    behavioral: 0,
    reprimand: 0
  },
  corrections: {
    correct: 0,
    incorrect: 0,
    none: 0
  },
  engagement: {
    engaged: 0,
    notEngaged: 0
  },
  misc: {
    scanningCount: 0,
    transitionCount: 0
  }
}

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

  return (
    <PageBaseDiv>
      <FormInformation scores={scores} />

      <Tabs default="data1">

        <TabsContainer className="tabs">
          <Tabs.Tab label="rubric">Rubric</Tabs.Tab>
          <Tabs.Tab label="data1">Record Data 1</Tabs.Tab>
          <Tabs.Tab label="data2">Record Data 2</Tabs.Tab>
        </TabsContainer>


        <Tabs.Panel label="rubric">
          <RubricSTO scores={scores} rubricData={rubricData} updateScore={updateScore} />
        </Tabs.Panel>

        <Tabs.Panel label="data1">
          <DataSTO data={data1} setData={setData1} />
        </Tabs.Panel>

        <Tabs.Panel label="data2">
          <DataSTO data={data2} setData={setData2} />
        </Tabs.Panel>


      </Tabs>
    </PageBaseDiv>
  )
}