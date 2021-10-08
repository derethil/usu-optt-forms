import React from "react";

import Timer from "../../components/Timer";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import PraiseDataRow from "../../components/data/PraiseDataRow";
import Card from "../../components/Card";

import { IStudentTeachingData } from "../../types/dataTypes";

import * as dataUtils from "../../utils/dataUtils";
import { getPercent } from "../../utils/utils";

import * as Styles from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import {
  ButtonsWrapper,
  cardContainerStyles,
} from "../../styledComponents/style";
import DataProps from "./DataProps";
import OTRRow from "../../components/data/OTRRow";

const DataST = (props: DataProps<IStudentTeachingData>) => {
  return (
    <Styles.PageContent>
      <Card
        title={props.title}
        containerStyles={cardContainerStyles}
        titleStyles={{ fontSize: "2rem" }}
      ></Card>

      <Card title="Timer" containerStyles={cardContainerStyles}>
        <Timer timer={props.timer} resetCallback={props.resetCallback} />
      </Card>

      <OTRRow data={props.data} setData={props.setData} timer={props.timer} />

      <PraiseDataRow data={props.data} setData={props.setData} />

      <DataRow
        title="Corrections"
        displayData={[
          { display: "Correct", score: props.data.corrections.correct },
          { display: "Not Correct", score: props.data.corrections.incorrect },
          { display: "None", score: props.data.corrections.none },
          {
            display: "Total Corrections",
            score: dataUtils.getCorrectionsSum(props.data),
          },
          {
            display: "Percent",
            score: getPercent(
              props.data.corrections.correct,
              dataUtils.getCorrectionsSum(props.data)
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brightLight}
            content="Correct"
            value={props.data.corrections.correct}
            onClick={(newValue: number) =>
              props.setData({
                corrections: { ...props.data.corrections, correct: newValue },
              })
            }
          />
          <CounterButton
            color={Color.accents.brightLight}
            content="Incorrect"
            value={props.data.corrections.incorrect}
            onClick={(newValue: number) =>
              props.setData({
                corrections: { ...props.data.corrections, incorrect: newValue },
              })
            }
          />
          <CounterButton
            color={Color.accents.brightLight}
            content="None"
            value={props.data.corrections.none}
            onClick={(newValue: number) =>
              props.setData({
                corrections: { ...props.data.corrections, none: newValue },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Momentary Sample Time"
        displayData={[
          { display: "Engaged", score: props.data.engagement.engaged },
          { display: "Not Engaged", score: props.data.engagement.notEngaged },
          {
            display: "Total",
            score:
              props.data.engagement.engaged + props.data.engagement.notEngaged,
          },
          {
            display: "Percent",
            score: getPercent(
              props.data.engagement.engaged,
              props.data.engagement.engaged + props.data.engagement.notEngaged
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.contextual.info}
            content="Engaged"
            value={props.data.engagement.engaged}
            onClick={(newValue: number) =>
              props.setData({
                engagement: { ...props.data.engagement, engaged: newValue },
              })
            }
          />

          <CounterButton
            color={Color.contextual.info}
            content="Not Engaged"
            value={props.data.engagement.notEngaged}
            onClick={(newValue: number) =>
              props.setData({
                engagement: { ...props.data.engagement, notEngaged: newValue },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Scanning and Transitions"
        displayData={[
          {
            display: "Occurrence of Scanning",
            score: props.data.misc.scanningCount,
          },
          {
            display: "Number of Transitions",
            score: props.data.misc.transitionCount,
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brick}
            content="Scanning"
            value={props.data.misc.scanningCount}
            onClick={(newValue: number) =>
              props.setData({
                misc: { ...props.data.misc, scanningCount: newValue },
              })
            }
          />

          <CounterButton
            color={Color.accents.brick}
            content="Transition"
            value={props.data.misc.transitionCount}
            onClick={(newValue: number) =>
              props.setData({
                misc: { ...props.data.misc, transitionCount: newValue },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>
    </Styles.PageContent>
  );
};

export default DataST;
