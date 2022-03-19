import Center from "@/components/Center";
import * as React from "react";
import { Divider, Title } from "react-native-paper";

interface CategoryScreenProps {
  navigation: any;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation }) => {
  //TODO: dodac opcje wyszukiwania kategori zdjec
  return (
    <Center>
      <Title>Insert category</Title>
      <Divider />
    </Center>
  );
};

export default CategoryScreen;
