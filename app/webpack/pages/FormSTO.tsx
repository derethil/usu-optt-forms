import React from "react";
import styled from "styled-components";
import _rubricData from "../../rubrics/studentTeaching.json";
import DataSTO from "../components/DataSTO";
import FormInformation from "../components/FormInformation";
import RubricSTO from "../components/RubricSTO";
import Tabs from "../components/tabs";
import Timer from "../components/Timer";
import useTimer from "../hooks/useTimer";
import { useDefaultObjState } from "../hooks/hooks";
import { TabsContainer } from "../styledComponents/style";
import { ScoresState, Section, defaultData } from "../types";

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



  return (
    <PageBaseDiv>
      <FormInformation scores={scores} data1={data1} data2={data2} timer1={timer1} timer2={timer2} />

      <Tabs default="rubric">

        <TabsContainer className="tabs">
          <Tabs.Tab label="rubric">Rubric</Tabs.Tab>
          <Tabs.Tab label="data1">Record Data 1</Tabs.Tab>
          <Tabs.Tab label="data2">Record Data 2</Tabs.Tab>
        </TabsContainer>


        <Tabs.Panel label="rubric">
          <RubricSTO scores={scores} rubricData={rubricData} updateScore={updateScore} />
        </Tabs.Panel>

        <Tabs.Panel label="data1">
          <DataSTO data={data1} setData={setData1} timer={timer1} />
        </Tabs.Panel>

        <Tabs.Panel label="data2">
          <DataSTO data={data2} setData={setData2} timer={timer2} />
        </Tabs.Panel>


      </Tabs>
    </PageBaseDiv>
  )
}