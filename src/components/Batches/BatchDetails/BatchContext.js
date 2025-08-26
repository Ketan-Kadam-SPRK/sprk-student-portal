import { createContext, useContext } from "react";

export const BatchContext = createContext(null);

export const useBatch = () => useContext(BatchContext);
