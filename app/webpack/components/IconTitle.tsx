import React from "react";
import styled from "styled-components"
import ReactTooltip from "react-tooltip";

import { CenteredIconContainer } from "../styledComponents/style";
import { Color } from "../styledComponents/colors";

const Title = styled.p`
  margin-right: 0.5em;
`;

// IconTitle Component

type IconTitleProps = {
  content: string,
  tooltipContent: string,
  titleStyles?: React.CSSProperties
}

const Icon = styled.i`
  color: ${Color.neutrals.grayDarker};
`;

const IconTitle = (props: IconTitleProps) => {
  return <div className="title" style={{ display: "flex" }}>
    <Title style={props.titleStyles}>{props.content}</Title>
    <CenteredIconContainer className="hover-icon" data-tip={props.tooltipContent}>
      <Icon className="far fa-question-circle"></Icon>
      <ReactTooltip
        place="top"
        type="dark"
        effect="solid"
        multiline={true}
      />
    </CenteredIconContainer>
  </div>
}

export default IconTitle;