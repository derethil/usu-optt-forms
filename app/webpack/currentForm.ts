export enum formOptions {
  studentTeaching = "studentTeaching",
  severeReadingPracticum = "severeReadingPracticum",
  severeMLSPracticum = "severeMLSPracticum",
  bTo5Practicum = "bTo5Practicum",
  reading = "reading",
  math = "math",
  practicumChecklist = "practicumChecklist",
  selfEvaluation = "selfEvaluation",
  STRubric = "STRubric",
}

const currentForm: formOptions = formOptions.studentTeaching;

export default currentForm;
