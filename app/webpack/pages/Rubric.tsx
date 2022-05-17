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
  CardTitleContainer,
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

type RubricProps = {
  timer1: ITimer;
  timer2: ITimer;
  disableCommentBoxes?: boolean;
};

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

const timerContentStyles = css`
  margin-top: 0.5em;
`;

const Rubric = (props: RubricProps) => {
  const rubricData = FormData[currentForm].rubric;
  const rubricScores = useAppSelector(selectRubric);
  const { score, possible, summary } = generateScoreData(rubricScores);

  const dispatch = useAppDispatch();

  const sectionTitle = (section: Section, index: number) => {
    const sectionScore = summary[index][1];

    if (section.tooltip) {
      return (
        <CardTitleContainer>
          <IconTitle
            content={section.sectionTitle}
            tooltipContent={section.tooltip}
            titleStyles={css`
              font-size: 1.33rem;
            `}
            iconStyles={css`
              color: ${Color.lights.grayLighter};
            `}
          />
          <p>{sectionScore}</p>
        </CardTitleContainer>
      );
    } else {
      return (
        <CardTitleContainer>
          <RubricTitleContent>{section.sectionTitle}</RubricTitleContent>
          <p>{sectionScore}</p>
        </CardTitleContainer>
      );
    }
  };

  const sections = rubricData.map((section, sectionIdx) => {
    const rows = section.rows.map((row, rowIdx) => {
      const currContentOptions = row.options.map((option) => option.content);
      const currScoreOptions = row.options.map((option) =>
        String(option.score)
      );

      const { score, comment } = rubricScores[section.sectionTitle][row.area];

      return (
        <OptionRow
          key={rowIdx}
          contentOptions={currContentOptions}
          scoreOptions={currScoreOptions}
          tooltip={row.info}
          title={row.area}
          currSelection={score}
          updateSelection={(newSelection) => {
            dispatch(
              setRubricScore({
                section: section.sectionTitle,
                row: row.area,
                newScore: newSelection,
              })
            );
          }}
          buttonStyles={buttonStyles}
          titleStyles={rowTitleStyles}
          comment={props.disableCommentBoxes ? undefined : comment}
          updateComment={
            props.disableCommentBoxes
              ? undefined
              : (updatedValues: { [key: string]: string }) => {
                  dispatch(
                    setRubricComment({
                      section: section.sectionTitle,
                      row: row.area,
                      newComment: Object.values(updatedValues)[0],
                    })
                  );
                }
          }
        />
      );
    });

    const isMathTimer =
      currentForm == formOptions.math &&
      (section.sectionTitle === "Independent Practice" ||
        section.sectionTitle === "Opening");

    const sectionDiv = (
      <div key={sectionIdx}>
        {isMathTimer && (
          <Card
            title={
              <RubricTitleContent>{`${section.sectionTitle} Timer`}</RubricTitleContent>
            }
            titleStyles={cardTitleStyles}
            contentStyles={contentStyles && timerContentStyles}
            containerStyles={cardContainerStyles}
          >
            <Timer
              timer={
                section.sectionTitle === "Opening" ? props.timer1 : props.timer2
              }
            />
          </Card>
        )}
        <Card
          title={sectionTitle(section, sectionIdx)}
          titleStyles={cardTitleStyles}
          contentStyles={contentStyles}
          containerStyles={cardContainerStyles}
        >
          {rows}
        </Card>
      </div>
    );

    return sectionDiv;
  });

  return (
    <PageContent className="rubric">
      {sections}
      <Card
        title={<RubricTitleContent>Total Scores</RubricTitleContent>}
        titleStyles={cardTitleStyles}
        containerStyles={cardContainerStyles}
      >
        <ScoreTotals displaySections={false} />
      </Card>
    </PageContent>
  );
};

export default Rubric;
