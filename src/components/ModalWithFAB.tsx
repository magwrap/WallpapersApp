import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CategoryModal from "./CategoryModal";
import MyFAB from "./MyFAB";

interface ModalWithFABProps {
  props: {
    showModal: () => void;
    hideModal: () => void;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    visible: boolean;
  };
}

const ModalWithFAB: React.FC<ModalWithFABProps> = ({ props }) => {
  return (
    <View>
      <MyFAB showModal={props.showModal} category={props.category} />
      <CategoryModal props={props} />
    </View>
  );
};
const styles = StyleSheet.create({});

export default ModalWithFAB;
