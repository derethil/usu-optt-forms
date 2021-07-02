import React from "react";
import useTimer from "../hooks/useTimer";

import { formatTime } from "../utils";


type TimerProps = {

}

const Timer = (props: TimerProps) => {

  const timer = useTimer();

  const currentButton = () => {
    if (!timer.isActive) {
      return <button onClick={timer.handleStart}>Start</button>
    } else if (timer.isPaused) {
      return <button onClick={timer.handleResume}>Resume</button>
    } else {
      return <button onClick={timer.handlePause}>Pause</button>
    }
  }

  return <div className='stopwatch-card'>
    <p>{formatTime(timer.timer)}</p>
    <div className='buttons'>
      {currentButton()}
      <button onClick={timer.handleReset} disabled={!timer.isActive}>Reset</button>
    </div>
  </div>
}

export default Timer;