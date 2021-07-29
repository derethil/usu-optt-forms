import styled from "styled-components";

export const Label = styled.label`
  font-family: Roboto, sans-serif;
  padding-right: 1em;
`;

export const FormInfo = styled.div`
  /* position: fixed;
  left: 3em;
  text-align: left; */
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 21em;
`;

export const CenteredIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TabsContainer = styled.div`
  display: flex;
`;

export const Button = styled.div<{ color?: string, textColor?: string }>`
  height: 100%;
  min-height: 4em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.color};
  color: ${props => props.textColor};

  font-weight: bold;

  border-radius: 15%;

  user-select: none;
`;


export const PageBaseDiv = styled.div`
  width: 100%;
  margin-left: 1em;
  margin-top: 1em;
  font-family: Roboto, sans-serif;
  text-align: left;
`;