import React from "react";

import { ICues } from "../../types/dataTypes";
import { ITimer } from "../../slices/timersSlice";

import DataRow from "../DataRow";
import CounterButton from "../CounterButton";
import { ButtonsWrapper } from "../../styledComponents/style";

import * as dataUtils from "../../utils/dataUtils";
import Color from "../../styledComponents/colors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IDataSlice } from "../../slices/dataSlice";

type PraiseDataRowProps = {
  dataSlice: IDataSlice;
  timer: ITimer;
};

const OTRRow = ({ dataSlice, timer }: PraiseDataRowProps) => {
  const dispatch = useAppDispatch();

  const timerState = useAppSelector(timer.selector);
  const data = useAppSelector(dataSlice.selector);

  const setData = dataSlice.actions.setData;

  const total =
    data.cues.individual +
    data.cues.group +
    (data.cues.nonDirected ? data.cues.nonDirected : 0);

  const displayData = [
    { display: "Individual Responses", score: data.cues.individual },
    { display: "Group Responses", score: data.cues.group },
    ...(data.cues.nonDirected !== undefined
      ? [
          {
            display: "Non Directed",
            score: data.cues.nonDirected,
          },
        ]
      : []),
    { display: "Total Responses", score: total },
    {
      display: "OTR Rate",
      score: dataUtils.getOTRRate(data as ICues, timerState),
    },
  ];

  return (
    <DataRow
      title="Cues / Directions / Opportunities to Respond"
      displayData={displayData}
    >
      <ButtonsWrapper>
        {data.cues.nonDirected !== undefined && (
          <CounterButton
            color={Color.accents.greenLight}
            content="Non Directed"
            value={data.cues.nonDirected}
            onClick={(nonDirected: number) =>
              dispatch(setData({ cues: { ...data.cues, nonDirected } }))
            }
          />
        )}
        <CounterButton
          color={Color.accents.greenLight}
          content="Individual"
          value={data.cues.individual}
          onClick={(individual: number) =>
            dispatch(setData({ cues: { ...data.cues, individual } }))
          }
        />
        <CounterButton
          color={Color.accents.greenLight}
          content="Group"
          value={data.cues.group}
          onClick={(group: number) =>
            dispatch(setData({ cues: { ...data.cues, group } }))
          }
        />
      </ButtonsWrapper>
    </DataRow>
  );
};

export default OTRRow;
