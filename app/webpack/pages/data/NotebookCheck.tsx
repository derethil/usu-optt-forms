import React from "react";
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
import QuestionRow from "../../components/QuestionRow";
import { Location } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectCheckInfo, setLocationOrObservation } from "../../slices/formInfoSlice";
import {
  selectNotebookChecks,
  setNotebookChecks,
} from "../../slices/notebookChecksSlice";

export default function NotebookCheck() {
  const { location, observation } = useAppSelector(selectCheckInfo);
  const checks = useAppSelector(selectNotebookChecks);
  const dispatch = useAppDispatch();

  const updateRelevantFormInfo = (updatedValues: {
    location: Location;
    observation: typeof observation;
  }) => {
    dispatch(
      setLocationOrObservation({
        location: updatedValues.location,
        observation: updatedValues.observation,
      })
    );
  };

  const handleUpdateSelection = (newSelection: string) => {
    const location = newSelection === "Logan" ? Location.logan : Location.optt;
    updateRelevantFormInfo({
      location,
      observation,
    });
  };

  const locationToDisplay = location === Location.logan ? "Logan" : "OPTT";

  return (
    <PageContent>
      <Card
        title={<RubricTitleContent>Notebook Check Info</RubricTitleContent>}
        containerStyles={cardContainerStyles}
      >
        <OptionRow
          title="Location"
          currSelection={locationToDisplay}
          options={[{ content: "Logan" }, { content: "OPTT" }]}
          updateSelection={(newSelection) => handleUpdateSelection(newSelection)}
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />
        <OptionRow
          title="Observation / Notebook Check Number"
          currSelection={observation.toString()}
          // Below generates array of 5 digits
          options={[...Array(5)].map((_, i) => {
            return { content: (i + 1).toString() };
          })}
          updateSelection={(newSelection: string) =>
            updateRelevantFormInfo({
              location,
              observation: newSelection,
            })
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
        {checks.map((content, index) => {
          return (
            <QuestionRow
              content={content.content}
              score={content.score}
              scoreOptions={[...Array(6)].map((_, i) => i * 2)}
              key={index}
              updateScore={(score) => {
                dispatch(
                  setNotebookChecks({
                    score: Number(score),
                    index,
                  })
                );
              }}
            />
          );
        })}
      </Card>
    </PageContent>
  );
}
