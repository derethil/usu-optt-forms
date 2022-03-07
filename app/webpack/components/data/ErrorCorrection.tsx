import React from "react";
import { css } from "styled-components";
import { ColMixin, DataProps } from "../../types/types";
import Color from "../../styledComponents/colors";

import * as Styles from "../../styledComponents/style";
import { ErrorCorrection } from "../../types/dataTypes";
import { getPercent } from "../../utils/utils";
import CounterButton from "../CounterButton";
import DataRow from "../DataRow";

type Props = DataProps<ErrorCorrection> & { oneRow?: boolean };

function ErrorCorrection({ data, setData, oneRow }: Props) {
  const errorCorrect = data.correct;
  const errorIncorrect = data.incorrect;

  const totalErrors = errorCorrect.sequence + errorIncorrect.sequence;

  const WrapperMixin = oneRow
    ? css`
        height: 6em;
      `
    : undefined;

  const ColMixin = oneRow
    ? css`
        & > * {
          height: 100%;
        }
      `
    : undefined;

  const TwoRowData = [
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
    { display: "Incorrect Sequence", score: errorIncorrect.sequence },
    {
      display: "Total Sequences",
      score: totalErrors,
    },
    {
      display: "Percent Correct",
      score: getPercent(errorCorrect.sequence, totalErrors),
    },
  ];

  const OneRowData = [
    {
      display: "Models",
      score: `${errorCorrect.model} / ${getPercent(
        errorCorrect.model,
        errorIncorrect.sequence + errorCorrect.model
      )}`,
    },
    {
      display: "Tests",
      score: `${errorCorrect.test} / ${getPercent(
        errorCorrect.test,
        errorIncorrect.sequence + errorCorrect.test
      )}`,
    },
    {
      display: "Delayed Tests",
      score: `${errorCorrect.delayedTest} / ${getPercent(
        errorCorrect.delayedTest,
        errorIncorrect.sequence + errorCorrect.delayedTest
      )}`,
    },
  ];

  return (
    <DataRow
      title="Error Correction"
      displayData={oneRow ? OneRowData : TwoRowData}
    >
      <Styles.TwoRowWrapper mixin={WrapperMixin}>
        <Styles.TwoButtonCol mixin={ColMixin}>
          {!oneRow && (
            <CounterButton
              color={Color.contextual.info}
              content="Correct Sequence"
              value={errorCorrect.sequence}
              onClick={(sequence: number) =>
                setData("errorCorrection", "correct", { sequence })
              }
            />
          )}
          <CounterButton
            color={Color.contextual.danger}
            content="Incorrect Sequence"
            value={errorIncorrect.sequence}
            onClick={(sequence: number) =>
              setData("errorCorrection", "incorrect", { sequence })
            }
          />
        </Styles.TwoButtonCol>

        <Styles.TwoButtonCol mixin={ColMixin}>
          <CounterButton
            color={Color.contextual.info}
            content="Model"
            value={errorCorrect.model}
            onClick={(model: number) =>
              setData("errorCorrection", "correct", { model })
            }
          />
          {!oneRow && (
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={errorIncorrect.model}
              onClick={(model: number) =>
                setData("errorCorrection", "incorrect", { model })
              }
            />
          )}
        </Styles.TwoButtonCol>

        <Styles.TwoButtonCol mixin={ColMixin}>
          <CounterButton
            color={Color.contextual.info}
            content="Test"
            value={errorCorrect.test}
            onClick={(test: number) =>
              setData("errorCorrection", "correct", { test })
            }
          />
          {!oneRow && (
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={errorIncorrect.test}
              onClick={(test: number) =>
                setData("errorCorrection", "incorrect", { test })
              }
            />
          )}
        </Styles.TwoButtonCol>

        <Styles.TwoButtonCol mixin={ColMixin}>
          <CounterButton
            color={Color.contextual.info}
            content="Delayed Test"
            value={errorCorrect.delayedTest}
            onClick={(delayedTest: number) =>
              setData("errorCorrection", "correct", { delayedTest })
            }
          />
          {!oneRow && (
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={errorIncorrect.delayedTest}
              onClick={(delayedTest: number) =>
                setData("errorCorrection", "incorrect", { delayedTest })
              }
            />
          )}
        </Styles.TwoButtonCol>
      </Styles.TwoRowWrapper>
    </DataRow>
  );
}

export default ErrorCorrection;
