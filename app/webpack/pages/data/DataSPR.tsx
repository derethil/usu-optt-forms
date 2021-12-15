import React from "react";
import styled, { css } from "styled-components";

import Timer from "../../components/Timer";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import PraiseDataRow from "../../components/data/PraiseDataRow";
import OTRRow from "../../components/data/OTRRow";
import Card from "../../components/Card";

import { ISeverePracticumData, IReadingData } from "../../types/dataTypes";

import { getPercent } from "../../utils/utils";

import * as Styles from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import { cardContainerStyles } from "../../styledComponents/style";
import DataProps from "./DataProps";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { formOptions } from "../../currentForm";
import SignalSequenceRow from "../../components/data/SignalSequence";

const DataSPR = (
  props: DataProps<ISeverePracticumData | IReadingData> & {
    includeIncorrect?: boolean;
  }
) => {
  const data = useAppSelector(props.data.selector);
  const dispatch = useAppDispatch();

  if (
    data.currentForm !== formOptions.severePracticum &&
    data.currentForm !== formOptions.reading
  )
    return <div></div>;

  const setData = (sequenceKey: string, groupKey: string, newValue: object) => {
    dispatch(
      props.data.actions.setData({
        [sequenceKey]: {
          ...data[sequenceKey],
          [groupKey]: {
            ...data[sequenceKey][groupKey],
            ...newValue,
          },
        },
      })
    );
  };

  const errorCorrect = data.errorCorrection.correct;
  const errorIncorrect = data.errorCorrection.incorrect;

  const totalErrors = errorCorrect.sequence + errorIncorrect.sequence;

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
        <Timer timer={props.timer} resetCallback={props.resetCallback} />
      </Card>

      <SignalSequenceRow
        data={data.signalSequence}
        setData={setData}
        includeIncorrect={props.includeIncorrect}
      />

      <DataRow
        title="Error Correction"
        displayData={[
          {
            display: "Model",
            score: `${errorCorrect.model} | ${errorIncorrect.model}`,
          },
          {
            display: "Test",
            score: `${errorCorrect.test} | ${errorIncorrect.test}`,
          },
          {
            display: "Delayed Test",
            score: `${errorCorrect.delayedTest} | ${errorIncorrect.delayedTest}`,
          },
          { display: "All Correct", score: errorCorrect.sequence },
          {
            display: "Total Sequences",
            score: totalErrors,
          },
          {
            display: "Percent Correct",
            score: getPercent(errorCorrect.sequence, totalErrors),
          },
        ]}
      >
        <Styles.TwoRowWrapper>
          <Styles.TwoButtonCol>
            <CounterButton
              color={Color.contextual.info}
              content="Correct Sequence"
              value={errorCorrect.sequence}
              onClick={(sequence: number) =>
                setData("errorCorrection", "correct", { sequence })
              }
            />
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Sequence"
              value={errorIncorrect.sequence}
              onClick={(sequence: number) =>
                setData("errorCorrection", "incorrect", { sequence })
              }
            />
          </Styles.TwoButtonCol>

          <Styles.TwoButtonCol>
            <CounterButton
              color={Color.contextual.info}
              content="Model"
              value={errorCorrect.model}
              onClick={(model: number) =>
                setData("errorCorrection", "correct", { model })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={errorIncorrect.model}
              onClick={(model: number) =>
                setData("errorCorrection", "incorrect", { model })
              }
            />
          </Styles.TwoButtonCol>

          <Styles.TwoButtonCol>
            <CounterButton
              color={Color.contextual.info}
              content="Test"
              value={errorCorrect.test}
              onClick={(test: number) =>
                setData("errorCorrection", "correct", { test })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={errorIncorrect.test}
              onClick={(test: number) =>
                setData("errorCorrection", "incorrect", { test })
              }
            />
          </Styles.TwoButtonCol>

          <Styles.TwoButtonCol>
            <CounterButton
              color={Color.contextual.info}
              content="Delayed Test"
              value={errorCorrect.delayedTest}
              onClick={(delayedTest: number) =>
                setData("errorCorrection", "correct", { delayedTest })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={errorIncorrect.delayedTest}
              onClick={(delayedTest: number) =>
                setData("errorCorrection", "incorrect", { delayedTest })
              }
            />
          </Styles.TwoButtonCol>
        </Styles.TwoRowWrapper>
      </DataRow>

      <PraiseDataRow data={props.data} />

      <OTRRow dataSlice={props.data} timer={props.timer} />
    </Styles.PageContent>
  );
};

export default DataSPR;
