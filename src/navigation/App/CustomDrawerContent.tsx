import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { Drawer, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import PexelsInfo from "@/components/PexelsInfo";

interface CustomDrawerContentProps {
  props: DrawerContentComponentProps;
}

const chooseItemIcon = (name: string) => {
  switch (name) {
    case "Main":
      return "home";
    case "Category1":
      return "menu";
    case "Favourites":
      return "heart";
  }
};

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ props }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={[styles.photoProvider, { backgroundColor: colors.third }]}>
          <PexelsInfo />
        </View>
        <Drawer.Section>
          {props.state.routes.map(
            (route, i) =>
              route.name !== "Other User Profile" && (
                <Drawer.Item
                  key={i}
                  icon={chooseItemIcon(route.name)}
                  label={route.name}
                  onPress={() => props.navigation.navigate(route.name)}
                />
              )
          )}
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  photoProvider: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    padding: 10,
  },
});

export default CustomDrawerContent;
