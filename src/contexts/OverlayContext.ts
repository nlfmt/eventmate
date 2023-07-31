/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";

interface OverlayContext {
  overlay: boolean;
  addOverlay: () => void;
  rmOverlay: () => void;
  setOverlay: (v: boolean) => void;
}
export default createContext<OverlayContext>({
  overlay: false,
  addOverlay: () => {},
  rmOverlay: () => {},
  setOverlay: () => {},
});
