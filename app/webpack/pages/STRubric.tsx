import React from "react";
import styled, { css } from "styled-components";

import {
  PageContent,
  RubricTitleContent,
  cardContainerStyles,
  buttonStyles,
  CardTitleContainer,
} from "../styledComponents/style";
import Card from "../components/Card";
import Color from "../styledComponents/colors";
import currentForm from "../currentForm";
import { selectRubric, setRubricScore } from "../slices/rubricSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import FormData from "../FormData";

import TextScore from "../components/TextScore";
import OptionRow from "../components/optionRow";
import { selectQuestions, setQuestion } from "../slices/questionsSlice";
import { ISTRubric } from "../types/dataTypes";
import { afterGradedLists } from "../defaults/defaults";
import { generateScoreData } from "../utils/scoreUtils";
import { NewValues } from "../types/types";

export enum STRIndex {
  "behavior" = 0,
  "collaboration" = 1,
  "iep" = 2,
}

const cardTitleStyles = css`
  padding-left: 1em;
  padding-right: 1em;
`;

const ListItem = styled.li`
  font-size: 1.05rem;
  padding: 0.2em;
`;

const getQuestion = (index: number): keyof ISTRubric => {
  switch (index) {
    case 0:
      return "behaviorConferenced";
    case 1:
      return "collaborationConferenced";
    case 2:
      return "IEPConferenced";
    default:
      throw new Error("Unknown index");
  }
};

const STRubric = ({ index }: { index: STRIndex }) => {
  const rubricData = FormData[currentForm].rubric[index];
  const rubricScores = useAppSelector(selectRubric);
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();
  const { score, possible, summary } = generateScoreData(rubricScores);

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
        updateValue={(newValues: NewValues) => {
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
          <CardTitleContainer>
            <RubricTitleContent>{rubricData.sectionTitle}</RubricTitleContent>
            <p>{summary[index][1]}</p>
          </CardTitleContainer>
        }
        titleStyles={cardTitleStyles}
        containerStyles={cardContainerStyles}
      >
        {rows}
      </Card>
      <Card
        title={
          <RubricTitleContent>After Assignment is Graded:</RubricTitleContent>
        }
        titleStyles={cardTitleStyles}
        containerStyles={cardContainerStyles}
      >
        <ol>
          {afterGradedLists[index].map((step, index) => (
            <ListItem key={index}>{step}</ListItem>
          ))}
        </ol>
        <OptionRow
          title="District Coach conferenced with the student teacher:"
          options={[{ content: "Yes" }, { content: "No" }]}
          currSelection={questions[getQuestion(index)]}
          updateSelection={(newSelection) => {
            dispatch(setQuestion({ [getQuestion(index)]: newSelection }));
          }}
          titleStyles={css`
            color: ${Color.neutrals.blackLight};
          `}
          buttonStyles={buttonStyles}
        />
      </Card>
    </PageContent>
  );
};

export default STRubric;
