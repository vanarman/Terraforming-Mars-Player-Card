import { styled } from "@gluestack-style/react";
import { HStack, Image } from "@gluestack-ui/themed";

const BodyRowContainer = styled(HStack, {
  justifyContent: "space-between",
  alignItems: "center",
  my: "$2",
  px: "$2",
});

const ImageGuide = styled(Image, {
  m: "$3",
  alignSelf: "center",
});

export { BodyRowContainer, ImageGuide };
