import notebookChecks from "../../rubrics/notebookChecks.json";
import { NotebookCheckContent } from "../types/dataTypes";

export default function getNotebookCheck(
  locationIsLogan: boolean,
  obsNum?: number
) {
  const NotebookChecks: NotebookCheckContent[] = notebookChecks;

  return NotebookChecks.filter((obj) =>
    // -1 is searched for when an obsNum isn't provided; i.e. when we want the "Final" notebook check
    (locationIsLogan ? obj.logan : obj.nonLogan).includes(obsNum ? obsNum : -1)
  ).map((obj) => {
    return { score: 0, content: obj.content };
  });
}
