import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainScreen from "@/screens/App/MainScreen";
import CategoryScreen from "@/screens/App/CategoryScreen";
import { useTheme } from "react-native-paper";
import CustomDrawerContent from "./CustomDrawerContent";

import FavouritesScreen from "@/screens/App/FavouritesScreen";
import { DrawerScreenNames } from "./DrawerScreenNames";

const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps {}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({}) => {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        lazy: true,
        drawerStyle: {
          backgroundColor: colors.primary,
          width: 240,
        },
        drawerActiveTintColor: colors.accent,
        drawerLabelStyle: {
          color: colors.third,
        },
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent props={props} />}>
      <Drawer.Screen name={DrawerScreenNames.MAIN} component={MainScreen} />
      <Drawer.Screen
        name={DrawerScreenNames.CATEGORY}
        component={CategoryScreen}
      />

      <Drawer.Screen
        name={DrawerScreenNames.FAVOURITES}
        component={FavouritesScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
