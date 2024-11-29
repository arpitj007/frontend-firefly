import React, { forwardRef, useCallback } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { ModalState } from "./useModal";
import { ModalContext } from "./ModalContext";
import { NOOP } from "../../utils/primary";
import Button from "../Button";

import "./Modal.scss";

interface ModalProps extends RadixDialog.DialogContentProps {
  /**
   * Flag indicating whether to show or hide the close icon
   */
  showCloseIcon: boolean;

  /**
   * clicking on the overlay should close the modal
   */
  shouldHideOnOverlayClick: boolean;

  /**
   * Modal state with currentState, hide and show props
   */
  dialog: ModalState;

  /**
   * Container for the portal
   */
  container?: HTMLElement;

  /**
   * Modal close action
   */
  modalCloseAction?: () => void;
}

const Modal = forwardRef(
  (
    {
      showCloseIcon,
      shouldHideOnOverlayClick,
      dialog,
      children,
      title,
      modalCloseAction = () => {},
      container,
      ...restProps
    }: ModalProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const handleOpenChange = useCallback(
      (newOpenState: boolean) => (newOpenState ? dialog.show : dialog.hide),
      [dialog.hide, dialog.show]
    );

    const handleClose = useCallback(
      async (action = modalCloseAction) => {
        action();
        dialog.hide();
      },
      [dialog, modalCloseAction]
    );

    return (
      <RadixDialog.Root onOpenChange={handleOpenChange} open={dialog.isOpen}>
        <ModalContext.Provider value={dialog}>
          <RadixDialog.Portal container={container}>
            <RadixDialog.Overlay className="dialog-overlay" />
            <RadixDialog.Content
              onEscapeKeyDown={shouldHideOnOverlayClick ? dialog.hide : NOOP}
              onPointerDownOutside={
                shouldHideOnOverlayClick
                  ? () => handleClose(modalCloseAction)
                  : NOOP
              }
              ref={ref}
              className="dialog-content"
              {...restProps}
            >
              <div className="modal-header">
                <RadixDialog.Title className="dialog-title">
                  {title}
                </RadixDialog.Title>
                {showCloseIcon === true && (
                  <Button
                    onClick={() => handleClose(modalCloseAction)}
                    type="button"
                  >
                    {/* Using emoji because adding an icon lib will increase the package size. This is the only icon I need anyway */}
                    ⛌
                  </Button>
                )}
              </div>
              <div className="modal-body">{children}</div>
            </RadixDialog.Content>
          </RadixDialog.Portal>
        </ModalContext.Provider>
      </RadixDialog.Root>
    );
  }
);

export default React.memo(Modal);
