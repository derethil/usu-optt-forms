import React from "react";

import { formatTime } from "../utils";
import { ITimer } from "../types";


type TimerProps = {
  timer: ITimer
}

const Timer = (props: TimerProps) => {

  const currentButton = () => {
    if (!props.timer.isActive) {
      return <button onClick={props.timer.handleStart}>Start</button>
    } else if (props.timer.isPaused) {
      return <button onClick={props.timer.handleResume}>Resume</button>
    } else {
      return <button onClick={props.timer.handlePause}>Pause</button>
    }
  }

  return <div className='stopwatch-card'>
    <p>{formatTime(props.timer.timer)}</p>
    <div className='buttons'>
      {currentButton()}
      <button onClick={props.timer.handleReset} disabled={!props.timer.isActive}>Reset</button>
    </div>
  </div>
}

export default Timer;