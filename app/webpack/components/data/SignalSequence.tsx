import React from "react";
import { css } from "styled-components";
import Color from "../../styledComponents/colors";

import * as Styles from "../../styledComponents/style";
import { SignalSequence } from "../../types/dataTypes";
import { DataProps } from "../../types/types";
import { getPercent } from "../../utils/utils";
import CounterButton from "../CounterButton";
import DataRow from "../DataRow";

type Props = DataProps<SignalSequence> & { includeIncorrect?: boolean };

function SignalSequence({ data, setData, includeIncorrect }: Props) {
  const signalCorrect = data.correct;
  const signalIncorrect = data.incorrect;

  const totalSequences = signalCorrect.sequence + signalIncorrect.sequence;

  const WrapperMixin = includeIncorrect
    ? undefined
    : css`
        height: 6em;
      `;

  const ColMixin = includeIncorrect
    ? undefined
    : css`
        & > * {
          height: 100%;
        }
      `;

  return (
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
      <Styles.TwoRowWrapper mixin={WrapperMixin}>
        <Styles.TwoButtonCol mixin={ColMixin}>
          <CounterButton
            color={Color.accents.greenLight}
            content="Correct Sequence"
            value={signalCorrect.sequence}
            onClick={(sequence: number) =>
              setData("signalSequence", "correct", { sequence })
            }
          />
          {includeIncorrect && (
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Sequence"
              value={signalIncorrect.sequence}
              onClick={(sequence: number) =>
                setData("signalSequence", "incorrect", { sequence })
              }
            />
          )}
        </Styles.TwoButtonCol>
        <Styles.TwoButtonCol mixin={ColMixin}>
          <CounterButton
            color={Color.accents.greenLight}
            content="Cue"
            value={signalCorrect.cue}
            onClick={(cue: number) =>
              setData("signalSequence", "correct", { cue })
            }
          />
          {includeIncorrect && (
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.cue}
              onClick={(cue: number) =>
                setData("signalSequence", "incorrect", { cue })
              }
            />
          )}
        </Styles.TwoButtonCol>

        <Styles.TwoButtonCol mixin={ColMixin}>
          <CounterButton
            color={Color.accents.greenLight}
            content="Pause"
            value={signalCorrect.pause}
            onClick={(pause: number) =>
              setData("signalSequence", "correct", { pause })
            }
          />
          {includeIncorrect && (
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.pause}
              onClick={(pause: number) =>
                setData("signalSequence", "incorrect", { pause })
              }
            />
          )}
        </Styles.TwoButtonCol>

        <Styles.TwoButtonCol mixin={ColMixin}>
          <CounterButton
            color={Color.accents.greenLight}
            content="Signal"
            value={signalCorrect.signal}
            onClick={(signal: number) =>
              setData("signalSequence", "correct", { signal })
            }
          />
          {includeIncorrect && (
            <CounterButton
              color={Color.neutrals.grayDark}
              content="Incorrect"
              value={signalIncorrect.signal}
              onClick={(signal: number) =>
                setData("signalSequence", "incorrect", { signal })
              }
            />
          )}
        </Styles.TwoButtonCol>
      </Styles.TwoRowWrapper>
    </DataRow>
  );
}

export default SignalSequence;
