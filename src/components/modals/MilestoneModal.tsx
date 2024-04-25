import ModalWrapper from "@components/ModalWrapper";
import {
  Box,
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
import { Milestone } from "@models/MilestoneType";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "src/redux/modalSlice";
import { claimMilestone } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";

const MilestoneModal = () => {
  const [selectedAction, setSelectedAction] = useState<Milestone | null>(null);
  const modalVisibility = useSelector(
    (state: RootState) => state.modal["milestoneModalVisibility"],
  );
  const rank = useSelector((state: RootState) => state.rank);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <ModalWrapper
        title={t("modal.claimMilestone.title")}
        isOpen={modalVisibility}
        onClose={() =>
          dispatch(hide({ modalType: "milestoneModalVisibility" }))
        }
      >
        <Box
          justifyContent="space-between"
          alignItems="center"
          my="$2"
          px="$2"
          flexDirection="row"
        >
          <Text>{t("modal.claimMilestone.milestone.terraformer")}</Text>
          <Button
            w="$1/2"
            isDisabled={rank < 35}
            onPress={() => {
              dispatch(claimMilestone());
              dispatch(hide({ modalType: "milestoneModalVisibility" }));
            }}
          >
            <ButtonText>{t("modal.claimMilestone.claimButton")}</ButtonText>
          </Button>
        </Box>
        <Box
          justifyContent="space-between"
          alignItems="center"
          my="$2"
          px="$2"
          flexDirection="row"
        >
          <Text>{t("modal.claimMilestone.milestone.mayor")}</Text>
          <Button
            w="$1/2"
            onPress={() => {
              setSelectedAction(Milestone.MAYOR);
            }}
          >
            <ButtonText>{t("modal.claimMilestone.claimButton")}</ButtonText>
          </Button>
        </Box>
        <Box
          justifyContent="space-between"
          alignItems="center"
          my="$2"
          px="$2"
          flexDirection="row"
        >
          <Text>{t("modal.claimMilestone.milestone.gardener")}</Text>
          <Button
            w="$1/2"
            onPress={() => {
              setSelectedAction(Milestone.GARDENER);
            }}
          >
            <ButtonText>{t("modal.claimMilestone.claimButton")}</ButtonText>
          </Button>
        </Box>
        <Box
          justifyContent="space-between"
          alignItems="center"
          my="$2"
          px="$2"
          flexDirection="row"
        >
          <Text>{t("modal.claimMilestone.milestone.builder")}</Text>
          <Button
            w="$1/2"
            onPress={() => {
              setSelectedAction(Milestone.BUILDER);
            }}
          >
            <ButtonText>{t("modal.claimMilestone.claimButton")}</ButtonText>
          </Button>
        </Box>
        <Box
          justifyContent="space-between"
          alignItems="center"
          my="$2"
          px="$2"
          flexDirection="row"
        >
          <Text>{t("modal.claimMilestone.milestone.planner")}</Text>
          <Button
            w="$1/2"
            onPress={() => {
              setSelectedAction(Milestone.PLANNER);
            }}
          >
            <ButtonText>{t("modal.claimMilestone.claimButton")}</ButtonText>
          </Button>
        </Box>
      </ModalWrapper>
      <AlertDialog isOpen={selectedAction != null}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">
              {t("modal.claimMilestone.requirementsCheck.title")}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="lg">
              {t(
                `modal.claimMilestone.requirementsCheck.message.${selectedAction?.toString()}`,
              )}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  dispatch(claimMilestone());
                  setSelectedAction(null);
                  dispatch(hide({ modalType: "milestoneModalVisibility" }));
                }}
              >
                <ButtonText>{t("general.button.yes")}</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  setSelectedAction(null);
                  dispatch(hide({ modalType: "milestoneModalVisibility" }));
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

export default MilestoneModal;
