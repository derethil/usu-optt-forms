import React from "react";
import styled from "styled-components";

import Timer from "../../components/Timer";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import PraiseDataRow from "../../components/data/PraiseDataRow";
import Card from "../../components/Card";

import { IBT5PracticumData } from "../../types/dataTypes";

import { getPercent } from "../../utils/utils";

import * as Styles from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import {
  ButtonsWrapper,
  cardContainerStyles,
} from "../../styledComponents/style";
import DataProps from "./DataProps";

const TwoRowButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

const DataBT5 = (props: DataProps<IBT5PracticumData>) => {
  const updateSequence = (groupKey: string, newValue: object) => {
    props.setData({
      sequence: {
        ...props.data.sequence,
        [groupKey]: {
          ...props.data.sequence[groupKey],
          ...newValue,
        },
      },
    });
  };

  const data = props.data;
  const correct = data.sequence.correct;
  const incorrect = data.sequence.incorrect;

  const incorrectCount = (
    (incorrect.attention + incorrect.cue + incorrect.pause) /
    3
  ).toFixed(2);

  const totalInteractions =
    data.interactions.comment +
    data.interactions.question +
    data.interactions.nonTargetCue +
    correct.cue +
    correct.all;

  const errorTotal =
    data.errorCorrection.prompt +
    data.errorCorrection.test +
    data.errorCorrection.delayedTest;

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
        title="Instructional Sequence"
        displayData={[
          {
            display: "Attention",
            score: `${correct.attention} | ${incorrect.attention}`,
          },
          {
            display: "Cue",
            score: `${correct.cue} | ${incorrect.cue}`,
          },
          {
            display: "Pause",
            score: `${correct.pause} | ${incorrect.pause}`,
          },
          { display: "All Correct", score: correct.all },
          {
            display: "Total Sequences",
            score: correct.all + Number(incorrectCount),
          },
          {
            display: "Percent Correct",
            score: getPercent(
              correct.all,
              correct.all + Number(incorrectCount)
            ),
          },
        ]}
      >
        <TwoRowButtons>
          <ButtonsWrapper>
            <CounterButton
              color={Color.accents.greenLight}
              content="Attention"
              value={correct.attention}
              onClick={(attention: number) =>
                updateSequence("correct", { attention })
              }
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="Cue"
              value={correct.cue}
              onClick={(cue: number) => updateSequence("correct", { cue })}
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="Pause"
              value={correct.pause}
              onClick={(pause: number) => updateSequence("correct", { pause })}
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="All Correct"
              value={correct.all}
              onClick={(all: number) => updateSequence("correct", { all })}
            />
          </ButtonsWrapper>
          <ButtonsWrapper>
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={incorrect.attention}
              onClick={(attention: number) =>
                updateSequence("incorrect", { attention })
              }
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={incorrect.cue}
              onClick={(cue: number) => updateSequence("incorrect", { cue })}
            />
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={incorrect.pause}
              onClick={(pause: number) =>
                updateSequence("incorrect", { pause })
              }
            />
          </ButtonsWrapper>
        </TwoRowButtons>
      </DataRow>

      <DataRow
        title="Instructional Interactions"
        displayData={[
          { display: "Comment", score: data.interactions.comment },
          { display: "Question", score: data.interactions.question },
          { display: "Non-Target Cue", score: data.interactions.nonTargetCue },
          { display: "Cue", score: correct.cue + correct.all },
          {
            display: "Rate of Interaction",
            score: ((totalInteractions / props.timer.time) * 60).toFixed(2),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.neutrals.grayDarker}
            content="Comment"
            value={data.interactions.comment}
            onClick={(comment: number) =>
              props.setData({
                interactions: { ...props.data.interactions, comment },
              })
            }
          />
          <CounterButton
            color={Color.neutrals.grayDarker}
            content="Question"
            value={data.interactions.question}
            onClick={(question: number) =>
              props.setData({
                interactions: { ...props.data.interactions, question },
              })
            }
          />
          <CounterButton
            color={Color.neutrals.grayDarker}
            content="Non-Target Cue"
            value={data.interactions.nonTargetCue}
            onClick={(nonTargetCue: number) =>
              props.setData({
                interactions: { ...props.data.interactions, nonTargetCue },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Response Format"
        displayData={[
          { display: "Group", score: data.responses.group },
          { display: "Individual", score: data.responses.individual },
          { display: "Vocal", score: data.responses.vocal },
          { display: "Non-Vocal", score: data.responses.nonVocal },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.contextual.warning}
            content="Group"
            value={data.responses.group}
            onClick={(group: number) =>
              props.setData({
                responses: { ...props.data.responses, group },
              })
            }
          />
          <CounterButton
            color={Color.contextual.warning}
            content="Individual"
            value={data.responses.individual}
            onClick={(individual: number) =>
              props.setData({
                responses: { ...props.data.responses, individual },
              })
            }
          />
          <CounterButton
            color={Color.contextual.warning}
            content="Vocal"
            value={data.responses.vocal}
            onClick={(vocal: number) =>
              props.setData({
                responses: { ...props.data.responses, vocal },
              })
            }
          />
          <CounterButton
            color={Color.contextual.warning}
            content="Non-Vocal"
            value={data.responses.nonVocal}
            onClick={(nonVocal: number) =>
              props.setData({
                responses: { ...props.data.responses, nonVocal },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <PraiseDataRow data={props.data} setData={props.setData} balancedVaried />
      <DataRow
        title="Error Correction"
        displayData={[
          {
            display: "Response Error",
            score: data.errorCorrection.responseError,
          },
          { display: "Prompt", score: data.errorCorrection.prompt },
          { display: "Test", score: data.errorCorrection.test },
          { display: "Delayed Test", score: data.errorCorrection.delayedTest },
          {
            display: "Error Correction",
            score:
              Math.round(
                (errorTotal / (data.errorCorrection.responseError * 3)) * 100
              ) + "%",
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.contextual.info}
            content="Response Error"
            value={data.errorCorrection.responseError}
            onClick={(responseError: number) =>
              props.setData({
                errorCorrection: {
                  ...props.data.errorCorrection,
                  responseError,
                },
              })
            }
          />
          <CounterButton
            color={Color.contextual.info}
            content="Prompt"
            value={data.errorCorrection.prompt}
            onClick={(prompt: number) =>
              props.setData({
                errorCorrection: { ...props.data.errorCorrection, prompt },
              })
            }
          />
          <CounterButton
            color={Color.contextual.info}
            content="Test"
            value={data.errorCorrection.test}
            onClick={(test: number) =>
              props.setData({
                errorCorrection: { ...props.data.errorCorrection, test },
              })
            }
          />
          <CounterButton
            color={Color.contextual.info}
            content="Delayed Test"
            value={data.errorCorrection.delayedTest}
            onClick={(delayedTest: number) =>
              props.setData({
                errorCorrection: { ...props.data.errorCorrection, delayedTest },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Prompting"
        displayData={[
          { display: "LTM/ID'ed Prompt", score: data.prompts.ltm },
          { display: "Inconsistent Prompt", score: data.prompts.inconsistent },
          {
            display: "Prompt",
            score: getPercent(
              data.prompts.ltm,
              data.prompts.ltm + data.prompts.inconsistent
            ),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.blues.blue}
            content="LTM/ID'ed Prompt"
            value={data.prompts.ltm}
            onClick={(ltm: number) =>
              props.setData({ prompts: { ...props.data.prompts, ltm } })
            }
          />
          <CounterButton
            color={Color.blues.blue}
            content="Inconsistent Prompt"
            value={data.prompts.inconsistent}
            onClick={(inconsistent: number) =>
              props.setData({
                prompts: { ...props.data.prompts, inconsistent },
              })
            }
          />
        </ButtonsWrapper>
      </DataRow>
    </Styles.PageContent>
  );
};

export default DataBT5;
