import { createContext, useContext } from "react";
import type { LoadedModel } from "./model";

export const ModelContext = createContext<LoadedModel | null>(null);
export const useModel = () => useContext(ModelContext);
