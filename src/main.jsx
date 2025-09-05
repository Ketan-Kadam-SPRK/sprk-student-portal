import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistStore } from "./store";
import { HelmetProvider } from "react-helmet-async";
import "./style.css";

ReactDOM.createRoot(document.getElementById("app")).render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </HelmetProvider>
);
