import React, { CSSProperties } from "react";

import OptionRow from "../components/optionRow";
import IconTitle from "../components/IconTitle";
import { ScoresState, Section } from "../types";
import { PageContent } from "../styledComponents/style";
import Card from "../components/Card";
import Color from "../styledComponents/colors";

type RubricSTOProps = {
  scores: ScoresState;
  rubricData: Section[];
  updateScore: (section: string, row: string, newSelection: string) => void;
};

const buttonStyles: CSSProperties = {
  width: "10em",
  textAlign: "center",
  flexGrow: 1,
};

const cardTitleStyles: CSSProperties = {
  paddingLeft: "1em",
};

const rowTitleStyles: CSSProperties = {
  fontSize: "1.33rem",
  color: Color.neutrals.grayDarker,
};

const contentStyles: CSSProperties = {
  paddingTop: 0,
};

const RubricSTO = (props: RubricSTOProps) => {
  const sectionTitle = (section: Section) => {
    if (section.tooltip) {
      return (
        <IconTitle
          content={section.sectionTitle}
          tooltipContent={section.tooltip}
          titleStyles={{ fontSize: "1.33rem" }}
        />
      );
    } else {
      return <h1 style={{ fontSize: "1.33rem" }}>{section.sectionTitle}</h1>;
    }
  };

  const sections = props.rubricData.map((section, idx) => {
    const rows = section.rows.map((row, rowIdx) => {
      const currContentOptions = row.options.map((option) => option.content);
      const currScoreOptions = row.options.map((option) =>
        String(option.score)
      );

      return (
        <OptionRow
          key={rowIdx}
          contentOptions={currContentOptions}
          scoreOptions={currScoreOptions}
          tooltip={row.tooltip}
          title={row.area}
          currSelection={String(props.scores[section.sectionTitle][row.area])}
          updateSelection={(newSelection) =>
            props.updateScore(section.sectionTitle, row.area, newSelection)
          }
          buttonStyles={buttonStyles}
          titleStyles={rowTitleStyles}
        />
      );
    });

    const sectionDiv = (
      <Card
        key={idx}
        title={sectionTitle(section)}
        containerStyles={{ width: "75em" }}
        titleStyles={cardTitleStyles}
        contentStyles={contentStyles}
      >
        {rows}
      </Card>
    );

    return sectionDiv;
  });

  return <PageContent className="rubric">{sections}</PageContent>;
};

export default RubricSTO;
