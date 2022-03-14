import { StatusBar } from "expo-status-bar";
import React from "react";
import useCachedResources from "./src/hooks/useCachedResources";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Routes from "@/navigation/Routes";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "@/state";

export default function App() {
  const isLoadingComplete = useCachedResources();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      accent: "yellow",
    },
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
       <Provider store={store}>
        <PaperProvider theme={theme}>
          <Routes />
          <StatusBar />   
        </PaperProvider>
      </Provider>
    );
  }
}
