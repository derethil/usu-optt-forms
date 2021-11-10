import React, { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectCheckInfo, setFormInfo } from "../../slices/formInfoSlice";
import getNotebookCheck from "../../utils/notebookCheckUtils";
import {
  selectNotebookChecks,
  setCurrentChecks,
  setNotebookChecks,
} from "../../slices/notebookChecksSlice";

export default function NotebookCheck() {
  const { location, observation } = useAppSelector(selectCheckInfo);
  const checks = useAppSelector(selectNotebookChecks);
  const dispatch = useAppDispatch();

  // Change the notebook check score rows depending on location and observation #
  useEffect(() => {
    const numbered = getNotebookCheck(location === Location.logan, observation);
    const final = getNotebookCheck(location === Location.logan);

    dispatch(setCurrentChecks({ numbered, final }));
  }, [observation, location]);

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
        {checks.numbered.map((content, index) => {
          return (
            <NotebookCheckRow
              content={content.content}
              score={content.score}
              key={index}
              listId={index}
              updateCheck={(score: number) => {
                dispatch(setNotebookChecks({ score, index, key: "numbered" }));
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
        {checks.final.map((content, index) => {
          return (
            <NotebookCheckRow
              content={content.content}
              score={content.score}
              key={index}
              listId={index}
              updateCheck={(score: number) => {
                dispatch(setNotebookChecks({ score, index, key: "final" }));
              }}
            />
          );
        })}
      </Card>
    </PageContent>
  );
}
