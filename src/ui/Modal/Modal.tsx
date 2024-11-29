import { forwardRef } from "react";
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
}

const Modal = forwardRef(
  (
    {
      showCloseIcon,
      shouldHideOnOverlayClick,
      dialog,
      children,
      title,
      container,
      ...restProps
    }: ModalProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const handleOpenChange = (newOpenState: boolean) =>
      newOpenState ? dialog.show : dialog.hide;

    return (
      <RadixDialog.Root onOpenChange={handleOpenChange} open={dialog.isOpen}>
        <ModalContext.Provider value={dialog}>
          <RadixDialog.Portal container={container}>
            <RadixDialog.Overlay className="dialog-overlay" />
            <RadixDialog.Content
              onEscapeKeyDown={shouldHideOnOverlayClick ? dialog.hide : NOOP}
              onPointerDownOutside={
                shouldHideOnOverlayClick ? dialog.hide : NOOP
              }
              ref={ref}
              className="dialog-content"
              {...restProps}
            >
              <div className="modal-header">
                <RadixDialog.Title>{title}</RadixDialog.Title>
                {showCloseIcon === true && (
                  <Button onClick={dialog.hide} type="button">
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

export default Modal;
