import React from "react";
import { css } from "styled-components";

import Timer from "../../components/Timer";

import PraiseDataRow from "../../components/data/PraiseDataRow";
import OTRRow from "../../components/data/OTRRow";
import Card from "../../components/Card";

import { ISeverePracticumData, IReadingData } from "../../types/dataTypes";

import * as Styles from "../../styledComponents/style";

import { cardContainerStyles } from "../../styledComponents/style";
import DataProps from "./DataProps";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { formOptions } from "../../currentForm";
import SignalSequenceRow from "../../components/data/SignalSequence";
import ErrorCorrectionRow from "../../components/data/ErrorCorrection";

type Props = DataProps<ISeverePracticumData | IReadingData> & {
  includeIncorrect?: boolean;
  errorOneRow?: boolean;
  guideTooltip?: boolean;
  signalTooltip?: boolean;
};

const DataSPR = (props: Props) => {
  const data = useAppSelector(props.data.selector);
  const dispatch = useAppDispatch();

  if (
    data.currentForm !== formOptions.severeReading &&
    data.currentForm !== formOptions.severeMathLifeSkills &&
    data.currentForm !== formOptions.reading
  )
    return <div></div>;

  const setData = (sequenceKey: string, groupKey: string, newValue: object) => {
    dispatch(
      props.data.actions.setData({
        [sequenceKey]: {
          ...data[sequenceKey],
          [groupKey]: {
            ...data[sequenceKey][groupKey],
            ...newValue,
          },
        },
      })
    );
  };

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

      <SignalSequenceRow
        data={data.signalSequence}
        setData={setData}
        includeIncorrect={props.includeIncorrect}
        signalTooltip={props.signalTooltip}
      />

      <ErrorCorrectionRow
        data={data.errorCorrection}
        setData={setData}
        oneRow={props.errorOneRow}
      />

      <PraiseDataRow data={props.data} />

      <OTRRow
        dataSlice={props.data}
        timer={props.timer}
        guideTooltip={props.guideTooltip ? true : false}
      />
    </Styles.PageContent>
  );
};

export default DataSPR;
