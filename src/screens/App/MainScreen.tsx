import * as React from "react";

interface MainScreenProps {
  navigation: any;
  route: any;
}

import ViewPhotosPage from "@/components/Photos/ViewPhotosPageWithStickyHeader";

const MainScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  return (
    <ViewPhotosPage
      queryName="New"
      navigation={navigation}
      screenName={route.name}
    />
  );
};

export default MainScreen;
