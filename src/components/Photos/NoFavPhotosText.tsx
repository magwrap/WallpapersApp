import React from "react";
import { StyleSheet } from "react-native";
import { Paragraph, Title, useTheme } from "react-native-paper";
import Center from "../Center";

interface NoFavPhotosTextProps {}

const NoFavPhotosText: React.FC<NoFavPhotosTextProps> = ({}) => {
  const { colors } = useTheme();
  return (
    <Center>
      <Title>No favourite photos added yet!</Title>
      <Paragraph style={{ color: colors.fourth }}>
        Click a photo then heart icon to add it to your favourites
      </Paragraph>
    </Center>
  );
};
const styles = StyleSheet.create({});

export default NoFavPhotosText;
