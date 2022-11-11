import React from "react";
import styled, { css } from "styled-components";
import Color from "../styledComponents/colors";
import * as Styles from "../styledComponents/style";

import Card from "./Card";
import IconTitle from "./IconTitle";

// Wrapper around data rows to provide easy buttons/data display

const cardContentStyles = css`
  padding: 0em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ObservDataWrapper = styled(Styles.DataWrapper)`
  width: 16em;
`;

const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

type dataEntryType = {
  display: string;
  score: string | number;
};

type DataRowProps = {
  displayData: dataEntryType[];
  title: string;
  children: React.ReactNode;
  tooltip?: string;
};

const DataRow = (props: DataRowProps) => {
  const rows = props.displayData.map((entry, index) => {
    return (
      <Styles.DataRow key={index}>
        <Styles.DataCell>{entry.display}</Styles.DataCell>
        <Styles.DataCell>{entry.score}</Styles.DataCell>
      </Styles.DataRow>
    );
  });

  const title = props.tooltip ? (
    <CardTitleContainer>
      <IconTitle
        content={props.title}
        tooltipContent={props.tooltip}
        titleStyles={css`
          font-size: 1.33rem;
          margin: 0 0.5em 0 0;
        `}
        iconStyles={css`
          color: ${Color.lights.grayLighter};
        `}
      />
    </CardTitleContainer>
  ) : (
    props.title
  );

  return (
    <Card
      title={title}
      containerStyles={Styles.cardContainerStyles}
      contentStyles={cardContentStyles}
    >
      {props.children}

      <ObservDataWrapper>{...rows}</ObservDataWrapper>
    </Card>
  );
};

export default DataRow;
