import React from "react";
import styled, { css } from "styled-components";
import Card from "../../components/Card";
import QuestionRow from "../../components/QuestionRow";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  isScoreOption,
  isTextOnly,
  selectChecklist,
  setChecklistComment,
  setChecklistScore,
  setChecklistText,
} from "../../slices/checklistSlice";
import { cardContainerStyles, PageContent } from "../../styledComponents/style";

import checklistJSON from "../../../rubrics/practicumChecklist.json";
import {
  IChecklistJSON,
  IChecklistJSONRow,
  IPracticumChecklist,
} from "../../types/dataTypes";
import QuestionText from "../../components/QuestionText";
import Color from "../../styledComponents/colors";

const Link = styled.a`
  color: ${Color.contextual.info};
  /* font-weight: bold; */
  text-decoration: none;
`;

function PracticumChecklist() {
  const checklistContents: [string, IChecklistJSONRow][] = Object.entries(
    checklistJSON as IChecklistJSON
  );

  const checklist = useAppSelector(selectChecklist);
  const dispatch = useAppDispatch();

  return (
    <PageContent>
      <Card
        title="USU OPTT Practicum Classroom Checklist"
        containerStyles={cardContainerStyles}
        titleStyles={css`
          font-size: 2rem;
        `}
      >
        District Coach: Please schedule time to meet with the OPTT student to
        discuss the following items during the first few weeks of school/the
        semester. Submit completed form to{" "}
        <Link href="mailto:usuobservations@usu.edu">
          usuobservations@usu.edu
        </Link>
        .
      </Card>

      <Card title="Items" containerStyles={cardContainerStyles}>
        {checklistContents.map(([keyStr, rowInfo], index) => {
          const key = keyStr as keyof IPracticumChecklist;

          if (isScoreOption(key)) {
            return (
              <QuestionRow
                key={index}
                content={rowInfo.content}
                score={isScoreOption(keyStr) ? checklist[key].score : ""}
                scoreOptions={["Yes", "No", "N/A"]}
                updateScore={(score) => {
                  dispatch(setChecklistScore({ key, score }));
                }}
                comment={checklist[key].comment}
                updateComment={(updatedValues: { [key: string]: string }) => {
                  dispatch(
                    setChecklistComment({
                      key,
                      comment: Object.values(updatedValues)[0],
                    })
                  );
                }}
              />
            );
          } else if (isTextOnly(key)) {
            return (
              <QuestionText
                content={rowInfo.content}
                key={index}
                value={checklist[key]}
                updateValue={(newValues: { [key: string]: string }) => {
                  dispatch(
                    setChecklistText({ key, text: Object.values(newValues)[0] })
                  );
                }}
              />
            );
          }
        })}
      </Card>
    </PageContent>
  );
}

export default PracticumChecklist;
