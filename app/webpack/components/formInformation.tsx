import React from "react";

import { TextInput } from "./textInput";
import { useDefaultObjState } from "../hooks";
import { Label } from "../styledComponents/label";
import { ObservationSelect } from "./observationSelect";


export const FormInformation = () => {
  const [formInfo, updateFormInfo, resetFormInfo] = useDefaultObjState({
    studentTeacher: "",
    cooperatingTeacher: "",
    supervisor: "",
    date: "",
    observation: 1
  });



  return (
    <div className="form-info-container">
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
        id="datepicker"
        value={formInfo.date}
        onChange={(e) => updateFormInfo({ "date": e.target.value })}
      />

      <ObservationSelect range={5} currSelection={formInfo.observation} setSelection={updateFormInfo} />
    </div>
  )
}