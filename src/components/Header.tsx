import React from "react";
import { Animated } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type HeaderProps = NativeStackScreenProps;

const Header: React.FC<HeaderProps> = ({ route, navigation }) => {
  const _openDrawer = () => navigation.toggleDrawer();

  const _goBack = () => navigation.goBack();
  const { colors } = useTheme();
  return (
    <Animated.View>
      <Appbar.Header>
        {route.name === "ViewPhoto" ? (
          <Appbar.Action
            icon="arrow-left"
            color={colors.third}
            onPress={_goBack}
          />
        ) : (
          <Appbar.Action
            icon="menu"
            color={colors.third}
            onPress={_openDrawer}
          />
        )}
        <Appbar.Content
          title={route.name}
          color={colors.third}
          // subtitle="Subtitle"
        />
      </Appbar.Header>
    </Animated.View>
  );
};

export default Header;
