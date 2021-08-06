import React, { useRef } from "react";
import styled, { CSSProperties } from "styled-components";

import { formatTime } from "../utils";
import { ITimer } from "../types";

import { Button } from "../styledComponents/style";
import { Color } from "../styledComponents/colors";

const TimerDisplay = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  flex-grow: 1;

  border-radius: 0.75em;
  border: 3px solid ${Color.neutrals.grayDark};

  background-color: ${Color.blues.blueLight};

  margin: 0;

  margin-right: 1em;
`;

const TimerContent = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
`;

const TimerButton = styled(Button)`
  flex-grow: 1;
  font-weight: 600;
  font-size: 1.5rem;
  color: ${Color.lights.white};

  :nth-child(2) {
    margin-right: 1em;
  }

`;


const Timer = ({ timer }: { timer: ITimer }) => {

  const currentButton = () => {

    const getButton = (text: string, onClick: () => void) => {
      return (
        <TimerButton
          color={Color.blues.blue}
          onClick={onClick}
          style={{ minWidth: "12em", border: `3px solid ${Color.neutrals.grayDark}` }}
        >
          {text}
        </TimerButton>
      )
    }

    if (!timer.isActive) {
      return getButton("Start", timer.handleStart);
    } else if (timer.isPaused) {
      return getButton("Resume", timer.handleResume);
    } else {
      return getButton("Pause", timer.handlePause);
    }
  }


  return <TimerContent>
    <TimerDisplay>{formatTime(timer.time)}</TimerDisplay>

    {currentButton()}

    <TimerButton
      onClick={timer.handleReset}
      color={Color.accents.brick}
      style={{ border: `3px solid ${Color.contextual.danger}` }}
    >
      Reset
    </TimerButton>

  </TimerContent>
}

export default Timer;