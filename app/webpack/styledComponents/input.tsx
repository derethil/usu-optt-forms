import styled from "styled-components";
import { Color } from "./colors";

export const Label = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: ${Color.neutrals.grayDark};
`;

export const InputContainer = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-bottom: 20px;
  width: 100%;
`;

export const Input = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid ${Color.neutrals.gray};
  outline: 0;
  font-size: 1.3rem;
  color: ${Color.neutrals.grayDarker};
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    cursor: text;
    top: 20px;
  }

  &:focus {
    ~ & {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: $primary;
      font-weight:700;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, ${Color.blues.blueDark},${Color.blues.blue});
    border-image-slice: 1;
  }

  &:required,&:invalid { box-shadow:none; }
`;