import React from "react";
import FormData from "../FormData";
import currentForm, { formOptions } from "../currentForm";
import TextInput from "./TextInput";
import OptionRow from "./optionRow";

import { IFormInfo } from "../types/types";
import DateInput from "./DateInput";
import Color from "../styledComponents/colors";
import { css } from "styled-components";
import { buttonStyles } from "../styledComponents/style";
type FormInfoProps = {};

import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { setFormInfo, selectFormInfo } from "../slices/formInfoSlice";

const FormInfo = (props: FormInfoProps) => {
  const formInfo = useAppSelector(selectFormInfo);
  const dispatch = useAppDispatch();

  const updateFormInfo = (updatedValues: { [key: string]: string }) => {
    dispatch(setFormInfo(updatedValues));
  };

  return (
    <div>
      <TextInput
        value={formInfo.studentTeacher}
        updateFormInfo={updateFormInfo}
        field="studentTeacher"
      />
      <TextInput
        value={formInfo.cooperatingTeacher}
        updateFormInfo={updateFormInfo}
        field="cooperatingTeacher"
      />
      <TextInput
        value={formInfo.supervisor}
        updateFormInfo={updateFormInfo}
        field="supervisor"
        title="Supervisor / Coach"
      />

      <DateInput
        field="date"
        label="Observation Date"
        date={new Date(formInfo.date)}
        updateFormInfo={updateFormInfo}
      />

      <DateInput
        label="Next Observation Date"
        field="nextDate"
        date={new Date(formInfo.nextDate)}
        updateFormInfo={updateFormInfo}
      />

      {currentForm != formOptions.studentTeaching &&
        currentForm != formOptions.math && (
          <TextInput
            value={formInfo.program}
            updateFormInfo={updateFormInfo}
            field="program"
            title={
              currentForm === formOptions.reading
                ? "Reading Program"
                : undefined
            }
          />
        )}

      <TextInput
        value={formInfo.other}
        updateFormInfo={updateFormInfo}
        field="other"
      />

      <OptionRow
        title={"Observation Number"}
        contentOptions={["1", "2", "3", "4", "5"]}
        currSelection={formInfo.observation.toString()}
        updateSelection={(newSelection: string) =>
          updateFormInfo({ observation: newSelection })
        }
        titleStyles={css`
          color: ${Color.neutrals.grayDark};
        `}
      />

      {FormData[currentForm].programOptions && (
        <OptionRow
          title={"Program"}
          contentOptions={FormData[currentForm].programOptions!}
          currSelection={formInfo.program}
          updateSelection={(newSelection: string) =>
            updateFormInfo({ program: newSelection })
          }
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
          buttonStyles={buttonStyles}
        />
      )}
    </div>
  );
};

export default FormInfo;
