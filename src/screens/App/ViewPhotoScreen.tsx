import ImageLoader from "@/components/Photos/ImageLoader";
import { useNavigation } from "@react-navigation/native";
import { Photo } from "pexels";
import React, { useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Colors,
  IconButton,
  useTheme,
} from "react-native-paper";
import * as FileSystem from "expo-file-system";
import usePexels from "@/hooks/usePexels";
import {
  useAppDispatch,
  useAppSelector,
  addPhoto,
  removePhoto,
} from "@/hooks/reduxHooks";

// import Animated from "react-native-reanimated";

interface ViewPhotoScreenProps {
  route: {
    params: {
      id: number;
    };
  };
}

const ViewPhotoScreen: React.FC<ViewPhotoScreenProps> = ({ route }) => {
  const [photo, setPhoto] = React.useState<Photo>();
  const [isInFavourites, setIsInFavourites] = React.useState(false);
  const toggleInFavourites = () => setIsInFavourites(!isInFavourites);
  const { colors } = useTheme();
  const { fetchPhoto } = usePexels();
  const navigation = useNavigation();
  const favPhotos = useAppSelector((state) => state.favPhotoReducer.photos);
  const dispatch = useAppDispatch();
  console.log(favPhotos);

  useEffect(() => {
    loadPhoto();
    favPhotos.map((photo) => {
      if (photo.id === route.params.id) {
        toggleInFavourites();
        return;
      }
    });
  }, []);

  const loadPhoto = async () => {
    const photo = await fetchPhoto(route.params.id);
    if (photo && "id" in photo) {
      setPhoto(photo);
    }
  };

  const _goBack = () => {
    navigation.goBack();
  };
  const _toggleFavourites = () => {
    if (photo) {
      isInFavourites
        ? dispatch(removePhoto({ id: photo.id }))
        : dispatch(
            addPhoto({
              id: photo.id,
              url: photo.src.original,
              author: photo.photographer,
            })
          );
      toggleInFavourites();
    }
  };
  const _downloadPhoto = () => {
    //TODO: dodac push notification informujace o pobraniu zdjecia
    if (photo) {
      let link = photo.src.original.split("/");
      let name = link[link.length - 1];
      FileSystem.downloadAsync(
        photo.src.original,
        FileSystem.documentDirectory + name
      )
        .then(({ uri }) => {
          Alert.alert(
            "Download succesfull!",
            "Your wallpaper has been downloaded to " + uri,
            [{ text: "OK" }]
          );
        })
        .catch((error) => {
          Alert.alert(
            "Download error...",
            "Something went wrong while downloading your wallpaper, try again",
            [{ text: "OK" }]
          );
        });
    }
  };
  const iconSize = 32;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWithin}>
          <IconButton
            icon="arrow-left"
            color={colors.third}
            size={iconSize}
            onPress={_goBack}
          />
          <View style={styles.headerRight}>
            <IconButton
              icon="download"
              color={Colors.black}
              size={iconSize}
              onPress={_downloadPhoto}
            />
            <IconButton
              icon="heart"
              color={isInFavourites ? Colors.red400 : Colors.grey600}
              size={iconSize}
              onPress={_toggleFavourites}
            />
          </View>
        </View>
      </View>
      <View style={styles.photoContainer}>
        {photo?.src.original ? (
          <ImageLoader
            source={{ uri: photo?.src.original }}
            style={{
              //   minHeight: route.params.photo.height,
              //   minWidth: route.params.photo.width,
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <ActivityIndicator size="large" color={colors.third} />
        )}
      </View>
      <View style={styles.authorContainer}>
        <Text style={[styles.authorText, { color: colors.third }]}>
          {photo?.photographer}
        </Text>
      </View>
    </View>
  );
};

export default ViewPhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    justifyContent: "flex-end",
  },
  headerWithin: { flexDirection: "row", justifyContent: "space-between" },
  headerRight: { flexDirection: "row", justifyContent: "flex-end" },
  photoContainer: { height: "50%", justifyContent: "center" },
  authorContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 5,
  },
  authorText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
