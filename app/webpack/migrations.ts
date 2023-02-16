import { MigrationManifest, PersistedState, createMigrate } from "redux-persist";
import { RootState } from "./store";
import { Location } from "./types/types";
import getNotebookCheck from "./utils/notebookCheckUtils";

type MigratingState = PersistedState & RootState;

const migrations: MigrationManifest = {
  // 2/14/2023 (v0): Implemented initial migration code
  // Rename "Feedback and Monitoring" to "Pacing, Feedback, and Monitoring"
  // Add rubric item "Modeling" to "New Material - Guided Practice"
  // Add rubric item "Pacing" to "Pacing, Feedback, and Monitoring"
  [0]: (state: MigratingState): MigratingState => {
    return {
      ...state,
      rubric: {
        ...state.rubric,
        "New Material - Guided Practice": {
          ...state.rubric["New Material - Guided Practice"],
          Modeling: {
            score: "0",
            comment: "",
          },
        },
        "Pacing, Feedback, and Monitoring": {
          ...state.rubric["Feedback and Monitoring"],
          Pacing: {
            score: "0",
            comment: "",
          },
        },
      },
    };
  },
  // 2/16/2023 (v1):
  // Rework notebook checks for mmMath
  [1]: (state: MigratingState): MigratingState => {
    return {
      ...state,
      notebookChecks: getNotebookCheck(Location.logan, "1"),
    };
  },
} as any as MigrationManifest;

export const migrate = createMigrate(migrations, { debug: false });
