import CategoryModal from "@/components/CategoryModal";
import ViewPhotosPage from "@/components/Photos/ViewPhotosPageWithStickyHeader";
import * as React from "react";
import { View } from "react-native";
import MyFAB from "@/components/MyFAB";
import { Portal } from "react-native-paper";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CategoryScreenProps {
  navigation: any;
  route: {
    name: string;
  };
}

const STORAGE_KEY = "@Category_Name";

const CategoryScreen: React.FC<CategoryScreenProps> = ({
  navigation,
  route,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [category, setCategory] = React.useState("animals");
  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    storeCategory(category);
  }, [category]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const storeCategory = async (categoryName: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, categoryName);
    } catch (e) {
      console.error(e);
    }
  };

  const getCategory = async () => {
    try {
      const categoryName = await AsyncStorage.getItem(STORAGE_KEY);
      if (categoryName !== null) {
        setCategory(categoryName);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Portal.Host>
        <ViewPhotosPage
          queryName={category}
          navigation={navigation}
          screenName={route.name}
        />
        <MyFAB showModal={showModal} category={category} />
        <CategoryModal
          props={{
            hideModal,
            visible,
            category,
            setCategory,
          }}
        />
      </Portal.Host>
    </View>
  );
};

export default CategoryScreen;
