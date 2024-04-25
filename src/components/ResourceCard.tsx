import Icon from "@components/Icon";
import ModalWrapper from "@components/ModalWrapper";
import { Button, Text, ButtonGroup } from "@gluestack-ui/themed";
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
  bgColor = "rgba(255, 255, 255, 0.65)",
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

  const luminance = (color: string) => {
    const colorArray = color
      .match(/[\d\\.]+/g)
      ?.map((chanel) => chanel as unknown as number);
    const ratio: number = colorArray
      ? Math.round(
          (colorArray[0] * 299 + colorArray[1] * 587 + colorArray[2] * 114) /
            1000,
        )
      : 0;
    return ratio > 125 ? "#262626" : "#F6F6F6";
  };

  return (
    <>
      <CardContainer
        onPress={() => setEditModalVisibility(true)}
        bgColor="rgba(255, 255, 255, 0.5)"
      >
        <ResourceContainer bgColor={bgColor}>
          <Icon name={iconName} color={iconColor} strokeWidth={2} size={50} />
          <ResourceText color={luminance(bgColor)}>
            {balance.current}
          </ResourceText>
        </ResourceContainer>
        <ResourceProdLabel>{t("resourceCard.production")}</ResourceProdLabel>
        <ResourceProdValue>{balance.production}</ResourceProdValue>
      </CardContainer>
      <ModalWrapper
        title={t("resourceCard.modal.title")}
        titleIconName={iconName}
        closeButton={false}
        isOpen={editModalVisibility}
        onClose={() => setEditModalVisibility(false)}
      >
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
      </ModalWrapper>
    </>
  );
};

export default ResourceCard;
