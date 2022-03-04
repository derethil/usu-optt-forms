import React from "react";
import FormData from "../FormData";
import currentForm, { formOptions } from "../currentForm";
import TextInput from "./TextInput";
import OptionRow from "./optionRow";

import DateInput from "./DateInput";
import Color from "../styledComponents/colors";
import { css } from "styled-components";
import { buttonStyles } from "../styledComponents/style";

import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import {
  setFormInfo,
  selectFormInfo,
  setLocationOrObservation,
} from "../slices/formInfoSlice";

const FormInfo = () => {
  const formInfo = useAppSelector(selectFormInfo);
  const dispatch = useAppDispatch();

  const updateFormInfo = (updatedValues: { [key: string]: string }) => {
    dispatch(setFormInfo(updatedValues));
  };

  // Allows Notebook Check to change its options depending on observation #
  const updateObservation = (updatedValues: { observation: number }) => {
    const location = formInfo.location;
    const observation = updatedValues.observation;
    dispatch(setLocationOrObservation({ location, observation }));
  };

  return (
    <div>
      <TextInput
        value={formInfo.studentTeacher}
        updateForm={updateFormInfo}
        field="studentTeacher"
        title={
          currentForm === formOptions.studentTeaching
            ? "Student Teacher"
            : "Practicum Student"
        }
      />
      {currentForm !== formOptions.selfEvaluation && (
        <>
          <TextInput
            value={formInfo.cooperatingTeacher}
            updateForm={updateFormInfo}
            field="cooperatingTeacher"
          />
          <TextInput
            value={formInfo.supervisor}
            updateForm={updateFormInfo}
            field="supervisor"
            title={
              currentForm !== formOptions.practicumChecklist
                ? "Supervisor / Coach"
                : "District Coach"
            }
          />
        </>
      )}

      {currentForm !== formOptions.STRubric && (
        <DateInput
          field="date"
          label={
            currentForm !== formOptions.practicumChecklist
              ? "Observation Date"
              : "Date"
          }
          date={new Date(formInfo.date)}
          updateForm={updateFormInfo}
        />
      )}

      {![formOptions.practicumChecklist, formOptions.selfEvaluation].includes(
        currentForm
      ) &&
        currentForm !== formOptions.STRubric && (
          <DateInput
            label="Next Observation Date"
            field="nextDate"
            date={new Date(formInfo.nextDate)}
            updateForm={updateFormInfo}
          />
        )}

      {!FormData[currentForm].programOptions &&
        currentForm !== formOptions.math &&
        currentForm !== formOptions.STRubric && (
          <TextInput
            value={formInfo.program}
            updateForm={updateFormInfo}
            field="program"
            title={
              currentForm === formOptions.reading
                ? "Reading Program"
                : undefined
            }
          />
        )}

      {currentForm !== formOptions.selfEvaluation && (
        <TextInput
          value={formInfo.other}
          updateForm={updateFormInfo}
          field="other"
        />
      )}

      {currentForm === formOptions.selfEvaluation && (
        <>
          <TextInput
            value={formInfo.goal1}
            updateForm={updateFormInfo}
            field="goal1"
            title="Goal 1"
          />
          <TextInput
            value={formInfo.goal2}
            updateForm={updateFormInfo}
            field="goal2"
            title="Goal 2"
          />
        </>
      )}

      {currentForm !== formOptions.practicumChecklist &&
        currentForm !== formOptions.STRubric && (
          <OptionRow
            title={"Observation Number"}
            contentOptions={[
              "1",
              "2",
              "3",
              "4",
              ...(currentForm !== formOptions.selfEvaluation ? ["5"] : []),
            ]}
            currSelection={formInfo.observation.toString()}
            updateSelection={(newSelection: string) =>
              updateObservation({ observation: Number(newSelection) })
            }
            titleStyles={css`
              color: ${Color.neutrals.grayDark};
            `}
          />
        )}

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
