import {
  Heading,
  Text,
  Button,
  ButtonText,
  ButtonGroup,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
} from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface AlertWrapperProps {
  visibility: boolean;
  heder: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmBtnText?: string;
  cancelBtnText?: string;
  children?: ReactNode;
}

const AlertWrapper = ({
  visibility,
  heder,
  message,
  onConfirm,
  onCancel,
  confirmBtnText,
  cancelBtnText,
  children,
}: AlertWrapperProps) => {
  const { t } = useTranslation();

  return (
    <AlertDialog isOpen={visibility}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">{heder}</Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          {message ? <Text size="lg">{message}</Text> : <></>}
          {children ? children : <></>}
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup space="lg">
            <Button action="negative" onPress={onCancel}>
              <ButtonText>
                {cancelBtnText ? cancelBtnText : t("general.button.no")}
              </ButtonText>
            </Button>
            <Button onPress={onConfirm}>
              <ButtonText>
                {confirmBtnText ? confirmBtnText : t("general.button.yes")}
              </ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertWrapper;
