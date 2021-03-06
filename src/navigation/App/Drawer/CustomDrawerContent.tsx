import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { Drawer, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import PexelsInfo from "@/components/PexelsInfo";
import { DrawerScreenNames } from "./DrawerScreenNames";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

interface CustomDrawerContentProps {
  props: DrawerContentComponentProps;
}

const chooseItemIcon = (name: string) => {
  switch (name) {
    case DrawerScreenNames.MAIN:
      return () => (
        <MaterialIcons name="new-releases" size={24} color="#5F5AA2" />
      );
    case DrawerScreenNames.CATEGORY:
      return () => <EvilIcons name="search" size={24} color="#5F5AA2" />;
    case DrawerScreenNames.FAVOURITES:
      return "heart";
  }
};

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ props }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={[styles.photoProvider, { backgroundColor: colors.third }]}>
          <PexelsInfo />
        </View>
        <Drawer.Section>
          {props.state.routes.map((route, i) => (
            <Drawer.Item
              key={i}
              icon={chooseItemIcon(route.name)}
              label={route.name}
              onPress={() => props.navigation.navigate(route.name)}
            />
          ))}
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  photoProvider: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    padding: 10,
  },
});

export default CustomDrawerContent;
