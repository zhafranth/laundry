import React from "react";
import {
  Button,
  ButtonProps,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as ModalNextUI,
  ModalProps as ModalPropsNextUI,
} from "@nextui-org/react";

interface ModalProps extends ModalPropsNextUI {
  title?: string;
  okText?: string;
  cancelText?: string;
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
  onSubmit?: () => void;
  removeAction?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  okText = "Simpan",
  cancelText = "Batal",
  cancelButtonProps,
  okButtonProps,
  onSubmit,
  removeAction = false,
  ...restProps
}) => {
  return (
    <ModalNextUI
      {...restProps}
      placement="center"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {!removeAction && (
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  {...cancelButtonProps}
                >
                  {cancelText}
                </Button>
                <Button
                  color="primary"
                  onPress={onSubmit || onClose}
                  {...okButtonProps}
                >
                  {okText}
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </ModalNextUI>
  );
};

export default Modal;
