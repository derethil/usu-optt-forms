import { configureStore } from "@reduxjs/toolkit";
import formInfoReducer from "../slices/formInfoSlice";

const store = configureStore({
  reducer: {
    formInfo: formInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
