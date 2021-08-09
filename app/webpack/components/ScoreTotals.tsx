import React from "react";

import _rubricData from "../../rubrics/studentTeaching.json";
import { getSubtotal, getMaxSubtotal } from "../utils/scoreUtils";
import { ScoresState, Section } from "../types";

import { DataWrapper, DataCell, DataRow } from "../styledComponents/style";

const ScoreTotals = (props: { scores: ScoresState }) => {
  const rubricData = _rubricData as Section[];

  // Calculate total scores for display
  const sections = rubricData.map((section) => section.sectionTitle);

  const totals = sections.map((section, index) => {
    return (
      <DataRow key={index}>
        <DataCell>{section} Score:</DataCell>
        <DataCell>
          {getSubtotal(section, props.scores)} /
          {" " + getMaxSubtotal(section, props.scores, rubricData)}
        </DataCell>
      </DataRow>
    );
  });

  return <DataWrapper>{totals}</DataWrapper>;
};

export default ScoreTotals;
