export enum formOptions {
  studentTeaching = "studentTeaching",
  STRubric = "STRubric",
  severeSelfEvaluation = "severeSelfEvaluation",
  severeReading = "severeReading",
  severeMathLifeSkills = "severeMathLifeSkills",
  mmReading = "mmReading",
  mmMath = "mmMath",
  birthToFive = "birthToFive",
  OPTTChecklist = "OPTTChecklist",
  teacherCandidate = "teacherCandidate",
}

const currentForm: formOptions = formOptions.OPTTChecklist;

export default currentForm;
