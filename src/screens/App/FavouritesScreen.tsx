import ViewPhotosPage from "@/components/Photos/ViewPhotosPage";
import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { StyleSheet, View } from "react-native";

interface FavouritesScreenProps {
  navigation: any;
}

const FavouritesScreen: React.FC<FavouritesScreenProps> = ({ navigation }) => {
  const favPhotos = useAppSelector((state) => state.favPhotoReducer.photos);
  console.log(favPhotos);

  return (
    <View style={{ flex: 1 }}>
      <ViewPhotosPage navigation={navigation} queryName="a" />
    </View>
  );
};
const styles = StyleSheet.create({});

export default FavouritesScreen;
