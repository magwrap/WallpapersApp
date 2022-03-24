import React from "react";
import { Text, StyleSheet } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";

interface CategoryModalProps {
  visible: boolean;
  hideModal: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  hideModal,
}) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};
const styles = StyleSheet.create({});

export default CategoryModal;
