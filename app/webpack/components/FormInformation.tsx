import React from "react";

import TextInput from "./TextInput";
import OptionRow from "./optionRow";
import { useDefaultObjState } from "../hooks/hooks";
import { Label, FormInfo, InputContainer } from "../styledComponents/style";

import { ITimer, ScoresState, Section } from "../types";
import { getSubtotal, getMaxSubtotal } from "../utils";
import { defaultData } from "../defaults";

import _rubricData from "../../rubrics/studentTeaching.json";
import { PDFGenerator } from "./PDFGenerator";

type FormInformationProps = {
  scores: ScoresState,
  data1: typeof defaultData,
  data2: typeof defaultData,
  timer1: ITimer,
  timer2: ITimer

}

const FormInformation = ({ scores, data1, data2, timer1, timer2 }: FormInformationProps) => {
  const rubricData = _rubricData as Section[];

  const [formInfo, updateFormInfo, resetFormInfo] = useDefaultObjState({
    studentTeacher: "",
    cooperatingTeacher: "",
    supervisor: "",
    date: new Date().toISOString().slice(0, 10),
    nextDate: new Date().toISOString().slice(0, 10),
    observation: 1,
    other: "",
    program: "Mild/Moderate"
  });

  const sections = rubricData.map(section => section.sectionTitle);

  const totals = sections.map((section, index) => {
    return <h3 key={index}>
      {section} Score: {getSubtotal(section, scores)} / {getMaxSubtotal(section, scores, rubricData)}
    </h3>
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
          name="date"
          id="datepicker"
          value={formInfo.date}
          onChange={(e) => updateFormInfo({ "date": e.target.value })}
        />
      </InputContainer>

      <InputContainer>
        <Label htmlFor="nextdate">Next Observation Date</Label>

        <input
          type="date"
          name="data"
          id="nextdatepicker"
          value={formInfo.nextDate}
          onChange={(e) => updateFormInfo({ "nextDate": e.target.value })}
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

      <PDFGenerator
        scores={scores}
        data1={data1}
        data2={data2}
        timer1={timer1}
        timer2={timer2}
        formInfo={formInfo}
      />

    </FormInfo >
  )
}

export default FormInformation;