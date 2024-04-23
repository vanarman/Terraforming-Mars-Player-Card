import { Box, Button, HStack, Text, ButtonText, ButtonGroup, Pressable, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, Heading } from "@gluestack-ui/themed";
import { ColorValue, OpaqueColorValue } from "react-native";
import Icon from '@components/Icon';
import { useDispatch, useSelector } from "react-redux";
import { adjustProductionAmount, adjustCurrentAmount } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";
import { ResourceType } from "@models/ResourceType";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ResourceCardProps {
  type: ResourceType
  iconName: string;
  iconColor?: string | undefined;
  bgColor?: string | undefined;
}

const ResourceCard = ({
  type,
  bgColor,
  iconName,
  iconColor = '#000',
}: ResourceCardProps) => {
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const resType = Object.keys(ResourceType)[Object.values(ResourceType).indexOf(type)] as keyof typeof ResourceType;
  const balance = useSelector((state: RootState) => state.resources[resType]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <Pressable onPress={() => setEditModalVisibility(true)} alignItems="center" justifyContent="space-between" flexGrow={1} flex={1} p="$1" m="$1" borderRadius="$2xl" bgColor={bgColor}>
        <HStack alignItems="center" justifyContent="center" flexGrow={1}>
          <Icon name={iconName} color={iconColor} strokeWidth={2} size={50} />
          <Text fontSize="$5xl" alignSelf="center" textAlign="center" fontWeight="$extrabold" flexShrink={1}>{balance.current}</Text>
        </HStack>   
        <Text fontSize="$md" textAlign="center" fontWeight="$extrabold" flexShrink={1} mt="$2">{t('resourceCard.production')}</Text>     
        <Text fontSize="$3xl" alignSelf="center" textAlign="center" fontWeight="$extrabold" flexShrink={1}>{balance.production}</Text>
      </Pressable>
      <Modal isOpen={editModalVisibility} onClose={() => setEditModalVisibility(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading>{t('resourceCard.modal.title')}</Heading>
            <Icon name={iconName} color={iconColor} strokeWidth={1.5} size={36} />
          </ModalHeader>
          <ModalBody>
            <Box flexDirection="row" justifyContent="space-between" alignItems="center" my="$1.5">
              <Text fontSize="$2xl">{t('resourceCard.modal.current', { amount: balance.current })}</Text>
              <ButtonGroup>
                <Button isDisabled={balance.current <= 0} size="lg" onPress={() => dispatch(adjustCurrentAmount({ resourceType: resType, amount: -1 }))}>
                  <Icon name="Minus" size={16} strokeWidth={3} />
                </Button>
                <Button size="lg" onPress={() => {dispatch(adjustCurrentAmount({ resourceType: resType, amount: 1 }))}}>
                  <Icon name="Plus" size={16} strokeWidth={3} />
                </Button>
              </ButtonGroup>
            </Box>
            <Box flexDirection="row" justifyContent="space-between" alignItems="center" my="$1.5">
              <Text fontSize="$2xl">{t('resourceCard.modal.production', { amount: balance.production })}</Text>
              <ButtonGroup>
                <Button isDisabled={balance.production <= balance.min} size="lg" onPress={() => dispatch(adjustProductionAmount({ resourceType: resType, amount: -1 }))}>
                  <Icon name="Minus" size={16} strokeWidth={3} />
                </Button>
                <Button size="lg" onPress={() => {dispatch(adjustProductionAmount({ resourceType: resType, amount: 1 }))}}>
                  <Icon name="Plus" size={16} strokeWidth={3} />
                </Button>
              </ButtonGroup>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button action="positive" onPress={() => {setEditModalVisibility(false)}}>
              <ButtonText>{t('general.button.close')}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResourceCard;