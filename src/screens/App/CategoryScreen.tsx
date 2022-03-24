import CategoryModal from "@/components/CategoryModal";
import ViewPhotosPage from "@/components/Photos/ViewPhotosPage";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";

interface CategoryScreenProps {
  navigation: any;
  route: {
    name: string;
  };
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({
  navigation,
  route,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [category, setCategory] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  React.useEffect(() => {
    showModal();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FAB
        style={styles.fab}
        small
        icon={() => <EvilIcons name="search" size={24} color="black" />}
        onPress={showModal}
      />
      {category.length ? (
        <ViewPhotosPage
          queryName={category}
          navigation={navigation}
          screenName={route.name}
        />
      ) : null}

      <CategoryModal visible={visible} hideModal={hideModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CategoryScreen;
