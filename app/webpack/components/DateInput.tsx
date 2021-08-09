import React from "react";
import DatePicker from "react-datepicker";

import { InputContainer, Label, Input } from "../styledComponents/input";
import { IFormInfo } from "../types";

type DateInputProps = {
  date: Date;
  field: string;
  updateFormInfo: (updatedFormInfo: Partial<IFormInfo>) => void;
};

const DateInput = (props: DateInputProps) => {
  return (
    <InputContainer>
      <Label htmlFor="next-observation-date">Next Observation Date</Label>

      <DatePicker
        selected={new Date(props.date)}
        id={props.field}
        onChange={(date) =>
          props.updateFormInfo({ [props.field]: (date as Date).getTime() })
        }
        customInput={<Input />}
      />
    </InputContainer>
  );
};

export default DateInput;
