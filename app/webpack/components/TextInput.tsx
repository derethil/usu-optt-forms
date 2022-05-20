import React from "react";
import { FlattenSimpleInterpolation } from "styled-components";
import {
  Label,
  InputContainer,
  Input,
  InputTA,
} from "../styledComponents/input";
import { NewValues } from "../types/types";

// Custom text input component

type TextInputProps = {
  value: string;
  field: string;
  title?: string;
  updateForm: (updatedValues: NewValues) => void;
  noLabel?: boolean;
  placeholder?: string;
  textArea?: boolean;
  containerStyles?: FlattenSimpleInterpolation;
  inputStyles?: FlattenSimpleInterpolation;
};

const TextInput = (props: TextInputProps) => {
  const spaced = props.field.replace(/([A-Z])/g, " $1");
  const titleCased = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  const inputProps = {
    value: props.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      props.updateForm({ [props.field]: e.target.value }),
    id: props.field,
    placeholder: props.placeholder,
  };

  return (
    <InputContainer mixin={props.containerStyles}>
      {!props.noLabel && (
        <Label htmlFor={props.field}>
          {props.title ? props.title : titleCased}
        </Label>
      )}
      {props.textArea ? (
        <InputTA {...inputProps} mixin={props.inputStyles} />
      ) : (
        <Input {...inputProps} />
      )}
    </InputContainer>
  );
};

export default TextInput;
