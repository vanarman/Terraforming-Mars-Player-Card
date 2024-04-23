import Icon from "@components/Icon";
import ResourceCard from "@components/ResourceCard";
import ModalPresentationWrapper from "@components/modals/ModalPresentationWrapper";
import {
  Box,
  ButtonText,
  Button,
  ButtonGroup,
  HStack,
  Text,
  VStack,
  Pressable,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
} from "@gluestack-ui/themed";
import { ResourceType } from "@models/ResourceType";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { show } from "src/redux/modalSlice";
import { adjustRank } from "src/redux/rankSlice";
import { production } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";

const PlayCardScreen = () => {
  const [rankAdjustmentVisibility, setRankAdjustmentVisibility] =
    useState(false);
  const rank = useSelector((state: RootState) => state.rank);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <VStack width="$full" flexGrow={1}>
        <Pressable
          alignItems="center"
          justifyContent="center"
          h="$10"
          onPress={() => {
            setRankAdjustmentVisibility(true);
          }}
        >
          <Text
            fontSize="$4xl"
            alignSelf="center"
            textAlign="center"
            fontWeight="$extrabold"
            flexShrink={1}
          >
            {t("screen.playCard.rank", { rank })}
          </Text>
        </Pressable>
        <HStack flexGrow={1}>
          <ResourceCard
            iconName="BadgeEuro"
            type={ResourceType.CREDIT}
            bgColor="rgba(254, 219, 49, 0.5)"
            iconColor="rgb(243, 163, 39)"
          />
          <ResourceCard
            iconName="Pickaxe"
            type={ResourceType.STEEL}
            bgColor="rgba(174, 128, 87, 0.5)"
            iconColor="rgb(61, 37, 21)"
          />
        </HStack>
        <HStack flexGrow={1}>
          <ResourceCard
            iconName="Star"
            type={ResourceType.TITANIUM}
            bgColor="rgba(111, 111, 111, 0.5)"
            iconColor="rgb(252, 239, 80)"
          />
          <ResourceCard
            iconName="Leaf"
            type={ResourceType.PLANTS}
            bgColor="rgba(146, 191, 81, 0.5)"
            iconColor="rgb(61, 128, 75)"
          />
        </HStack>
        <HStack flexGrow={1}>
          <ResourceCard
            iconName="Zap"
            type={ResourceType.ENERGY}
            bgColor="rgba(155, 55, 138, 0.5)"
            iconColor="rgb(255, 255, 255)"
          />
          <ResourceCard
            iconName="Flame"
            type={ResourceType.HEAT}
            bgColor="rgba(231, 97, 59, 0.5)"
            iconColor="rgb(254, 234, 67)"
          />
        </HStack>
        <HStack width="$full" h="$10" justifyContent="space-around" my="$5">
          <Button
            onPress={() => {
              dispatch(show({ modalType: "researchModalStateVisibility" }));
            }}
          >
            <ButtonText>{t("screen.playCard.researchButton")}</ButtonText>
          </Button>
          <Button
            onPress={() => {
              dispatch(show({ modalType: "actionModalVisibility" }));
            }}
          >
            <ButtonText>{t("screen.playCard.actionButton")}</ButtonText>
          </Button>
          <Button
            onPress={() => {
              dispatch(production({ rank }));
            }}
          >
            <ButtonText>{t("screen.playCard.productionButton")}</ButtonText>
          </Button>
        </HStack>
      </VStack>
      <ModalPresentationWrapper />
      <Modal
        isOpen={rankAdjustmentVisibility}
        onClose={() => setRankAdjustmentVisibility(false)}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading>{t("screen.playCard.terraformRankModal.title")}</Heading>
          </ModalHeader>
          <ModalBody>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              my="$1.5"
            >
              <Text fontSize="$2xl">
                {t("screen.playCard.terraformRankModal.current", {
                  amount: rank,
                })}
              </Text>
              <ButtonGroup>
                <Button
                  isDisabled={rank <= 0}
                  size="lg"
                  onPress={() => dispatch(adjustRank({ value: -1 }))}
                >
                  <Icon name="Minus" size={16} strokeWidth={3} />
                </Button>
                <Button
                  size="lg"
                  onPress={() => {
                    dispatch(adjustRank({ value: 1 }));
                  }}
                >
                  <Icon name="Plus" size={16} strokeWidth={3} />
                </Button>
              </ButtonGroup>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              action="positive"
              onPress={() => {
                setRankAdjustmentVisibility(false);
              }}
            >
              <ButtonText>{t("general.button.close")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlayCardScreen;
