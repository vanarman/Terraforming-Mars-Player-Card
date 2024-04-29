import ModalWrapper from "@components/ModalWrapper";
import StyledSlider from "@components/StyledComponents/StyledSlider";
import { Box, ModalBody, Text } from "@gluestack-ui/themed";
import { ResourceType } from "@models/ResourceType";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "src/redux/modalSlice";
import { Resources, playCard } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";

const PlayCardModal = () => {
  const modalVisibility = useSelector(
    (state: RootState) => state.modal["playCardModalVisibility"],
  );
  const resources = useSelector((state: RootState) => state.resources);
  const [localResources, setLocalResources] = useState<Resources>(resources);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const cancelAction = () => {
    setLocalResources(resources);
    dispatch(hide({ modalType: "playCardModalVisibility" }));
  };

  const confirmAction = () => {
    dispatch(playCard({ newResourcesValues: localResources }));
    dispatch(hide({ modalType: "playCardModalVisibility" }));
  };

  return (
    <ModalWrapper
      title={t("modal.playCard.title")}
      isOpen={modalVisibility}
      onClose={cancelAction}
      onConfirm={confirmAction}
      confirmDisabled={
        resources["CREDIT"].current - localResources["CREDIT"].current <= 0
      }
    >
      <ModalBody scrollEnabled={false}>
        {resources["CREDIT"].current <= 0 ? (
          <Text>{t("general.error.insufficientFunds")}</Text>
        ) : (
          <>
            <Box justifyContent="center">
              <Text mb="$3" size="lg" fontWeight="$bold">
                {t("modal.playCard.costLabel", {
                  cost:
                    resources["CREDIT"].current -
                    localResources["CREDIT"].current,
                })}
              </Text>
              <StyledSlider
                defaultValue={
                  resources["CREDIT"].current - localResources["CREDIT"].current
                }
                mt="$4"
                mb="$6"
                size="lg"
                orientation="horizontal"
                minValue={0}
                maxValue={resources["CREDIT"].current}
                onChange={(value) =>
                  setLocalResources((current) => {
                    return {
                      ...current,
                      CREDIT: {
                        ...current["CREDIT"],
                        current: resources["CREDIT"].current - value,
                      },
                    };
                  })
                }
              />
            </Box>
            <Text my="$3" size="lg" fontWeight="$bold">
              {t("modal.playCard.productionLabel")}
            </Text>
            {Object.keys(ResourceType).map((item) => {
              const key = item as keyof typeof ResourceType;
              return (
                <Box
                  key={item}
                  justifyContent="space-between"
                  flexDirection="row"
                  my="$3"
                >
                  <Text w="$1/3" textAlign="right">
                    {t(`modal.playCard.resource.${item}`)}
                  </Text>
                  <Text textAlign="center">
                    {localResources[key].production - resources[key].production}
                  </Text>
                  <StyledSlider
                    defaultValue={
                      localResources[key].production - resources[key].production
                    }
                    width="$1/2"
                    size="lg"
                    orientation="horizontal"
                    minValue={-10}
                    maxValue={10}
                    onChange={(value) =>
                      setLocalResources((current) => {
                        return {
                          ...current,
                          [key]: {
                            ...current[key],
                            production: value + resources[key].production,
                          },
                        };
                      })
                    }
                  />
                </Box>
              );
            })}
          </>
        )}
      </ModalBody>
    </ModalWrapper>
  );
};

export default PlayCardModal;
