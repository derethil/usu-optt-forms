export enum formOptions {
  studentTeaching = "studentTeaching",
  severePracticum = "severePracticum",
  bTo5Practicum = "bTo5Practicum",
  reading = "reading",
  math = "math",
  practicumChecklist = "practicumChecklist",
  selfEvaluation = "selfEvaluation",
  STRubric = "STRubric",
}

const currentForm: formOptions = formOptions.STRubric;

export default currentForm;
