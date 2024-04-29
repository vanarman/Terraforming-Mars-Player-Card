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
        {[8, 14, 20].map((item, index) => {
          return (
            <Button
              key={index}
              variant="outline"
              action="secondary"
              onPress={() => {
                dispatch(
                  fundAward({
                    amount: item,
                    resourceType: "CREDIT",
                  }),
                );
                dispatch(hide({ modalType: "awardFundingModalVisibility" }));
              }}
            >
              <ButtonText>{index}</ButtonText>
            </Button>
          );
        })}
      </ButtonGroup>
    </ModalWrapper>
  );
};

export default AwardFundingModal;
