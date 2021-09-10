import React from "react";
import styled from "styled-components";

import Timer from "../components/Timer";
import CounterButton from "../components/CounterButton";
import DataRow from "../components/DataRow";
import { ITimer } from "../types";
import { studentTeachingDataI } from "../defaultData";
import * as dataUtils from "../utils/dataUtils";
import { getPercent } from "../utils/utils";
import * as Styles from "../styledComponents/style";
import Card from "../components/Card";
import Color from "../styledComponents/colors";

const cardContainerStyles: React.CSSProperties = { width: "60em" };

const ButtonsWrapper = styled.div`
  height: 6em;
  margin-right: 3em;
  display: flex;
  padding: 1em 0em;
`;

interface DataProps {
  title: string;
  timer: ITimer;
  timerKey: string;
  data: studentTeachingDataI;
  setData: (updatedValues: Partial<studentTeachingDataI>) => void;
  resetCallback?: () => void;
}

const Data = ({
  timer,
  timerKey,
  data,
  setData,
  title,
  resetCallback,
}: DataProps) => {
  return (
    <Styles.PageContent>
      <Card
        title={title}
        containerStyles={cardContainerStyles}
        titleStyles={{ fontSize: "2rem" }}
      ></Card>
      <Card title="Timer" containerStyles={cardContainerStyles}>
        <Timer timer={timer} key={timerKey} resetCallback={resetCallback} />
      </Card>

      <DataRow
        title="Cues / Directions / Opportunities to Respond"
        displayData={[
          { display: "Individual Cues", score: data.cues.individual },
          { display: "Group Cues", score: data.cues.group },
          {
            display: "Total Cues",
            score: data.cues.individual + data.cues.group,
          },
          { display: "OTR Rate", score: dataUtils.getOTRRate(data, timer) },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.greenLight}
            content="Individual"
            value={data.cues.individual}
            onClick={(newValue: number) =>
              setData({ cues: { ...data.cues, individual: newValue } })
            }
          />
          <CounterButton
            color={Color.accents.greenLight}
            content="Group"
            value={data.cues.group}
            onClick={(newValue: number) =>
              setData({ cues: { ...data.cues, group: newValue } })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Praise Type"
        displayData={[
          { display: "General Praise", score: data.praise.general },
          { display: "Academic Praise", score: data.praise.academic },
          { display: "Behavioral Praise", score: data.praise.behavioral },
          { display: "Redirect/Reprimand", score: data.praise.reprimand },
          { display: "Praise Ratio", score: dataUtils.getPraiseRatio(data) },
          {
            display: "Percent Specific",
            score: getPercent(
              data.praise.academic + data.praise.behavioral,
              dataUtils.getPraiseSum(data)
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.yellow}
            content="General"
            value={data.praise.general}
            onClick={(newValue: number) =>
              setData({ praise: { ...data.praise, general: newValue } })
            }
          />
          <CounterButton
            color={Color.accents.yellow}
            content="Academic"
            value={data.praise.academic}
            onClick={(newValue: number) =>
              setData({ praise: { ...data.praise, academic: newValue } })
            }
          />
          <CounterButton
            color={Color.accents.yellow}
            content="Behavioral"
            value={data.praise.behavioral}
            onClick={(newValue: number) =>
              setData({ praise: { ...data.praise, behavioral: newValue } })
            }
          />
          <CounterButton
            color={Color.contextual.danger}
            content="Redirect/Reprimand"
            value={data.praise.reprimand}
            onClick={(newValue: number) =>
              setData({ praise: { ...data.praise, reprimand: newValue } })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Corrections"
        displayData={[
          { display: "Correct", score: data.corrections.correct },
          { display: "Not Correct", score: data.corrections.incorrect },
          { display: "None", score: data.corrections.none },
          {
            display: "Total Corrections",
            score: dataUtils.getCorrectionsSum(data),
          },
          {
            display: "Percent",
            score: getPercent(
              data.corrections.correct,
              dataUtils.getCorrectionsSum(data)
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brightLight}
            content="Correct"
            value={data.corrections.correct}
            onClick={(newValue: number) =>
              setData({
                corrections: { ...data.corrections, correct: newValue },
              })
            }
          />
          <CounterButton
            color={Color.accents.brightLight}
            content="Incorrect"
            value={data.corrections.incorrect}
            onClick={(newValue: number) =>
              setData({
                corrections: { ...data.corrections, incorrect: newValue },
              })
            }
          />
          <CounterButton
            color={Color.accents.brightLight}
            content="None"
            value={data.corrections.none}
            onClick={(newValue: number) =>
              setData({ corrections: { ...data.corrections, none: newValue } })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Momentary Sample Time"
        displayData={[
          { display: "Engaged", score: data.engagement.engaged },
          { display: "Not Engaged", score: data.engagement.notEngaged },
          {
            display: "Total",
            score: data.engagement.engaged + data.engagement.notEngaged,
          },
          {
            display: "Percent",
            score: getPercent(
              data.engagement.engaged,
              data.engagement.engaged + data.engagement.notEngaged
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.contextual.info}
            content="Engaged"
            value={data.engagement.engaged}
            onClick={(newValue: number) =>
              setData({ engagement: { ...data.engagement, engaged: newValue } })
            }
          />

          <CounterButton
            color={Color.contextual.info}
            content="Not Engaged"
            value={data.engagement.notEngaged}
            onClick={(newValue: number) =>
              setData({
                engagement: { ...data.engagement, notEngaged: newValue },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Scanning and Transitions"
        displayData={[
          { display: "Occurrence of Scanning", score: data.misc.scanningCount },
          {
            display: "Number of Transitions",
            score: data.misc.transitionCount,
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brick}
            content="Scanning"
            value={data.misc.scanningCount}
            onClick={(newValue: number) =>
              setData({ misc: { ...data.misc, scanningCount: newValue } })
            }
          />

          <CounterButton
            color={Color.accents.brick}
            content="Transition"
            value={data.misc.transitionCount}
            onClick={(newValue: number) =>
              setData({ misc: { ...data.misc, transitionCount: newValue } })
            }
          />
        </ButtonsWrapper>
      </DataRow>
    </Styles.PageContent>
  );
};

export default Data;
