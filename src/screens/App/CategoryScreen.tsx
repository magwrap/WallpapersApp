import CategoryModal from "@/components/CategoryModal";
import ViewPhotosPage from "@/components/Photos/ViewPhotosPage";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import MyFAB from "@/components/MyFAB";
import { Provider } from "react-native-paper";

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
  const [category, setCategory] = React.useState("animals");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // React.useEffect(() => {
  //   setTimeout(showModal, 1000);
  // }, []);

  React.useEffect(() => {}, [category]);
  return (
    <View style={{ flex: 1 }}>
      <ViewPhotosPage
        queryName={category}
        navigation={navigation}
        screenName={route.name}
      />

      <MyFAB showModal={showModal} category={category} />
      <CategoryModal props={{ hideModal, visible, category, setCategory }} />
    </View>
  );
};

export default CategoryScreen;
