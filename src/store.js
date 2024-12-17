import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authSlice from "./components/Login/store/authSlice";

const persistConfig = { key: "auth", storage, version: 1 };

const persistreducer = persistReducer(persistConfig, authSlice);

const rootReducer = {
  authSlice: persistreducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunkMiddleware),
});

export { store, persistStore };
