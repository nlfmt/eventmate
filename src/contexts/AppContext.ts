import { type SetStateAction, createContext, type Dispatch } from "react";

interface AppContext {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default createContext<AppContext>({} as AppContext);
