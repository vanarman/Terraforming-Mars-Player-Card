import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

import ActionPhaseModal from "./ActionPhaseModal";
import AwardFundingModal from "./AwardFundingModal";
import MilestoneModal from "./MilestoneModal";
import PlayCardModal from "./PlayCardModal";
import ResearchPhaseModal from "./ResearchPhaseModal";
import StandardProjectModal from "./StandardProjectModal";

const ModalPresentationWrapper = () => {
  const modal = useSelector((state: RootState) => state.modal);
  return (
    <>
      {modal["researchModalStateVisibility"] ? <ResearchPhaseModal /> : <></>}
      {modal["actionModalVisibility"] ? <ActionPhaseModal /> : <></>}
      {modal["playCardModalVisibility"] ? <PlayCardModal /> : <></>}
      {modal["standardProjectModalVisibility"] ? (
        <StandardProjectModal />
      ) : (
        <></>
      )}
      {modal["milestoneModalVisibility"] ? <MilestoneModal /> : <></>}
      {modal["awardFundingModalVisibility"] ? <AwardFundingModal /> : <></>}
    </>
  );
};

export default ModalPresentationWrapper;
