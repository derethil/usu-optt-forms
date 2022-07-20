import notebookChecks from "../../rubrics/mildModerate/notebookChecks.json";
import { NotebookCheckContent } from "../types/dataTypes";

export default function getNotebookCheck(locationIsLogan: boolean, observation?: string) {
  const NotebookChecks: NotebookCheckContent[] = notebookChecks;

  return NotebookChecks.filter((obj) =>
    // -1 is searched for when an obsNum isn't provided, i.e. when we want the "Final" notebook check
    (locationIsLogan ? obj.logan : obj.nonLogan).includes(
      Number(observation) ? Number(observation) : -1
    )
  ).map((obj) => {
    return { score: 0, content: obj.content };
  });
}
