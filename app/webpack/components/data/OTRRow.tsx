import React from "react";

import { ICues } from "../../types/dataTypes";
import { ITimer } from "../../types/types";

import DataRow from "../DataRow";
import CounterButton from "../CounterButton";
import { ButtonsWrapper } from "../../styledComponents/style";

import * as dataUtils from "../../utils/dataUtils";
import Color from "../../styledComponents/colors";

type PraiseDataRowProps = {
  data: ICues;
  timer: ITimer;
  setData: (updatedValues: Partial<ICues>) => void;
};

const OTRRow = ({ data, setData, timer }: PraiseDataRowProps) => {
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
    { display: "OTR Rate", score: dataUtils.getOTRRate(data, timer) },
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
              setData({ cues: { ...data.cues, nonDirected } })
            }
          />
        )}
        <CounterButton
          color={Color.accents.greenLight}
          content="Individual"
          value={data.cues.individual}
          onClick={(individual: number) =>
            setData({ cues: { ...data.cues, individual } })
          }
        />
        <CounterButton
          color={Color.accents.greenLight}
          content="Group"
          value={data.cues.group}
          onClick={(group: number) =>
            setData({ cues: { ...data.cues, group } })
          }
        />
      </ButtonsWrapper>
    </DataRow>
  );
};

export default OTRRow;
