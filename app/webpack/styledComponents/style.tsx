import styled from "styled-components";

export const Color = {
  blues: {
    primary: "#0F2439",
    blueLight: "#E1EAF9",
    blue: "#384660",
    blueDark: "#2F3A50",
    blueDarker: "#252F40",
  },
  neutrals: {
    gray: "#CED4DA",
    grayDark: "#838898",
    grayDarker: "#495057",
    blackLight: "#343A40",
    black: "#1E252B",
  },
  lights: {
    gray: "#CED4DA",
    grayLight: "#DEE2E6",
    grayLighter: "#E9ECEF",
    light: "#F8F9FA",
    white: "#FFFFFF"
  },
  accents: {
    brightLight: "#4494DA",
    brick: "#C44E28",
    greenLight: "#7D9C3A",
    grape: "#543035",
  },
  contextual: {
    success: "#588038",
    info: "#226BAA",
    warning: "#AE6002",
    danger: "#A6260D"
  }
}

export const PageContentDiv = styled.div`
  margin-top: 6em;
`;

export const Label = styled.label`
  /* font-family: Roboto, sans-serif; */
  /* padding-right: 1em; */
`;

export const FormInfo = styled.div`
  /* position: fixed;
  left: 3em;
  text-align: left; */
`;

export const InputContainer = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  /* width: 21em; */
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


export const PageBaseDiv = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: ${Color.neutrals.black}
`;