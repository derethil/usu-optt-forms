import React from "react";
import styled, { css } from "styled-components";

import {
  PageContent,
  RubricTitleContent,
  cardContainerStyles,
} from "../styledComponents/style";
import Card from "../components/Card";
import Color from "../styledComponents/colors";
import currentForm from "../currentForm";
import { selectRubric, setRubricScore } from "../slices/rubricSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import FormData from "../FormData";

import TextScore from "../components/TextScore";

export enum STRIndex {
  "behavior" = 0,
  "collaboration" = 1,
  "iep" = 2,
}

const cardTitleStyles = css`
  padding-left: 1em;
  padding-right: 1em;
`;

const rowTitleStyles = css`
  font-size: 1.33rem;
  color: ${Color.neutrals.grayDarker};
`;

const contentStyles = css`
  padding-top: 0;
`;

const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Rubric = ({ index }: { index: STRIndex }) => {
  const rubricData = FormData[currentForm].rubric[index];
  const rubricScores = useAppSelector(selectRubric);
  const dispatch = useAppDispatch();

  const updateScore = (
    section: string,
    row: string,
    newScore: string,
    maxScore: number | string
  ) => {
    if (Number(newScore) >= 0 && Number(newScore) <= Number(maxScore)) {
      dispatch(setRubricScore({ section, row, newScore: String(newScore) }));
    }
  };

  const rows = rubricData.rows.map((row, idx) => {
    return (
      <TextScore
        content={row.area}
        maxScore={row.options[0].score}
        value={rubricScores[rubricData.sectionTitle][row.area].score}
        updateValue={(newValues: { [key: string]: string }) => {
          updateScore(
            rubricData.sectionTitle,
            row.area,
            Object.values(newValues)[0],
            row.options[0].score
          );
        }}
        key={idx}
      />
    );
  });

  return (
    <PageContent className="rubric">
      <Card
        title={
          <RubricTitleContent>{rubricData.sectionTitle}</RubricTitleContent>
        }
        titleStyles={cardTitleStyles}
        containerStyles={cardContainerStyles}
      >
        {rows}
      </Card>
    </PageContent>
  );
};

export default Rubric;
