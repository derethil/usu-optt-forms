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
import CheckboxLabel from "./CheckboxLabel";
import {
  dateLabel,
  otherLabel,
  programTitle,
  studentTitle,
  superior,
} from "../utils/utils";

// Component to provide the form on Home page with all the general info
// The million conditional rendering checks are gross but it works and I couldn't think of a better way to implement it

// Determines which forms have only one date selector
const noNextDate = [
  formOptions.practicumChecklist,
  formOptions.selfEvaluation,
  formOptions.STRubric,
  formOptions.teacherCandidate,
];

// Determines which forms will have neither a program selector or program textbox
const noProgramText = [
  formOptions.math,
  formOptions.STRubric,
  formOptions.teacherCandidate,
];

const includeProgramText =
  !FormData[currentForm].programOptions && !noProgramText.includes(currentForm);

// Determines which forms will not have the observation selector
const noObsSelect = [
  formOptions.STRubric,
  formOptions.practicumChecklist,
  formOptions.teacherCandidate,
];

// Determines which forms will not have a cooperating teacher  / supervisor textbox
const noCoopTeacher = [
  formOptions.selfEvaluation,
  formOptions.teacherCandidate,
];

const noSupervisor = [formOptions.selfEvaluation];

// ------ COMPONENT ------

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
        title={studentTitle(currentForm)}
      />
      {!noCoopTeacher.includes(currentForm) && (
        <TextInput
          value={formInfo.cooperatingTeacher}
          updateForm={updateFormInfo}
          field="cooperatingTeacher"
        />
      )}
      {!noSupervisor.includes(currentForm) && (
        <TextInput
          value={formInfo.supervisor}
          updateForm={updateFormInfo}
          field="supervisor"
          title={superior(currentForm)}
        />
      )}
      {!FormData[currentForm].programOptions &&
        currentForm !== formOptions.math &&
        currentForm !== formOptions.STRubric && (
          <DateInput
            field="date"
            label={dateLabel(currentForm)}
            date={new Date(formInfo.date)}
            updateForm={updateFormInfo}
          />
        )}
      {!noNextDate.includes(currentForm) && (
        <>
          <DateInput
            label="Next Observation Date"
            field="nextDate"
            date={new Date(formInfo.nextDate)}
            updateForm={updateFormInfo}
            disabled={formInfo.isLastObservation}
          />

          <CheckboxLabel
            checked={formInfo.isLastObservation}
            onChange={(e) =>
              dispatch(setFormInfo({ isLastObservation: e.target.checked }))
            }
            label="This is the last observation for this student"
          />
        </>
      )}
      {includeProgramText && (
        <TextInput
          value={formInfo.program}
          updateForm={updateFormInfo}
          field="program"
          title={programTitle(currentForm)}
        />
      )}
      {currentForm !== formOptions.selfEvaluation && (
        <TextInput
          value={formInfo.other}
          updateForm={updateFormInfo}
          field="other"
          title={otherLabel(currentForm)}
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
      {!noObsSelect.includes(currentForm) && (
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
