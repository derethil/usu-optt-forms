import React, { useEffect, useState } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import SelectButton from "./SelectButton";
import IconTitle from "../IconTitle";

import TextInput from "../TextInput";
import { overrideRegex } from "../../utils/utils";
import { CSSMixin } from "../../types/types";
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
  contentOptions: (string | string[])[];
  updateSelection: (newSelection: string) => void;
  scoreOptions?: string[];
  info?: string;
  wrapperStyles?: FlattenSimpleInterpolation;
  buttonStyles?: FlattenSimpleInterpolation;
  titleStyles?: FlattenSimpleInterpolation;
  containerStyles?: FlattenSimpleInterpolation;
  alternateInfoStyle?: boolean; // If false, info will be displayed as a tooltip, otherwise as part of the title
  continuedList?: boolean[];
  comment?: string;
  updateComment?: (updatedValues: { [key: string]: string }) => void;
}

const OptionRow = (props: OptionRowProps) => {
  const [override, setOverride] = useState(false);

  const continuedList = props.continuedList
    ? props.continuedList
    : new Array(props.contentOptions.length).fill(false);

  // Override system (ex: !override = 10 in comment will override the score)
  if (props.comment !== undefined && props.scoreOptions) {
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
        props.updateSelection(props.scoreOptions?.pop()!);
        setOverride(false);
      }
    }, [props["comment"]]);
  }

  const rowContents = props.contentOptions.map((content, idx) => {
    const score = props.scoreOptions ? props.scoreOptions[idx] : "";
    const compareTo = props.scoreOptions ? score : content;
    const continued = continuedList[idx];

    if (!Array.isArray(content)) {
      return (
        <SelectButton
          content={content}
          score={score}
          key={idx}
          updateSelection={props.updateSelection}
          selected={compareTo === props.currSelection}
          styles={props.buttonStyles}
        />
      );
    } else {
      return (
        <SelectButtonList
          continued={continued}
          content={content}
          score={score}
          key={idx}
          updateSelection={props.updateSelection}
          selected={compareTo === props.currSelection}
          styles={props.buttonStyles}
        />
      );
    }
  });

  // Push N/A as an option onto list if intended for scores
  if (props.scoreOptions) {
    rowContents.push(
      <SelectButton
        content={"N/A"}
        key={props.contentOptions.length}
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
        key={props.contentOptions.length + 1}
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
