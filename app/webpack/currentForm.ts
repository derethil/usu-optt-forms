export enum formOptions {
  studentTeaching = "studentTeaching",
  severePracticum = "severePracticum",
  bTo5Practicum = "bTo5Practicum",
  reading = "reading",
  math = "math",
}

console.log("formOptions", formOptions);

const currentForm: formOptions = formOptions.math;

// NOTE: When this is changed, the application data must be cleared using dev tools or the app will crash

export default currentForm;
