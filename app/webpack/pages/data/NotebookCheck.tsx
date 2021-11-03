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
import getNotebookCheck from "../../utils/notebookCheckUtils";
import NotebookCheckRow from "./NotebookCheckRow";
import { Location } from "../../types/types";
import { INotebookCheck } from "../../types/dataTypes";

interface Props {
  checks: INotebookCheck;
  obsNumber: number;
  location: Location;
  setObsNumber: (newValue: number) => void;
  setLocation: (newValue: Location) => void;
  setChecks: (newValue: Partial<INotebookCheck>) => void;
}

export default function NotebookCheck({
  checks,
  obsNumber,
  location,
  setObsNumber,
  setLocation,
  setChecks,
}: Props) {
  const handleupdateCheck = (
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
            setLocation(newSelection as Location)
          }
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />
        <OptionRow
          title="Observation / Notebook Check Number"
          currSelection={obsNumber.toString()}
          contentOptions={[...Array(5)].map((_, i) => (i + 1).toString())}
          updateSelection={(newSelection: string) =>
            setObsNumber(Number(newSelection))
          }
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />
      </Card>

      <Card
        title={
          <IconTitle
            content={`Notebook Check #${obsNumber}`}
            tooltipContent={`Corresponds with observation #${obsNumber}`}
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
                handleupdateCheck(score, idx, "numbered");
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
                handleupdateCheck(score, idx, "final");
              }}
            />
          );
        })}
      </Card>
    </PageContent>
  );
}
