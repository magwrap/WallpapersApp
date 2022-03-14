import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppStackNavigator from "./App/AppStackNavigator";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default Routes;
