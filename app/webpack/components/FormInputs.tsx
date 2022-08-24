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
  toggleSubdomain,
} from "../slices/formInfoSlice";
import CheckboxLabel from "./CheckboxLabel";
import {
  cooperatingTeacherTitle,
  dateLabel,
  otherLabel,
  programTitle,
  studentTitle,
  superior,
} from "../utils/utils";
import { NewValues, Option } from "../types/types";
import ToggleButtons from "./ToggleButtons";

const getObservationOptions = (currentForm: formOptions): Option[] => {
  const options = (() => {
    switch (currentForm) {
      case formOptions.severeEvaluation:
        return ["1", "2", "3", "4"];
      case formOptions.earlyIntervention:
        return ["Informal", "1", "2", "3"];
      case formOptions.EICooperatingProviderChecklist:
      case formOptions.birthToFiveCooperatingTeacherChecklist:
        return ["Mid-term", "Final"];
      case formOptions.birthToFive:
        return ["1", "2", "3", "4", "Informal"];
      case formOptions.battelle:
        return ["1", "2", "3"];
      default:
        return ["1", "2", "3", "4", "5"];
    }
  })();

  return options.map((content) => ({ content }));
};

// ------ COMPONENT ------

const FormInputs = () => {
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

  const ObservationOptions = getObservationOptions(currentForm);

  const ProgramOptions = FormData[currentForm].programOptions?.map((content) => {
    return { content } as Option;
  })!;

  const INPUTS = {
    student: (
      <TextInput
        key="student"
        value={formInfo.studentTeacher}
        updateForm={updateFormInfo}
        field="studentTeacher"
        title={studentTitle(currentForm)}
      />
    ),
    cooperatingTeacher: (
      <TextInput
        key="cooperatingTeacher"
        value={formInfo.cooperatingTeacher}
        updateForm={updateFormInfo}
        field="cooperatingTeacher"
        title={cooperatingTeacherTitle(currentForm)}
      />
    ),
    superior: (
      <TextInput
        key="superior"
        value={formInfo.supervisor}
        updateForm={updateFormInfo}
        field="supervisor"
        title={superior(currentForm)}
      />
    ),
    date: (
      <DateInput
        key="date"
        field="date"
        label={dateLabel(currentForm)}
        date={new Date(formInfo.date)}
        updateForm={updateFormInfo}
      />
    ),
    nextDate: (
      <>
        <DateInput
          key="nextDate"
          label="Next Observation Date"
          field="nextDate"
          date={new Date(formInfo.nextDate)}
          updateForm={updateFormInfo}
          disabled={formInfo.isLastObservation}
        />
        <CheckboxLabel
          key="isLastObservation"
          checked={formInfo.isLastObservation}
          onChange={(e) => dispatch(setFormInfo({ isLastObservation: e.target.checked }))}
          label="This is the last observation for this student"
        />
      </>
    ),
    programText: (
      <TextInput
        key="programText"
        value={formInfo.program}
        updateForm={updateFormInfo}
        field="program"
        title={programTitle(currentForm)}
      />
    ),
    other: (
      <TextInput
        key="other"
        value={formInfo.other}
        updateForm={updateFormInfo}
        field="other"
        title={otherLabel(currentForm)}
      />
    ),
    goals: (
      <>
        <TextInput
          key="goal1"
          value={formInfo.goal1}
          updateForm={updateFormInfo}
          field="goal1"
          title="Goal 1"
        />
        <TextInput
          key="goal2"
          value={formInfo.goal2}
          updateForm={updateFormInfo}
          field="goal2"
          title="Goal 2"
        />
      </>
    ),
    selectObservation: (
      <OptionRow
        key="selectObservation"
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
    ),
    selectProgram: (
      <OptionRow
        key="selectProgram"
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
    ),
    selectSubdomain: (
      <ToggleButtons
        key="selectSubdomain"
        options={["AM", "RA", "PC", "GM", "FM", "PM", "RC", "EC"]}
        label="Subdomain"
        currSelected={formInfo.subdomain}
        titleStyles={css`
          color: ${Color.neutrals.grayDark};
        `}
        onClickButton={(clicked) => {
          dispatch(toggleSubdomain(clicked));
        }}
      />
    ),
  };

  const generateFormInfoInputs = () => {
    const people = [INPUTS.student, INPUTS.cooperatingTeacher, INPUTS.superior];

    switch (currentForm) {
      case formOptions.studentTeaching:
        return [
          ...people,
          INPUTS.date,
          INPUTS.nextDate,
          INPUTS.other,
          INPUTS.selectObservation,
          INPUTS.selectProgram,
        ];
      case formOptions.studentTeachingRubric:
      case formOptions.cooperatingTeacherChecklist:
        return [INPUTS.student, INPUTS.superior, INPUTS.date];
      case formOptions.severeEvaluation:
        return [
          INPUTS.student,
          INPUTS.date,
          INPUTS.programText,
          INPUTS.goals,
          INPUTS.selectObservation,
        ];
      case formOptions.severeReading:
      case formOptions.severeMathLifeSkills:
      case formOptions.mmReading:
      case formOptions.birthToFive:
        return [
          ...people,
          INPUTS.date,
          INPUTS.nextDate,
          INPUTS.programText,
          INPUTS.other,
          INPUTS.selectObservation,
        ];
      case formOptions.OPTTChecklist:
        return [...people, INPUTS.date, INPUTS.selectProgram];
      case formOptions.mmMath:
        return [...people, INPUTS.date, INPUTS.nextDate, INPUTS.selectObservation];
      case formOptions.earlyIntervention:
      case formOptions.EICooperatingProviderChecklist:
        return [
          INPUTS.student,
          INPUTS.superior,
          INPUTS.date,
          INPUTS.other,
          INPUTS.selectObservation,
        ];
      case formOptions.birthToFiveCooperatingTeacherChecklist:
        return [
          INPUTS.student,
          INPUTS.cooperatingTeacher,
          INPUTS.date,
          INPUTS.selectObservation,
        ];
      case formOptions.teacherCandidate:
        return [INPUTS.student, INPUTS.superior, INPUTS.date];
      case formOptions.battelle:
        return [
          ...people,
          INPUTS.date,
          INPUTS.programText,
          INPUTS.other,
          INPUTS.selectObservation,
          INPUTS.selectSubdomain,
        ];
    }
  };

  return <>{generateFormInfoInputs()}</>;
};

export default FormInputs;
