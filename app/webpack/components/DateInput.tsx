import React from "react";
import DatePicker from "react-datepicker";

import { InputContainer, Label, Input } from "../styledComponents/input";

// Wrapper around react-datepicker for custom use (mainly using a custom input field)

type DateInputProps = {
  date: Date;
  field: string;
  label: string;
  updateForm: (updatedInfo: { [key: string]: string }) => void;
} & Omit<React.ComponentProps<typeof DatePicker>, "onChange">;

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
        disabled={props.disabled}
      />
    </InputContainer>
  );
};

export default DateInput;
