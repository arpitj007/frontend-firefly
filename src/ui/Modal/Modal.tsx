import { forwardRef } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { ModalState } from "./useModal";
import { ModalContext } from "./ModalContext";
import { NOOP } from "../../utils/primary";

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
  container: HTMLElement;
}

export const Modal = forwardRef(
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
            <RadixDialog.Content
              onEscapeKeyDown={shouldHideOnOverlayClick ? dialog.hide : NOOP}
              onPointerDownOutside={
                shouldHideOnOverlayClick ? dialog.hide : NOOP
              }
              ref={ref}
              {...restProps}
            >
              <div className="modal-header">
                <RadixDialog.Title asChild>{title}</RadixDialog.Title>
                {showCloseIcon === true && (
                  <button onClick={dialog.hide} type="button">
                    ⛌
                  </button>
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
