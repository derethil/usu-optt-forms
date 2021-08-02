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
  /* height: 100%;
  min-height: 4em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.color};
  color: ${props => props.textColor};

  font-weight: bold;

  border-radius: 15%;

  user-select: none; */
`;


export const PageContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: ${Color.neutrals.black}
`;