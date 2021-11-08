import React, { useEffect } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

import SelectButton from "./SelectButton";
import IconTitle from "../IconTitle";

import TextInput from "../TextInput";
import { overrideRegex } from "../../utils/utils";
import { CSSMixin } from "../../types/types";

const OptionRowInput = styled(TextInput)`
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
  if ("comment" in props && props.scoreOptions) {
    useEffect(() => {
      const getNewScore = () => {
        return props.comment.match(overrideRegex)![0].match(/\d+/gi)![0];
      };

      if (!props.scoreOptions!.includes(props.currSelection)) {
        if (overrideRegex.test(props.comment)) {
          props.updateSelection(getNewScore());
        } else {
          props.updateSelection(props.scoreOptions![-1]);
        }
      } else if (overrideRegex.test(props.comment)) {
        props.updateSelection(getNewScore());
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

  if ("comment" in props) {
    rowContents.push(
      <OptionRowInput
        key={props.contentOptions.length + 1}
        value={props.comment}
        updateForm={props.updateComment}
        field={`${props.title}-comment`}
        placeholder="Comment"
        noLabel
        textArea
        inputClassNames={["option-row__textarea"]}
        containerClassNames={["option-row__container"]}
      />
    );
  }

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
