import React from "react";

import { ICues } from "../types/dataTypes";
import { ITimer } from "../types/types";

import DataRow from "./DataRow";
import CounterButton from "./CounterButton";
import { ButtonsWrapper } from "../styledComponents/style";

import * as dataUtils from "../utils/dataUtils";
import Color from "../styledComponents/colors";

type PraiseDataRowProps = {
  data: ICues;
  timer: ITimer;
  setData: (updatedValues: Partial<ICues>) => void;
};

const PraiseDataRow = ({ data, setData, timer }: PraiseDataRowProps) => {
  console.log(data);
  return (
    <DataRow
      title="Cues / Directions / Opportunities to Respond"
      displayData={[
        { display: "Individual Cues", score: data.cues.individual },
        { display: "Group Cues", score: data.cues.group },
        {
          display: "Total Cues",
          score: data.cues.individual + data.cues.group,
        },
        { display: "OTR Rate", score: dataUtils.getOTRRate(data, timer) },
      ]}
    >
      <ButtonsWrapper>
        <CounterButton
          color={Color.accents.greenLight}
          content="Individual"
          value={data.cues.individual}
          onClick={(newValue: number) =>
            setData({ cues: { ...data.cues, individual: newValue } })
          }
        />
        <CounterButton
          color={Color.accents.greenLight}
          content="Group"
          value={data.cues.group}
          onClick={(newValue: number) =>
            setData({ cues: { ...data.cues, group: newValue } })
          }
        />
      </ButtonsWrapper>
    </DataRow>
  );
};

export default PraiseDataRow;
