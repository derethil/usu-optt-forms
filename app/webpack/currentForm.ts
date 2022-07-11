export enum formOptions {
  studentTeaching = "studentTeaching",
  severeReading = "severeReading",
  severeMathLifeSkills = "severeMathLifeSkills",
  birthToFive = "birthToFive",
  mmReading = "mmReading",
  mmMath = "mmMath",
  practicumChecklist = "practicumChecklist",
  selfEvaluation = "selfEvaluation",
  STRubric = "STRubric",
  teacherCandidate = "teacherCandidate",
}

const currentForm: formOptions = formOptions.mmMath;

export default currentForm;
