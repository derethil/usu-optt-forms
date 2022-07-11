export enum formOptions {
  studentTeaching = "studentTeaching",
  severeReading = "severeReading",
  severeMathLifeSkills = "severeMathLifeSkills",
  birthToFive = "birthToFive",
  reading = "reading",
  math = "math",
  practicumChecklist = "practicumChecklist",
  selfEvaluation = "selfEvaluation",
  STRubric = "STRubric",
  teacherCandidate = "teacherCandidate",
}

const currentForm: formOptions = formOptions.birthToFive;

export default currentForm;
