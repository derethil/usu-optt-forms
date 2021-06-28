import React, { useDebugValue } from "react";
import styled from "styled-components";

import { TextInput } from "./textInput";
import { OptionRow } from "./optionRow";
import { useDefaultObjState } from "../hooks";
import { Label, FormInfo, InputContainer } from "../styledComponents/style";

import { ScoresState, Section } from "../types";

import _rubricData from "../../rubrics/studentTeaching.json";

export const FormInformation = ({ scores }: { scores: ScoresState }) => {
  const rubricData = _rubricData as Section[];

  const [formInfo, updateFormInfo, resetFormInfo] = useDefaultObjState({
    studentTeacher: "",
    cooperatingTeacher: "",
    supervisor: "",
    date: new Date().toISOString().slice(0, 10),
    observation: 1,
    other: "",
    program: "Mild/Moderate"
  });

  const getSubtotal = (section: string) => {
    const sectionScores = scores[section];
    return Object.values(sectionScores).reduce((total, value) => {
      if (isNaN(Number(value))) return total;
      return total + Number(value)
    }, 0);
  }

  const getMaxSubtotal = (section: string) => {
    const sectionData = rubricData.find(el => el.sectionTitle === section);
    const sectionScores = scores[section];

    const maxBefore = sectionData?.rows.reduce((total, row) => total + row.options[0].score, 0); // Find max based on json
    const nanRows = Object.keys(sectionScores).filter(key => sectionScores[key] === "N/A"); // Find rows whose score is N/A

    return Object.keys(sectionScores).reduce((total, scoreArea) => { // Subtract max score from any row marked as N/A
      if (!nanRows.includes(scoreArea)) return total;
      return total! - sectionData?.rows.find(el => el.area === scoreArea)?.options[0].score!;
    }, maxBefore);
  }

  const sections = rubricData.map(section => section.sectionTitle);

  const totals = sections.map((section, index) => {
    return <h3 key={index}>{section} Score: {getSubtotal(section)} / {getMaxSubtotal(section)}</h3>
  })

  return (
    <FormInfo>
      <h1>Student Teaching Observation Form</h1>

      <TextInput
        value={formInfo.studentTeacher}
        updateFormInfo={updateFormInfo}
        field="studentTeacher"
      />
      <TextInput
        value={formInfo.cooperatingTeacher}
        updateFormInfo={updateFormInfo}
        field="cooperatingTeacher"
      />
      <TextInput
        value={formInfo.supervisor}
        updateFormInfo={updateFormInfo}
        field="supervisor"
      />

      <InputContainer>
        <Label htmlFor="date">Date</Label>

        <input
          type="date"
          name="data"
          id="datepicker"
          value={formInfo.date}
          onChange={(e) => updateFormInfo({ "date": e.target.value })}
        />
      </InputContainer>



      <TextInput
        value={formInfo.other}
        updateFormInfo={updateFormInfo}
        field="other"
      />


      <OptionRow
        title={"Observation Number"}
        contentOptions={["1", "2", "3", "4", "5"]}
        currSelection={formInfo.observation.toString()}
        updateSelection={(newSelection: string) => updateFormInfo({ "observation": Number(newSelection) })}
      />

      <OptionRow
        title={"Program"}
        contentOptions={["Mild/Moderate", "Severe", "Birth to 5"]}
        currSelection={formInfo.program}
        updateSelection={(newSelection: string) => updateFormInfo({ "program": newSelection })}
      />

      {totals}



    </FormInfo >
  )
}