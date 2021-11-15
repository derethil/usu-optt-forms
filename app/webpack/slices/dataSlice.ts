// const setData = (sequenceKey: string, groupKey: string, newValue: object) => {
//   props.setData({
//     [sequenceKey]: {
//       ...props.data[sequenceKey],
//       [groupKey]: {
//         ...props.data[sequenceKey][groupKey],
//         ...newValue,
//       },
//     },
//   });
// };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import currentForm from "../currentForm";
import FormData from "../FormData";
import { RootState } from "../store";
import { DataSchema } from "../types/dataTypes";

const initialState: DataSchema = FormData[currentForm].defaultData;

type SetDataAction = PayloadAction<Partial<Omit<DataSchema, "currentForm">>>;

function createDataSlice(sliceName: string) {
  const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
      resetData: () => {
        return initialState;
      },
      setData: (state, action: SetDataAction) => {
        return { ...state, ...action.payload };
      },
    },
  });

  const selectData: (state: RootState) => typeof initialState = (
    state: RootState
  ) => {
    return (state as any)[sliceName];
  };

  return {
    slice,
    reducer: slice.reducer,
    actions: slice.actions,
    selectData,
  };
}

const dataSlice1 = createDataSlice("data1");
const dataSlice2 = createDataSlice("data2");

export const dataReducer1 = dataSlice1.reducer;
export const dataReducer2 = dataSlice2.reducer;

export const data1 = {
  selector: dataSlice1.selectData,
  actions: dataSlice1.actions,
};

export const data2 = {
  selector: dataSlice2.selectData,
  actions: dataSlice2.actions,
};
