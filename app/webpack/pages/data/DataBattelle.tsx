import React from "react";
import { css } from "styled-components";

import { formOptions } from "../../currentForm";
import { IBattelleObservation } from "../../types/dataTypes";
import DataProps from "./DataProps";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectFormInfo, toggleSubdomain } from "../../slices/formInfoSlice";
import Color from "../../styledComponents/colors";

import {
  PageContent,
  cardContainerStyles,
  ButtonsWrapper,
  TwoRowWrapper,
  TwoButtonCol,
} from "../../styledComponents/style";

import Card from "../../components/Card";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import OptionRow from "../../components/optionRow";
import TextInput from "../../components/TextInput";
import Timer from "../../components/Timer";
import ToggleButtons from "../../components/ToggleButtons";

type Correctness = "correct" | "incorrect";
type PraiseKey = "general" | "academic";

const ButtonColMixin = css`
  & > * {
    height: 13%;
  }
`;

const ButtonWrapperMixin = css`
  height: 20em;
`;

export function DataBattelle(props: DataProps<IBattelleObservation>) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(props.data.selector);
  const formInfo = useAppSelector(selectFormInfo);

  if (data.currentForm !== formOptions.battelle) return <div></div>;

  const updateData = (
    key: keyof IBattelleObservation,
    groupKey: string,
    correctness: Correctness,
    value: string | number
  ) => {
    dispatch(
      props.data.actions.setData({
        [key]: {
          ...data[key],
          [groupKey]: {
            ...data[key][groupKey],
            [correctness]: value,
          },
        },
      })
    );
  };

  const updatePraise = (key: PraiseKey, value: number) => {
    dispatch(
      props.data.actions.setData({
        praise: {
          ...data.praise,
          [key]: value,
        },
      })
    );
  };

  const praiseRatio = () => `
  ${data.interview.instruction.correct + data.interview.instruction.incorrect} : ${
    data.praise.general + data.praise.academic
  }
  `;

  return (
    <PageContent>
      <Card
        title={props.title}
        containerStyles={cardContainerStyles}
        titleStyles={css`
          font-size: 2rem;
        `}
      />

      <Card title="Timer" containerStyles={cardContainerStyles}>
        <Timer timer={props.timer} resetCallback={props.resetCallback} />
      </Card>

      <Card title="Scores" containerStyles={cardContainerStyles}>
        <ToggleButtons
          key="selectSubdomain"
          options={["AM", "RA", "PC", "GM", "FM", "PM", "RC", "EC"]}
          label="Subdomain"
          currSelected={formInfo.subdomain}
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
          onClickButton={(clicked) => {
            dispatch(toggleSubdomain(clicked));
          }}
        />

        <TextInput
          title="Item Number"
          value={data.item}
          field="item"
          updateForm={(updated) => dispatch(props.data.actions.setData(updated))}
          containerStyles={css`
            margin-top: 1em;
          `}
        />

        <OptionRow
          title="Child Score"
          currSelection={String(data.childScore)}
          options={["2", "1", "0", "N/A"].map((el) => ({ content: el }))}
          updateSelection={(childScore) =>
            dispatch(props.data.actions.setData({ childScore }))
          }
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />

        <OptionRow
          title="Examiner Score"
          currSelection={String(data.examinerScore)}
          options={["2", "1", "0"].map((el) => ({ content: el }))}
          updateSelection={(examinerScore) =>
            dispatch(props.data.actions.setData({ examinerScore }))
          }
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />
      </Card>

      <DataRow
        title="Interview"
        displayData={[
          {
            display: "Instruction",
            score: `${data.interview.instruction.correct} | ${data.interview.instruction.incorrect}`,
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.contextual.info}
            content="Correct Instruction"
            value={data.interview.instruction.correct}
            onClick={(value) => updateData("interview", "instruction", "correct", value)}
          />
          <CounterButton
            color={Color.contextual.danger}
            content="Incorrect Instruction"
            value={data.interview.instruction.incorrect}
            onClick={(value) =>
              updateData("interview", "instruction", "incorrect", value)
            }
          />
        </ButtonsWrapper>
      </DataRow>

      <DataRow
        title="Structured"
        displayData={[
          {
            display: "Materials",
            score: `${data.structured.materials.correct} | ${data.structured.materials.incorrect}`,
          },
          {
            display: "Secure Attention",
            score: `${data.structured.secureAttention.correct} | ${data.structured.secureAttention.incorrect}`,
          },
          {
            display: "Instruction",
            score: `${data.structured.instruction.correct} | ${data.structured.instruction.incorrect}`,
          },
          {
            display: "Time for Response",
            score: `${data.structured.allowTimeForResponse.correct} | ${data.structured.allowTimeForResponse.incorrect}`,
          },
          {
            display: "Prompting",
            score: `${data.structured.allowWithoutPrompt.correct} | ${data.structured.allowWithoutPrompt.incorrect}`,
          },
          {
            display: "Material Arrangement",
            score: `${data.structured.arrangeMaterials.correct} | ${data.structured.arrangeMaterials.incorrect}`,
          },
        ]}
      >
        <TwoRowWrapper mixin={ButtonWrapperMixin}>
          <TwoButtonCol mixin={ButtonColMixin}>
            <CounterButton
              color={Color.accents.greenLight}
              content="Correct Material"
              value={data.structured.materials.correct}
              onClick={(value) => updateData("structured", "materials", "correct", value)}
            />
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Material"
              value={data.structured.materials.incorrect}
              onClick={(value) =>
                updateData("structured", "materials", "incorrect", value)
              }
            />

            <CounterButton
              color={Color.accents.greenLight}
              content="Correct Timing / # of Opp."
              value={data.structured.allowTimeForResponse.correct}
              onClick={(value) =>
                updateData("structured", "allowTimeForResponse", "correct", value)
              }
            />
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Timing"
              value={data.structured.allowTimeForResponse.incorrect}
              onClick={(value) =>
                updateData("structured", "allowTimeForResponse", "incorrect", value)
              }
            />
          </TwoButtonCol>

          <TwoButtonCol mixin={ButtonColMixin}>
            <CounterButton
              color={Color.accents.greenLight}
              content="Secure Attention"
              value={data.structured.secureAttention.correct}
              onClick={(value) =>
                updateData("structured", "secureAttention", "correct", value)
              }
            />
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Attention"
              value={data.structured.secureAttention.incorrect}
              onClick={(value) =>
                updateData("structured", "secureAttention", "incorrect", value)
              }
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="No Prompt Given"
              value={data.structured.allowWithoutPrompt.correct}
              onClick={(value) =>
                updateData("structured", "allowWithoutPrompt", "correct", value)
              }
            />
            <CounterButton
              color={Color.contextual.danger}
              content="Gave Prompt"
              value={data.structured.allowWithoutPrompt.incorrect}
              onClick={(value) =>
                updateData("structured", "allowWithoutPrompt", "incorrect", value)
              }
            />
          </TwoButtonCol>

          <TwoButtonCol mixin={ButtonColMixin}>
            <CounterButton
              color={Color.accents.greenLight}
              content="Correct Instruction"
              value={data.structured.instruction.correct}
              onClick={(value) =>
                updateData("structured", "instruction", "correct", value)
              }
            />
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect instruction"
              value={data.structured.instruction.incorrect}
              onClick={(value) =>
                updateData("structured", "instruction", "incorrect", value)
              }
            />
            <CounterButton
              color={Color.accents.greenLight}
              content="Arranged Materials"
              value={data.structured.arrangeMaterials.correct}
              onClick={(value) =>
                updateData("structured", "arrangeMaterials", "correct", value)
              }
            />
            <CounterButton
              color={Color.contextual.danger}
              content="Incorrect Arrangement"
              value={data.structured.arrangeMaterials.incorrect}
              onClick={(value) =>
                updateData("structured", "arrangeMaterials", "incorrect", value)
              }
            />
          </TwoButtonCol>
        </TwoRowWrapper>
      </DataRow>

      <DataRow
        title="Praise"
        displayData={[
          {
            display: "General Praise",
            score: data.praise.general,
          },
          {
            display: "Specific Praise",
            score: data.praise.academic,
          },
          {
            display: "Praise Ratio",
            score: praiseRatio(),
          },
        ]}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.yellow}
            content="General"
            value={data.praise.general}
            onClick={(value) => updatePraise("general", value)}
          />
          <CounterButton
            color={Color.accents.yellow}
            content="Specific"
            value={data.praise.academic}
            onClick={(value) => updatePraise("academic", value)}
          />
        </ButtonsWrapper>
      </DataRow>

      <Card title="Notes" containerStyles={cardContainerStyles}>
        <TextInput
          noLabel
          placeholder="Notes"
          value={data.notes}
          field="notes"
          textArea
          updateForm={(updated) => dispatch(props.data.actions.setData(updated))}
        />
      </Card>
    </PageContent>
  );
}
