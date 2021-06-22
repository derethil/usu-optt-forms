import React from "react";
import styled from "styled-components";

import { TextInput } from "./textInput";
import { useDefaultObjState } from "../hooks";
import { Label } from "../styledComponents/label";
import { OptionRow } from "./optionRow";

const FormInfo = styled.div`
  display: inline-block;
  text-align: right;
`;


export const FormInformation = () => {
  const [formInfo, updateFormInfo, resetFormInfo] = useDefaultObjState({
    studentTeacher: "",
    cooperatingTeacher: "",
    supervisor: "",
    date: new Date().toISOString().slice(0, 10),
    observation: 1,
    other: "",
    program: "Mild/Moderate"
  });

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

      <Label htmlFor="date">Date</Label>

      <input
        type="date"
        name="data"
        id="datepicker"
        value={formInfo.date}
        onChange={(e) => updateFormInfo({ "date": e.target.value })}
      />

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



    </FormInfo >
  )
}