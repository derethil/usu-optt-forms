export enum formOptions {
  studentTeaching = "studentTeaching",
  severePracticum = "severePracticum",
}

const CURRENT_FORM: formOptions = formOptions.studentTeaching;

export default CURRENT_FORM;

// NOTE: When this is changed, the application data must be cleared in the dev tools or the app will crash
