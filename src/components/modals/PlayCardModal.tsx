import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  ButtonText,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
} from "@gluestack-ui/themed";

import { RootState } from "src/redux/store";
import { hide } from "src/redux/modalSlice";
import { Resources, playCard } from "src/redux/resourceSlice";
import Icon from "../Icon";
import { ResourceType } from '@models/ResourceType';
import { useTranslation } from 'react-i18next';

const PlayCardModal = () => {
  const modalVisibility = useSelector((state: RootState) => state.modal["playCardModalVisibility"]);
  const resources = useSelector((state: RootState) => state.resources);
  const [localResources, setLocalResources] = useState<Resources>(resources);
  const dispatch = useDispatch();
  const { t } =useTranslation();
  
  const cancelAction = () => {
    setLocalResources(resources);
    dispatch(hide({ modalType: "playCardModalVisibility"}));
  }

  return (
    <Modal
      size="lg"
      closeOnOverlayClick
      isOpen={modalVisibility}
      onClose={cancelAction}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{t('modal.playCard.title')}</Heading>
          <ModalCloseButton onPress={cancelAction}>
            <Icon name="SquareX" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody scrollEnabled={false}>
          {resources["CREDIT"].current <= 0 ? <Text>{t('general.error.insufficientFunds')}</Text> :
            <>
              <Box justifyContent="center">
                <Text mb="$3" size="lg" fontWeight="$bold">
                  {t('modal.playCard.costLabel', { cost: resources["CREDIT"].current - localResources["CREDIT"].current })}
                </Text>
                <Slider
                  defaultValue={resources["CREDIT"].current - localResources["CREDIT"].current}
                  mt="$4"
                  mb="$6"
                  size="lg"
                  orientation="horizontal"
                  minValue={0}
                  maxValue={resources["CREDIT"].current}
                  onChange={(value) => setLocalResources((current) => {
                    return { ...current, "CREDIT": { ...current["CREDIT"], current: resources["CREDIT"].current - value } }
                  })}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Text my="$3" size="lg" fontWeight="$bold">{t('modal.playCard.productionLabel')}</Text>
              { Object.keys(ResourceType).map((item) => {
                const key = item as keyof typeof ResourceType;
                return (
                  <Box key={item} justifyContent="space-between" flexDirection="row" my="$3">
                    <Text w="$1/3" textAlign="right">{t(`modal.playCard.resource.${item}`)}</Text>
                    <Text textAlign="center">{localResources[key].production - resources[key].production}</Text>
                    <Slider
                      defaultValue={localResources[key].production - resources[key].production}
                      width="$1/2"
                      size="lg"
                      orientation="horizontal"
                      minValue={-10}
                      maxValue={10}
                      onChange={(value) =>
                        setLocalResources(
                          (current) => {
                            return { ...current, [key]: { ...current[key], production: value + resources[key].production }};
                          }
                        )
                      }
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Box>
                )
              }) }
            </>
          }
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={cancelAction}
          >
            <ButtonText>{t('general.button.cancel')}</ButtonText>
          </Button>
          <Button
            isDisabled={resources["CREDIT"].current - localResources["CREDIT"].current <= 0}
            size="sm"
            action="positive"
            borderWidth="$0"onPress={() => {
              dispatch(playCard({ newResourcesValues: localResources}));
              dispatch(hide({ modalType: "playCardModalVisibility"}));
            }}
          >
            <ButtonText>{t('general.button.confirm')}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlayCardModal;
