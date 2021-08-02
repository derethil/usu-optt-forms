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

const TextInput = ({ value, field, updateFormInfo, noLabel, placeholder }: TextInputProps) => {

  const spaced = field.replace(/([A-Z])/g, " $1");
  const titleCased = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  return (
    <InputContainer>
      {!noLabel && <Label htmlFor={field}>{titleCased}</Label>}
      <Input
        // className={`text-input`}
        value={value}
        onChange={(e) => updateFormInfo({ [field]: e.target.value })}
        placeholder={placeholder}
        id={field}
      />
    </InputContainer>
  )
}

export default TextInput;