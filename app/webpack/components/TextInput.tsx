import React from "react";
import styled from "styled-components";
import { Label, InputContainer, Input } from "../styledComponents/style";

type TextInputProps = {
  value: string,
  field: string,
  updateFormInfo: (updatedValues: { [key: string]: string }) => void,
  noLabel?: boolean,
  placeholder?: string,
}

const TextInput = (props: TextInputProps) => {

  const spaced = props.field.replace(/([A-Z])/g, " $1");
  const titleCased = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  return (
    <InputContainer>
      {!props.noLabel && <Label htmlFor={props.field}>{titleCased}</Label>}
      <Input
        // className={`text-input`}
        value={props.value}
        onChange={(e) => props.updateFormInfo({ [props.field]: e.target.value })}
        placeholder={props.placeholder}
        id={props.field}
      />
    </InputContainer>
  )
}

export default TextInput;