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

type Props = {
  dataSlice: IDataSlice;
  timer: ITimer;
  guideTooltip?: boolean;
};

// Component to provide the OTR Row on data pages.

const OTRRow = ({ dataSlice, timer, guideTooltip }: Props) => {
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

  const tooltipContent =
    "Reading Mastery/DI type program should be a minimum of 7/minute in decoding and a minimum of 4/minute in story reading. <br>Use your judgement non-DI/RM type programs.<br>• Math, Life Skills, etc. use 4/minute as a guideline but use your judgment.";

  return (
    <DataRow
      title="Cues / Directions / Opportunities to Respond"
      displayData={displayData}
      tooltip={guideTooltip ? tooltipContent : undefined}
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
