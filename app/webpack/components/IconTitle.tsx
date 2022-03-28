import React, { useState } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import ReactTooltip from "react-tooltip";
import { CSSMixin } from "../types/types";

import { CenteredIconContainer } from "../styledComponents/style";
import Color from "../styledComponents/colors";

// Provides a title with an icon to the right
// When icon is hovered, a tooltip appears

type IconTitleProps = {
  content: string;
  tooltipContent: string;
  titleStyles?: FlattenSimpleInterpolation;
  iconStyles?: FlattenSimpleInterpolation;
};

const Icon = styled.i<CSSMixin>`
  color: ${Color.neutrals.grayDarker};
  ${(props) => props.mixin}
`;

const Title = styled.p<CSSMixin>`
  margin-right: 0.5em;
  ${(props) => props.mixin}
`;

const IconTitle = (props: IconTitleProps) => {
  // Allows React to properly link each icon to its tooltip
  // This is needed when multiple tooltips are on the same page
  const [randomID, _] = useState(String(Math.random()));

  return (
    <div className="title" style={{ display: "flex" }}>
      <Title mixin={props.titleStyles}>{props.content}</Title>
      <CenteredIconContainer
        className="hover-icon"
        data-tip={props.tooltipContent}
        data-for={randomID}
      >
        <Icon
          className="far fa-question-circle"
          mixin={props.iconStyles}
        ></Icon>
      </CenteredIconContainer>
      <ReactTooltip
        place="top"
        type="dark"
        effect="solid"
        multiline={true}
        id={randomID}
        offset={{ top: -20 }}
      />
    </div>
  );
};

export default IconTitle;
