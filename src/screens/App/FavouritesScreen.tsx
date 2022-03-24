import ViewPhotosPage from "@/components/Photos/ViewPhotosPage";
import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { View } from "react-native";

interface FavouritesScreenProps {
  navigation: any;
  route: {
    name: string;
  };
}

const FavouritesScreen: React.FC<FavouritesScreenProps> = ({
  navigation,
  route,
}) => {
  const favPhotos = useAppSelector((state) => state.favPhotoReducer.photos);
  console.log("FavouresScreen");
  return (
    <View style={{ flex: 1 }}>
      <ViewPhotosPage
        navigation={navigation}
        queryName="a"
        favPhotos={favPhotos}
        screenName={route.name}
      />
    </View>
  );
};

export default FavouritesScreen;
