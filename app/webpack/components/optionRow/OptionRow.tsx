import React from "react";
import styled from "styled-components";

import SelectButton from "./SelectButton";
import IconTitle from "../IconTitle";
import Color from "../../styledComponents/colors";

import TextInput from "../TextInput";

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
`;

const OptionRowInput = styled(TextInput)`
  padding-top: 0px;
  height: 100%;
`;

interface OptionRowProps {
  title: string;
  currSelection: string;
  contentOptions: string[];
  updateSelection: (newSelection: string) => void;
  scoreOptions?: string[];
  tooltip?: string;
  wrapperStyles?: React.CSSProperties;
  buttonStyles?: React.CSSProperties;
  titleStyles?: React.CSSProperties;
}

interface OptionRowCommentProps extends OptionRowProps {
  comment: string;
  updateComment: (updatedValues: { [key: string]: string }) => void;
}

const OptionRow = (props: OptionRowProps | OptionRowCommentProps) => {
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
        updateFormInfo={props.updateComment}
        field={`${props.title}-comment`}
        placeholder={"Comment"}
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
          content={props.title}
          tooltipContent={tooltip}
          titleStyles={props.titleStyles}
        />
      );
    } else {
      return <p style={props.titleStyles}>{props.title}</p>;
    }
  };

  return (
    <div>
      {renderTitle(props.tooltip)}

      <ButtonsWrapper style={props.wrapperStyles}>{rowContents}</ButtonsWrapper>
    </div>
  );
};

export default OptionRow;
