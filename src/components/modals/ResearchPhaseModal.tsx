import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box,
  Text,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
  
import { research } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";
import { hide } from "src/redux/modalSlice";
import Icon from "../Icon";
import { useTranslation } from "react-i18next";


const ResearchPhaseModal = () => {
  const [cardsSelected, setCardsSelected] = useState(0);
  const creditBalance = useSelector((state: RootState) => state.resources["CREDIT"]);
  const modal = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <Modal
        size="lg"
        closeOnOverlayClick
        isOpen={modal["researchModalStateVisibility"]}
        onClose={() => {
          dispatch(hide({ modalType: "researchModalStateVisibility" }))
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">{t('modal.research.title')}</Heading>
            <ModalCloseButton>
              <Icon name="SquareX" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody scrollEnabled={false}>
            <Box justifyContent="center" my="$4" px="$2" flexDirection="row">
              { creditBalance.current <= 0 ? <Text>{t('general.error.insufficientFunds')}</Text> :
                Array.from(Array(Math.floor(creditBalance.current / 3) <= 4 ? Math.floor(creditBalance.current / 3) : 4), (x, i)=> i + 1).map((iter) => {
                  return (
                    <Button key={iter} onPress={() => setCardsSelected(iter)} isPressed={iter != cardsSelected} width="$16" height="$24" mx="$1">
                      <ButtonText>{iter}</ButtonText>
                    </Button>
                  );
                })
              }
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                dispatch(hide({ modalType: "researchModalStateVisibility" }))
                setCardsSelected(0);
              }}
            >
              <ButtonText>{t('general.button.cancel')}</ButtonText>
            </Button>
            <Button
              isDisabled={creditBalance.current <= 0}
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                dispatch(hide({ modalType: "researchModalStateVisibility" }))
                dispatch(research({ purchasedCards: cardsSelected }));
                setCardsSelected(0);
              }}
            >
              <ButtonText>{t('general.button.confirm')}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResearchPhaseModal;