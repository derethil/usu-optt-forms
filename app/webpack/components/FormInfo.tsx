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
  insertIf,
  otherLabel,
  programTitle,
  studentTitle,
  superior,
} from "../utils/utils";
import { NewValues, Option } from "../types/types";

// Component to provide the form on Home page with all the general info
// The million conditional rendering checks are gross but it works and I couldn't think of a better way to implement it

// Determines which forms have only one date selector
const noNextDate = [
  formOptions.OPTTChecklist,
  formOptions.severeSelfEvaluation,
  formOptions.studentTeachingRubric,
  formOptions.teacherCandidate,
  formOptions.cooperatingTeacherChecklist,
  formOptions.earlyIntervention,
];

// Determines which forms will have neither a program selector or program textbox
const noProgramText = [
  formOptions.mmMath,
  formOptions.studentTeachingRubric,
  formOptions.teacherCandidate,
  formOptions.cooperatingTeacherChecklist,
  formOptions.earlyIntervention,
];

const includeProgramText =
  !FormData[currentForm].programOptions && !noProgramText.includes(currentForm);

// Determines which forms will not have the observation selector
const noObsSelect = [
  formOptions.studentTeachingRubric,
  formOptions.OPTTChecklist,
  formOptions.teacherCandidate,
  formOptions.cooperatingTeacherChecklist,
];

// Determines which forms will not have a cooperating teacher  / supervisor textbox
const noCoopTeacher = [
  formOptions.severeSelfEvaluation,
  formOptions.teacherCandidate,
  formOptions.cooperatingTeacherChecklist,
  formOptions.earlyIntervention,
];

const noSupervisor = [formOptions.severeSelfEvaluation];

const getObservationOptions = (currentForm: formOptions) => {
  switch (currentForm) {
    case formOptions.severeSelfEvaluation:
      return ["1", "2", "3", "4"];
    case formOptions.earlyIntervention:
      return ["Informal", "1", "2", "3"];
    default:
      return ["1", "2", "3", "4", "5"];
  }
};

// ------ COMPONENT ------

const FormInfo = () => {
  const formInfo = useAppSelector(selectFormInfo);
  const dispatch = useAppDispatch();

  const updateFormInfo = (updatedValues: NewValues) => {
    dispatch(setFormInfo(updatedValues));
  };

  // Allows Notebook Check to change its options depending on observation #
  const updateObservation = (updatedValues: { observation: string }) => {
    const location = formInfo.location;
    const observation = updatedValues.observation;
    dispatch(setLocationOrObservation({ location, observation }));
  };

  const ObservationOptionsStr = getObservationOptions(currentForm);

  const ObservationOptions = ObservationOptionsStr.map((content) => {
    return { content } as Option;
  })!;

  const ProgramOptions = FormData[currentForm].programOptions?.map((content) => {
    return { content } as Option;
  })!;

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
        currentForm !== formOptions.mmMath &&
        currentForm !== formOptions.studentTeachingRubric && (
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
      {currentForm !== formOptions.severeSelfEvaluation && (
        <TextInput
          value={formInfo.other}
          updateForm={updateFormInfo}
          field="other"
          title={otherLabel(currentForm)}
        />
      )}
      {currentForm === formOptions.severeSelfEvaluation && (
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
          title={"Observation"}
          options={ObservationOptions}
          currSelection={formInfo.observation.toString()}
          updateSelection={(newSelection: string) =>
            updateObservation({ observation: newSelection })
          }
          titleStyles={css`
            color: ${Color.neutrals.grayDark};
          `}
        />
      )}
      {FormData[currentForm].programOptions && (
        <OptionRow
          title={"Program"}
          options={ProgramOptions}
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
