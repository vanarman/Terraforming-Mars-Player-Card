import {
  Modal as GLModal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Heading,
  ModalCloseButton,
  ModalBody,
  Button,
  ButtonText,
  Text,
} from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import Icon from "./Icon";

interface ModalProps {
  title?: string;
  titleIconName?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  overlayClose?: boolean;
  iconColor?: string | undefined;
  closeButton?: boolean;
  scrollableBody?: boolean;
  children: ReactNode;
  showBody?: boolean;
  noShowText?: string;
  noFooter?: boolean;
}

const ModalWrapper = ({
  title,
  titleIconName,
  isOpen,
  onClose,
  onConfirm,
  confirmDisabled = false,
  overlayClose = true,
  iconColor = "#000000",
  closeButton = true,
  scrollableBody = false,
  children,
  showBody = true,
  noShowText,
  noFooter = false,
}: ModalProps) => {
  const { t } = useTranslation();

  return (
    <GLModal
      size="lg"
      closeOnOverlayClick={overlayClose}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">{title}</Heading>
          {!closeButton ? (
            !titleIconName ? (
              <></>
            ) : (
              <Icon
                name={titleIconName}
                color={iconColor}
                strokeWidth={1.5}
                size={36}
              />
            )
          ) : (
            <ModalCloseButton onPress={onClose}>
              <Icon name="SquareX" color={iconColor} />
            </ModalCloseButton>
          )}
        </ModalHeader>
        <ModalBody scrollEnabled={scrollableBody}>
          {!showBody ? (
            <Text>
              {noShowText ? noShowText : t("general.error.insufficientFunds")}
            </Text>
          ) : (
            children
          )}
        </ModalBody>
        {noFooter ? (
          <></>
        ) : (
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr={onConfirm ? "$3" : "$0"}
              onPress={onClose}
            >
              <ButtonText>{t("general.button.cancel")}</ButtonText>
            </Button>
            {!onConfirm ? (
              <></>
            ) : (
              <Button
                isDisabled={confirmDisabled}
                size="sm"
                action="positive"
                borderWidth="$0"
                onPress={onConfirm}
              >
                <ButtonText>{t("general.button.confirm")}</ButtonText>
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </GLModal>
  );
};

export default ModalWrapper;
