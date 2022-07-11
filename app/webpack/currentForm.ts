export enum formOptions {
  studentTeaching = "studentTeaching",
  severeReading = "severeReading",
  severeMathLifeSkills = "severeMathLifeSkills",
  bTo5Practicum = "bTo5Practicum",
  reading = "reading",
  math = "math",
  practicumChecklist = "practicumChecklist",
  selfEvaluation = "selfEvaluation",
  STRubric = "STRubric",
  teacherCandidate = "teacherCandidate",
}

const currentForm: formOptions = formOptions.severeReading;

export default currentForm;
