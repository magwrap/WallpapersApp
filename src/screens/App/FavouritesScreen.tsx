import ViewPhotosPage from "@/components/Photos/ViewPhotosPage";
import useFavouriteStore from "@/hooks/useFavouriteStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FavouritesScreenProps {}

const FavouritesScreen: React.FC<FavouritesScreenProps> = ({}) => {
  const { favPhotos } = useFavouriteStore();
  //TODO: dodaj kategorie fav
  return (
    <View style={{ flex: 1 }}>
      <ViewPhotosPage
        photosPage={{
          page: 0,
          next_page: 0,
          per_page: 0,
          photos: favPhotos,
          total_results: favPhotos.length,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

export default FavouritesScreen;
