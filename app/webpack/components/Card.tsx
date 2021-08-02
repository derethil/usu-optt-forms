import React from "react";
import styled from "styled-components";
import { Title, Color } from "../styledComponents/style";

const CardContainer = styled.div`
  margin: 1em auto;
  width: 50vw;
  border: 1px solid rgba(0,0,0,.125);
`;

const CardTitle = styled(Title)`
  background-color: ${Color.blues.blueDarker};
  color: ${Color.blues.blueLight};
  padding: 0.5em;
  font-size: 1.3rem;
`;

const CardContent = styled.div`
  padding: 1em;
`;

const Card = (props: { title: string, children: React.ReactNode }) => {
  return (
    <CardContainer>
      <CardTitle>{props.title}</CardTitle>
      <CardContent>
        {props.children}
      </CardContent>
    </CardContainer>
  )
}

export default Card;