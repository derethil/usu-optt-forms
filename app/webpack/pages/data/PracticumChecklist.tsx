import React from "react";
import { css } from "styled-components";
import Card from "../../components/Card";
import QuestionRow from "../../components/QuestionRow";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  selectChecklist,
  setChecklistComment,
  setChecklistScore,
} from "../../slices/checklistSlice";
import { cardContainerStyles, PageContent } from "../../styledComponents/style";

function PracticumChecklist() {
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
        <a href="mailto:usuobservations@usu.edu">usuobservations@usu.edu</a>
      </Card>

      <Card title="Items" containerStyles={cardContainerStyles}>
        <QuestionRow
          content="Is there an established classroom / group schedule?"
          score={checklist.schedule.score}
          scoreOptions={["Yes", "No", "N/A"]}
          updateScore={(score) => {
            dispatch(setChecklistScore({ key: "schedule", score }));
          }}
          comment={checklist.schedule.comment}
          updateComment={(updatedValues: { [key: string]: string }) => {
            dispatch(
              setChecklistComment({
                key: "schedule",
                comment: Object.values(updatedValues)[0],
              })
            );
          }}
        />
      </Card>
    </PageContent>
  );
}

export default PracticumChecklist;
