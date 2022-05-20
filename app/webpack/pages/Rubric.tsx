import React from "react";
import styled, { css } from "styled-components";

import OptionRow from "../components/optionRow";
import IconTitle from "../components/IconTitle";
import { NewValues, Option, Row, Section } from "../types/types";
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
import RubricAreaTitle from "../components/RubricAreaTitle";

type RubricProps = {
  timer1: ITimer;
  timer2: ITimer;
  disableCommentBoxes?: boolean;
  alternateInfoStyle?: boolean;
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

function needTimer(section: Section): boolean {
  if (currentForm !== formOptions.math) return false;

  switch (section.sectionTitle) {
    case "Independent Practice":
    case "Opening":
      return true;
    default:
      return false;
  }
}

const Rubric = (props: RubricProps) => {
  const dispatch = useAppDispatch();
  const rubricData = FormData[currentForm].rubric;
  const rubricScores = useAppSelector(selectRubric);
  const { score, possible, summary } = generateScoreData(rubricScores);

  function setComment(updatedValues: NewValues, section: Section, row: Row) {
    dispatch(
      setRubricComment({
        section: section.sectionTitle,
        row: row.area,
        newComment: Object.values(updatedValues)[0],
      })
    );
  }

  function setScore(newSelection: string, section: Section, row: Row) {
    if (Array.isArray(newSelection)) {
      newSelection = newSelection.join("//");
    }

    dispatch(
      setRubricScore({
        section: section.sectionTitle,
        row: row.area,
        newScore: newSelection,
      })
    );
  }

  const sections = rubricData.map((section, sectionIdx) => {
    const rows = section.rows.map((row, rowIdx) => {
      // current score and comment in state
      let { score: currScore, comment: currComment } =
        rubricScores[section.sectionTitle][row.area];

      const options: Option[] = row.options.map((option) => {
        const rowOption = {
          content: option.content,
          continue: option.continued,
          default: Boolean(option.default),
        };

        if (option.score === undefined) {
          return rowOption;
        } else {
          return { ...rowOption, score: String(option.score) };
        }
      });

      return (
        <OptionRow
          // General props
          key={rowIdx}
          info={row.info}
          title={row.area}
          options={options}
          // State props
          currSelection={currScore}
          updateSelection={(newSelection) => {
            setScore(newSelection, section, row);
          }}
          // Style props
          buttonStyles={buttonStyles}
          titleStyles={rowTitleStyles}
          alternateInfoStyle={props.alternateInfoStyle}
          // Commend props
          comment={props.disableCommentBoxes ? undefined : currComment}
          updateComment={
            props.disableCommentBoxes
              ? undefined
              : (updatedValues: NewValues) => {
                  setComment(updatedValues, section, row);
                }
          }
        />
      );
    });

    return (
      <div key={sectionIdx}>
        {needTimer(section) && ( // The Math form has timers on the rubric page itself, so check for that here
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
                // Ensure Opening has timer1 and Independent Practice has timer2
                section.sectionTitle === "Opening" ? props.timer1 : props.timer2
              }
            />
          </Card>
        )}

        <Card
          title={RubricAreaTitle(section, summary[sectionIdx][1])}
          titleStyles={cardTitleStyles}
          contentStyles={contentStyles}
          containerStyles={cardContainerStyles}
        >
          {rows}
        </Card>
      </div>
    );
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
