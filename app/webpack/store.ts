import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import currentForm from "./currentForm";
import formInfoReducer from "./slices/formInfoSlice";
import rubricReducer from "./slices/rubricSlice";
import feedbackReducer from "./slices/feedbackSlice";
import notebookChecksReducer from "./slices/notebookChecksSlice";
import checklistReducer from "./slices/checklistSlice";
import questionsReducer from "./slices/questionsSlice";
import { dataReducer1, dataReducer2 } from "./slices/dataSlice";
import {
  timerReducer1,
  timerReducer2,
  timerReducer3,
} from "./slices/timersSlice";

const reducers = combineReducers({
  formInfo: formInfoReducer,
  rubric: rubricReducer,
  feedback: feedbackReducer,
  notebookChecks: notebookChecksReducer,
  timer1: timerReducer1,
  timer2: timerReducer2,
  timer3: timerReducer3,
  data1: dataReducer1,
  data2: dataReducer2,
  checklist: checklistReducer,
  questions: questionsReducer,
});

const persistConfig = {
  key: currentForm,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
