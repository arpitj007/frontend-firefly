import React from "react";

export interface ModalState {
  hide: () => void;
  isOpen: boolean;
  show: () => void;
}

export interface ModalHookProps {
  initialOpen?: boolean;
}

/**
 * Returns an array of `[isOpen, show, hide]`, where `isOpen` is a boolean to be passed to the
 * `open` property of a Modal component, and `show` and `hide` are functions used to show or hide
 * the modal.
 */
function useModal(props?: ModalHookProps): ModalState {
  const { initialOpen = false } = props ?? {};
  const [isOpen, setOpen] = React.useState(initialOpen);

  const show = React.useCallback(() => setOpen(true), [setOpen]);
  const hide = React.useCallback(() => setOpen(false), [setOpen]);

  return { isOpen, show, hide };
}

export default useModal;
