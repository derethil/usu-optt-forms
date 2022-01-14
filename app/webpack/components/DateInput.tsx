import React from "react";
import DatePicker from "react-datepicker";

import { InputContainer, Label, Input } from "../styledComponents/input";

type DateInputProps = {
  date: Date;
  field: string;
  label: string;
  updateForm: (updatedInfo: { [key: string]: string }) => void;
};

const DateInput = (props: DateInputProps) => {
  return (
    <InputContainer>
      <Label htmlFor={props.field}>{props.label}</Label>

      <DatePicker
        selected={new Date(props.date)}
        id={props.field}
        onChange={(date) =>
          props.updateForm({
            [props.field]: (date as Date).toUTCString(),
          })
        }
        customInput={<Input />}
        disabledKeyboardNavigation
      />
    </InputContainer>
  );
};

export default DateInput;
