import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistStore } from "./store";

ReactDOM.createRoot(document.getElementById("app")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </PersistGate>
  </Provider>
);
