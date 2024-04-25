import { styled } from "@gluestack-style/react";
import { ImageBackground, Modal } from "@gluestack-ui/themed";

const ScreenBackground = styled(ImageBackground, {
  flex: 1,
  justifyContent: "center",
});

const ModalStyle = styled(Modal, {});

export { ScreenBackground, ModalStyle };
