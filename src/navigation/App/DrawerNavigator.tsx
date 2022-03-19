import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainScreen from "@/screens/App/MainScreen";
import CategoryScreen from "@/screens/App/CategoryScreen";
import { useTheme } from "react-native-paper";
import CustomDrawerContent from "./CustomDrawerContent";

import Header from "@/components/Header";
import FavouritesScreen from "@/screens/App/FavouritesScreen";

const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps {}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({}) => {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.third,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: colors.primary,
          width: 240,
        },
        drawerActiveTintColor: colors.accent,
        drawerLabelStyle: {
          color: colors.third,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent props={props} />}>
      <Drawer.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerTitle: "All Wallpapers",
          header: (props) => <Header {...props} />,
        }}
      />
      <Drawer.Screen
        name="Category1"
        component={CategoryScreen}
        options={{
          header: (props) => <Header {...props} />,
        }}
      />

      <Drawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          header: (props) => <Header {...props} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
