import React from "react";
import styled, { css } from "styled-components";

import OptionRow from "../components/optionRow";
import IconTitle from "../components/IconTitle";
import { ITimer, ScoresState, Section } from "../types/types";
import {
  buttonStyles,
  PageContent,
  RubricTitleContent,
} from "../styledComponents/style";
import ScoreTotals from "../components/rubric/ScoreTotals";
import Card from "../components/Card";
import Color from "../styledComponents/colors";
import { generateScoreData } from "../utils/scoreUtils";
import Timer from "../components/Timer";
import currentForm, { formOptions } from "../currentForm";

type RubricProps = {
  scores: ScoresState;
  rubricData: Section[];
  timer1: ITimer;
  timer2: ITimer;
  updateScore: (
    section: string,
    row: string,
    newScore: string,
    newComment: string
  ) => void;
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

const cardContainerStyles = css`
  width: 75%;

  @media (max-width: 1500px) {
    width: 85%;
  }

  @media (max-width: 1200px) {
    width: 95%;
  }
`;

const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const timerContentStyles = css`
  margin-top: 0.5em;
`;

const Rubric = (props: RubricProps) => {
  const { correct, possible, summary } = generateScoreData(props.scores);

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

  const sections = props.rubricData.map((section, sectionIdx) => {
    const rows = section.rows.map((row, rowIdx) => {
      const currContentOptions = row.options.map((option) => option.content);
      const currScoreOptions = row.options.map((option) =>
        String(option.score)
      );

      const { score, comment } = props.scores[section.sectionTitle][row.area];

      return (
        <OptionRow
          key={rowIdx}
          contentOptions={currContentOptions}
          scoreOptions={currScoreOptions}
          tooltip={row.tooltip}
          title={row.area}
          currSelection={score}
          updateSelection={(newSelection) => {
            props.updateScore(
              section.sectionTitle,
              row.area,
              newSelection,
              comment
            );
          }}
          buttonStyles={buttonStyles}
          titleStyles={rowTitleStyles}
          comment={comment}
          updateComment={(updatedValues: { [key: string]: string }) => {
            props.updateScore(
              section.sectionTitle,
              row.area,
              score,
              Object.values(updatedValues)[0]
            );
          }}
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
        <ScoreTotals scores={props.scores} displaySections={false} />
      </Card>
    </PageContent>
  );
};

export default Rubric;
