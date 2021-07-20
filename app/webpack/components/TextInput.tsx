import React from "react";
import { Label, InputContainer } from "../styledComponents/style";

type TextInputProps = {
  value: string,
  updateFormInfo: (updatedValues: { [key: string]: string }) => void,
  field: string
}

const TextInput = ({ value, updateFormInfo, field }: TextInputProps) => {

  const spaced = field.replace(/([A-Z])/g, " $1");
  const titleCased = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  return (
    <InputContainer>
      <Label htmlFor={field}>{titleCased}</Label>
      <input
        // className={`text-input`}
        value={value}
        onChange={(e) => updateFormInfo({ [field]: e.target.value })}
      />
    </InputContainer>
  )
}

export default TextInput;