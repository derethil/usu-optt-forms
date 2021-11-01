import React, { useState } from "react";
import { css } from "styled-components";

import Card from "../../components/Card";
import OptionRow from "../../components/optionRow";

import {
  cardContainerStyles,
  PageContent,
  RubricTitleContent,
} from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import IconTitle from "../../components/IconTitle";
import getNotebookCheck from "../../utils/notebookCheckUtils";
import NotebookSlider from "./NotebookSlider";

export default function NotebookCheck() {
  const [location, setLocation] = useState("Logan");
  const [obsNumber, setObsNumber] = useState(1);

  return (
    <PageContent>
      <Card
        title={<RubricTitleContent>Notebook Check Info</RubricTitleContent>}
        containerStyles={cardContainerStyles}
      >
        <OptionRow
          title="Location"
          currSelection={location}
          contentOptions={["Logan", "OPTT"]}
          updateSelection={(newSelection) => setLocation(newSelection)}
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />
        <OptionRow
          title="Observation / Notebook Check Number"
          currSelection={obsNumber.toString()}
          contentOptions={[...Array(5)].map((_, i) => (i + 1).toString())}
          updateSelection={(newSelection) => setObsNumber(Number(newSelection))}
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />
      </Card>

      <Card
        title={
          <IconTitle
            content={`Notebook Check #${obsNumber}`}
            tooltipContent={`Corresponds with observation #${obsNumber}`}
            iconStyles={css`
              color: ${Color.lights.grayLighter};
            `}
          />
        }
        containerStyles={cardContainerStyles}
      >
        {getNotebookCheck(location === "Logan", obsNumber).map(
          (content, idx) => {
            return <NotebookSlider content={content} key={idx} />;
          }
        )}
      </Card>

      <Card
        title={
          <IconTitle
            content="Final Notebook Check"
            tooltipContent="Completed by course instructor"
            iconStyles={css`
              color: ${Color.lights.grayLighter};
            `}
          />
        }
        containerStyles={cardContainerStyles}
      >
        {getNotebookCheck(location === "Logan").map((content, idx) => {
          return <NotebookSlider content={content} key={idx} />;
        })}
      </Card>
    </PageContent>
  );
}
