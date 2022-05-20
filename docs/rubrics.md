The `.json` files stored in `rubrics` serve as a way to store large amounts of data without simply just putting into React itself.

## Rubrics

Rubrics are imported in `FormData` and used to provide rubric data to each of the forms. This is used, mostly, by the `pages/data/Rubric` component. It loops over the rubric provided and generates the rubric scoring page.

### Notes

- Options may have scores or not; however, if any option in a row has a score, all other options in the row must as well.

## Other JSON Data

There are a couple `json` files stored here that are not rubrics, however:

- `practicumChecklist` is imported in `pages/PracticumChecklist` and `components/pdfDataChecklist` to generate the checklist page and the report for the checklist page, respectively.
- `notebookChecks.json` is imported in `notebookCheckUtils` to provide a util function used to get the content of a notebook check in `defaults` and `notebookChecksSlice`.
