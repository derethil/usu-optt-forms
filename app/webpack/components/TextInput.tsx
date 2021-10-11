import React from "react";
import {
  Label,
  InputContainer,
  Input,
  InputTA,
} from "../styledComponents/input";

type TextInputProps = {
  value: string;
  field: string;
  title?: string;
  updateFormInfo: (updatedValues: { [key: string]: string }) => void;
  noLabel?: boolean;
  placeholder?: string;
  textArea?: boolean;
  inputClassNames?: string[];
  containerClassNames?: string[];
};

const TextInput = (props: TextInputProps) => {
  const spaced = props.field.replace(/([A-Z])/g, " $1");
  const titleCased = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  const inputProps = {
    value: props.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      props.updateFormInfo({ [props.field]: e.target.value }),
    id: props.field,
    placeholder: props.placeholder,
    className: props.inputClassNames?.join(" "),
  };

  return (
    <InputContainer className={props.containerClassNames?.join(" ")}>
      {!props.noLabel && (
        <Label htmlFor={props.field}>
          {props.title ? props.title : titleCased}
        </Label>
      )}
      {props.textArea ? <InputTA {...inputProps} /> : <Input {...inputProps} />}
    </InputContainer>
  );
};

export default TextInput;
