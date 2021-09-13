import React from "react";
import styled from "styled-components";

import Timer from "../../components/Timer";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import PraiseDataRow from "../../components/PraiseDataRow";
import OTRRow from "../../components/OTRRow";
import Card from "../../components/Card";

import { ITimer } from "../../types/types";
import { ISeverePracticumData } from "../../types/dataTypes";

import * as dataUtils from "../../utils/dataUtils";
import { getPercent } from "../../utils/utils";

import * as Styles from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import {
  ButtonsWrapper,
  cardContainerStyles,
} from "../../styledComponents/style";
import { Props } from "react-modal";

const TwoRowButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

interface DataSPProps {
  title: string;
  timer: ITimer;
  data: ISeverePracticumData;
  setData: (updatedValues: Partial<ISeverePracticumData>) => void;
  resetCallback?: () => void;
}

const DataSP = (props: DataSPProps) => {
  // const updateSequence = (
  //   sequence: keyof typeof props.data,
  //   group: keyof typeof props.data[sequence]
  // ) => {
  //   props.setData({
  //     [sequence]: {
  //       ...props.data[sequence],
  //       [group]: {
  //         ...props.data[sequence][group],
  //       },
  //     },
  //   });
  // };

  const signalCorrect = props.data.signalSequence.correct;
  const signalIncorrect = props.data.signalSequence.incorrect;

  const totalSequences = signalCorrect.sequence + signalIncorrect.sequence;

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
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    correct: {
                      ...signalCorrect,
                      sequence: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="Cue"
              value={signalCorrect.cue}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    correct: {
                      ...signalCorrect,
                      cue: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="Pause"
              value={signalCorrect.pause}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    correct: {
                      ...signalCorrect,
                      pause: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="Signal"
              value={signalCorrect.signal}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    correct: {
                      ...signalCorrect,
                      signal: newValue,
                    },
                  },
                })
              }
            />
          </ButtonsWrapper>
          <ButtonsWrapper>
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Sequence"
              value={signalIncorrect.sequence}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    incorrect: {
                      ...signalIncorrect,
                      sequence: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.cue}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    incorrect: {
                      ...signalIncorrect,
                      cue: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.pause}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    incorrect: {
                      ...signalIncorrect,
                      pause: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.signal}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    incorrect: {
                      ...signalIncorrect,
                      signal: newValue,
                    },
                  },
                })
              }
            />
          </ButtonsWrapper>
        </TwoRowButtons>
      </DataRow>

      <DataRow
        title="Error Correction"
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
              color={Color.contextual.info}
              content="Correct Sequence"
              value={signalCorrect.sequence}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    correct: {
                      ...signalCorrect,
                      sequence: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.contextual.info}
              content="Model"
              value={signalCorrect.cue}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    correct: {
                      ...signalCorrect,
                      cue: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.contextual.info}
              content="Test"
              value={signalCorrect.pause}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    correct: {
                      ...signalCorrect,
                      pause: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.contextual.info}
              content="Delayed Test"
              value={signalCorrect.signal}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    correct: {
                      ...signalCorrect,
                      signal: newValue,
                    },
                  },
                })
              }
            />
          </ButtonsWrapper>
          <ButtonsWrapper>
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Sequence"
              value={signalIncorrect.sequence}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    incorrect: {
                      ...signalIncorrect,
                      sequence: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.cue}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    incorrect: {
                      ...signalIncorrect,
                      cue: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.pause}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    incorrect: {
                      ...signalIncorrect,
                      pause: newValue,
                    },
                  },
                })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.signal}
              onClick={(newValue: number) =>
                props.setData({
                  signalSequence: {
                    ...props.data.signalSequence,
                    incorrect: {
                      ...signalIncorrect,
                      signal: newValue,
                    },
                  },
                })
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

export default DataSP;
