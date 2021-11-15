import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { formatTime } from "../utils/timerUtils";

import { Button } from "../styledComponents/style";
import Color from "../styledComponents/colors";
import { ITimer } from "../slices/timersSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/hooks";

const TimerDisplay = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  width: 33%;

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
  font-weight: 600;
  font-size: 1.5rem;
  color: ${Color.lights.white};
  width: 33%;

  :nth-child(2) {
    margin-right: 1em;
  }
`;

type TimerProps = {
  timer: ITimer;
  resetCallback?: () => void;
};

const Timer = ({ timer, resetCallback }: TimerProps) => {
  const dispatch = useDispatch();
  const timerState = useAppSelector(timer.selector);

  const counter = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!timerState.isPaused) {
      counter.current = setInterval(() => {
        dispatch(timer.actions.increment());
      }, 1000);
    } else {
      clearInterval(counter.current as NodeJS.Timeout);
    }
  }, [timerState.isActive, timerState.isPaused]);

  const currentButton = () => {
    const getButton = (text: string, onClick: () => void) => {
      return (
        <TimerButton
          color={Color.blues.blue}
          onClick={() => dispatch(onClick())}
          style={{
            minWidth: "12em",
            border: `3px solid ${Color.neutrals.grayDark}`,
          }}
        >
          {text}
        </TimerButton>
      );
    };

    if (!timerState.isActive) {
      return getButton("Start", timer.actions.start);
    } else if (timerState.isPaused) {
      return getButton("Resume", timer.actions.resume);
    } else {
      return getButton("Pause / Stop", timer.actions.pause);
    }
  };

  const handleResetClicked = () => {
    dispatch(timer.actions.reset());
    if (resetCallback) resetCallback();
  };

  return (
    <TimerContent>
      <TimerDisplay>{formatTime(timerState.value)}</TimerDisplay>

      {currentButton()}

      <TimerButton
        onClick={handleResetClicked}
        color={Color.accents.brick}
        style={{ border: `3px solid ${Color.contextual.danger}` }}
      >
        Reset
      </TimerButton>
    </TimerContent>
  );
};

export default Timer;
