import Center from "@/components/Center";
import * as React from "react";
import { Divider, Title } from "react-native-paper";

interface TabOneScreenProps {
  navigation: any;
}

const TabOneScreen: React.FC<TabOneScreenProps> = ({ navigation }) => {
  return (
    <Center>
      <Title>Tab One</Title>
      <Divider />
    </Center>
  );
};

export default TabOneScreen;
