import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";

import App from "./App";

// Entry point to the app
const RootComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const entry = document.getElementById("app-root");
ReactDom.render(<RootComponent />, entry);
