import React, { useEffect, useState } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import SelectButton from "./SelectButton";
import IconTitle from "../IconTitle";

import TextInput from "../TextInput";
import { arraysEqual, overrideRegex } from "../../utils/utils";
import { CSSMixin, NewValues, Option } from "../../types/types";
import SelectButtonList from "./SelectButtonList";

// General component to provide a list of options to select between.

export const OptionRowInput = styled(TextInput)`
  padding-top: 0px;
  height: 100%;
`;

const Title = styled.p<CSSMixin>`
  ${(props) => props.mixin}
`;

const ButtonsWrapper = styled.div<CSSMixin>`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  ${(props) => props.mixin};
`;

const Container = styled.div<CSSMixin>`
  ${(props) => props.mixin};
`;

interface OptionRowProps {
  title?: string;
  currSelection: string;
  updateSelection: (newSelection: string) => void;
  info?: string;
  wrapperStyles?: FlattenSimpleInterpolation;
  buttonStyles?: FlattenSimpleInterpolation;
  titleStyles?: FlattenSimpleInterpolation;
  containerStyles?: FlattenSimpleInterpolation;
  alternateInfoStyle?: boolean; // If false, info will be displayed as a tooltip, otherwise as part of the title
  comment?: string;
  updateComment?: (updatedValues: NewValues) => void;
  options: Option[];
}

const OptionRow = (props: OptionRowProps) => {
  const [override, setOverride] = useState(false);
  const hasScoreOptions = props.options[0].score !== undefined;

  // Override system (ex: !override = 10 in comment will override the score)
  if (props.comment !== undefined && hasScoreOptions) {
    useEffect(() => {
      // If override is found in comment, override the score
      if (overrideRegex.test(props.comment!)) {
        props.updateSelection(
          props.comment!.match(overrideRegex)![0].match(/\d+/gi)![0]
        );
        setOverride(true);
      }

      // Reset score when override is removed
      if (override === true && !overrideRegex.test(props.comment!)) {
        props.updateSelection(props.options.pop()?.score!);
        setOverride(false);
      }
    }, [props["comment"]]);
  }

  const rowContents = props.options.map((option, idx) => {
    const compare = hasScoreOptions ? option.score : option.content;

    if (!Array.isArray(option.content)) {
      return (
        <SelectButton
          content={option.content as string}
          score={option.score}
          key={idx}
          updateSelection={props.updateSelection}
          selected={compare === props.currSelection}
          styles={props.buttonStyles}
        />
      );
    } else {
      const selected = Array.isArray(compare)
        ? arraysEqual(compare as string[], props.currSelection.split("//"))
        : compare === props.currSelection;

      return (
        <SelectButtonList
          continued={option.continued}
          content={option.content}
          score={option.score}
          key={idx}
          updateSelection={props.updateSelection}
          selected={selected}
          styles={props.buttonStyles}
        />
      );
    }
  });

  // Push N/A as an option onto list if intended for scores
  if (hasScoreOptions) {
    rowContents.push(
      <SelectButton
        content={"N/A"}
        key={props.options.length}
        updateSelection={props.updateSelection}
        selected={"N/A" === props.currSelection}
        styles={props.buttonStyles}
      />
    );
  }

  // Push the comment box onto list if provided
  if ("comment" in props && props.comment !== undefined) {
    rowContents.push(
      <OptionRowInput
        key={props.options.length + 1}
        value={props.comment}
        updateForm={props.updateComment!}
        field={`${props.title}-comment`}
        placeholder="Comment"
        noLabel
        textArea
        inputStyles={css`
          height: 100%;
          border-radius: 0.75em;
          resize: none;
          padding: 8px;

          &:focus {
            font-weight: inherit;
          }
        `}
        containerStyles={css`
          padding-top: 0;
          width: auto;
          flex: 0 0 15em;
        `}
      />
    );
  }

  const renderTitle = (info?: string) => {
    if (info && !props.alternateInfoStyle) {
      // Render info as tooltip
      return (
        <IconTitle
          content={props.title!}
          tooltipContent={info}
          titleStyles={props.titleStyles}
        />
      );
    } else if (info) {
      // Render info as part of the title
      return (
        <Title mixin={props.titleStyles}>
          <b>{props.title}</b>: {props.info}
        </Title>
      );
    } else {
      // No info to render
      return <Title mixin={props.titleStyles}>{props.title}</Title>;
    }
  };

  return (
    <Container mixin={props.containerStyles}>
      {renderTitle(props.info)}

      <ButtonsWrapper mixin={props.wrapperStyles}>{rowContents}</ButtonsWrapper>
    </Container>
  );
};

export default OptionRow;
