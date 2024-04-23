import Icon from "@components/Icon";
import {
  Button,
  Text,
  ButtonText,
  ButtonGroup,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
} from "@gluestack-ui/themed";
import { ResourceType } from "@models/ResourceType";
import {
  CardContainer,
  ResourceContainer,
  ResourceText,
  ResourceProdLabel,
  ResourceProdValue,
  ModalBodyRow,
} from "@styles/resourceCard";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  adjustProductionAmount,
  adjustCurrentAmount,
} from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";

interface ResourceCardProps {
  type: ResourceType;
  iconName: string;
  iconColor?: string | undefined;
  bgColor?: string | undefined;
}

const ResourceCard = ({
  type,
  bgColor,
  iconName,
  iconColor = "#000",
}: ResourceCardProps) => {
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const resType = Object.keys(ResourceType)[
    Object.values(ResourceType).indexOf(type)
  ] as keyof typeof ResourceType;
  const balance = useSelector((state: RootState) => state.resources[resType]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <CardContainer
        onPress={() => setEditModalVisibility(true)}
        bgColor={bgColor}
      >
        <ResourceContainer>
          <Icon name={iconName} color={iconColor} strokeWidth={2} size={50} />
          <ResourceText>{balance.current}</ResourceText>
        </ResourceContainer>
        <ResourceProdLabel>{t("resourceCard.production")}</ResourceProdLabel>
        <ResourceProdValue>{balance.production}</ResourceProdValue>
      </CardContainer>
      <Modal
        onClose={() => setEditModalVisibility(false)}
        isOpen={editModalVisibility}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading>{t("resourceCard.modal.title")}</Heading>
            <Icon name={iconName} color="#000" strokeWidth={1.5} size={36} />
          </ModalHeader>
          <ModalBody>
            <ModalBodyRow>
              <Text fontSize="$2xl">
                {t("resourceCard.modal.current", { amount: balance.current })}
              </Text>
              <ButtonGroup>
                <Button
                  onPress={() =>
                    dispatch(
                      adjustCurrentAmount({
                        resourceType: resType,
                        amount: -1,
                      }),
                    )
                  }
                  isDisabled={balance.current <= 0}
                  size="lg"
                >
                  <Icon name="Minus" size={16} strokeWidth={3} />
                </Button>
                <Button
                  onPress={() =>
                    dispatch(
                      adjustCurrentAmount({ resourceType: resType, amount: 1 }),
                    )
                  }
                  size="lg"
                >
                  <Icon name="Plus" size={16} strokeWidth={3} />
                </Button>
              </ButtonGroup>
            </ModalBodyRow>
            <ModalBodyRow>
              <Text fontSize="$2xl">
                {t("resourceCard.modal.production", {
                  amount: balance.production,
                })}
              </Text>
              <ButtonGroup>
                <Button
                  onPress={() =>
                    dispatch(
                      adjustProductionAmount({
                        resourceType: resType,
                        amount: -1,
                      }),
                    )
                  }
                  isDisabled={balance.production <= balance.min}
                  size="lg"
                >
                  <Icon name="Minus" size={16} strokeWidth={3} />
                </Button>
                <Button
                  onPress={() =>
                    dispatch(
                      adjustProductionAmount({
                        resourceType: resType,
                        amount: 1,
                      }),
                    )
                  }
                  size="lg"
                >
                  <Icon name="Plus" size={16} strokeWidth={3} />
                </Button>
              </ButtonGroup>
            </ModalBodyRow>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => {
                setEditModalVisibility(false);
              }}
              action="positive"
            >
              <ButtonText>{t("general.button.close")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResourceCard;
