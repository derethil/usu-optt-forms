import React from "react";
import styled from "styled-components";

import Timer from "../../components/Timer";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import PraiseDataRow from "../../components/PraiseDataRow";
import OTRRow from "../../components/OTRRow";
import Card from "../../components/Card";

import { ITimer } from "../../types/types";
import { IBT5PracticumData } from "../../types/dataTypes";

import { getPercent } from "../../utils/utils";

import * as Styles from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import {
  ButtonsWrapper,
  cardContainerStyles,
} from "../../styledComponents/style";

const TwoRowButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  title: string;
  timer: ITimer;
  data: IBT5PracticumData;
  setData: (updatedValues: Partial<IBT5PracticumData>) => void;
  resetCallback?: () => void;
}

const DataBT5 = (props: Props) => {
  return (
    <Styles.PageContent>
      <Card
        title={props.title}
        containerStyles={cardContainerStyles}
        titleStyles={{ fontSize: "2rem" }}
      ></Card>

      <Card title="Timer" containerStyles={cardContainerStyles}>
        <Timer timer={props.timer} resetCallback={props.resetCallback} />
      </Card>

      <PraiseDataRow data={props.data} setData={props.setData} />
    </Styles.PageContent>
  );
};

export default DataBT5;
