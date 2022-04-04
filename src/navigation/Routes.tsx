import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppStackNavigator from "./App/AppStackNavigator";

interface RoutesProps {}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: "#20181e",
    background: "#000000",
  },
};

const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default Routes;
