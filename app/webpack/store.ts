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

import formInfoReducer from "./slices/formInfoSlice";
import rubricReducer from "./slices/rubricSlice";
import feedbackReducer from "./slices/feedbackSlice";
import notebookChecksReducer from "./slices/notebookChecksSlice";
import currentForm from "./currentForm";

const reducers = combineReducers({
  formInfo: formInfoReducer,
  rubric: rubricReducer,
  feedback: feedbackReducer,
  notebookChecks: notebookChecksReducer,
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
