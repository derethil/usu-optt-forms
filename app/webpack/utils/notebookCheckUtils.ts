import notebookChecks from "../../rubrics/notebookChecks.json";

interface NotebookCheckContent {
  logan: number[];
  nonLogan: number[];
  content: string;
}

export default function getNotebookCheck(
  locationIsLogan: boolean,
  obsNum?: number
) {
  const NotebookChecks: NotebookCheckContent[] = notebookChecks;

  return NotebookChecks.filter((obj) =>
    (locationIsLogan ? obj.logan : obj.nonLogan).includes(obsNum ? obsNum : -1)
  ).map((obj) => obj.content);
}
