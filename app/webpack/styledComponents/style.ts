import styled, { css } from "styled-components";
import Color from "./colors";

export const PageContent = styled.section`
  background-color: ${Color.lights.light};
`;

export const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0em 1.6em;

  height: 5em;
  background-color: ${Color.blues.primary};
  color: ${Color.lights.light};
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 1.3em;
`;

export const Title = styled.div`
  margin: 0;
  font-weight: 600;
  font-size: 1.8rem;
`;

export const CenteredIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.div<{ color?: string; textColor?: string }>`
  height: 80%;
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%);
  padding: 1em;
  border-radius: 0.75em;

  transition: 0.2s all ease;
  /* transition: 0.1s transform ease; */
  cursor: pointer;

  :hover {
    transform: translateY(-2px);
  }

  :active {
    transform: translateY(2px);
  }
`;

export const PageContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: ${Color.neutrals.black};
`;

export const DataWrapper = styled.div<{ width?: string }>`
  width: ${(props) => props.width};
  /* display: flex; */
  /* flex-direction: column; */
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0em;
  border-bottom: 2px solid ${Color.lights.gray};
`;

export const DataCell = styled.p`
  margin: 0px;

  :first-child {
    text-align: left;
  }

  :last-child {
    font-weight: 600;
  }
`;

export const ButtonsWrapper = styled.div`
  height: 6em;
  margin-right: 3em;
  display: flex;
  padding: 1em 0em;
`;

export const TwoRowWrapper = styled(ButtonsWrapper)`
  height: 12em;
`;

export const TwoButtonCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * {
    height: 35%;
  }
`;

export const cardContainerStyles = css`
  width: 60em;
`;

export const buttonStyles = css`
  width: 10em;
  text-align: center;
  flex-grow: 1;
  font-size: 1.05rem;
`;
