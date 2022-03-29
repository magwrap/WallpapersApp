//source: https://docs.expo.dev/guides/linking/?redirected

import React from "react";
import { TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";

interface AnchorProps {
  props: {
    href: string;
    style: object;
  };
  children?: React.ReactNode;
}

const Anchor: React.FC<AnchorProps> = ({ props, children }) => {
  const handlePress = () => {
    Linking.openURL("https://www.pexels.com");
  };
  return (
    <TouchableOpacity {...props} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
};

export default Anchor;
