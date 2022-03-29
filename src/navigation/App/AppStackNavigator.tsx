import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "@/navigation/App/Drawer/DrawerNavigator";
import ViewPhotoScreen from "@/screens/App/ViewPhotoScreen";
interface AppStackNavigatorProps {}

const Stack = createStackNavigator();

const AppStackNavigator: React.FC<AppStackNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ViewPhoto"
        component={ViewPhotoScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
