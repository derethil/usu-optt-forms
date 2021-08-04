import styled from "styled-components";
import { Color } from "./colors";

export const PageContent = styled.section`
  /* margin-top: 6em; */
`;

export const PageHeader = styled.section`
  display: flex;
  align-items: center;
  padding-left: 0.8em;

  height: 5em;
  background-color: ${Color.blues.primary};
  color: ${Color.lights.light};
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 1.3em;
`;

export const Title = styled.h1`
  margin: 0;
`;

export const CenteredIconContainer = styled.div`
  /* display: flex; */
  /* align-items: center; */
`;

export const TabsContainer = styled.div`
  /* display: flex; */
`;

export const Button = styled.div<{ color?: string, textColor?: string }>`
  background-color: ${props => props.color};
  color: ${props => props.textColor};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%);

  transition: 0.2s all ease;
  cursor: pointer;

  padding: 1em;
`;


export const PageContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: ${Color.neutrals.black}
`;