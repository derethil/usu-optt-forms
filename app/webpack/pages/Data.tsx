import React from "react";
import Timer from "../components/Timer";
import CounterButton from "../components/CounterButton";
import { Data, ITimer } from "../types";
import { getPraiseRatio, getPercent, getPraiseSum, getCorrectionsSum } from "../utils";
import { PageContent } from "../styledComponents/style";

interface DataProps {
  timer: ITimer, data: Data, setData: (updatedValues: Partial<Data>) => void
}

const DataSTO = ({ timer, data, setData }: DataProps) => {
  return <PageContent>
    <Timer timer={timer} />

    <div className="cues-counter" style={{ display: "flex", padding: "1em 0em" }}>
      <CounterButton
        color="#75B34D"
        content="Individual"
        value={data.cues.individual}
        onClick={(newValue: number) => setData({ cues: { ...data.cues, individual: newValue } })}
      />

      <CounterButton
        color="#75B34D"
        content="Group"
        value={data.cues.group}
        onClick={(newValue: number) => setData({ cues: { ...data.cues, group: newValue } })}
      />

    </div>

    <div className="cues-display" style={{ display: "flex", flexDirection: "column" }}>
      <h3>Individual Cues: {data.cues.individual}</h3>
      <h3>Group Cues: {data.cues.group}</h3>
      <h3>Total Cues: {data.cues.individual + data.cues.group}</h3>
      <h3>OTR Rate: { }</h3>
    </div>

    <div className="praise-counter" style={{ display: "flex", padding: "1em 0em" }}>
      <CounterButton
        color="#FFC00F"
        content="General"
        value={data.praise.general}
        onClick={(newValue: number) => setData({ praise: { ...data.praise, general: newValue } })}
      />

      <CounterButton
        color="#FFC00F"
        content="Academic"
        value={data.praise.academic}
        onClick={(newValue: number) => setData({ praise: { ...data.praise, academic: newValue } })}
      />

      <CounterButton
        color="#FFC00F"
        content="Behavioral"
        value={data.praise.behavioral}
        onClick={(newValue: number) => setData({ praise: { ...data.praise, behavioral: newValue } })}
      />

      <CounterButton
        color="#EA0B03"
        content="Redirect/Reprimand"
        value={data.praise.reprimand}
        onClick={(newValue: number) => setData({ praise: { ...data.praise, reprimand: newValue } })}
      />

    </div>

    <div className="praise-display" style={{ display: "flex", flexDirection: "column" }}>
      <h3>General Praise: {data.praise.general}</h3>
      <h3>Academic Praise: {data.praise.academic}</h3>
      <h3>Behavioral Praise: {data.praise.behavioral}</h3>
      <h3>Redirect/Reprimand: {data.praise.reprimand}</h3>
      <h3>Praise Ratio: {getPraiseRatio(data)}</h3>
      <h3>Percent Specific: {getPercent(data.praise.academic + data.praise.behavioral, getPraiseSum(data))}</h3>
    </div>

    <div className="corrections-counter" style={{ display: "flex", padding: "1em 0em" }}>
      <CounterButton
        color="#61A0DA"
        content="Correct"
        value={data.corrections.correct}
        onClick={(newValue: number) => setData({ corrections: { ...data.corrections, correct: newValue } })}
      />

      <CounterButton
        color="#61A0DA"
        content="Incorrect"
        value={data.corrections.incorrect}
        onClick={(newValue: number) => setData({ corrections: { ...data.corrections, incorrect: newValue } })}
      />

      <CounterButton
        color="#61A0DA"
        content="None"
        value={data.corrections.none}
        onClick={(newValue: number) => setData({ corrections: { ...data.corrections, none: newValue } })}
      />
    </div>

    <div className="praise-display" style={{ display: "flex", flexDirection: "column" }}>
      <h3>Correct: {data.corrections.correct}</h3>
      <h3>Incorrect: {data.corrections.incorrect}</h3>
      <h3>None: {data.corrections.none}</h3>
      <h3>Total Corrections: {getCorrectionsSum(data)}</h3>
      <h3>Percent: {getPercent(data.corrections.correct, getCorrectionsSum(data))}</h3>
    </div>

    <div className="engagement-counter" style={{ display: "flex", padding: "1em 0em" }}>
      <CounterButton
        color="#4674C9"
        content="Engaged"
        value={data.engagement.engaged}
        onClick={(newValue: number) => setData({ engagement: { ...data.engagement, engaged: newValue } })}
      />

      <CounterButton
        color="#4674C9"
        content="Not Engaged"
        value={data.engagement.notEngaged}
        onClick={(newValue: number) => setData({ engagement: { ...data.engagement, notEngaged: newValue } })}
      />
    </div>

    <div className="engagement-display" style={{ display: "flex", flexDirection: "column" }}>
      <h3>Engaged: {data.engagement.engaged}</h3>
      <h3>Not Engaged: {data.engagement.notEngaged}</h3>
      <h3>Total: {data.engagement.engaged + data.engagement.notEngaged}</h3>
      <h3>Percent: {getPercent(data.engagement.engaged, data.engagement.engaged + data.engagement.notEngaged)}</h3>
    </div>

    <div className="misc-counter" style={{ display: "flex", padding: "1em 0em" }}>
      <CounterButton
        color="#F38139"
        content="Scanning"
        value={data.misc.scanningCount}
        onClick={(newValue: number) => setData({ misc: { ...data.misc, scanningCount: newValue } })}
      />

      <CounterButton
        color="#F38139"
        content="Transition"
        value={data.misc.transitionCount}
        onClick={(newValue: number) => setData({ misc: { ...data.misc, transitionCount: newValue } })}
      />
    </div>

    <div className="engagement-display" style={{ display: "flex", flexDirection: "column" }}>
      <h3>Number of Transitions: {data.misc.scanningCount}</h3>
      <h3>Occurance of Scanning: {data.misc.transitionCount}</h3>
    </div>

  </PageContent>
}

export default DataSTO;