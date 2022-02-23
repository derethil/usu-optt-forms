import React from "react";
import styled, { css } from "styled-components";

import OptionRow from "../components/optionRow";
import IconTitle from "../components/IconTitle";
import { Section } from "../types/types";
import {
  buttonStyles,
  PageContent,
  RubricTitleContent,
  cardContainerStyles,
} from "../styledComponents/style";
import ScoreTotals from "../components/rubric/ScoreTotals";
import Card from "../components/Card";
import Color from "../styledComponents/colors";
import { generateScoreData } from "../utils/scoreUtils";
import Timer from "../components/Timer";
import currentForm, { formOptions } from "../currentForm";
import {
  selectRubric,
  setRubricComment,
  setRubricScore,
} from "../slices/rubricSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import FormData from "../FormData";
import { ITimer } from "../slices/timersSlice";

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

const timerContentStyles = css`
  margin-top: 0.5em;
`;

const Rubric = ({ index }: { index: STRIndex }) => {
  const rubricData = FormData[currentForm].rubric[index];

  console.log(rubricData);

  const rubricScores = useAppSelector(selectRubric);

  console.log(rubricScores);

  // const sectionScore = summary[index][1];

  // const rows = section.rows.map((row) => {
  //   <CardTitleContainer>
  //     <RubricTitleContent>{section.sectionTitle}</RubricTitleContent>
  //     <p>{sectionScore}</p>
  //   </CardTitleContainer>;
  // });

  return (
    <PageContent className="rubric">
      <Card
        title={<RubricTitleContent>Total Scores</RubricTitleContent>}
        titleStyles={cardTitleStyles}
        containerStyles={cardContainerStyles}
      ></Card>
    </PageContent>
  );
};

export default Rubric;
