import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { hide, show } from "src/redux/modalSlice";
import { getGreenery, increaseTemperature } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";

const ActionPhaseModal = () => {
  const resources = useSelector((state: RootState) => state.resources);
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Actionsheet
      isOpen={modal["actionModalVisibility"]}
      onClose={() => dispatch(hide({ modalType: "actionModalVisibility" }))}
      zIndex={999}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem
          onPress={() => {
            dispatch(show({ modalType: "playCardModalVisibility" }));
            dispatch(hide({ modalType: "actionModalVisibility" }));
          }}
        >
          <ActionsheetItemText>{t("action.playCard")}</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem
          onPress={() => {
            dispatch(show({ modalType: "standardProjectModalVisibility" }));
            dispatch(hide({ modalType: "actionModalVisibility" }));
          }}
        >
          <ActionsheetItemText>
            {t("action.standardProject")}
          </ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem
          onPress={() => {
            dispatch(show({ modalType: "milestoneModalVisibility" }));
            dispatch(hide({ modalType: "actionModalVisibility" }));
          }}
        >
          <ActionsheetItemText>
            {t("action.claimMilestone")}
          </ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem
          onPress={() => {
            dispatch(show({ modalType: "awardFundingModalVisibility" }));
            dispatch(hide({ modalType: "actionModalVisibility" }));
          }}
        >
          <ActionsheetItemText>{t("action.fundAward")}</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem
          isDisabled
          onPress={() => {
            dispatch(hide({ modalType: "actionModalVisibility" }));
          }}
        >
          <ActionsheetItemText>
            {t("action.blueCardAction")}
          </ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem
          isDisabled={resources["PLANTS"].current < 8}
          onPress={() => {
            dispatch(getGreenery());
            dispatch(hide({ modalType: "actionModalVisibility" }));
          }}
        >
          <ActionsheetItemText>{t("action.getGreenery")}</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem
          mb="$8"
          isDisabled={resources["HEAT"].current < 8}
          onPress={() => {
            dispatch(increaseTemperature());
            dispatch(hide({ modalType: "actionModalVisibility" }));
          }}
        >
          <ActionsheetItemText>
            {t("action.increaseTemperature")}
          </ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default ActionPhaseModal;
