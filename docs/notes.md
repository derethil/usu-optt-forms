# General Notes

## CurrentForm

The current form can be changed in `app/webpack/currentForm.ts`.

### FormData

FormData provides a general structure for all the different forms. When adding a new entry to `FormOptions` a key/value pair must be provided here with the new data.

## Folder Structure

- Components
  - Stores reusable components that are used throughout the app
- Defaults
  - Stores the more complex initial states
- Hooks
  - Holds custom hooks
- Pages
  - The larger components that are used as pages
- Routing
  - Routing components
- Slices
  - Stores redux Slices and logic
- Types
  - `dataTypes` stores the types for the data pages.
  - `types` stores everything else (mostly).
- Utils
  - `dataUtils` provides utils for data pages.
  - `notebookCheckUtils` provides utils for the notebook check page.
  - `pdfUtils` provides utils for the pdf generation process.
  - `timerUtils` provides utils relating to the timers.
  - `utils` is a general utils file.

## Extra Form

It's important to know that there is one form that does not have a button in `index.html` that links to it, the `teacherCandidate` form.
