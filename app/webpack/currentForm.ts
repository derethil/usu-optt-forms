export enum formOptions {
  studentTeaching = "studentTeaching",
  severeReading = "severeReading",
  severeMathLifeSkills = "severeMathLifeSkills",
  birthToFive = "birthToFive",
  mmReading = "mmReading",
  mmMath = "mmMath",
  OPTTChecklist = "OPTTChecklist",
  selfEvaluation = "selfEvaluation",
  STRubric = "STRubric",
  teacherCandidate = "teacherCandidate",
}

const currentForm: formOptions = formOptions.OPTTChecklist;

export default currentForm;
