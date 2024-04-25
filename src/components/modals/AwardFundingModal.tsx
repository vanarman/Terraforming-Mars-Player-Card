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
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "src/redux/modalSlice";
import { fundAward } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";

const AwardFundingModal = () => {
  const modalVisibility = useSelector(
    (state: RootState) => state.modal["awardFundingModalVisibility"],
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <AlertDialog
      isOpen={modalVisibility}
      onClose={() => {
        dispatch(hide({ modalType: "awardFundingModalVisibility" }));
      }}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">{t("modal.fundAward.title")}</Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="lg">{t("modal.fundAward.text")}</Text>
          <ButtonGroup space="lg" justifyContent="center" m="$3">
            <Button
              variant="outline"
              action="primary"
              onPress={() => {
                dispatch(fundAward({ amount: 8 }));
                dispatch(hide({ modalType: "awardFundingModalVisibility" }));
              }}
            >
              <ButtonText>0</ButtonText>
            </Button>
            <Button
              variant="outline"
              action="primary"
              onPress={() => {
                dispatch(fundAward({ amount: 14 }));
                dispatch(hide({ modalType: "awardFundingModalVisibility" }));
              }}
            >
              <ButtonText>1</ButtonText>
            </Button>
            <Button
              variant="outline"
              action="primary"
              onPress={() => {
                dispatch(fundAward({ amount: 20 }));
                dispatch(hide({ modalType: "awardFundingModalVisibility" }));
              }}
            >
              <ButtonText>2</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            bg="$error600"
            action="negative"
            onPress={() => {
              dispatch(hide({ modalType: "awardFundingModalVisibility" }));
            }}
          >
            <ButtonText>{t("general.button.cancel")}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AwardFundingModal;
