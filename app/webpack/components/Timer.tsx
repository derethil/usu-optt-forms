import React from "react";
import { useTimer } from "../hooks";

import { formatTime } from "../utils";


type TimerProps = {

}

export const Timer = (props: TimerProps) => {

  const timer = useTimer();

  return <div className='stopwatch-card'>
    <p>{formatTime(timer.timer)}</p>
    <div className='buttons'>
      {
        !timer.isActive && !timer.isPaused ?
          <button onClick={timer.handleStart}>Start</button>
          : (
            timer.isPaused ? <button onClick={timer.handlePause}>Pause</button> :
              <button onClick={timer.handleResume}>Resume</button>
          )
      }
      <button onClick={timer.handleReset} disabled={!timer.isActive}>Reset</button>
    </div>
  </div>
}