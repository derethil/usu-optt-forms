import React from "react";

import DataRow from "../DataRow";
import CounterButton from "../CounterButton";
import { IPraiseData } from "../../types/dataTypes";
import { getPercent } from "../../utils/utils";
import { ButtonsWrapper } from "../../styledComponents/style";
import * as dataUtils from "../../utils/dataUtils";
import Color from "../../styledComponents/colors";
import { IDataSlice } from "../../slices/dataSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { formOptions } from "../../currentForm";

type PraiseDataRowProps = {
  data: IDataSlice;
  balancedVaried?: boolean;
};

// Component to provide the praise/reprimand row on data pages.

const PraiseDataRow = (props: PraiseDataRowProps) => {
  const data = useAppSelector(props.data.selector);
  const dispatch = useAppDispatch();

  const setData = props.data.actions.setData;

  const displayData = [
    { display: "General Praise", score: data.praise.general },
    { display: "Academic Praise", score: data.praise.academic },
    { display: "Behavioral Praise", score: data.praise.behavioral },
    { display: "Redirect/Reprimand", score: data.praise.reprimand },
    {
      display: "Total Praise",
      score:
        data.praise.academic + data.praise.general + data.praise.behavioral,
    },
    { display: "Praise Ratio", score: dataUtils.getPraiseRatio(data) },
    {
      display: "Percent Specific",
      score: getPercent(
        data.praise.academic + data.praise.behavioral,
        dataUtils.getPraiseSum(data)
      ),
    },
  ];

  if (props.balancedVaried) {
    displayData.push({
      display: "Balanced Varied Praise",
      score: getPercent(
        data.praise.academic,
        data.praise.academic + data.praise.behavioral
      ),
    });
  }
  return (
    <DataRow title="Praise Type" displayData={displayData}>
      <ButtonsWrapper>
        <CounterButton
          color={Color.accents.yellow}
          content="General"
          value={data.praise.general}
          onClick={(general: number) =>
            dispatch(setData({ praise: { ...data.praise, general } }))
          }
        />
        <CounterButton
          color={Color.accents.yellow}
          content="Academic"
          value={data.praise.academic}
          onClick={(academic: number) =>
            dispatch(setData({ praise: { ...data.praise, academic } }))
          }
        />
        <CounterButton
          color={Color.accents.yellow}
          content="Behavioral"
          value={data.praise.behavioral}
          onClick={(behavioral: number) =>
            dispatch(setData({ praise: { ...data.praise, behavioral } }))
          }
        />
        <CounterButton
          color={Color.contextual.danger}
          content="Redirect/Reprimand"
          value={data.praise.reprimand}
          onClick={(reprimand: number) =>
            dispatch(setData({ praise: { ...data.praise, reprimand } }))
          }
        />
      </ButtonsWrapper>
    </DataRow>
  );
};

export default PraiseDataRow;
