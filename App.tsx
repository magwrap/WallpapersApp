import { StatusBar } from "expo-status-bar";
import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Routes from "@/navigation/Routes";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "@/store";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      third: string;
      fourth: string;
      fifth: string;
    }

    interface Theme {
      roundness: number;
      myOwnProperty: boolean;
    }
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 5,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000000",
    accent: "#413F54",
    third: "#4E4991",
    fourth: "#355691",
    fifth: "#3F4045",
    text: "#5F5AA2",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Routes />
        <StatusBar
          hidden={false}
          style="light"
          backgroundColor="black"
          animated={true}
        />
      </PaperProvider>
    </Provider>
  );
}

//TODO: zapisywac ostatnio wyszukiwane kategorie w local storageS
//TODO: odlagowac header
//TODO: ciemniejszy header zeby sie lepiej wyróżniał
//TODO: moze zmienic sposob wyszukiwania - malo intuicyjny sie wydaje
