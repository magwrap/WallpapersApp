import ImageLoader from "@/components/Photos/ImageLoader";
import { useNavigation } from "@react-navigation/native";
import { Photo } from "pexels";
import * as React from "react";
import { View, Text, Alert } from "react-native";
import {
  ActivityIndicator,
  Colors,
  IconButton,
  useTheme,
} from "react-native-paper";
import * as FileSystem from "expo-file-system";
import useFavouriteStore from "@/hooks/useFavouriteStore";
import usePexels from "@/hooks/usePexels";

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
  const { addPhoto, favPhotos, removePhoto } = useFavouriteStore();
  React.useEffect(() => {
    loadPhoto();
    favPhotos.map((photo: Photo) => {
      if (photo.id === route.params.id) {
        toggleInFavourites();
        return;
      }
    });
  }, []);

  const loadPhoto = async () => {
    const photo = await fetchPhoto(route.params.id);

    setPhoto(photo);
  };

  const _goBack = () => {
    navigation.goBack();
  };
  const _toggleFavourites = () => {
    if (photo) {
      isInFavourites ? removePhoto(photo.id) : addPhoto(photo); //TODO: zmienic przechowywane photos na tylko ich id
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
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
      }}>
      <View style={{ justifyContent: "flex-end" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <IconButton
            icon="arrow-left"
            color={colors.third}
            size={iconSize}
            onPress={_goBack}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
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
      <View style={{ height: "50%", justifyContent: "center" }}>
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
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-around",
          padding: 5,
        }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: colors.third,
            fontWeight: "bold",
            fontStyle: "italic",
          }}>
          {photo?.photographer}
        </Text>
      </View>
    </View>
  );
};

export default ViewPhotoScreen;
