import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectFormInfo, toggleSubdomain } from "../slices/formInfoSlice";
import { Button } from "../styledComponents/style";
import { CSSMixin } from "../types/types";
import SelectButton from "./optionRow/SelectButton";

const Wrapper = styled.div`
  margin-top: 1em;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
`;

interface Props {
  options: string[];
  label: string;
  titleStyles?: FlattenSimpleInterpolation;
  currSelected: string[];
  onClickButton: (clicked: string) => void;
}
const Title = styled.p<CSSMixin>`
  ${(props) => props.mixin}
`;

export default function ToggleButtons(props: Props) {
  const buttons = props.options.map((option) => (
    <SelectButton
      key={option}
      content={option}
      selected={props.currSelected.includes(option)}
      updateSelection={props.onClickButton}
    />
  ));

  return (
    <Wrapper>
      <Title mixin={props.titleStyles}>{props.label}</Title>
      <ButtonsWrapper>{...buttons}</ButtonsWrapper>
    </Wrapper>
  );
}
