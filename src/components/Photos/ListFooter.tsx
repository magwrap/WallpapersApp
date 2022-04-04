import React from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import PexelsInfo from "../PexelsInfo";

interface ListFooterProps {
  loadingMore: boolean;
}

const ListFooter: React.FC<ListFooterProps> = ({ loadingMore }) => {
  const { colors } = useTheme();
  return (
    <>
      {loadingMore && (
        <View style={{ padding: 5 }}>
          <ActivityIndicator color={colors.third} size="large" />
        </View>
      )}
      <PexelsInfo textShown={false} />
    </>
  );
};

export default ListFooter;
