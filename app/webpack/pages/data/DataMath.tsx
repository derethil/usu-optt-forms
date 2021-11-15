import React from "react";
import { css } from "styled-components";
import Timer from "../../components/Timer";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import PraiseDataRow from "../../components/data/PraiseDataRow";
import Card from "../../components/Card";

import { IMathData } from "../../types/dataTypes";
import { getPercent } from "../../utils/utils";
import * as Styles from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import {
  ButtonsWrapper,
  cardContainerStyles,
} from "../../styledComponents/style";
import DataProps from "./DataProps";
import OTRRow from "../../components/data/OTRRow";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectTimer1, timerActions1 } from "../../slices/timersSlice";

const DataMath = (props: DataProps<IMathData>) => {
  const timer1 = useAppSelector(selectTimer1);
  const dispatch = useAppDispatch();

  return (
    <Styles.PageContent>
      <Card
        title={props.title}
        containerStyles={cardContainerStyles}
        titleStyles={css`
          font-size: 2rem;
        `}
      ></Card>

      <Card title="Timer" containerStyles={cardContainerStyles}>
        <Timer
          timer={timer1}
          resetCallback={props.resetCallback}
          timerActions={timerActions1}
        />
      </Card>

      <DataRow
        title="Engagement"
        displayData={[
          { display: "Group Engaged", score: props.data.engagement.engaged },
          {
            display: "Group Not Engaged",
            score: props.data.engagement.notEngaged,
          },
          {
            display: "Percent Engaged",
            score: getPercent(
              props.data.engagement.engaged,
              props.data.engagement.engaged + props.data.engagement.notEngaged
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brightLight}
            content="Engaged"
            value={props.data.engagement.engaged}
            onClick={(engaged: number) =>
              props.setData({
                engagement: { ...props.data.engagement, engaged },
              })
            }
          />
          <CounterButton
            color={Color.accents.brightLight}
            content="Not Engaged"
            value={props.data.engagement.notEngaged}
            onClick={(notEngaged: number) =>
              props.setData({
                engagement: { ...props.data.engagement, notEngaged },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <OTRRow data={props.data} setData={props.setData} timer={props.timer} />

      <DataRow
        title="Response"
        displayData={[
          { display: "Correct Response", score: props.data.response.correct },
          {
            display: "Incorrect Response",
            score: props.data.response.incorrect,
          },
          {
            display: "Percent Correct",
            score: getPercent(
              props.data.response.correct,
              props.data.response.correct + props.data.response.incorrect
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brick}
            content="Correct"
            value={props.data.response.correct}
            onClick={(correct: number) =>
              props.setData({
                response: { ...props.data.response, correct },
              })
            }
          />
          <CounterButton
            color={Color.accents.brick}
            content="Incorrect"
            value={props.data.response.incorrect}
            onClick={(incorrect: number) =>
              props.setData({
                response: { ...props.data.response, incorrect },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Feedback for Errors"
        displayData={[
          { display: "Model/Test or Guided", score: props.data.feedback.mtg },
          {
            display: "Not Corrected",
            score: props.data.feedback.notCorrected,
          },
          {
            display: "Percent Engaged",
            score: getPercent(
              props.data.feedback.mtg,
              props.data.feedback.mtg + props.data.feedback.notCorrected
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brightLight}
            content="Model/Test or Guided"
            value={props.data.feedback.mtg}
            onClick={(mtg: number) =>
              props.setData({
                feedback: { ...props.data.feedback, mtg },
              })
            }
          />
          <CounterButton
            color={Color.accents.brightLight}
            content="Not Corrected"
            value={props.data.feedback.notCorrected}
            onClick={(notCorrected: number) =>
              props.setData({
                feedback: { ...props.data.feedback, notCorrected },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <PraiseDataRow data={props.data} setData={props.setData} />
    </Styles.PageContent>
  );
};

export default DataMath;
