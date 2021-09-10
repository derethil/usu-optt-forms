import React from "react";
import styled from "styled-components";
import * as Styles from "../styledComponents/style";

import Card from "./Card";

const cardContainerStyles: React.CSSProperties = { width: "60em" };

const cardContentStyles: React.CSSProperties = {
  padding: "0em 1em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const ObservDataWrapper = styled(Styles.DataWrapper)`
  width: 14em;
`;

type dataEntryType = {
  display: string;
  score: string | number;
};

type DataRowProps = {
  displayData: dataEntryType[];
  title: string;
  children: React.ReactNode;
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

  return (
    <Card
      title={props.title}
      containerStyles={cardContainerStyles}
      contentStyles={cardContentStyles}
    >
      {props.children}

      <ObservDataWrapper>{...rows}</ObservDataWrapper>
    </Card>
  );
};

export default DataRow;
