import CategoryModal from "@/components/CategoryModal";
import ViewPhotosPage from "@/components/Photos/ViewPhotosPage";
import * as React from "react";
import { View } from "react-native";
import MyFAB from "@/components/MyFAB";
import { Portal } from "react-native-paper";

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
  const [category, setCategory] = React.useState("Animals");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <Portal.Host>
        <ViewPhotosPage
          queryName={category}
          navigation={navigation}
          screenName={route.name}
        />
        <MyFAB showModal={showModal} category={category} />
        <CategoryModal props={{ hideModal, visible, category, setCategory }} />
      </Portal.Host>
    </View>
  );
};

export default CategoryScreen;
