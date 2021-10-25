import React from "react";
import DatePicker from "react-datepicker";

import { InputContainer, Label, Input } from "../styledComponents/input";
import { IFormInfo } from "../types/types";

type DateInputProps = {
  date: Date;
  field: string;
  label: string;
  updateFormInfo: (updatedFormInfo: Partial<IFormInfo>) => void;
};

const DateInput = (props: DateInputProps) => {
  return (
    <InputContainer>
      <Label htmlFor={props.field}>{props.label}</Label>

      <DatePicker
        selected={new Date(props.date)}
        id={props.field}
        onChange={(date) =>
          props.updateFormInfo({ [props.field]: (date as Date).getTime() })
        }
        customInput={<Input />}
        minDate={new Date()}
      />
    </InputContainer>
  );
};

export default DateInput;
