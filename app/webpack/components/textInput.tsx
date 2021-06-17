import React from "react";
import styled from "styled-components";

import { Partial, FormInfo } from "../types";
import { Label } from "../styledComponents/label";



type TextInputProps = {
  value: string,
  updateFormInfo: (updatedValues: Partial<FormInfo>) => void,
  field: string
}



export const TextInput = ({ value, updateFormInfo, field }: TextInputProps) => {

  const spaced = field.replace(/([A-Z])/g, " $1");
  const titleCased = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  return (
    <div className="text-input-container">
      <Label htmlFor={field}>{titleCased}</Label>
      <input
        className={`text-input`}
        value={value}
        onChange={(e) => updateFormInfo({ [field]: e.target.value })}
      />
    </div>
  )
}