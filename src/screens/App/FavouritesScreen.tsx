import Center from "@/components/Center";
import ViewPhotosPage from "@/components/Photos/ViewPhotosPage";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getPhotos } from "@/hooks/useAsyncStoragePhotos";
import { updateState } from "@/store/slices/favouritePhotos";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

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
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  useEffect(() => {
    setLoading(true);
    getPhotos().then((photoSt) => {
      if (photoSt) {
        dispatch(updateState(photoSt));
      }
      setLoading(false);
    });
  }, []);

  const favPhotos = useAppSelector((state) => state.favPhotoReducer.photos);

  return (
    <View style={{ flex: 1 }}>
      {!loading ? (
        <ViewPhotosPage
          navigation={navigation}
          queryName=""
          favPhotos={favPhotos}
          screenName={route.name}
        />
      ) : (
        <Center>
          <ActivityIndicator size="large" color={colors.third} />
        </Center>
      )}
    </View>
  );
};

export default FavouritesScreen;
