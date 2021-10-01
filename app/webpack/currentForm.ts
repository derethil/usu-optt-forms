export enum formOptions {
  studentTeaching = "studentTeaching",
  severePracticum = "severePracticum",
  bTo5Practicum = "bTo5Practicum",
  reading = "reading",
}

const CURRENT_FORM: formOptions = formOptions.reading;

export default CURRENT_FORM;

// NOTE: When this is changed, the application data must be cleared using dev tools or the app will crash
