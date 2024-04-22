import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

import ResearchPhaseModal from "./ResearchPhaseModal";
import ActionPhaseModal from "./ActionPhaseModal";
import PlayCardModal from "./PlayCardModal";
import StandardProjectModal from "./StandardProjectModal";
import MilestoneModal from "./MilestoneModal";
import AwardFundingModal from "./AwardFundingModal";

const ModalPresentationWrapper = () => {
  const modal = useSelector((state: RootState) => state.modal)
  return (
    <>
      {modal["researchModalStateVisibility"] ? <ResearchPhaseModal /> : <></>}
      {modal["actionModalVisibility"] ? <ActionPhaseModal /> : <></>}
      {modal["playCardModalVisibility"] ? <PlayCardModal /> : <></>}
      {modal["standardProjectModalVisibility"] ? <StandardProjectModal /> : <></>}
      {modal["milestoneModalVisibility"] ? <MilestoneModal /> : <></>}
      {modal["awardFundingModalVisibility"] ? <AwardFundingModal /> : <></>}
    </>
  );
}

export default ModalPresentationWrapper;