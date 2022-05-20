import React from "react";
import { css } from "styled-components";
import Color from "../styledComponents/colors";
import {
  CardTitleContainer,
  RubricTitleContent,
} from "../styledComponents/style";
import { Section } from "../types/types";
import IconTitle from "./IconTitle";

// Render title of rubric area cards, i.e. "Preparation and Planning 0 / 13"

export default function RubricAreaTitle(section: Section, score: string) {
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
        <p>{score}</p>
      </CardTitleContainer>
    );
  } else {
    // No tooltip icon to display
    return (
      <CardTitleContainer>
        <RubricTitleContent>{section.sectionTitle}</RubricTitleContent>
        <p>{score}</p>
      </CardTitleContainer>
    );
  }
}
