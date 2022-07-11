export enum formOptions {
  studentTeaching = "studentTeaching",
  severeReading = "severeReadingPracticum",
  severeMLSPracticum = "severeMLSPracticum",
  bTo5Practicum = "bTo5Practicum",
  reading = "reading",
  math = "math",
  practicumChecklist = "practicumChecklist",
  selfEvaluation = "selfEvaluation",
  STRubric = "STRubric",
  teacherCandidate = "teacherCandidate",
}

const currentForm: formOptions = formOptions.teacherCandidate;

export default currentForm;
