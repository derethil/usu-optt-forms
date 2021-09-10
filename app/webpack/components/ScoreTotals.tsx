import React from "react";

import { generateScoreData } from "../utils/scoreUtils";
import { getPercent } from "../utils/utils";
import { ScoresState, Section } from "../types/types";

import { DataWrapper, DataCell, DataRow } from "../styledComponents/style";

type ScoreTotalProps = {
  scores: ScoresState;
  displaySections?: boolean;
};

const ScoreTotals = ({ scores, displaySections = true }: ScoreTotalProps) => {
  const { correct, possible, summary } = generateScoreData(scores);

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

      <DataRow style={{ marginTop: displaySections ? "2em" : "0" }}>
        <DataCell>Total Score:</DataCell>
        <DataCell>
          {correct} / {possible}
        </DataCell>
      </DataRow>

      <DataRow>
        <DataCell>Percentage:</DataCell>
        <DataCell>{getPercent(correct, possible)}</DataCell>
      </DataRow>
    </DataWrapper>
  );
};

export default ScoreTotals;
