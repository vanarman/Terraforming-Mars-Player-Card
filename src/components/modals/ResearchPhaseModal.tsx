import ModalWrapper from "@components/ModalWrapper";
import { Box, Button, ButtonText } from "@gluestack-ui/themed";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "src/redux/modalSlice";
import { research } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";

const ResearchPhaseModal = () => {
  const [cardsSelected, setCardsSelected] = useState(0);
  const creditBalance = useSelector(
    (state: RootState) => state.resources["CREDIT"],
  );
  const modalVisibility = useSelector(
    (state: RootState) => state.modal["researchModalStateVisibility"],
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const cancelAction = () => {
    dispatch(hide({ modalType: "researchModalStateVisibility" }));
    setCardsSelected(0);
  };

  const confirmAction = () => {
    dispatch(hide({ modalType: "researchModalStateVisibility" }));
    dispatch(research({ purchasedCards: cardsSelected }));
    setCardsSelected(0);
  };

  return (
    <ModalWrapper
      title={t("modal.research.title")}
      isOpen={modalVisibility}
      onClose={cancelAction}
      onConfirm={confirmAction}
      confirmDisabled={cardsSelected <= 0}
      showBody={creditBalance.current >= 3}
    >
      <Box justifyContent="center" my="$4" px="$2" flexDirection="row">
        {Array.from(
          Array(
            Math.floor(creditBalance.current / 3) <= 4
              ? Math.floor(creditBalance.current / 3)
              : 4,
          ),
          (x, i) => i + 1,
        ).map((iter) => {
          return (
            <Button
              key={iter}
              onPress={() => setCardsSelected(iter)}
              isPressed={iter !== cardsSelected}
              width="$16"
              height="$24"
              mx="$1"
            >
              <ButtonText>{iter}</ButtonText>
            </Button>
          );
        })}
      </Box>
    </ModalWrapper>
  );
};

export default ResearchPhaseModal;
