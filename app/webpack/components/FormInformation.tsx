import React from "react";

import TextInput from "./TextInput";
import OptionRow from "./optionRow";
import { useDefaultObjState } from "../hooks/hooks";
import { Label, FormInfo, InputContainer } from "../styledComponents/style";

import { ITimer, ScoresState, Section } from "../types";
import { getSubtotal, getMaxSubtotal } from "../utils";
import { defaultData, defaultFormInfo } from "../defaults";

import _rubricData from "../../rubrics/studentTeaching.json";
import { PDFGenerator } from "./PDFGenerator";

type FormInformationProps = {
  formInfo: typeof defaultFormInfo,
  updateFormInfo: (updatedFormInfo: Partial<typeof defaultFormInfo>) => void,
  scores: ScoresState,
  data1: typeof defaultData,
  data2: typeof defaultData,
  timer1: ITimer,
  timer2: ITimer,
  resetAll: () => void

}

const FormInformation = (props: FormInformationProps) => {
  const rubricData = _rubricData as Section[];


  // Calculate total scores for display
  const sections = rubricData.map(section => section.sectionTitle);

  const totals = sections.map((section, index) => {
    return <h3 key={index}>
      {section} Score: {getSubtotal(section, props.scores)} / {getMaxSubtotal(section, props.scores, rubricData)}
    </h3>
  })

  return (
    <FormInfo>
      <h1>Student Teaching Observation Form</h1>

      <TextInput
        value={props.formInfo.studentTeacher}
        updateFormInfo={props.updateFormInfo}
        field="studentTeacher"
      />
      <TextInput
        value={props.formInfo.cooperatingTeacher}
        updateFormInfo={props.updateFormInfo}
        field="cooperatingTeacher"
      />
      <TextInput
        value={props.formInfo.supervisor}
        updateFormInfo={props.updateFormInfo}
        field="supervisor"
      />

      <InputContainer>
        <Label htmlFor="date">Date</Label>

        <input
          type="date"
          name="date"
          id="datepicker"
          value={props.formInfo.date}
          onChange={(e) => props.updateFormInfo({ "date": e.target.value })}
        />
      </InputContainer>

      <InputContainer>
        <Label htmlFor="nextdate">Next Observation Date</Label>

        <input
          type="date"
          name="data"
          id="nextdatepicker"
          value={props.formInfo.nextDate}
          onChange={(e) => props.updateFormInfo({ "nextDate": e.target.value })}
        />
      </InputContainer>



      <TextInput
        value={props.formInfo.other}
        updateFormInfo={props.updateFormInfo}
        field="other"
      />


      <OptionRow
        title={"Observation Number"}
        contentOptions={["1", "2", "3", "4", "5"]}
        currSelection={props.formInfo.observation.toString()}
        updateSelection={(newSelection: string) => props.updateFormInfo({ "observation": Number(newSelection) })}
      />

      <OptionRow
        title={"Program"}
        contentOptions={["Mild/Moderate", "Severe", "Birth to 5"]}
        currSelection={props.formInfo.program}
        updateSelection={(newSelection: string) => props.updateFormInfo({ "program": newSelection })}
      />

      {totals}

      <PDFGenerator
        scores={props.scores}
        data1={props.data1}
        data2={props.data2}
        timer1={props.timer1}
        timer2={props.timer2}
        formInfo={props.formInfo}
      />

      <button onClick={() => props.resetAll()}>
        RESET ALL
      </button>

    </FormInfo >
  )
}

export default FormInformation;