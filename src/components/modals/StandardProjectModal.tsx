import {
  Box,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
  ButtonText,
  ButtonGroup,
  Input,
  InputField,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  Image,
} from "@gluestack-ui/themed";
import { StandardProjectType } from "@models/StandardProjectType";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "src/redux/modalSlice";
import { standardProject } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";

import Icon from "../Icon";

const StandardProjectModal = () => {
  const [selectedAction, setSelectedAction] =
    useState<StandardProjectType | null>(null);
  const [patentsAmount, setPatentsAmount] = useState<number>(0);
  const modalVisibility = useSelector(
    (state: RootState) => state.modal["standardProjectModalVisibility"],
  );
  const credits = useSelector((state: RootState) => state.resources["CREDIT"]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const imageSrc = () => {
    if (selectedAction === StandardProjectType.ASTEROID) {
      return require("@images/tilePlacement/asteroid.gif");
    }
    if (selectedAction === StandardProjectType.AQUIFER) {
      return require("@images/tilePlacement/aquifer.gif");
    }
    if (selectedAction === StandardProjectType.GREENERY) {
      return require("@images/tilePlacement/greenery.gif");
    }
    if (selectedAction === StandardProjectType.CITY) {
      return require("@images/tilePlacement/city.gif");
    }

    return undefined;
  };

  return (
    <>
      <Modal
        size="lg"
        closeOnOverlayClick
        isOpen={modalVisibility}
        onClose={() =>
          dispatch(hide({ modalType: "standardProjectModalVisibility" }))
        }
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">{t("modal.standardProject.title")}</Heading>
            <ModalCloseButton
              onPress={() =>
                dispatch(hide({ modalType: "standardProjectModalVisibility" }))
              }
            >
              <Icon name="SquareX" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody scrollEnabled={false}>
            <Box
              justifyContent="space-between"
              alignItems="center"
              my="$2"
              px="$2"
              flexDirection="row"
            >
              <Text>{t("modal.standardProject.actions.patents.title")}</Text>
              <Box flexDirection="row" w="$1/2">
                <Input w="$1/3">
                  <InputField
                    value={patentsAmount.toString()}
                    onChangeText={(value) => setPatentsAmount(+value)}
                    keyboardType="number-pad"
                  />
                </Input>
                <Button
                  w="$2/3"
                  isDisabled={credits.current < 11}
                  onPress={() => {
                    dispatch(
                      standardProject({
                        type: StandardProjectType.SELL_PATENT,
                        amount: patentsAmount,
                      }),
                    );
                    dispatch(
                      hide({ modalType: "standardProjectModalVisibility" }),
                    );
                  }}
                >
                  <ButtonText>
                    {t("modal.standardProject.actions.patents.button")}
                  </ButtonText>
                </Button>
              </Box>
            </Box>
            <Box
              justifyContent="space-between"
              alignItems="center"
              my="$2"
              px="$2"
              flexDirection="row"
            >
              <Text>{t("modal.standardProject.actions.powerPlant.title")}</Text>
              <Button
                w="$1/2"
                isDisabled={credits.current < 11}
                onPress={() => {
                  dispatch(
                    standardProject({ type: StandardProjectType.POWER_PLANT }),
                  );
                  dispatch(
                    hide({ modalType: "standardProjectModalVisibility" }),
                  );
                }}
              >
                <ButtonText>
                  {t("modal.standardProject.actions.powerPlant.button")}
                </ButtonText>
              </Button>
            </Box>
            <Box
              justifyContent="space-between"
              alignItems="center"
              my="$2"
              px="$2"
              flexDirection="row"
            >
              <Text>{t("modal.standardProject.actions.asteroid.title")}</Text>
              <Button
                w="$1/2"
                isDisabled={credits.current < 14}
                onPress={() => {
                  setSelectedAction(StandardProjectType.ASTEROID);
                }}
              >
                <ButtonText>
                  {t("modal.standardProject.actions.asteroid.button")}
                </ButtonText>
              </Button>
            </Box>
            <Box
              justifyContent="space-between"
              alignItems="center"
              my="$2"
              px="$2"
              flexDirection="row"
            >
              <Text>{t("modal.standardProject.actions.aquifer.title")}</Text>
              <Button
                w="$1/2"
                isDisabled={credits.current < 18}
                onPress={() => {
                  setSelectedAction(StandardProjectType.AQUIFER);
                }}
              >
                <ButtonText>
                  {t("modal.standardProject.actions.aquifer.button")}
                </ButtonText>
              </Button>
            </Box>
            <Box
              justifyContent="space-between"
              alignItems="center"
              my="$2"
              px="$2"
              flexDirection="row"
            >
              <Text>{t("modal.standardProject.actions.greenery.title")}</Text>
              <Button
                w="$1/2"
                isDisabled={credits.current < 23}
                onPress={() => {
                  setSelectedAction(StandardProjectType.GREENERY);
                }}
              >
                <ButtonText>
                  {t("modal.standardProject.actions.greenery.button")}
                </ButtonText>
              </Button>
            </Box>
            <Box
              justifyContent="space-between"
              alignItems="center"
              my="$2"
              px="$2"
              flexDirection="row"
            >
              <Text>{t("modal.standardProject.actions.city.title")}</Text>
              <Button
                w="$1/2"
                isDisabled={credits.current < 25}
                onPress={() => {
                  setSelectedAction(StandardProjectType.CITY);
                }}
              >
                <ButtonText>
                  {t("modal.standardProject.actions.city.button")}
                </ButtonText>
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialog isOpen={selectedAction != null}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">
              {t("modal.standardProject.tilePlacement.title")}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="lg">
              {t(
                `modal.standardProject.tilePlacement.${selectedAction?.toString()}`,
              )}
            </Text>
            <Image
              size="xl"
              m="$3"
              alignSelf="center"
              source={imageSrc()}
              alt={`Placement of ${selectedAction?.toString()} tile`}
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  dispatch(standardProject({ type: selectedAction }));
                  setSelectedAction(null);
                  dispatch(
                    hide({ modalType: "standardProjectModalVisibility" }),
                  );
                }}
              >
                <ButtonText>{t("general.button.yes")}</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  setSelectedAction(null);
                  dispatch(
                    hide({ modalType: "standardProjectModalVisibility" }),
                  );
                }}
              >
                <ButtonText>{t("general.button.no")}</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StandardProjectModal;
