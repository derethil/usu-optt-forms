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
type FormInfoProps = {
  formInfo: IFormInfo;
  updateFormInfo: (updatedFormInfo: Partial<IFormInfo>) => void;
};

const FormInfo = (props: FormInfoProps) => {
  return (
    <div>
      <TextInput
        value={props.formInfo.studentTeacher}
        updateFormInfo={props.updateFormInfo}
        field="studentTeacher"
      />
      <TextInput
        value={props.formInfo.cooperatingTeacher}
        updateFormInfo={props.updateFormInfo}
        field="cooperatingTeacher"
      />
      <TextInput
        value={props.formInfo.supervisor}
        updateFormInfo={props.updateFormInfo}
        field="supervisor"
        title="Supervisor / Coach"
      />

      <DateInput
        field="date"
        label="Observation Date"
        date={props.formInfo.date}
        updateFormInfo={props.updateFormInfo}
      />

      <DateInput
        label="Next Observation Date"
        field="nextDate"
        date={props.formInfo.nextDate}
        updateFormInfo={props.updateFormInfo}
      />

      {currentForm != formOptions.studentTeaching &&
        currentForm != formOptions.math && (
          <TextInput
            value={props.formInfo.program}
            updateFormInfo={props.updateFormInfo}
            field="program"
            title={
              currentForm === formOptions.reading
                ? "Reading Program"
                : undefined
            }
          />
        )}

      <TextInput
        value={props.formInfo.other}
        updateFormInfo={props.updateFormInfo}
        field="other"
      />

      <OptionRow
        title={"Observation Number"}
        contentOptions={["1", "2", "3", "4", "5"]}
        currSelection={props.formInfo.observation.toString()}
        updateSelection={(newSelection: string) =>
          props.updateFormInfo({ observation: Number(newSelection) })
        }
        titleStyles={css`
          color: ${Color.neutrals.grayDark};
        `}
      />

      {FormData[currentForm].programOptions && (
        <OptionRow
          title={"Program"}
          contentOptions={FormData[currentForm].programOptions!}
          currSelection={props.formInfo.program}
          updateSelection={(newSelection: string) =>
            props.updateFormInfo({ program: newSelection })
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
