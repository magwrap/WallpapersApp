import React from "react";
import { View, Text } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

type HeaderProps = {
  route: {
    name: string;
  };
  navigation: any;
};

const Header: React.FC<HeaderProps> = ({ route, navigation }) => {
  const _openDrawer = () => navigation.toggleDrawer();

  const _goBack = () => navigation.goBack();
  const { colors } = useTheme();
  return (
    <Appbar.Header>
      {route.name === "ViewPhoto" ? (
        <Appbar.Action
          icon="arrow-left"
          color={colors.third}
          onPress={_goBack}
        />
      ) : (
        <Appbar.Action icon="menu" color={colors.third} onPress={_openDrawer} />
      )}
      <Appbar.Content title={route.name} color={colors.third} />
    </Appbar.Header>
  );
};

export default Header;
