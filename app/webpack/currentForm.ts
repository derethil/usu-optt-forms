export enum formOptions {
  // Student Teaching
  studentTeaching = "studentTeaching",
  studentTeachingRubric = "studentTeachingRubric",
  cooperatingTeacherChecklist = "cooperatingTeacherChecklist",
  // Severe
  severeSelfEvaluation = "severeSelfEvaluation",
  severeReading = "severeReading",
  severeMathLifeSkills = "severeMathLifeSkills",
  // Mild/Moderate
  mmReading = "mmReading",
  mmMath = "mmMath",
  // Birth to Five
  birthToFive = "birthToFive",
  earlyIntervention = "earlyIntervention",
  // Other
  OPTTChecklist = "OPTTChecklist",
  teacherCandidate = "teacherCandidate",
}

const currentForm: formOptions = formOptions.earlyIntervention;

export default currentForm;
