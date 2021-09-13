import React from "react";

import Timer from "../../components/Timer";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import PraiseDataRow from "../../components/PraiseDataRow";
import Card from "../../components/Card";

import { ITimer } from "../../types/types";
import { IStudentTeachingData } from "../../types/dataTypes";

import * as dataUtils from "../../utils/dataUtils";
import { getPercent } from "../../utils/utils";

import * as Styles from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import {
  ButtonsWrapper,
  cardContainerStyles,
} from "../../styledComponents/style";

interface DataSTProps {
  title: string;
  timer: ITimer;
  data: IStudentTeachingData;
  setData: (updatedValues: Partial<IStudentTeachingData>) => void;
  resetCallback?: () => void;
}

const DataST = ({
  timer,
  data,
  setData,
  title,
  resetCallback,
}: DataSTProps) => {
  return (
    <Styles.PageContent>
      <Card
        title={title}
        containerStyles={cardContainerStyles}
        titleStyles={{ fontSize: "2rem" }}
      ></Card>

      <Card title="Timer" containerStyles={cardContainerStyles}>
        <Timer timer={timer} resetCallback={resetCallback} />
      </Card>

      <PraiseDataRow data={data} setData={setData} />

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

export default DataST;
