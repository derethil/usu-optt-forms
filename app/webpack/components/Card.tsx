import React from "react";
import styled from "styled-components";
import { Title } from "../styledComponents/style";
import Color from "../styledComponents/colors";

const CardContainer = styled.div`
  margin: 1em auto;
  width: 50vw;
  border: 2px solid rgba(0, 0, 0, 0.125);
  background-color: ${Color.lights.white};
  border-radius: 0.5em;
`;

const CardTitle = styled(Title)<{ hasContent: boolean }>`
  border-radius: ${(props) =>
    props.hasContent ? "0.25em 0.25em 0 0" : "0.25em"};
  background-color: ${Color.blues.blueDarker};
  color: ${Color.blues.blueLight};
  padding: 0.5em;
  font-size: 1.3rem;
`;

const CardContent = styled.div`
  padding: 1em;
`;

type CardProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  containerStyles?: React.CSSProperties;
  contentStyles?: React.CSSProperties;
  titleStyles?: React.CSSProperties;
};

const Card = (props: CardProps) => {
  return (
    <CardContainer style={props.containerStyles}>
      <CardTitle hasContent={Boolean(props.children)} style={props.titleStyles}>
        {props.title}
      </CardTitle>
      {props.children && (
        <CardContent style={props.contentStyles}>{props.children}</CardContent>
      )}
    </CardContainer>
  );
};

export default Card;
