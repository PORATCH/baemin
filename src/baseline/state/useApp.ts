import { useContext } from "react";
import { Context } from "./store";
export function useApp() {
  const value = useContext(Context);
  if (!value) throw new Error("AppProvider is required");
  return value;
}
