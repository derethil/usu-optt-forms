import React from "react";

import { formatTime } from "../utils";
import { ITimer } from "../types";


const Timer = ({ timer }: { timer: ITimer }) => {

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