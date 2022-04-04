import React from "react";
import { Appbar, Colors, useTheme } from "react-native-paper";

interface HeaderProps {
  route: {
    name: string;
  };
  navigation: any;
  height: number;
}

const Header: React.FC<HeaderProps> = ({ route, navigation, height }) => {
  const _openDrawer = () => navigation.toggleDrawer();

  const _goBack = () => navigation.goBack();
  const { colors } = useTheme();
  const headerStyles = { borderBottomWidth: 0.5, borderColor: Colors.grey900 };
  return (
    <Appbar.Header style={[{ height }, headerStyles]}>
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
