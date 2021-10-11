import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import ReactTooltip from "react-tooltip";
import { CSSMixin } from "../types/types";

import { CenteredIconContainer } from "../styledComponents/style";
import Color from "../styledComponents/colors";

// IconTitle Component

type IconTitleProps = {
  content: string;
  tooltipContent: string;
  titleStyles?: FlattenSimpleInterpolation;
};

const Icon = styled.i`
  color: ${Color.neutrals.grayDarker};
`;

const Title = styled.p<CSSMixin>`
  margin-right: 0.5em;
  ${(props) => props.mixin}
`;

const IconTitle = (props: IconTitleProps) => {
  return (
    <div className="title" style={{ display: "flex" }}>
      <Title mixin={props.titleStyles}>{props.content}</Title>
      <CenteredIconContainer
        className="hover-icon"
        data-tip={props.tooltipContent}
      >
        <Icon className="far fa-question-circle"></Icon>
        <ReactTooltip place="top" type="dark" effect="solid" multiline={true} />
      </CenteredIconContainer>
    </div>
  );
};

export default IconTitle;
