import { useNavigation } from "@react-navigation/native";
import { Photo } from "pexels";
import React from "react";
import { TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";

interface PhotoItemProps {
  id: Photo["id"];
  src: Photo["src"]["original"];
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PhotoItem: React.FC<PhotoItemProps> = ({ id, src }) => {
  const navigation = useNavigation();
  const openImage = () => {
    navigation.navigate("ViewPhoto", {
      id,
    });
  };

  return (
    <TouchableOpacity style={styles.imageContainer} onPress={openImage}>
      <Image source={{ uri: src }} style={styles.image} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  imageContainer: { width: "100%", borderWidth: 0.5 },
  image: {
    width: windowWidth / 2 - 1,
    height: windowHeight / 3 - 1,
  },
});

export default PhotoItem;
