import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Anchor from "./Anchor";

interface PexelsInfoProps {}

const PexelsInfo: React.FC<PexelsInfoProps> = ({}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Anchor style={styles.anchor}>
        <Button mode="text" compact={true} color={colors.accent}>
          <Text style={{ fontSize: 10 }}>Photos provided by Pexels</Text>
        </Button>
        <Image
          source={{ uri: "https://images.pexels.com/lib/api/pexels.png" }}
          resizeMethod="auto"
          style={styles.image}
        />
      </Anchor>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center" },
  anchor: { margin: 5, alignSelf: "center" },
  image: {
    width: "90%",
    height: 50,
    margin: 5,
  },
});

export default PexelsInfo;
