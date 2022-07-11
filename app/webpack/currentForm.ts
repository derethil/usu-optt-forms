export enum formOptions {
  // Student Teaching
  studentTeaching = "studentTeaching",
  studentTeachingRubric = "studentTeachingRubric",
  // Severe
  severeSelfEvaluation = "severeSelfEvaluation",
  severeReading = "severeReading",
  severeMathLifeSkills = "severeMathLifeSkills",
  // Mild/Moderate
  mmReading = "mmReading",
  mmMath = "mmMath",
  // Birth to Five
  birthToFive = "birthToFive",
  // Other
  OPTTChecklist = "OPTTChecklist",
  teacherCandidate = "teacherCandidate",
}

const currentForm: formOptions = formOptions.OPTTChecklist;

export default currentForm;
