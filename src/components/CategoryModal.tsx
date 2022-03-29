import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";

interface CategoryModalProps {
  props: {
    hideModal: () => void;
    visible: boolean;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
  };
}

const CategoryModal: React.FC<CategoryModalProps> = ({ props }) => {
  const [value, setValue] = useState(props.category);
  const { colors } = useTheme();
  const _onPress = () => {
    if (value.length) {
      props.setCategory(value.toLowerCase());
      props.hideModal();
    }
  };
  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.hideModal}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <View>
            <Title style={[styles.title, { color: colors.third }]}>
              Search by category
            </Title>
          </View>

          <TextInput
            style={[styles.textInput, { backgroundColor: colors.accent }]}
            label="Category"
            value={value}
            onChangeText={setValue}
            underlineColor={colors.third}
            selectionColor={colors.fourth}
          />
          <Button
            onPress={_onPress}
            mode="contained"
            style={[styles.button]}
            labelStyle={{ color: colors.third }}>
            Search
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  title: {
    paddingBottom: 35,
    fontWeight: "bold",
    fontSize: 25,
  },
  contentContainer: {
    height: "40%",
    padding: 5,
    margin: 20,
    backgroundColor: "rgba(25, 25, 25, 0.82)",
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  textInput: {
    width: "90%",
    height: 70,
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 60,
  },
});

export default CategoryModal;
