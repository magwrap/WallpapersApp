import { useNavigation } from "@react-navigation/native";
import { Photo } from "pexels";
import React, { useState } from "react";
import { TouchableOpacity, Image, Dimensions } from "react-native";

interface PhotoItemProps {
  id: Photo["id"];
  src: Photo["src"]["original"];
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PhotoItem: React.FC<PhotoItemProps> = ({ id, src }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const openImage = () => {
    navigation.navigate("ViewPhoto", {
      id,
    });
  };

  return (
    <TouchableOpacity
      style={{ width: "100%", borderWidth: 0.5 }}
      onPress={openImage}>
      <Image
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={{ uri: src }}
        style={{
          //   maxHeight: item.height,
          //   maWidth: item.width,
          width: windowWidth / 2 - 1,
          height: windowHeight / 3 - 1,
        }}
      />
    </TouchableOpacity>
  );
};

export default PhotoItem;
