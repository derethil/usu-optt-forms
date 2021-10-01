import React from "react";
import styled from "styled-components";

import Timer from "../../components/Timer";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import PraiseDataRow from "../../components/rubric/PraiseDataRow";
import OTRRow from "../../components/rubric/OTRRow";
import Card from "../../components/Card";

import { ITimer } from "../../types/types";
import {
  ISeverePracticumData,
  ISequence,
  IReadingData,
} from "../../types/dataTypes";

import { getPercent } from "../../utils/utils";

import * as Styles from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import {
  ButtonsWrapper,
  cardContainerStyles,
} from "../../styledComponents/style";

const TwoRowButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

interface DataSPProps {
  title: string;
  timer: ITimer;
  data: ISeverePracticumData | IReadingData;
  setData: (updatedValues: Partial<ISeverePracticumData>) => void;
  resetCallback?: () => void;
}

const DataSPR = (props: DataSPProps) => {
  const setData = (sequenceKey: string, groupKey: string, newValue: object) => {
    props.setData({
      [sequenceKey]: {
        ...props.data[sequenceKey],
        [groupKey]: {
          ...props.data[sequenceKey][groupKey],
          ...newValue,
        },
      },
    });
  };

  const signalCorrect = props.data.signalSequence.correct;
  const signalIncorrect = props.data.signalSequence.incorrect;

  const totalSequences = signalCorrect.sequence + signalIncorrect.sequence;

  const errorCorrect = props.data.errorCorrection.correct;
  const errorIncorrect = props.data.errorCorrection.incorrect;

  const totalErrors = errorCorrect.sequence + errorIncorrect.sequence;

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

      <DataRow
        title="Signal Sequence"
        displayData={[
          {
            display: "Cue",
            score: `${signalCorrect.cue} | ${signalIncorrect.cue}`,
          },
          {
            display: "Pause",
            score: `${signalCorrect.pause} | ${signalIncorrect.pause}`,
          },
          {
            display: "Signal",
            score: `${signalCorrect.signal} | ${signalIncorrect.signal}`,
          },
          { display: "All Correct", score: signalCorrect.sequence },
          {
            display: "Total Sequences",
            score: totalSequences,
          },
          {
            display: "Percent Correct",
            score: getPercent(signalCorrect.sequence, totalSequences),
          },
        ]}
      >
        <TwoRowButtons>
          <ButtonsWrapper>
            <CounterButton
              color={Color.accents.greenLight}
              content="Correct Sequence"
              value={signalCorrect.sequence}
              onClick={(sequence: number) =>
                setData("signalSequence", "correct", { sequence })
              }
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="Cue"
              value={signalCorrect.cue}
              onClick={(cue: number) =>
                setData("signalSequence", "correct", { cue })
              }
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="Pause"
              value={signalCorrect.pause}
              onClick={(pause: number) =>
                setData("signalSequence", "correct", { pause })
              }
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="Signal"
              value={signalCorrect.signal}
              onClick={(signal: number) =>
                setData("signalSequence", "correct", { signal })
              }
            />
          </ButtonsWrapper>
          <ButtonsWrapper>
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Sequence"
              value={signalIncorrect.sequence}
              onClick={(sequence: number) =>
                setData("signalSequence", "incorrect", { sequence })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.cue}
              onClick={(cue: number) =>
                setData("signalSequence", "incorrect", { cue })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.pause}
              onClick={(pause: number) =>
                setData("signalSequence", "incorrect", { pause })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.signal}
              onClick={(signal: number) =>
                setData("signalSequence", "incorrect", { signal })
              }
            />
          </ButtonsWrapper>
        </TwoRowButtons>
      </DataRow>

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
        <TwoRowButtons>
          <ButtonsWrapper>
            <CounterButton
              color={Color.contextual.info}
              content="Correct Sequence"
              value={errorCorrect.sequence}
              onClick={(sequence: number) =>
                setData("errorCorrection", "correct", { sequence })
              }
            />
            <CounterButton
              color={Color.contextual.info}
              content="Model"
              value={errorCorrect.model}
              onClick={(model: number) =>
                setData("errorCorrection", "correct", { model })
              }
            />
            <CounterButton
              color={Color.contextual.info}
              content="Test"
              value={errorCorrect.test}
              onClick={(test: number) =>
                setData("errorCorrection", "correct", { test })
              }
            />
            <CounterButton
              color={Color.contextual.info}
              content="Delayed Test"
              value={errorCorrect.delayedTest}
              onClick={(delayedTest: number) =>
                setData("errorCorrection", "correct", { delayedTest })
              }
            />
          </ButtonsWrapper>
          <ButtonsWrapper>
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Sequence"
              value={errorIncorrect.sequence}
              onClick={(sequence: number) =>
                setData("errorCorrection", "incorrect", { sequence })
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
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={errorIncorrect.test}
              onClick={(test: number) =>
                setData("errorCorrection", "incorrect", { test })
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
          </ButtonsWrapper>
        </TwoRowButtons>
      </DataRow>

      <PraiseDataRow data={props.data} setData={props.setData} />

      <OTRRow data={props.data} setData={props.setData} timer={props.timer} />
    </Styles.PageContent>
  );
};

export default DataSPR;
