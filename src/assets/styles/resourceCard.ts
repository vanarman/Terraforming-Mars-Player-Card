import { styled } from "@gluestack-style/react";
import { HStack, Pressable, Text } from "@gluestack-ui/themed";

const CardContainer = styled(Pressable, {
  alignItems: "center",
  justifyContent: "space-between",
  flexGrow: 1,
  flex: 1,
  p: "$1",
  m: "$1",
  borderRadius: "$2xl",
});

const ResourceContainer = styled(HStack, {
  alignItems: "center",
  justifyContent: "center",
  my: "$1/6",
  p: "$3",
});

const ResourceText = styled(Text, {
  fontSize: "$5xl",
  alignSelf: "center",
  textAlign: "center",
  fontWeight: "$extrabold",
  flexShrink: 1,
});

const ResourceProdLabel = styled(Text, {
  fontSize: "$md",
  textAlign: "center",
  fontWeight: "$extrabold",
  flexShrink: 1,
  mt: "$2",
});

const ResourceProdValue = styled(Text, {
  fontSize: "$3xl",
  alignSelf: "center",
  textAlign: "center",
  fontWeight: "$extrabold",
  flexShrink: 1,
});

const ModalBodyRow = styled(HStack, {
  justifyContent: "space-between",
  alignItems: "center",
  my: "$1.5",
});

export {
  ModalBodyRow,
  ResourceText,
  CardContainer,
  ResourceContainer,
  ResourceProdLabel,
  ResourceProdValue,
};
