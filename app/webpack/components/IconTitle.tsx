import React from "react";
import styled from "styled-components"
import ReactTooltip from "react-tooltip";

import { CenteredIconContainer } from "../styledComponents/style";

// Title

interface TitleProps {
  readonly fontSize: string
}

const Title = styled.h2<TitleProps>`
  margin-right: 0.5em;
  font-size: ${props => props.fontSize};
`;

// IconTitle Component

type IconTitleProps = {
  content: string,
  tooltipContent: string,
  fontsize: string
}

export const IconTitle = (props: IconTitleProps) => {
  return <div className="title" style={{ display: "flex" }}>
    <Title fontSize={props.fontsize}>{props.content}</Title>
    <CenteredIconContainer className="hover-icon" data-tip={props.tooltipContent}>
      <i className="far fa-question-circle"></i>
      <ReactTooltip
        place="top"
        type="dark"
        effect="solid"
        multiline={true}
      />
    </CenteredIconContainer>
  </div>
}