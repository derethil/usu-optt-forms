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
import { ButtonsWrapper, cardContainerStyles } from "../../styledComponents/style";
import DataProps from "./DataProps";
import OTRRow from "../../components/data/OTRRow";
import { timer1 } from "../../slices/timersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { formOptions } from "../../currentForm";
import DataTitleCard from "../../components/data/DataTitleCard";

const DataMath = (props: DataProps<IMathData>) => {
  const data = useAppSelector(props.data.selector);
  const dispatch = useAppDispatch();

  const setData = props.data.actions.setData;

  if (data.currentForm !== formOptions.mmMath) return <div></div>;

  return (
    <Styles.PageContent>
      <DataTitleCard title={props.title} undo={props.data.actions.undo}>
        <Styles.Title fontSize="1.2rem">Instructions</Styles.Title>
        Collect data for a total of 5 minutes (may be spread across 2 timings) during the
        new material and/or guided practice portion of the lesson.
      </DataTitleCard>

      <Card title="Timer" containerStyles={cardContainerStyles}>
        <Timer timer={props.timer} resetCallback={props.resetCallback} />
      </Card>

      <DataRow
        title="Engagement"
        displayData={[
          { display: "Group Engaged", score: data.engagement.engaged },
          {
            display: "Group Not Engaged",
            score: data.engagement.notEngaged,
          },
          {
            display: "Percent Engaged",
            score: getPercent(
              data.engagement.engaged,
              data.engagement.engaged + data.engagement.notEngaged
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brightLight}
            content="Engaged"
            value={data.engagement.engaged}
            onClick={(engaged: number) =>
              dispatch(
                setData({
                  engagement: { ...data.engagement, engaged },
                })
              )
            }
          />
          <CounterButton
            color={Color.accents.brightLight}
            content="Not Engaged"
            value={data.engagement.notEngaged}
            onClick={(notEngaged: number) =>
              dispatch(
                setData({
                  engagement: { ...data.engagement, notEngaged },
                })
              )
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <OTRRow dataSlice={props.data} timer={props.timer} />

      <DataRow
        title="Response"
        displayData={[
          { display: "Correct Response", score: data.response.correct },
          {
            display: "Incorrect Response",
            score: data.response.incorrect,
          },
          {
            display: "Percent Correct",
            score: getPercent(
              data.response.correct,
              data.response.correct + data.response.incorrect
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brick}
            content="Correct"
            value={data.response.correct}
            onClick={(correct: number) =>
              dispatch(
                setData({
                  response: { ...data.response, correct },
                })
              )
            }
          />
          <CounterButton
            color={Color.accents.brick}
            content="Incorrect"
            value={data.response.incorrect}
            onClick={(incorrect: number) =>
              dispatch(
                setData({
                  response: { ...data.response, incorrect },
                })
              )
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Feedback for Errors"
        displayData={[
          { display: "Model/Test or Guided", score: data.feedback.mtg },
          {
            display: "Not Corrected",
            score: data.feedback.notCorrected,
          },
          {
            display: "Percent Engaged",
            score: getPercent(
              data.feedback.mtg,
              data.feedback.mtg + data.feedback.notCorrected
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brightLight}
            content="Model/Test or Guided"
            value={data.feedback.mtg}
            onClick={(mtg: number) =>
              dispatch(
                setData({
                  feedback: { ...data.feedback, mtg },
                })
              )
            }
          />
          <CounterButton
            color={Color.accents.brightLight}
            content="Not Corrected"
            value={data.feedback.notCorrected}
            onClick={(notCorrected: number) =>
              dispatch(
                setData({
                  feedback: { ...data.feedback, notCorrected },
                })
              )
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <PraiseDataRow data={props.data} />
    </Styles.PageContent>
  );
};

export default DataMath;
