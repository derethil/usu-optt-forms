import NotebookChecks from "../../rubrics/mildModerate/notebookChecks.json";
import { CheckRow, NotebookCheckContent } from "../types/dataTypes";
import { Location } from "../types/types";

export type ObservationKey = "1" | "2" | "3" | "4" | "5";

export default function getNotebookCheck(
  location: Location,
  observation: ObservationKey
): CheckRow[] {
  const notebookChecks: NotebookCheckContent[] = NotebookChecks;

  const rows: CheckRow[] = [];

  notebookChecks.forEach((check) => {
    if (check[location] && check[location]![observation]) {
      rows.push({
        content: check.content,
        score: 0,
        maxScore: check[location]![observation]!,
      });
    }
  });

  return rows;
}
