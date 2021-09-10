import React from "react";

import DataRow from "./DataRow";
import CounterButton from "./CounterButton";
import { IPraiseData } from "../types/dataTypes";
import { getPercent } from "../utils/utils";
import { ButtonsWrapper } from "../styledComponents/style";
import * as dataUtils from "../utils/dataUtils";
import Color from "../styledComponents/colors";

const PraiseDataRow = ({
  data,
  setData,
}: {
  data: IPraiseData;
  setData: (updatedValues: Partial<IPraiseData>) => void;
}) => {
  return (
    <DataRow
      title="Praise Type"
      displayData={[
        { display: "General Praise", score: data.praise.general },
        { display: "Academic Praise", score: data.praise.academic },
        { display: "Behavioral Praise", score: data.praise.behavioral },
        { display: "Redirect/Reprimand", score: data.praise.reprimand },
        { display: "Praise Ratio", score: dataUtils.getPraiseRatio(data) },
        {
          display: "Percent Specific",
          score: getPercent(
            data.praise.academic + data.praise.behavioral,
            dataUtils.getPraiseSum(data)
          ),
        },
      ]}
    >
      <ButtonsWrapper>
        <CounterButton
          color={Color.accents.yellow}
          content="General"
          value={data.praise.general}
          onClick={(newValue: number) =>
            setData({ praise: { ...data.praise, general: newValue } })
          }
        />
        <CounterButton
          color={Color.accents.yellow}
          content="Academic"
          value={data.praise.academic}
          onClick={(newValue: number) =>
            setData({ praise: { ...data.praise, academic: newValue } })
          }
        />
        <CounterButton
          color={Color.accents.yellow}
          content="Behavioral"
          value={data.praise.behavioral}
          onClick={(newValue: number) =>
            setData({ praise: { ...data.praise, behavioral: newValue } })
          }
        />
        <CounterButton
          color={Color.contextual.danger}
          content="Redirect/Reprimand"
          value={data.praise.reprimand}
          onClick={(newValue: number) =>
            setData({ praise: { ...data.praise, reprimand: newValue } })
          }
        />
      </ButtonsWrapper>
    </DataRow>
  );
};

export default PraiseDataRow;
