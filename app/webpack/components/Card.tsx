import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import { Title } from "../styledComponents/style";
import Color from "../styledComponents/colors";
import { CSSMixin } from "../types/types";

type CardProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  containerStyles?: FlattenSimpleInterpolation;
  contentStyles?: FlattenSimpleInterpolation;
  titleStyles?: FlattenSimpleInterpolation;
};

const CardContainer = styled.div<CSSMixin>`
  margin: 1em auto;
  width: 50vw;
  border: 2px solid rgba(0, 0, 0, 0.125);
  background-color: ${Color.lights.white};
  border-radius: 0.5em;
  ${(props) => props.mixin}
`;

const CardContent = styled.div<CSSMixin>`
  padding: 1em;
  ${(props) => props.mixin};
`;

const CardTitle = styled(Title)<{ hasContent: boolean } & CSSMixin>`
  border-radius: ${(props) =>
    props.hasContent ? "0.25em 0.25em 0 0" : "0.25em"};
  background-color: ${Color.blues.blueDarker};
  color: ${Color.blues.blueLight};
  padding: 0.5em;
  font-size: 1.3rem;
  ${(props) => props.mixin}
`;

const Card = (props: CardProps) => {
  return (
    <CardContainer mixin={props.containerStyles}>
      <CardTitle hasContent={Boolean(props.children)} mixin={props.titleStyles}>
        {props.title}
      </CardTitle>
      {props.children && (
        <CardContent mixin={props.contentStyles}>{props.children}</CardContent>
      )}
    </CardContainer>
  );
};

export default Card;
