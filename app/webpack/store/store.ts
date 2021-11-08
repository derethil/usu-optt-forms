import { configureStore } from "@reduxjs/toolkit";
import formInfoReducer from "../slices/formInfoSlice";
import rubricReducer from "../slices/rubricSlice";

const store = configureStore({
  reducer: {
    formInfo: formInfoReducer,
    rubric: rubricReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
