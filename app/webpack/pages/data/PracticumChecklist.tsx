import React from "react";
import { css } from "styled-components";
import Card from "../../components/Card";
import QuestionRow from "../../components/QuestionRow";
import { cardContainerStyles, PageContent } from "../../styledComponents/style";

function PracticumChecklist() {
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
          score="Yes"
          scoreOptions={["Yes", "No", "N/A"]}
          updateCheck={() => console.log("")}
          comment=""
          updateComment={() => console.log("")}
        />
      </Card>
    </PageContent>
  );
}

export default PracticumChecklist;
