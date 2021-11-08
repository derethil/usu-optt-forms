import React, { useState } from "react";
import { css } from "styled-components";

import Card from "../../components/Card";
import OptionRow from "../../components/optionRow";

import {
  cardContainerStyles,
  PageContent,
  RubricTitleContent,
} from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import IconTitle from "../../components/IconTitle";
import NotebookCheckRow from "./NotebookCheckRow";
import { Location } from "../../types/types";
import { INotebookCheck } from "../../types/dataTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectCheckInfo, setFormInfo } from "../../slices/formInfoSlice";

interface Props {
  checks: INotebookCheck;
  setChecks: (newValue: Partial<INotebookCheck>) => void;
}

export default function NotebookCheck({ checks, setChecks }: Props) {
  const { location, observation } = useAppSelector(selectCheckInfo);
  const dispatch = useAppDispatch();

  const handleUpdateCheck = (
    score: number,
    index: number,
    key: keyof typeof checks
  ): void => {
    const checksArr = [...checks[key]];
    checksArr[index] = { content: checksArr[index].content, score };
    setChecks({ [key]: checksArr });
  };
  return (
    <PageContent>
      <Card
        title={<RubricTitleContent>Notebook Check Info</RubricTitleContent>}
        containerStyles={cardContainerStyles}
      >
        <OptionRow
          title="Location"
          currSelection={location}
          contentOptions={[Location.logan, Location.optt]}
          updateSelection={(newSelection) =>
            dispatch(setFormInfo({ location: newSelection as Location }))
          }
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />
        <OptionRow
          title="Observation / Notebook Check Number"
          currSelection={observation.toString()}
          contentOptions={[...Array(5)].map((_, i) => (i + 1).toString())}
          updateSelection={(newSelection: string) =>
            dispatch(setFormInfo({ observation: Number(newSelection) }))
          }
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />
      </Card>

      <Card
        title={
          <IconTitle
            content={`Notebook Check #${observation}`}
            tooltipContent={`Corresponds with observation #${observation}`}
            iconStyles={css`
              color: ${Color.lights.grayLighter};
            `}
          />
        }
        containerStyles={cardContainerStyles}
      >
        {checks.numbered.map((content, idx) => {
          return (
            <NotebookCheckRow
              content={content.content}
              score={content.score}
              key={idx}
              listId={idx}
              updateCheck={(score: number) => {
                handleUpdateCheck(score, idx, "numbered");
              }}
            />
          );
        })}
      </Card>

      <Card
        title={
          <IconTitle
            content="Final Notebook Check"
            tooltipContent="Completed by course instructor"
            iconStyles={css`
              color: ${Color.lights.grayLighter};
            `}
          />
        }
        containerStyles={cardContainerStyles}
      >
        {checks.final.map((content, idx) => {
          return (
            <NotebookCheckRow
              content={content.content}
              score={content.score}
              key={idx}
              listId={idx}
              updateCheck={(score: number) => {
                handleUpdateCheck(score, idx, "final");
              }}
            />
          );
        })}
      </Card>
    </PageContent>
  );
}
