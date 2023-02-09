import React from "react";

import { ScoresState } from "../../types/types";
import { generateScoreData } from "../../utils/scoreUtils";
import { getPercent } from "../../utils/utils";

import { DataWrapper, DataCell, DataRow } from "../../styledComponents/style";
import { useAppSelector } from "../../hooks/hooks";
import { selectRubric } from "../../slices/rubricSlice";
import currentForm, { formOptions } from "../../currentForm";

// Component to provide total score display on the Home page.

type ScoreTotalProps = {
  displaySections?: boolean;
  displayTotal?: boolean;
};

const ScoreTotals = ({ displaySections = true }: ScoreTotalProps) => {
  const rubricScores = useAppSelector(selectRubric);
  const { score, possible, summary } = generateScoreData(rubricScores);

  const subtotals = summary.map((section, index) => {
    const sectionTitle = section[0];
    const sectionScore = section[1];
    return (
      <DataRow key={index}>
        <DataCell>{sectionTitle}</DataCell>
        <DataCell>{sectionScore}</DataCell>
      </DataRow>
    );
  });

  return (
    <DataWrapper>
      {displaySections && subtotals}

      {currentForm !== formOptions.studentTeachingRubric &&
        currentForm !== formOptions.teacherCandidate && (
          <>
            <DataRow style={{ marginTop: displaySections ? "2em" : "0" }}>
              <DataCell>Total Score:</DataCell>
              <DataCell>
                {score} / {possible}
              </DataCell>
            </DataRow>

            <DataRow>
              <DataCell>Percentage:</DataCell>
              <DataCell>{getPercent(score, possible)}</DataCell>
            </DataRow>
          </>
        )}
    </DataWrapper>
  );
};

export default ScoreTotals;
