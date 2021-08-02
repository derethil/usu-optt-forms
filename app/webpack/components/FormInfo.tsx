import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import TextInput from "./TextInput";
import OptionRow from "./optionRow";
import { InputContainer, Label, Input } from "../styledComponents/style";

import { IFormInfo } from "../types";
type FormInfoProps = {
  formInfo: IFormInfo,
  updateFormInfo: (updatedFormInfo: Partial<IFormInfo>) => void
}

const FormInfo = (props: FormInfoProps) => {
  return (
    <div>
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
        <Label htmlFor="observation-date">Date</Label>

        <DatePicker
          selected={props.formInfo.date}
          id="observation-date"
          onChange={date => props.updateFormInfo({ date: date as Date })}
          customInput={<Input />}
        />
      </InputContainer>

      <InputContainer>
        <Label htmlFor="next-observation-date">Next Observation Date</Label>

        <DatePicker
          selected={props.formInfo.nextDate}
          id="next-observation-date"
          onChange={date => props.updateFormInfo({ nextDate: date as Date })}
          customInput={<Input />}
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
    </div>
  )
}

export default FormInfo;