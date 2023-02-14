import { MigrationManifest, PersistedState, createMigrate } from "redux-persist";
import { RootState } from "./store";

type MigratingState = PersistedState & RootState;

const migrations = {
  // 2/14/2023 (v0): Implemented initial migration
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
};

export const migrate = createMigrate(migrations as any as MigrationManifest);
