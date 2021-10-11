import React from "react";
import styled, { css } from "styled-components";

import OptionRow from "../components/optionRow";
import IconTitle from "../components/IconTitle";
import { ScoresState, Section } from "../types/types";
import { PageContent } from "../styledComponents/style";
import ScoreTotals from "../components/rubric/ScoreTotals";
import Card from "../components/Card";
import Color from "../styledComponents/colors";
import { generateScoreData } from "../utils/scoreUtils";

type RubricProps = {
  scores: ScoresState;
  rubricData: Section[];
  updateScore: (
    section: string,
    row: string,
    newScore: string,
    newComment: string
  ) => void;
};

const RubricTitleContent = styled.h1`
  font-size: 1.33rem;
`;

const buttonStyles = css`
  width: 10em;
  text-align: center;
  flex-grow: 1;
  font-size: 1.05rem;
`;

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
  max-width: 95%;
  width: 1000em;
`;

const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

    const sectionDiv = (
      <Card
        key={sectionIdx}
        title={sectionTitle(section, sectionIdx)}
        titleStyles={cardTitleStyles}
        contentStyles={contentStyles}
        containerStyles={cardContainerStyles}
      >
        {rows}
      </Card>
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
