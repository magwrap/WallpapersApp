import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Portal, FAB, useTheme, Colors } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface MyFABProps {
  showModal: () => void;
  category: string;
}

const MyFAB: React.FC<MyFABProps> = ({ showModal, category }) => {
  const [state, setState] = React.useState({ open: false });
  const { colors } = useTheme();

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={open ? "minus" : "plus"}
        color={colors.third}
        fabStyle={{
          backgroundColor: colors.primary,
          borderColor: Colors.grey800,
          borderWidth: 0.5,
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
        actions={[
          {
            icon: () => <EvilIcons name="search" size={24} color="black" />,
            label: "Search",
            onPress: showModal,
            labelStyle: { backgroundColor: colors.third },
            style: { backgroundColor: colors.third },
            labelTextColor: Colors.white,
          },
          {
            icon: () => (
              <MaterialIcons name="category" size={24} color="black" />
            ),
            label: category ? category : "",
            onPress: () => {},

            small: false,
            style: {
              backgroundColor: colors.primary,
              borderWidth: 0.5,
              borderColor: Colors.grey800,
            },
            labelStyle: { backgroundColor: colors.primary },
            labelTextColor: Colors.white,
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};
const styles = StyleSheet.create({});

export default MyFAB;
