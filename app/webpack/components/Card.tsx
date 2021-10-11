import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import { Title } from "../styledComponents/style";
import Color from "../styledComponents/colors";

type CardProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  containerStyles?: FlattenSimpleInterpolation;
  contentStyles?: FlattenSimpleInterpolation;
  titleStyles?: FlattenSimpleInterpolation;
};

const Card = (props: CardProps) => {
  const CardContainer = styled.div`
    margin: 1em auto;
    width: 50vw;
    border: 2px solid rgba(0, 0, 0, 0.125);
    background-color: ${Color.lights.white};
    border-radius: 0.5em;
    ${props.containerStyles}
  `;

  const CardContent = styled.div`
    padding: 1em;
    ${props.contentStyles}
  `;

  const CardTitle = styled(Title)<{ hasContent: boolean }>`
    border-radius: ${(props) =>
      props.hasContent ? "0.25em 0.25em 0 0" : "0.25em"};
    background-color: ${Color.blues.blueDarker};
    color: ${Color.blues.blueLight};
    padding: 0.5em;
    font-size: 1.3rem;
    ${props.titleStyles}
  `;

  return (
    <CardContainer>
      <CardTitle hasContent={Boolean(props.children)}>{props.title}</CardTitle>
      {props.children && <CardContent>{props.children}</CardContent>}
    </CardContainer>
  );
};

export default Card;
