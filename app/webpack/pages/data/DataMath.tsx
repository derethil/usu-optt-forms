import React from "react";
import { css } from "styled-components";
import Timer from "../../components/Timer";
import CounterButton from "../../components/CounterButton";
import DataRow from "../../components/DataRow";
import PraiseDataRow from "../../components/data/PraiseDataRow";
import Card from "../../components/Card";

import { IMathData } from "../../types/dataTypes";

import * as dataUtils from "../../utils/dataUtils";
import { getPercent } from "../../utils/utils";

import * as Styles from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import {
  ButtonsWrapper,
  cardContainerStyles,
} from "../../styledComponents/style";
import DataProps from "./DataProps";

const DataMath = (props: DataProps<IMathData>) => {
  return (
    <Styles.PageContent>
      <Card
        title={props.title}
        containerStyles={cardContainerStyles}
        titleStyles={css`
          font-size: 2rem;
        `}
      ></Card>

      <Card title="Timer" containerStyles={cardContainerStyles}>
        <Timer timer={props.timer} resetCallback={props.resetCallback} />
      </Card>
    </Styles.PageContent>
  );
};

export default DataMath;
