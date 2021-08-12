import React from "react";
import styled from "styled-components";

import SelectButton from "./SelectButton";
import IconTitle from "../IconTitle";
import Color from "../../styledComponents/colors";

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
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

const OptionRow = (props: OptionRowProps) => {
  const selectButtons = props.contentOptions.map((content, idx) => {
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
    selectButtons.push(
      <SelectButton
        content={"N/A"}
        key={props.contentOptions.length}
        updateSelection={props.updateSelection}
        selected={"N/A" === props.currSelection}
        styles={props.buttonStyles}
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

      <ButtonsWrapper style={props.wrapperStyles}>
        {selectButtons}
      </ButtonsWrapper>
    </div>
  );
};

export default OptionRow;
