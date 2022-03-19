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

// export default class Anchor extends React.Component {
//   _handlePress = () => {
//     Linking.openURL(this.props.href);
//     this.props.onPress && this.props.onPress();
//   };

//   render() {
//     return (
//       <Text {...this.props} onPress={this._handlePress}>
//         {this.props.children}
//       </Text>
//     );
//   }
// }
// <Anchor href="https://google.com">Go to Google</Anchor>
// <Anchor href="mailto:support@expo.dev">Email support</Anchor>
