import React, { useEffect, useState } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import SelectButton from "./SelectButton";
import IconTitle from "../IconTitle";

import TextInput from "../TextInput";
import { overrideRegex } from "../../utils/utils";
import { CSSMixin } from "../../types/types";

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
  contentOptions: string[];
  updateSelection: (newSelection: string) => void;
  scoreOptions?: string[];
  tooltip?: string;
  wrapperStyles?: FlattenSimpleInterpolation;
  buttonStyles?: FlattenSimpleInterpolation;
  titleStyles?: FlattenSimpleInterpolation;
  containerStyles?: FlattenSimpleInterpolation;
}

interface OptionRowCommentProps extends OptionRowProps {
  comment: string;
  updateComment: (updatedValues: { [key: string]: string }) => void;
}

const OptionRow = (props: OptionRowProps | OptionRowCommentProps) => {
  const [override, setOverride] = useState(false);

  // Override system (ex: !override = 10 in comment will override the score)
  if ("comment" in props && props.comment !== undefined && props.scoreOptions) {
    useEffect(() => {
      // If override is found in comment, override the score
      if (overrideRegex.test(props.comment)) {
        props.updateSelection(
          props.comment.match(overrideRegex)![0].match(/\d+/gi)![0]
        );
        setOverride(true);
      }

      // Reset score when override is removed
      if (override === true && !overrideRegex.test(props.comment)) {
        props.updateSelection(props.scoreOptions?.pop()!);
        setOverride(false);
      }
    }, [props["comment"]]);
  }

  const rowContents = props.contentOptions.map((content, idx) => {
    const score = props.scoreOptions ? props.scoreOptions[idx] : "";
    const compareTo = props.scoreOptions ? score : content;

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
        updateForm={props.updateComment}
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

  // Tooltip check moved here for readability
  const renderTitle = (tooltip?: string) => {
    if (tooltip) {
      return (
        <IconTitle
          content={props.title!}
          tooltipContent={tooltip}
          titleStyles={props.titleStyles}
        />
      );
    } else {
      return <Title mixin={props.titleStyles}>{props.title}</Title>;
    }
  };

  return (
    <Container mixin={props.containerStyles}>
      {renderTitle(props.tooltip)}

      <ButtonsWrapper mixin={props.wrapperStyles}>{rowContents}</ButtonsWrapper>
    </Container>
  );
};

export default OptionRow;
