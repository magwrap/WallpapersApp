import { StatusBar } from "expo-status-bar";
import React from "react";
import useCachedResources from "./src/hooks/useCachedResources";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Routes from "@/navigation/Routes";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "@/state";

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
    primary: "#30292f",
    accent: "#413F54",
    third: "#5F5AA2",
    fourth: "#355691",
    fifth: "#3F4045",
    text: "#5F5AA2",
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Routes />
          <StatusBar
          // hidden={true}
          />
        </PaperProvider>
      </Provider>
    );
  }
}
