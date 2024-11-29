import { createContext } from "react";
import { ModalState } from "./useModal";

export const ModalContext = createContext<ModalState>(
  null as unknown as ModalState
);
