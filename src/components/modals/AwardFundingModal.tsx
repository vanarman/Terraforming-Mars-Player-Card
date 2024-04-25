import ModalWrapper from "@components/ModalWrapper";
import { Text, Button, ButtonText, ButtonGroup } from "@gluestack-ui/themed";
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

  const cancelAction = () => {
    dispatch(hide({ modalType: "awardFundingModalVisibility" }));
  };

  return (
    <ModalWrapper
      title={t("modal.research.title")}
      isOpen={modalVisibility}
      onClose={cancelAction}
    >
      <Text size="lg">{t("modal.fundAward.text")}</Text>
      <ButtonGroup space="lg" justifyContent="center" m="$3">
        <Button
          variant="outline"
          action="primary"
          onPress={() => {
            dispatch(
              fundAward({
                amount: 8,
                resourceType: "CREDIT",
              }),
            );
            dispatch(hide({ modalType: "awardFundingModalVisibility" }));
          }}
        >
          <ButtonText>0</ButtonText>
        </Button>
        <Button
          variant="outline"
          action="primary"
          onPress={() => {
            dispatch(fundAward({ amount: 14, resourceType: "CREDIT" }));
            dispatch(hide({ modalType: "awardFundingModalVisibility" }));
          }}
        >
          <ButtonText>1</ButtonText>
        </Button>
        <Button
          variant="outline"
          action="primary"
          onPress={() => {
            dispatch(fundAward({ amount: 20, resourceType: "CREDIT" }));
            dispatch(hide({ modalType: "awardFundingModalVisibility" }));
          }}
        >
          <ButtonText>2</ButtonText>
        </Button>
      </ButtonGroup>
    </ModalWrapper>
  );
};

export default AwardFundingModal;
